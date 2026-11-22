import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { pages, type PublicPath } from './config/routes';
import { PageLayout } from './layouts/PageLayout/PageLayout';
import LandingPage from './pages/LandingPage';
import ContactPage from './pages/contact/ContactPage';
import LegalPage from './pages/legal/LegalPage';
import TermsPage from './pages/terms/TermsPage';
import PrivacyPage from './pages/privacy/PrivacyPage';
import SupportPage from './pages/support/SupportPage';
import DeleteAccountPage from './pages/delete-account/DeleteAccountPage';
import CommunityGuidelinesPage from './pages/community-guidelines/CommunityGuidelinesPage';

const components: Record<PublicPath, React.ComponentType> = {
  '/': LandingPage,
  '/contact': ContactPage,
  '/legal': LegalPage,
  '/terms': TermsPage,
  '/privacy': PrivacyPage,
  '/support': SupportPage,
  '/delete-account': DeleteAccountPage,
  '/community-guidelines': CommunityGuidelinesPage,
};

function NotFound() {
  return (
    <PageLayout htmlTitle="Page introuvable | Pocha" h1="Page introuvable">
      <p><Link to="/">Retour à l’accueil</Link></p>
    </PageLayout>
  );
}

export default function App() {
  const { hash } = useLocation();

  return (
    <>
      <ScrollToTop />
      <Routes>
        {pages.map(({ url, path }) => {
          const Page = components[path];
          return <Route key={url} path={url} element={<Page />} />;
        })}
        <Route path="/app" element={<Navigate to={`/${hash}`} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
