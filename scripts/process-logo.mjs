import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const source = path.join(root, 'images', 'logo-source.png');
const outPng = path.join(root, 'images', 'logo.png');
const outWebp = path.join(root, 'images', 'logo.webp');

const input = fs.existsSync(source) ? source : path.join(root, 'images', 'logo.png');

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const threshold = 42;
const processed = Buffer.from(data);

for (let i = 0; i < processed.length; i += 4) {
  const r = processed[i];
  const g = processed[i + 1];
  const b = processed[i + 2];
  if (r <= threshold && g <= threshold && b <= threshold) {
    processed[i + 3] = 0;
  }
}

await sharp(processed, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 1 })
  .resize(300, 300, { fit: 'inside', withoutEnlargement: false })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(outPng);

await sharp(outPng)
  .webp({ quality: 92, alphaQuality: 100, lossless: false })
  .toFile(outWebp);

const meta = await sharp(outPng).metadata();
const stats = await sharp(outPng).stats();
const hasAlpha = meta.hasAlpha;
console.log(`Logo transparent: ${meta.width}x${meta.height}, alpha=${hasAlpha}`);
