import Navbar from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer';
import { usePageMeta } from '../../hooks/usePageMeta';
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
  usePageMeta({ title: htmlTitle, description: metaDescription });

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
