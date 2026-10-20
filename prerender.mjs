/**
 * Script de pré-rendu statique pour Pomocha Landing
 *
 * Génère des fichiers HTML statiques pour chaque route,
 * permettant à Google de crawler le contenu sans exécuter du JS.
 *
 * Usage : node prerender.mjs
 * (lancé automatiquement après `npm run build`)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, 'dist');
const templatePath = path.join(distDir, 'index.html');

const siteUrl = 'https://www.pomocha.fr';
const sitemap = fs.readFileSync(path.join(__dirname, 'public', 'sitemap.xml'), 'utf8');
// Une seule source de vérité pour les URL indexables et les pages pré-rendues.
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1].replace(siteUrl, '') || '/');
const vercelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8'));
const rewrittenRoutes = new Set(vercelConfig.rewrites.map(({ source }) => source));
if (routes.length !== new Set(routes).size || routes.some((route) => route !== '/' && !rewrittenRoutes.has(route))) {
  throw new Error('Le sitemap et les routes Vercel doivent contenir les mêmes URL publiques.');
}

function plainText(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}

function escapeAttribute(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function pageTemplate(template, content, route) {
  const titleText = plainText(content.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] || 'Pomocha');
  const intro = plainText(content.match(/<p\b[^>]*class="(?:page-layout__intro|hero-description)"[^>]*>([\s\S]*?)<\/p>/)?.[1] || '');
  const title = route === '/' ? 'Pocha sur Mac, iPhone et Android | Pomocha Pomodoro sur le web'
    : route === '/app' ? 'Pocha sur Mac, iPhone et Android | Application Pomodoro Pomocha'
      : `${titleText} | Pomocha`;
  const description = route === '/' ? 'Découvrez Pocha sur Mac, iPhone et Android : sessions de focus, minuteur dans l’encoche, séries et statistiques. Pomocha est aussi disponible sur le web.'
    : intro || 'Découvrez Pomocha, le minuteur Pomodoro gamifié et ses outils pour rester concentré.';
  if (!content.includes('<h1')) throw new Error(`Aucun H1 pré-rendu pour ${route}`);
  const canonical = `${siteUrl}${route === '/' ? '/' : route}`;
  let html = template.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttribute(title)}</title>`);
  const meta = [
    ['name', 'description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:url', canonical],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:url', canonical],
  ];
  if (route === '/app') {
    const image = `${siteUrl}/assets/pocha/mac/macbook-notch.webp`;
    meta.push(['property', 'og:image', image], ['name', 'twitter:image', image]);
  }
  for (const [attribute, name, value] of meta) {
    const pattern = new RegExp(`(<meta ${attribute}="${name}" content=")[^"]*(">)`);
    html = html.replace(pattern, `$1${escapeAttribute(value)}$2`);
  }
  html = html.replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${canonical}$2`);
  if (route === '/' || route === '/app') {
    const schema = {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Pocha',
      applicationCategory: 'ProductivityApplication', operatingSystem: 'iOS, Android',
      url: `${siteUrl}/app`,
      downloadUrl: 'https://apps.apple.com/fr/app/pocha-minuteur-pomodoro/id6802377633',
      sameAs: ['https://play.google.com/store/apps/details?id=com.pocha.android'],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    };
    html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`);
  }
  if (route === '/app') {
    const video = {
      '@context': 'https://schema.org', '@type': 'VideoObject',
      name: 'Pocha mobile : démonstration de l’application Pomodoro',
      description: 'Découvrez le minuteur, les séries, les statistiques et les récompenses de Pocha sur iPhone.',
      thumbnailUrl: `${siteUrl}/assets/pocha/mobile/focus-session.webp`,
      uploadDate: '2026-10-09T21:11:00Z',
      duration: 'PT1M12S',
      contentUrl: `${siteUrl}/assets/pocha/mobile/pocha-demo.mp4`,
    };
    html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(video)}</script></head>`);
  }
  if (route === '/') {
    html = html.replace('</head>', '<link rel="preload" as="image" href="/assets/Home-desktop.png" fetchpriority="high" media="(min-width: 769px)"><link rel="preload" as="image" href="/assets/pocha/mobile/focus-session.webp" fetchpriority="high" media="(max-width: 768px)"></head>');
  }
  return html;
}

async function prerender() {
  console.log('🚀 Démarrage du pré-rendu statique...\n');

  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html introuvable. Lancez d\'abord `npm run build`.');
    process.exit(1);
  }

  const rawTemplate = fs.readFileSync(templatePath, 'utf-8');

  // S'assurer que le template contient le placeholder — sinon il a déjà été prérendu
  if (!rawTemplate.includes('<div id="root"></div>')) {
    console.error('❌ dist/index.html ne contient plus le placeholder <div id="root"></div>.');
    console.error('   Relancez `npm run build:client` pour regénérer un template propre.');
    process.exit(1);
  }

  const template = rawTemplate;

  // Importer le bundle serveur compilé par Vite SSR
  const serverEntryPath = path.join(distDir, 'server', 'entry-server.js');
  if (!fs.existsSync(serverEntryPath)) {
    console.error('❌ Bundle serveur introuvable. Vérifiez la config Vite SSR.');
    process.exit(1);
  }

  const { render } = await import(serverEntryPath);

  let successCount = 0;
  let errorCount = 0;

  for (const route of routes) {
    try {
      // Générer le HTML de la route (render est async avec renderToPipeableStream)
      const appHtml = await render(route);

      // Injecter dans le template
      const html = pageTemplate(template, appHtml, route);

      // Déterminer le chemin de sortie
      const outputDir = route === '/'
        ? distDir
        : path.join(distDir, route.slice(1));

      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(path.join(outputDir, 'index.html'), html);

      console.log(`✅ ${route}`);
      successCount++;
    } catch (err) {
      console.error(`❌ ${route} — ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Résultat : ${successCount} page(s) générée(s), ${errorCount} erreur(s).`);
  // Le bundle serveur sert uniquement à générer les pages, pas à être publié.
  fs.rmSync(path.join(distDir, 'server'), { recursive: true, force: true });
  if (errorCount) process.exitCode = 1;
}

prerender().catch((err) => {
  console.error('Erreur fatale :', err);
  process.exit(1);
});
