const fs = require('fs');
const path = require('path');

// Lire les fichiers
const enContent = fs.readFileSync('src/i18n/blogs/en.ts', 'utf8');
const frContent = fs.readFileSync('src/i18n/blogs/fr.ts', 'utf8');

// Fonction pour extraire un article
function extractArticle(content, articleKey) {
  const startPattern = new RegExp(`\\s+${articleKey}:\\s*\\{`);
  const startMatch = content.match(startPattern);
  if (!startMatch) return null;
  
  const startIdx = startMatch.index + startMatch[0].indexOf('{');
  let depth = 0;
  let inString = false;
  let escapeNext = false;
  let i = startIdx;
  
  while (i < content.length) {
    const char = content[i];
    
    if (escapeNext) {
      escapeNext = false;
      i++;
      continue;
    }
    
    if (char === '\\') {
      escapeNext = true;
      i++;
      continue;
    }
    
    if (char === '"' && !escapeNext) {
      inString = !inString;
    }
    
    if (!inString) {
      if (char === '{') depth++;
      if (char === '}') {
        depth--;
        if (depth === 0) {
          return content.substring(startIdx, i + 1);
        }
      }
    }
    
    i++;
  }
  
  return null;
}

// Extraire les articles
const bestPomodoroAppsEn = extractArticle(enContent, 'bestPomodoroApps');
const bestPomodoroAppsFr = extractArticle(frContent, 'bestPomodoroApps');
const bestPomodoroOnlineEn = extractArticle(enContent, 'bestPomodoroOnline');
const bestPomodoroOnlineFr = extractArticle(frContent, 'bestPomodoroOnline');

// Créer les dossiers
const dirs = [
  'src/i18n/blogs/bestPomodoroApps',
  'src/i18n/blogs/bestPomodoroOnline'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Créer les fichiers
fs.writeFileSync(
  'src/i18n/blogs/bestPomodoroApps/en.ts',
  `/**
 * English translations for bestPomodoroApps article
 */

export const bestPomodoroApps = ${bestPomodoroAppsEn};
`
);

fs.writeFileSync(
  'src/i18n/blogs/bestPomodoroApps/fr.ts',
  `/**
 * Traductions françaises pour l'article bestPomodoroApps
 */

export const bestPomodoroApps = ${bestPomodoroAppsFr};
`
);

fs.writeFileSync(
  'src/i18n/blogs/bestPomodoroOnline/en.ts',
  `/**
 * English translations for bestPomodoroOnline article
 */

export const bestPomodoroOnline = ${bestPomodoroOnlineEn};
`
);

fs.writeFileSync(
  'src/i18n/blogs/bestPomodoroOnline/fr.ts',
  `/**
 * Traductions françaises pour l'article bestPomodoroOnline
 */

export const bestPomodoroOnline = ${bestPomodoroOnlineFr};
`
);

console.log('Fichiers de traduction créés avec succès!');

