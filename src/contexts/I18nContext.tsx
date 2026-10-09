import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { translations } from '../i18n/translations';
import type { Locale } from '../i18n/translations';

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations.fr;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'pomocha-locale';
const isServer = typeof window === 'undefined';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Le HTML pré-rendu de pomocha.fr est français : même état au premier rendu.
    return 'fr';
  });

  useEffect(() => {
    if (isServer) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== 'en') return;
    const timer = window.setTimeout(() => setLocaleState('en'), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (!isServer) {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    }
  };

  useEffect(() => {
    // Mettre à jour l'attribut lang du HTML au chargement
    document.documentElement.lang = locale;
  }, [locale]);

  const value: I18nContextType = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
