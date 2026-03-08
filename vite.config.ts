import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isSSR = process.env.VITE_SSR === 'true';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        // manualChunks uniquement pour le build client (pas pour le SSR)
        ...(!isSSR && {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-motion': ['framer-motion'],
          }
        }),
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
