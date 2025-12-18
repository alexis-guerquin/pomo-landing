import './App.css';
import { Route, Routes } from 'react-router-dom';
import {
  AboutPage,
  FocusStatisticsPage,
  FreelancersPage,
  LandingPage,
  MotivationRewardsPage,
  PomodoroTimerPage,
  StudentsPage,
} from './pages';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/features/pomodoro-timer" element={<PomodoroTimerPage />} />
      <Route path="/features/rewards-system" element={<MotivationRewardsPage />} />
      <Route path="/features/statistics" element={<FocusStatisticsPage />} />

      <Route path="/use-cases/students" element={<StudentsPage />} />
      <Route path="/use-cases/freelancers" element={<FreelancersPage />} />

      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}