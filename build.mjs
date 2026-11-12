import { cp, mkdir, rm } from 'node:fs/promises';
const output = new URL('./dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output);
for (const file of ['index.html', 'styles.css', 'app.js', 'favicon.svg', 'robert-curran-resume.pdf', '.nojekyll']) {
  await cp(new URL(file, import.meta.url), new URL(file, output));
}
console.log('Built static portfolio in dist/');
