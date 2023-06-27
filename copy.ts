// eslint-disable-next-line @typescript-eslint/no-var-requires
const fse = require('fs-extra');

const srcDir = `src/scss`;
const destDir = `dist/scss`;

try {
  fse.copySync(srcDir, destDir, { overwrite: true });
  console.log('success!');
} catch (err) {
  console.error(err);
}
