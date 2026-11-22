import type { Locale } from '../i18n/translations';

export const locales = ['fr', 'en'] as const;
export const publicPaths = ['/', '/contact', '/legal', '/terms', '/privacy', '/support', '/delete-account', '/community-guidelines'] as const;
export type PublicPath = typeof publicPaths[number];

export function localizedPath(path: PublicPath, locale: Locale) {
  return locale === 'fr' ? path : path === '/' ? '/en' : `/en${path}`;
}

export const pages = locales.flatMap((locale) =>
  publicPaths.map((path) => ({ locale, path, url: localizedPath(path, locale) })),
);

export function findPage(pathname: string) {
  return pages.find(({ url }) => url === (pathname.replace(/\/+$/, '') || '/'));
}
