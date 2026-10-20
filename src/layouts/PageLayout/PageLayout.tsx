import Navbar from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useI18n } from '../../contexts/I18nContext';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG } from '../../config/seo.config';
import './PageLayout.css';

const BASE_FR = 'https://www.pomocha.fr';

type PageLayoutProps = {
  htmlTitle: string;
  metaDescription?: string;
  keywords?: string;
  h1: string;
  intro?: string;
  ogImage?: string;
  ogType?: string;
  children: React.ReactNode;
};

export function PageLayout({
  htmlTitle,
  metaDescription,
  keywords,
  h1,
  intro,
  ogImage,
  ogType,
  children,
}: PageLayoutProps) {
  const { locale } = useI18n();
  const location = useLocation();
  const canonicalUrl = `${BASE_FR}${location.pathname}`;
  const socialImage = ogImage ?? `${BASE_FR}${SEO_CONFIG.defaultImage}`;

  usePageMeta({
    title: htmlTitle,
    description: metaDescription,
    keywords,
    canonicalUrl,
    ogUrl: canonicalUrl,
    ogType,
    ogImage: socialImage,
    twitterImage: socialImage,
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
