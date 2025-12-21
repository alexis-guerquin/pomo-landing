import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

// Plugin pour rendre le CSS non-bloquant (uniquement en mode build)
function nonBlockingCSS(): Plugin {
  return {
    name: 'non-blocking-css',
    apply: 'build', // S'exécute uniquement en mode build
    transformIndexHtml(html: string) {
      let modifiedHtml = html;
      
      // Transformer les link stylesheet en preload non-bloquant (uniquement pour les CSS générés par Vite)
      // Chercher tous les link tags avec rel="stylesheet" et un href contenant .css
      modifiedHtml = modifiedHtml.replace(
        /<link[^>]*?rel=["']stylesheet["'][^>]*?>/g,
        (match: string) => {
          // Vérifier si c'est un fichier CSS
          if (!match.includes('.css')) return match;
          
          // Extraire l'href
          const hrefMatch = match.match(/href=["']([^"']+)["']/);
          if (!hrefMatch) return match;
          
          const href = hrefMatch[1];
          
          // Ignorer les feuilles de style externes (Google Fonts, etc.)
          if (href.startsWith('http://') || href.startsWith('https://')) {
            return match;
          }
          
          // Créer le preload avec onload pour charger le CSS de manière non-bloquante
          return `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="${href}"></noscript>`;
        }
      );
      
      // Ajouter le script de fallback pour les navigateurs qui ne supportent pas onload
      const fallbackScript = `
  <script>
    /* Polyfill pour les navigateurs qui ne supportent pas onload sur les link tags */
    (function() {
      var links = document.querySelectorAll('link[rel="preload"][as="style"]');
      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (!link.onload) {
          link.rel = 'stylesheet';
        }
      }
    })();
  </script>`;
      
      modifiedHtml = modifiedHtml.replace('</head>', fallbackScript + '</head>');
      
      return modifiedHtml;
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nonBlockingCSS()
  ],
  build: {
    // Optimisation du code splitting pour réduire les chaînes de requêtes
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les grandes bibliothèques
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
        }
      }
    },
    // Augmenter la limite pour inline des assets
    assetsInlineLimit: 4096,
    // Optimisation du chunking
    chunkSizeWarningLimit: 1000,
  },
  // Optimisation des dépendances pour réduire le temps de chargement initial
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: []
  }
})
