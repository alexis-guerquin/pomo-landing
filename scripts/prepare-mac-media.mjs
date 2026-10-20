import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const require = createRequire(import.meta.url);
const sharp = process.env.POCHA_SHARP_PATH ? require(process.env.POCHA_SHARP_PATH) : require('sharp');
const source = process.argv[2];
if (!source) throw new Error('Provide the macOS build 4 app-store-assets directory.');
const destination = 'public/assets/pocha/mac/build-4';
const pages = ['01-focus', '02-statistics', '03-streak', '04-collection', '05-community', '06-settings'];
for (const locale of ['fr', 'en']) {
  const folder = path.join(destination, locale);
  await mkdir(folder, { recursive: true });
  for (const page of pages) {
    const file = path.join(source, 'mac-1.0-build-4-mockup/upload', locale, `${page}-${locale}-mockup.png`);
    await sharp(file).resize(1440).webp({ quality: 88 }).toFile(path.join(folder, `${page}.webp`));
    await sharp(path.join(source, 'mac-1.0-build-4/raw', locale, `${page}.png`)).resize(640).webp({ quality: 88 }).toFile(path.join(folder, `${page}-window.webp`));
  }
  await sharp(path.join(source, 'mac-1.0-build-4-mockup/upload', locale, `01-focus-${locale}-mockup.png`))
    .extract({ left: 200, top: 420, width: 2480, height: 1320 }).resize(1440).webp({ quality: 90 }).toFile(path.join(folder, 'macbook-focus.webp'));
}
await writeFile(path.join(destination, 'README.md'), '# POCHA Mac 1.0 (4)\n\nFrench and English media from the 2026-10-20 TestFlight captures and approved App Store mockup compositions. Screenshots show the actual app; the Notch preview is rendered from its SwiftUI components.\n\nRegenerate with `POCHA_SHARP_PATH=/path/to/sharp node scripts/prepare-mac-media.mjs /path/to/pocha-ios/app-store-assets` (Sharp required only for regeneration).\n');
console.log('26 optimized macOS WebP images exported.');
