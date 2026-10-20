import type { MacScene } from './mac-media';
export type PhoneScene = 'focus' | 'statistics' | 'streak' | 'collection' | 'community' | 'settings' | 'duration' | 'missions';
export const phoneForMac: Record<MacScene, PhoneScene> = {
  '01-focus': 'focus', 'macbook-focus': 'focus', '02-statistics': 'statistics', '03-streak': 'streak',
  '04-collection': 'collection', '05-community': 'community', '06-settings': 'settings',
};
export function phoneMedia(locale: 'fr' | 'en', scene: PhoneScene) {
  return `/assets/pocha/iphone/${locale}/${scene}.webp`;
}
