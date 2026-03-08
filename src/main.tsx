import { StrictMode } from 'react'
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
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>
);

// Hydrater si du HTML pré-rendu est présent, sinon monter normalement
if (rootElement.innerHTML.trim() !== '') {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}

// Enable CSS transitions after first paint to prevent flash on initial load
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.documentElement.classList.add('transitions-ready');
  });
});
