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

// Toutes les routes publiques à pré-rendre
const routes = [
  '/',
  '/features/pomodoro-timer',
  '/features/rewards-system',
  '/features/statistics',
  '/use-cases/students',
  '/use-cases/freelancers',
  '/concept',
  '/app',
  '/extension',
  '/contact',
  '/legal',
  '/about',
  '/blog',
  '/blog/meilleur-pomodoro-en-ligne-2026',
  '/blog/technique-pomodoro-productivite',
  '/blog/application-pomodoro-gamifiee',
  '/blog/pomodoro-etudiant-freelance',
  '/blog/nouveautes-pomocha-mars-2026',
  '/blog/extension-chrome-pomodoro-pomocha',
];

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

  // Sauvegarder le template original avant toute modification
  const backupPath = path.join(distDir, '_template.html');
  fs.writeFileSync(backupPath, rawTemplate);

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
      const html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

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
}

prerender().catch((err) => {
  console.error('Erreur fatale :', err);
  process.exit(1);
});
