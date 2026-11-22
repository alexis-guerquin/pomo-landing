import { access, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const server = join(dist, 'server');
const { render, siteUrl, landingImages, pages } = await import('./dist/server/entry-server.js');
const [template, config] = await Promise.all([
  readFile(join(dist, 'index.html'), 'utf8'),
  readFile(join(root, 'vercel.json'), 'utf8').then(JSON.parse),
]);

if (!template.includes('<div id="root"></div>')) throw new Error('Relancez le build client avant le pré-rendu.');
const rewrites = new Map(config.rewrites.map(({ source, destination }) => [source, destination]));
if (rewrites.size !== pages.length - 1 || pages.some(({ url }) => url !== '/' && rewrites.get(url) !== `${url}/index.html`)) {
  throw new Error('Les réécritures Vercel doivent correspondre aux pages du site.');
}

async function renderPage(route, locale) {
  const document = await render(route);
  const head = document.match(/<head>([\s\S]*?)<\/head>/)?.[1];
  const body = document.match(/<body>([\s\S]*?)<\/body>/)?.[1];
  if (!head?.includes('<title>') || !body?.includes('<h1')) throw new Error(`Pré-rendu incomplet pour ${route}`);
  return template
    .replace('<html lang="fr">', `<html lang="${locale}">`)
    .replace('</head>', () => `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', () => body);
}

for (const { url, locale } of pages) {
  const outputDir = join(dist, url);
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, 'index.html'), await renderPage(url, locale));
  console.log(`Prérendu ${url}`);
}
await writeFile(join(dist, '404.html'), await renderPage('/404', 'fr'));

const entries = [];
for (const { url, path, locale } of pages) {
  const images = [];
  if (path === '/') {
    const { store, mobile, mac, web } = landingImages(locale);
    images.push('/assets/pocha/pocha-app-icon.png', '/assets/pocha/pocha-minuteur-pomodoro.jpg',
      ...[...store, ...mobile, mac, web].map(({ src }) => src));
  }
  await Promise.all(images.map((src) => access(join(dist, src))));
  entries.push(`  <url>\n    <loc>${siteUrl}${url}</loc>\n${images.map((src) =>
    `    <image:image><image:loc>${siteUrl}${src}</image:loc></image:image>\n`).join('')}  </url>`);
}
await writeFile(join(dist, 'sitemap.xml'), [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ...entries,
  '</urlset>',
  '',
].join('\n'));
await rm(server, { recursive: true, force: true });
