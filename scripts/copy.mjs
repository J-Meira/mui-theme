import { cpSync, writeFileSync } from 'node:fs';

cpSync('src/scss', 'dist/scss', { recursive: true });
writeFileSync('dist/esm/package.json', '{ "type": "module" }\n');
console.log('Copied scss and wrote dist/esm/package.json.');
