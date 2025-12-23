import { useI18n } from '../../contexts/I18nContext';
import './LanguageSwitcher.css';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  const toggleLanguage = () => {
    setLocale(locale === 'fr' ? 'en' : 'fr');
  };

  return (
    <button
      className="language-switcher"
      onClick={toggleLanguage}
      aria-label={locale === 'fr' ? t.components.languageSwitcher.switchToEnglish : t.components.languageSwitcher.switchToFrench}
      type="button"
    >
      <svg
        className="language-switcher__icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span className="language-switcher__text">
        {locale === 'fr' ? 'EN' : 'FR'}
      </span>
    </button>
  );
}

