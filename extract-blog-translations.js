import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lire le fichier translations.ts
const translationsPath = path.join(__dirname, 'src', 'i18n', 'translations.ts');
const lines = fs.readFileSync(translationsPath, 'utf8').split('\n');

// Les sections blog sont aux lignes 504-1316 (fr) et 2049-2433 (en)
const frBlogStart = 504; // Ligne avec "      blog: {"
const frBlogEnd = 1316;   // Ligne avec "      },"
const enBlogStart = 2049; // Ligne avec "      blog: {"
const enBlogEnd = 2433;   // Ligne avec "      },"

// Extraire le contenu (sans la ligne "      blog: {")
const frBlogLines = lines.slice(frBlogStart, frBlogEnd + 1);
const enBlogLines = lines.slice(enBlogStart, enBlogEnd + 1);

// Retirer l'indentation excessive (6 espaces pour blog dans pages)
const frBlogContent = frBlogLines.map((line, index) => {
  if (index === 0) {
    // Première ligne: "      blog: {" -> on garde juste le contenu
    return line.replace(/^\s*blog:\s*\{/, '').trim();
  }
  if (index === frBlogLines.length - 1) {
    // Dernière ligne: "      }," -> on retire juste la fermeture
    return line.replace(/^\s*\},?\s*$/, '');
  }
  if (line.trim() === '') return '';
  // Retirer 6 espaces au début si présents
  if (line.startsWith('        ')) {
    return line.substring(8);
  }
  return line;
}).filter(line => line !== '').join('\n');

const enBlogContent = enBlogLines.map((line, index) => {
  if (index === 0) {
    // Première ligne: "      blog: {" -> on garde juste le contenu
    return line.replace(/^\s*blog:\s*\{/, '').trim();
  }
  if (index === enBlogLines.length - 1) {
    // Dernière ligne: "      }," -> on retire juste la fermeture
    return line.replace(/^\s*\},?\s*$/, '');
  }
  if (line.trim() === '') return '';
  // Retirer 6 espaces au début si présents
  if (line.startsWith('        ')) {
    return line.substring(8);
  }
  return line;
}).filter(line => line !== '').join('\n');

// Créer le dossier blogs s'il n'existe pas
const blogsDir = path.join(__dirname, 'src', 'i18n', 'blogs');
if (!fs.existsSync(blogsDir)) {
  fs.mkdirSync(blogsDir, { recursive: true });
}

// Créer le fichier fr.ts
const frFile = `/**
 * Traductions françaises pour les articles de blog
 */

export const blogTranslations = {
${frBlogContent}
};
`;

// Créer le fichier en.ts
const enFile = `/**
 * English translations for blog articles
 */

export const blogTranslations = {
${enBlogContent}
};
`;

fs.writeFileSync(path.join(blogsDir, 'fr.ts'), frFile, 'utf8');
fs.writeFileSync(path.join(blogsDir, 'en.ts'), enFile, 'utf8');

console.log('✅ Fichiers créés avec succès !');
console.log(`- src/i18n/blogs/fr.ts (lignes ${frBlogStart} à ${frBlogEnd})`);
console.log(`- src/i18n/blogs/en.ts (lignes ${enBlogStart} à ${enBlogEnd})`);
