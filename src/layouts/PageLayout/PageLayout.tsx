import Navbar from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useI18n } from '../../contexts/I18nContext';
import { useLocation } from 'react-router-dom';
import './PageLayout.css';

type PageLayoutProps = {
  htmlTitle: string;
  metaDescription?: string;
  keywords?: string;
  h1: string;
  intro?: string;
  children: React.ReactNode;
};

export function PageLayout({
  htmlTitle,
  metaDescription,
  keywords,
  h1,
  intro,
  children,
}: PageLayoutProps) {
  const { locale } = useI18n();
  const location = useLocation();
  const canonicalUrl = `https://pomocha.fr${location.pathname}`;

  usePageMeta({
    title: htmlTitle,
    description: metaDescription,
    keywords,
    canonicalUrl,
    ogLocale: locale === 'fr' ? 'fr_FR' : 'en_US',
  });

  return (
    <div className="page-layout">
      <Navbar />

      <main className="page-layout__main">
        <header className="page-layout__header">
          <h1 className="page-layout__title">{h1}</h1>
          {intro ? <p className="page-layout__intro">{intro}</p> : null}
        </header>

        {children}
      </main>

      <Footer />
    </div>
  );
}
