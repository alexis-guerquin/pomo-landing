/**
 * Version de App.tsx pour le SSR — imports statiques (pas de lazy/Suspense)
 * Utilisé uniquement par src/entry-server.tsx lors du build SSR.
 */
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

import LandingPage from './pages/LandingPage';
import PomodoroTimerPage from './pages/features/PomodoroTimerPage';
import MotivationRewardsPage from './pages/features/MotivationRewardsPage';
import FocusStatisticsPage from './pages/features/FocusStatisticsPage';
import StudentsPage from './pages/use-cases/StudentsPage';
import FreelancersPage from './pages/use-cases/FreelancersPage';
import AboutPage from './pages/about/AboutPage';
import BlogPage from './pages/blog/BlogPage';
import ArticlePage from './pages/blog/ArticlePage';

export default function AppSSR() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features/pomodoro-timer" element={<PomodoroTimerPage />} />
        <Route path="/features/rewards-system" element={<MotivationRewardsPage />} />
        <Route path="/features/statistics" element={<FocusStatisticsPage />} />
        <Route path="/use-cases/students" element={<StudentsPage />} />
        <Route path="/use-cases/freelancers" element={<FreelancersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
      </Routes>
    </>
  );
}
