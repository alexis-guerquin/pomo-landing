export const macScenes = ['01-focus', '02-statistics', '03-streak', '04-collection', '05-community', '06-settings'] as const;
export type MacScene = typeof macScenes[number] | 'macbook-focus';
export function macMedia(locale: 'fr' | 'en', scene: MacScene, window = false) {
  return `/assets/pocha/mac/build-4/${locale}/${scene}${window ? '-window' : ''}.webp`;
}
