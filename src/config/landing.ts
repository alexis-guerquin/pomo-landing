import type { Locale } from '../i18n/translations';

export const siteUrl = 'https://www.pomocha.fr';
export const appIcon = '/assets/pocha/pocha-app-icon.png';
export const socialImage = `${siteUrl}/assets/pocha/pocha-minuteur-pomodoro.jpg`;

export const platforms = {
  ios: {
    fr: 'https://apps.apple.com/fr/app/id6802377633',
    en: 'https://apps.apple.com/us/app/id6802377633',
  },
  android: 'https://play.google.com/store/apps/details?id=com.pocha.android',
  mac: {
    fr: 'https://apps.apple.com/fr/app/id6802377633?platform=mac',
    en: 'https://apps.apple.com/us/app/id6802377633?platform=mac',
  },
  web: 'https://www.pomocha.io/',
  chrome: 'https://chromewebstore.google.com/detail/fcaefgilphmnhhbjjeailgnklfnhcmpc',
};

export const landingMeta = {
  fr: {
    title: 'Pocha : minuteur Pomodoro et application de concentration',
    description: 'Étudie et travaille avec Pocha, le minuteur Pomodoro au capybara. Lance des sessions, suis tes statistiques et tes séries sur iPhone, Android et le web.',
  },
  en: {
    title: 'Pocha: Pomodoro Timer and Focus App',
    description: 'Pocha is a Pomodoro timer with a capybara companion for study and work. Track focus sessions, stats, and streaks on iPhone, Android, and the web.',
  },
};

export function landingImages(locale: Locale) {
  const fr = locale === 'fr';
  return {
    store: [
      { id: 3, src: `/assets/pocha/app-store/${locale}/3.webp`, width: 400, height: 869, alt: fr ? 'Calendrier des séries et récompenses dans Pocha pour iPhone' : 'Streak calendar and rewards in Pocha for iPhone' },
      { id: 1, src: `/assets/pocha/app-store/${locale}/1.webp`, width: 400, height: 869, alt: fr ? 'Le capybara de Pocha tient un sablier, visuel officiel de l’App Store' : 'The Pocha capybara holding an hourglass, official App Store artwork' },
      { id: 6, src: `/assets/pocha/app-store/${locale}/6.webp`, width: 400, height: 869, alt: fr ? 'Widgets Pocha et statistiques de temps d’écran sur iPhone' : 'Pocha widgets and screen time statistics on iPhone' },
    ],
    mobile: [
      { src: `/assets/pocha/iphone/${locale}/focus.webp`, width: 600, height: 1304, alt: fr ? 'Minuteur Pomodoro de Pocha en cours sur iPhone' : 'Pocha Pomodoro timer running on iPhone' },
      { src: `/assets/pocha/iphone/${locale}/statistics.webp`, width: 600, height: 1304, alt: fr ? 'Graphiques du temps de concentration dans Pocha pour iPhone' : 'Focus time charts in Pocha for iPhone' },
      { src: `/assets/pocha/iphone/${locale}/collection.webp`, width: 600, height: 1304, alt: fr ? 'Collection de badges et de trophées de Pocha sur iPhone' : 'Pocha badge and trophy collection on iPhone' },
    ],
    mac: { src: `/assets/pocha/mac/build-4/${locale}/macbook-focus.webp`, width: 1440, height: 766, alt: fr ? 'Version native Mac de Pocha en préparation, avec le minuteur dans la fenêtre et l’encoche' : 'Upcoming native Pocha for Mac with the timer in its window and notch' },
    web: { src: '/assets/pocha/pocha-web-current-2026-11.webp', width: 1400, height: 715, alt: fr ? 'Interface Pocha Web avec minuteur au capybara, série et liste de tâches' : 'Pocha Web interface with a capybara timer, focus streak and to-do list' },
  };
}

export function landingSchema(locale: Locale, canonical: string) {
  const media = landingImages(locale);
  const icon = {
    '@type': 'ImageObject',
    '@id': `${siteUrl}/#app-icon`,
    contentUrl: `${siteUrl}${appIcon}`,
    width: 512,
    height: 512,
    caption: locale === 'fr' ? 'Icône officielle au capybara de l’application Pocha' : 'Official capybara app icon for Pocha',
  };
  const websiteId = `${siteUrl}/#website`;
  const appId = `${siteUrl}/#pocha-app`;
  const image = ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => ({
    '@type': 'ImageObject', contentUrl: `${siteUrl}${src}`, caption: alt, width, height,
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': websiteId, name: 'Pocha', alternateName: 'Pomocha', url: `${siteUrl}/`, inLanguage: ['fr', 'en'] },
      {
        '@type': 'WebPage', '@id': canonical, name: landingMeta[locale].title,
        url: canonical, description: landingMeta[locale].description, inLanguage: locale,
        image: [image(media.mac), image(media.web)],
        isPartOf: { '@id': websiteId }, mainEntity: { '@id': appId }, primaryImageOfPage: { '@id': icon['@id'] },
      },
      icon,
      {
        '@type': 'MobileApplication', '@id': appId, name: 'Pocha', alternateName: 'POCHA : Minuteur & Pomodoro',
        url: `${siteUrl}/`, applicationCategory: 'ProductivityApplication',
        operatingSystem: 'iOS, iPadOS, Android',
        description: landingMeta[locale].description,
        image: { '@id': icon['@id'] },
        downloadUrl: [platforms.ios[locale], platforms.android],
        sameAs: [platforms.ios.fr, platforms.android],
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
        screenshot: [...media.store, ...media.mobile].map(image),
      },
      {
        '@type': 'WebApplication', '@id': `${platforms.web}#app`, name: 'Pocha Web',
        alternateName: 'Pomocha', url: platforms.web, applicationCategory: 'ProductivityApplication',
        image: { '@id': icon['@id'] }, screenshot: image(media.web),
      },
    ],
  };
}
