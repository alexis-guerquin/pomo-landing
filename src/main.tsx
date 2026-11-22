import { StrictMode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from './contexts/I18nContext'

const rootElement = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <App />
        <Analytics />
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>
);

// Hydrater si du HTML pré-rendu est présent, sinon monter normalement
if (rootElement.innerHTML.trim() !== '') {
  hydrateRoot(rootElement, app, {
    onRecoverableError(error, info) {
      console.error('Hydration Pomocha:', error, info.componentStack);
    },
  });
} else {
  createRoot(rootElement).render(app);
}
