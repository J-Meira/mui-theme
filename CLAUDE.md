# CLAUDE.md

Project instructions for Claude Code. Keep this file short and current; it replaces the old Copilot instructions.

## What this is

`@j-meira/mui-theme` is a React component library (theme, layout, form inputs, data table) built on Material UI and Formik. It is published to GitHub Packages and consumed by several internal apps. Storybook is the living demo: https://mui-theme.jm.app.br

- **Peer dependencies** (consumers install them, this repo has them in `devDependencies` only): `@mui/material` 7.3+ or 9, `@mui/x-date-pickers` 8 or 9, `@emotion/react`, `@emotion/styled`, `formik`, `notistack`, `dayjs`, `react-icons`, `react`, `react-dom`.
- Build output: `dist/esm` (ESM only, `"type": "module"` marker) and `dist/scss`. No CommonJS build since 3.0; consumers are bundler-based (Vite). Compile target ES2020, `moduleResolution: bundler`. `exports` map blocks deep imports into `dist/`.
- Tooling: pnpm 12, Node 22.13+, TypeScript, Jest + React Testing Library, Storybook 10 (react-vite), ESLint flat config, Prettier.

## Commands

```bash
pnpm install          # frozen lockfile in CI
pnpm lint             # eslint .
pnpm test             # jest, config in jestconfig.json
pnpm build            # prettier + lint + clean + esm/cjs build + scss copy
pnpm build-sb         # static Storybook
pnpm sb               # Storybook dev server on :6006
```

The gate for every PR is `pnpm lint && pnpm test && pnpm build && pnpm build-sb`. CI (`.github/workflows/ci.yml`) runs the same on pull requests and pushes to `master` / `release/**`.

## Layout

```
src/components/<Component>/   index.tsx (+ sub-files for variants, e.g. Input/Mask.tsx)
src/hooks/                    useCookies, useDebounce, useToast, useWindowDimensions
src/scss/                     global styles, one partial per component
src/index.tsx                 public barrel (components + hooks)
tests/components, tests/hooks mirrors src/; <Name>.test.tsx
stories/                      CSF3 stories, one file per component
scripts/                      clean.mjs, copy.mjs (build helpers)
```

## Code rules

### Three hard rules

These apply to every file you touch, including refactors and tests.

**1. No `else`.** Use early returns, ternaries, or a switch / object lookup.

```ts
// wrong
if (condition) {
  return resultA;
} else {
  return resultB;
}

// right
if (condition) return resultA;
return resultB;

// right
return condition ? resultA : resultB;
```

**2. `const` by default, never `var`.** Use `let` only when a value must be reassigned and no cleaner shape exists. Prefer building a new value over reassigning.

```ts
// wrong
let items = [];
items = [...items, newItem];

// right
const items = [];
items.push(newItem);

// right
const newItems = [...items, newItem];
```

**3. Do not add comments.** No explanatory comments in new or refactored code, no "// fix", no commented-out code. Names and structure carry the meaning. Keep an existing comment only if it still applies; delete it when the code it explains changes.

### Everything else

- Memoize only where it pays: `useMemo` for objects passed to context or providers, `useCallback` for handlers passed to memoized children. Do not wrap props spreads in `useMemo`; it never hits.
- Derive values from props directly instead of mirroring them into state with `useEffect`.
- Never mutate props or the caller's objects during render (see `DataTableBody`).
- Every bug fix gets a regression test. Tests live in `tests/`, mirror the `src/` path, and use Testing Library queries (`getByRole`, `getByLabelText`) over selectors.
- Every component has a story. New props need a story variant.
- Public exports are API. Renaming or removing one is a breaking change and belongs in a major release.

## MUI conventions

- MUI 9: use `slotProps.input` / `slotProps.htmlInput` instead of `InputProps` / `inputProps`; `slots` instead of `components`. System props (`display`, `mt`, `color="primary.main"`) are gone from Grid, Box, Typography, Stack and Link. Use `sx`.
- Grid v2 only: `<Grid size={{ xs: 12, md: 6 }}>`; no `item`, no `xs=` props. The `defaultGrid` in `src/components/Input/defaultGrid.ts` is the input default; every input accepts `grid` and `noGrid`.
- Inputs support two modes: Formik-bound (default, via `<Field>`) and `localControl` (plain controlled/uncontrolled TextField). Keep both branches behaviourally identical apart from the Formik wiring.
- Date pickers: MUI X v9, dayjs adapter, mandatory accessible field DOM. Open the picker from its button, never from a text-field click.
- Icons come from `react-icons/md`. Tests that render icon-heavy components mock `react-icons/md`.
- Migration guides: https://mui.com/material-ui/migration/upgrade-to-v9/ and https://mui.com/x/migration/migration-pickers-v8/

## Release workflow (3.0.0)

- Tracking issue: #46. One issue per phase, one branch per issue, named as in the issue body (`chore/…`, `feat/…`, `fix/…`, `docs/…`).
- Branch from `release/3.0`; PRs target `release/3.0`. One release PR to `master` at the end, then tag `v3.0.0` and publish via the release workflow.
- PRs merge into a non-default branch, so GitHub does **not** auto-close issues from "Closes #N". After a merge, close the issue manually (`gh issue close N --reason completed`) and tick it in #46.
- Keep the `MUI_THEME_DARk` localStorage key (typo included); consumers' stored preferences depend on it.
- Consumers upgrade with the skill from #55 (`skills/mui-theme-upgrade`), which handles both 1.x and 2.x starting points.

## Gotchas

- Source files are CRLF (`core.autocrlf=true`). Scripted edits must be line-ending tolerant.
- `pnpm-workspace.yaml` holds `allowBuilds` so pnpm 12 installs without an interactive prompt.
- `dist/esm` uses extensionless relative imports; bundlers are fine, plain Node ESM (no bundler) is not. Accepted: every consumer is a Vite app. A consumer that Jest-tests components from this package needs a `transformIgnorePatterns` exception for `@j-meira/mui-theme` or Vitest.
- Storybook's preview decorator hard-codes `adapterLocalePtBR`; the English locale is covered by tests, not stories.
