import { readFile, access } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve('.');
const pages = ['index.html', 'work.html', 'resume.html', 'about.html'];
let references = 0;
for (const page of pages) {
const html = await readFile(resolve(root, page), 'utf8');
assert.match(html, /<html lang="en">/);
assert.match(html, /name="viewport"/);
assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, 'Expected one h1');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(match => match[1]);
for (const ref of refs) {
  if (ref === '#' || /^(https?:|mailto:)/.test(ref)) continue;
  if (ref.startsWith('#')) {
    assert(ids.includes(ref.slice(1)), `Missing anchor: ${ref}`);
  } else {
    const file = resolve(root, ref.split(/[?#]/)[0]);
    assert(file.startsWith(root + sep), `Asset outside site: ${ref}`);
    await access(file);
    if (ref.includes('#')) {
      const target = await readFile(file, 'utf8');
      assert(target.includes(`id="${ref.split('#')[1]}"`), `Missing cross-page anchor: ${ref}`);
    }
  }
}
references += refs.length;
}
const pdf = await readFile(resolve(root, 'robert-curran-resume.pdf'));
assert.equal(pdf.subarray(0, 5).toString(), '%PDF-', 'Invalid résumé PDF');
console.log(`Passed: ${pages.length} pages, ${references} links/assets, unique IDs, résumé PDF, page metadata.`);
