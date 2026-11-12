import { readFile, access } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve('.');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
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
  }
}
const pdf = await readFile(resolve(root, 'robert-curran-resume.pdf'));
assert.equal(pdf.subarray(0, 5).toString(), '%PDF-', 'Invalid résumé PDF');
console.log(`Passed: ${ids.length} unique IDs, ${refs.length} links/assets, résumé PDF, page metadata.`);
