import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
