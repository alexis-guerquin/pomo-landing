import { useLocation } from 'react-router-dom';
import { siteUrl, socialImage } from '../../config/landing';
import { findPage, localizedPath } from '../../config/routes';

export default function PageMetadata({ title, description }: { title: string; description?: string }) {
  const { pathname } = useLocation();
  const page = findPage(pathname);
  if (!page) return <><title>{title}</title><meta name="robots" content="noindex" /></>;

  const canonical = `${siteUrl}${page.url}`;

  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}${localizedPath(page.path, 'fr')}`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}${localizedPath(page.path, 'en')}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${localizedPath(page.path, 'fr')}`} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Pocha" />
      <meta property="og:locale" content={page.locale === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={page.locale === 'fr'
        ? 'Icône officielle de Pocha, le minuteur Pomodoro au capybara'
        : 'Official Pocha app icon, a capybara for the Pomodoro timer'} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
