import { Link, useLocation } from 'react-router-dom';
import { findPage, localizedPath } from '../../config/routes';
import { useI18n } from '../../contexts/I18nContext';
import './SiteChrome.css';

export function SiteHeader() {
  const { locale } = useI18n();
  const { pathname, hash, search } = useLocation();
  const page = findPage(pathname);
  const nextLocale = locale === 'fr' ? 'en' : 'fr';

  return (
    <header className="site-header">
      <Link className="site-brand" to={localizedPath('/', locale)} aria-label={locale === 'fr' ? 'Pocha, accueil' : 'Pocha, home'}>
        <img src="/pocha-favicon.png" width="42" height="42" alt={locale === 'fr' ? 'Icône officielle de Pocha, le capybara' : 'Official Pocha capybara app icon'} />
        Pocha<span>.</span>
      </Link>
      <Link className="site-language" lang={nextLocale} hrefLang={nextLocale} to={`${localizedPath(page?.path ?? '/', nextLocale)}${search}${hash}`}>
        {nextLocale === 'en' ? 'English' : 'Français'}
      </Link>
    </header>
  );
}

export function SiteFooter() {
  const { locale } = useI18n();
  const fr = locale === 'fr';

  return (
    <footer className="site-footer">
      <span className="site-footer__brand">Pocha.</span>
      <nav aria-label={fr ? 'Informations légales et contact' : 'Legal and contact information'}>
        <Link to={localizedPath('/contact', locale)}>Contact</Link>
        <Link to={localizedPath('/legal', locale)}>{fr ? 'Mentions légales' : 'Legal notice'}</Link>
        <Link to={localizedPath('/terms', locale)}>{fr ? 'Conditions' : 'Terms'}</Link>
        <Link to={localizedPath('/privacy', locale)}>{fr ? 'Confidentialité' : 'Privacy'}</Link>
      </nav>
    </footer>
  );
}
