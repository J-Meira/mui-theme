#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? process.cwd());
const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null);
const readJson = (p) => {
  const s = read(p);
  return s ? JSON.parse(s) : null;
};

const pkg = readJson(join(root, 'package.json'));
if (!pkg) {
  console.error(`No package.json in ${root}`);
  process.exit(1);
}

const allDeps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };

const lockfiles = [
  ['pnpm', 'pnpm-lock.yaml'],
  ['npm', 'package-lock.json'],
  ['yarn', 'yarn.lock'],
  ['bun', 'bun.lockb'],
  ['bun', 'bun.lock'],
];
const packageManager =
  lockfiles.find(([, f]) => existsSync(join(root, f)))?.[0] ??
  (pkg.packageManager?.split('@')[0] || 'npm');

const installedVersion = (name) => {
  const local = readJson(join(root, 'node_modules', name, 'package.json'));
  if (local?.version) return { version: local.version, source: 'node_modules' };

  const pnpmLock = read(join(root, 'pnpm-lock.yaml'));
  if (pnpmLock) {
    const m = pnpmLock.match(
      new RegExp(
        `'?${name.replace('/', '\\/')}'?:\\n\\s+specifier: [^\\n]+\\n\\s+version: ([0-9][^\\s(]*)`,
      ),
    );
    if (m) return { version: m[1], source: 'pnpm-lock.yaml' };
    const m2 = pnpmLock.match(
      new RegExp(`/${name.replace('/', '\\/')}@([0-9][^\\s(:]*)`),
    );
    if (m2) return { version: m2[1], source: 'pnpm-lock.yaml' };
  }
  const npmLock = readJson(join(root, 'package-lock.json'));
  const entry = npmLock?.packages?.[`node_modules/${name}`];
  if (entry?.version)
    return { version: entry.version, source: 'package-lock.json' };

  const yarnLock = read(join(root, 'yarn.lock'));
  if (yarnLock) {
    const m = yarnLock.match(
      new RegExp(`"?${name}@[^\\n]*\\n\\s+version:? "?([0-9][^"\\n]*)`),
    );
    if (m) return { version: m[1], source: 'yarn.lock' };
  }

  const range = allDeps[name];
  if (range) {
    const m = range.match(/(\d+)\.(\d+)\.(\d+)/);
    if (m)
      return {
        version: `${m[1]}.${m[2]}.${m[3]}`,
        source: 'package.json range (lower bound)',
      };
  }
  return null;
};

const major = (v) => Number(v?.version?.split('.')[0] ?? NaN);
const minor = (v) => Number(v?.version?.split('.')[1] ?? NaN);

const theme = installedVersion('@j-meira/mui-theme');
const mui = installedVersion('@mui/material');
const pickers = installedVersion('@mui/x-date-pickers');
const react = installedVersion('react');

const peers = [
  '@mui/material',
  '@mui/x-date-pickers',
  '@emotion/react',
  '@emotion/styled',
  'formik',
  'notistack',
  'dayjs',
  'react-icons',
];
const directPeers = Object.fromEntries(
  peers.map((p) => [p, allDeps[p] ?? null]),
);

const hasJest =
  Boolean(pkg.jest) ||
  [
    'jest.config.js',
    'jest.config.cjs',
    'jest.config.mjs',
    'jest.config.ts',
    'jest.config.json',
    'jestconfig.json',
  ].some((f) => existsSync(join(root, f)));
const hasVitest =
  Boolean(allDeps.vitest) ||
  ['vitest.config.ts', 'vitest.config.js', 'vitest.config.mts'].some((f) =>
    existsSync(join(root, f)),
  );
const hasVite = Boolean(allDeps.vite);
const hasNext = Boolean(allDeps.next);

const stages = [];
if (!theme) {
  stages.push('not-a-consumer');
} else if (major(theme) >= 3) {
  stages.push('verify-only');
} else {
  if (major(theme) < 1 || (major(theme) === 1 && minor(theme) < 9))
    stages.push('A: 1.x -> 2.0 (MUI 7)');
  stages.push('B: 2.x -> 3.0 (MUI 9, peer deps, ESM only)');
}

const notes = [];
if (theme && major(theme) < 3 && mui && major(mui) < 7)
  notes.push(
    'MUI in the tree is < 7: Stage A must include the consumer MUI 6 -> 7 migration.',
  );
if (mui && major(mui) === 7 && theme && major(theme) < 3)
  notes.push(
    'MUI 7 in the tree: Stage B bumps it to 9 (7.3 is still accepted by the peer range if you must stay).',
  );
if (hasJest && !hasVitest)
  notes.push(
    'Jest detected: add transformIgnorePatterns for @j-meira/mui-theme (ESM only) or move to Vitest.',
  );
if (hasNext)
  notes.push('Next.js detected: add @j-meira/mui-theme to transpilePackages.');
if (react && major(react) < 19)
  notes.push('React < 19: bump to ^19.2 (peer requirement).');
const missingPeers = peers.filter((p) => !directPeers[p]);
if (missingPeers.length)
  notes.push(
    `Peers to add as direct dependencies in Stage B: ${missingPeers.join(', ')}`,
  );
const deepImportHint = 'grep -rn "@j-meira/mui-theme/\\(dist\\|src\\)" src';
notes.push(`Check for deep imports: ${deepImportHint}`);

const result = {
  root,
  packageManager,
  installed: {
    '@j-meira/mui-theme': theme,
    '@mui/material': mui,
    '@mui/x-date-pickers': pickers,
    react,
  },
  directPeers,
  tooling: {
    vite: hasVite,
    vitest: hasVitest,
    jest: hasJest,
    next: hasNext,
    node: process.versions.node,
  },
  stages,
  notes,
};

console.log(JSON.stringify(result, null, 2));
