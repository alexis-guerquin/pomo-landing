import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { findPage } from '../config/routes';
import { translations, type Locale } from '../i18n/translations';

const I18nContext = createContext<{ locale: Locale; t: typeof translations.fr } | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const locale = findPage(pathname)?.locale ?? 'fr';

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <I18nContext.Provider value={{ locale, t: translations[locale] }}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within an I18nProvider');
  return context;
}
