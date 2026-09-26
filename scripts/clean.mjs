import { rmSync } from 'node:fs';

console.log('Cleaning dist...');
rmSync('dist', { recursive: true, force: true });
console.log('Done.');
