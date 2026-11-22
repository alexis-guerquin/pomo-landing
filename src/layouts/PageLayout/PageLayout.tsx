import { SiteFooter, SiteHeader } from '../../components/SiteChrome/SiteChrome';
import PageMetadata from '../../components/SEO/PageMetadata';
import './PageLayout.css';

type PageLayoutProps = {
  htmlTitle: string;
  metaDescription?: string;
  h1: string;
  intro?: string;
  children: React.ReactNode;
};

export function PageLayout({
  htmlTitle,
  metaDescription,
  h1,
  intro,
  children,
}: PageLayoutProps) {
  return (
    <div className="page-layout">
      <PageMetadata title={htmlTitle} description={metaDescription} />
      <SiteHeader />

      <main className="page-layout__main">
        <header className="page-layout__header">
          <h1 className="page-layout__title">{h1}</h1>
          {intro ? <p className="page-layout__intro">{intro}</p> : null}
        </header>

        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
