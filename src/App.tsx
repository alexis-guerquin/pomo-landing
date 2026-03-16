import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import ScrollToTop from './components/ScrollToTop';

// Lazy loading des pages pour optimiser le LCP
const LandingPage = lazy(() => import('./pages/LandingPage'));
const PomodoroTimerPage = lazy(() => import('./pages/features/PomodoroTimerPage'));
const MotivationRewardsPage = lazy(() => import('./pages/features/MotivationRewardsPage'));
const FocusStatisticsPage = lazy(() => import('./pages/features/FocusStatisticsPage'));
const StudentsPage = lazy(() => import('./pages/use-cases/StudentsPage'));
const FreelancersPage = lazy(() => import('./pages/use-cases/FreelancersPage'));
const AboutPage = lazy(() => import('./pages/about/AboutPage'));
const ConceptPage = lazy(() => import('./pages/concept/ConceptPage'));
const AppPage = lazy(() => import('./pages/app/AppPage'));
const ExtensionPage = lazy(() => import('./pages/extension/ExtensionPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const LegalPage = lazy(() => import('./pages/legal/LegalPage'));
const BlogPage = lazy(() => import('./pages/blog/BlogPage'));
const ArticlePage = lazy(() => import('./pages/blog/ArticlePage'));

// Composant de fallback pour le chargement
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'var(--theme-surface)'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '4px solid rgba(255, 255, 255, 0.3)',
      borderTop: '4px solid #fff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  </div>
);

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features/pomodoro-timer" element={<PomodoroTimerPage />} />
          <Route path="/features/rewards-system" element={<MotivationRewardsPage />} />
          <Route path="/features/statistics" element={<FocusStatisticsPage />} />

          <Route path="/use-cases/students" element={<StudentsPage />} />
          <Route path="/use-cases/freelancers" element={<FreelancersPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/concept" element={<ConceptPage />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/extension" element={<ExtensionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
        </Routes>
      </Suspense>
      <Analytics />
    </>
  );
}