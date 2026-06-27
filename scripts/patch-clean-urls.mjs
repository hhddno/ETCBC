/**
 * Remplace les liens .html par des URLs propres (UTF-8 safe)
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, '..');
const BASE = 'https://www.etcbc-charpente.fr';

const PAGE_MAP = [
  ['index.html', '/'],
  ['charpente.html', '/charpente'],
  ['amenagement-combles.html', '/amenagement-combles'],
  ['construction-bois.html', '/construction-bois'],
  ['couverture.html', '/couverture'],
  ['menuiseries.html', '/menuiseries'],
  ['realisations.html', '/realisations'],
  ['contact.html', '/contact'],
  ['mentions-legales.html', '/mentions-legales'],
];

function patch(content) {
  let out = content;
  for (const [file, clean] of PAGE_MAP) {
    const esc = file.replace('.', '\\.');
    out = out.replace(new RegExp(`href="${esc}"`, 'g'), `href="${clean}"`);
    out = out.replace(new RegExp(`${BASE}/${esc}`, 'g'), `${BASE}${clean === '/' ? '/' : clean}`);
  }
  return out;
}

async function main() {
  const files = (await readdir(root)).filter((f) => f.endsWith('.html'));
  for (const file of files) {
    const path = join(root, file);
    let content = await readFile(path, 'utf8');
    content = content.replace(/^\uFEFF/, '');
    const next = patch(content);
    if (next !== content) {
      await writeFile(path, next, 'utf8');
      console.log('Patched', file);
    }
  }

  const sitemapPath = join(root, 'sitemap.xml');
  let sitemap = await readFile(sitemapPath, 'utf8');
  for (const [file, clean] of PAGE_MAP) {
    sitemap = sitemap.replaceAll(`${BASE}/${file}`, `${BASE}${clean === '/' ? '/' : clean}`);
  }
  await writeFile(sitemapPath, sitemap, 'utf8');
  console.log('Patched sitemap.xml');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
