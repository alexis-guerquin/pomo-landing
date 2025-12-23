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

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Récupérer la langue depuis localStorage ou détecter depuis le navigateur
    const saved = localStorage.getItem(STORAGE_KEY) as Locale;
    if (saved && (saved === 'fr' || saved === 'en')) {
      return saved;
    }
    
    // Détection automatique de la langue du navigateur
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'fr' ? 'fr' : 'en';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    // Mettre à jour l'attribut lang du HTML
    document.documentElement.lang = newLocale;
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

