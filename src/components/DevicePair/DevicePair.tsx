import type { ReactNode } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { phoneMedia } from '../../config/phone-media';
import type { PhoneScene } from '../../config/phone-media';
import './DevicePair.css';

export function PhoneScreenshot({ scene, priority = false }: { scene: PhoneScene; priority?: boolean }) {
  const { locale } = useI18n();
  const names = locale === 'fr'
    ? { focus: 'session de concentration', statistics: 'statistiques', streak: 'série', collection: 'collection', community: 'communauté', settings: 'réglages', duration: 'choix de la durée', missions: 'missions quotidiennes' }
    : { focus: 'focus session', statistics: 'statistics', streak: 'streak', collection: 'collection', community: 'community', settings: 'settings', duration: 'duration selection', missions: 'daily missions' };
  return <figure className="phone-preview">
    <div className="phone-preview__frame">
      <img src={phoneMedia(locale, scene)} alt={`Pocha iPhone — ${names[scene]}`} width="600" height="1305" loading={priority ? 'eager' : 'lazy'} decoding="async" />
    </div><figcaption>iPhone · iOS</figcaption>
  </figure>;
}
export function DevicePair({ children, phoneScene, className = '', priority = false }: { children: ReactNode; phoneScene: PhoneScene; className?: string; priority?: boolean }) {
  return <div className={`device-pair ${className}`}>
    <div className="device-pair__mac">{children}</div><PhoneScreenshot scene={phoneScene} priority={priority} />
  </div>;
}
