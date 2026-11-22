import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const require = createRequire(import.meta.url);
const sharp = process.env.POCHA_SHARP_PATH ? require(process.env.POCHA_SHARP_PATH) : require('sharp');
const [captures] = process.argv.slice(2);
if (!captures) throw new Error('Provide iOS preview captures directory.');
const scenes = { focus: 'focus', statistics: 'stats_all', collection: 'collection' };
for (const locale of ['fr', 'en']) {
 const directory = `public/assets/pocha/iphone/${locale}`;
 await mkdir(directory, { recursive: true });
 for (const [scene, source] of Object.entries(scenes)) await sharp(path.join(captures, `${source}-${locale}.png`)).resize(600).webp({quality: 88}).toFile(path.join(directory, `${scene}.webp`));
}
await writeFile('public/assets/pocha/iphone/README.md', '# iPhone media\n\nCaptured 2026-10-20 from POCHA iOS on an isolated iPhone 17 Pro simulator using the existing POCHA_LAYOUT_PREVIEW and POCHA_LAYOUT_SCREEN flags. French and English use the real SwiftUI screens and offline preview fixtures; no user account or production backend is used. All images are resized to 600 px wide and encoded as WebP.\n');
console.log('6 iPhone screenshots exported.');
