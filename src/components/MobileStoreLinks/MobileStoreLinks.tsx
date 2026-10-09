import { useI18n } from '../../contexts/I18nContext';
import './MobileStoreLinks.css';

export const APP_STORE_URL = 'https://apps.apple.com/fr/app/pocha-minuteur-pomodoro/id6802377633';
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.pocha.android';

export function MobileStoreLinks({ compact = false }: { compact?: boolean }) {
  const { locale } = useI18n();
  const download = locale === 'fr' ? 'Télécharger sur' : 'Download on';

  return (
    <div className={`mobile-store-links${compact ? ' mobile-store-links--compact' : ''}`} aria-label={locale === 'fr' ? 'Télécharger Pocha sur mobile' : 'Download Pocha on mobile'}>
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="mobile-store-link" aria-label={locale === 'fr' ? 'Télécharger Pocha sur l’App Store' : 'Download Pocha on the App Store'}>
        <span className="mobile-store-link__icon mobile-store-link__icon--ios" aria-hidden="true">iOS</span>
        <span><small>{download}</small><strong>App Store</strong></span>
      </a>
      <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="mobile-store-link" aria-label={locale === 'fr' ? 'Télécharger Pocha sur Google Play' : 'Download Pocha on Google Play'}>
        <span className="mobile-store-link__icon mobile-store-link__icon--play" aria-hidden="true">▶</span>
        <span><small>{download}</small><strong>Google Play</strong></span>
      </a>
    </div>
  );
}
