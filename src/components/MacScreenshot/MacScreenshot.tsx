import { DevicePair } from '../DevicePair/DevicePair';
import { phoneForMac } from '../../config/phone-media';
import { useI18n } from '../../contexts/I18nContext';

import { macMedia, macScenes } from '../../config/mac-media';
import type { MacScene } from '../../config/mac-media';
const descriptions = {
  fr: ['Session de concentration Pocha sur Mac avec le minuteur dans l’encoche', 'Statistiques de concentration Pocha sur Mac', 'Calendrier de série et Freezes dans Pocha sur Mac', 'Collection de badges et trophées dans Pocha sur Mac', 'Fil de la communauté Pocha sur Mac', 'Réglages de Pocha sur Mac et options de l’encoche'],
  en: ['Pocha focus session on Mac with the timer in the notch', 'Pocha focus statistics on Mac', 'Pocha streak calendar and Freezes on Mac', 'Pocha badge and trophy collection on Mac', 'Pocha community feed on Mac', 'Pocha settings and notch options on Mac'],
};
export function MacScreenshot({ scene, className, priority = false, window = false, paired = true }: { scene: MacScene; className?: string; priority?: boolean; window?: boolean; paired?: boolean }) {
  const { locale } = useI18n();
  const index = scene === 'macbook-focus' ? 0 : macScenes.indexOf(scene);
  const image = <img src={macMedia(locale, scene, window)} alt={descriptions[locale][index]} className={paired ? undefined : className}
    width={window ? 640 : 1440} height={window ? 910 : scene === 'macbook-focus' ? 766 : 900}
    style={{ maxWidth: '100%', height: 'auto' }} loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : undefined} decoding="async" />;
  return paired ? <DevicePair phoneScene={phoneForMac[scene]} className={className} priority={priority}>{image}</DevicePair> : image;
}
