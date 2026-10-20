import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const require = createRequire(import.meta.url);
const sharp = process.env.POCHA_SHARP_PATH ? require(process.env.POCHA_SHARP_PATH) : require('sharp');
const [captures, community, androidGraphic] = process.argv.slice(2);
if (!captures || !community || !androidGraphic) throw new Error('Provide iOS preview captures directory, community reference screenshot, Android Play graphic.');
const scenes = { focus: 'focus', statistics: 'stats_all', streak: 'streak', collection: 'collection', settings: 'settings', duration: 'duration', missions: 'missions' };
for (const locale of ['fr', 'en']) {
 const directory = `public/assets/pocha/iphone/${locale}`;
 await mkdir(directory, { recursive: true });
 for (const [scene, source] of Object.entries(scenes)) await sharp(path.join(captures, `${source}-${locale}.png`)).resize(600).webp({quality: 88}).toFile(path.join(directory, `${scene}.webp`));
 await sharp(community).resize(600).webp({quality: 88}).toFile(path.join(directory, 'community.webp'));
}
await mkdir('public/assets/pocha/android', {recursive:true});
await sharp(androidGraphic).webp({quality:90}).toFile('public/assets/pocha/android/play-feature.webp');
await writeFile('public/assets/pocha/iphone/README.md', '# iPhone media\n\nCaptured 2026-10-20 from POCHA iOS on an isolated iPhone 17 Pro simulator using the existing POCHA_LAYOUT_PREVIEW and POCHA_LAYOUT_SCREEN flags. French and English use the real SwiftUI screens and offline preview fixtures; no user account or production backend is used. The community screenshot is the user-provided iPhone general-feed reference (English in both website locales). All images are resized to 600 px wide and encoded as WebP. The Android blog graphic comes from pocha-android/play-store-assets/feature-graphic-1024x500.png.\n');
console.log('16 iPhone media assets and Android launch graphic exported.');
