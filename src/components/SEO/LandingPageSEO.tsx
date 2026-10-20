import { usePageMeta } from '../../hooks/usePageMeta';
import { useStructuredData } from '../../hooks/useStructuredData';
import type { StructuredData } from '../../hooks/useStructuredData';
import { macMedia } from '../../config/mac-media';
import { SEO_CONFIG } from '../../config/seo.config';
import { useI18n } from '../../contexts/I18nContext';

const BASE_URL = SEO_CONFIG.baseUrl;

export function LandingPageSEO() {
  const { t, locale } = useI18n();
  const homeSEO = t.seo.pages.home;

  // Meta tags optimisés pour Google
  usePageMeta({
    title: homeSEO.title,
    description: homeSEO.description,
    keywords: homeSEO.keywords.join(', '),
    canonicalUrl: BASE_URL,
    ogTitle: homeSEO.title,
    ogDescription: homeSEO.description,
    ogImage: `${BASE_URL}${macMedia(locale, '01-focus')}`,
    twitterImage: `${BASE_URL}${macMedia(locale, '01-focus')}`,
    ogUrl: BASE_URL,
    ogType: 'website',
    ogLocale: locale === 'fr' ? 'fr_FR' : 'en_US',
    twitterCard: 'summary_large_image',
    twitterTitle: homeSEO.title,
    twitterDescription: homeSEO.description,
  });

  // Données structurées pour les rich snippets Google
  const structuredData: StructuredData[] = [
    // Organization Schema
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Pomocha',
      url: BASE_URL,
      logo: `${BASE_URL}/break-ic.svg`,
      description: t.seo.organizationDescription,
      sameAs: [
        'https://x.com/Team_Pomocha',
        'https://apps.apple.com/fr/app/pocha-minuteur-pomodoro/id6802377633',
        'https://play.google.com/store/apps/details?id=com.pocha.android',
      ],
    },

    // Website Schema with SearchAction
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Pomocha',
      url: BASE_URL,
      description: t.seo.defaultDescription,
    },

    // SiteNavigationElement Schema — helps Google identify sitelinks
    {
      '@context': 'https://schema.org',
      '@type': 'SiteNavigationElement',
      name: [
        t.components.landingPage.breadcrumbs.concept,
        t.components.landingPage.breadcrumbs.app,
        t.components.landingPage.breadcrumbs.extension,
        t.components.landingPage.breadcrumbs.contact,
        t.components.landingPage.breadcrumbs.legal,
      ],
      url: [
        `${BASE_URL}/concept`,
        `${BASE_URL}/app`,
        `${BASE_URL}/extension`,
        `${BASE_URL}/contact`,
        `${BASE_URL}/legal`,
      ],
    },

    // SoftwareApplication Schema
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Pocha',
      operatingSystem: 'macOS, iOS, iPadOS, Android',
      applicationCategory: 'ProductivityApplication',
      url: `${BASE_URL}/app`,
      downloadUrl: 'https://apps.apple.com/fr/app/pocha-minuteur-pomodoro/id6802377633',
      sameAs: ['https://play.google.com/store/apps/details?id=com.pocha.android'],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
      },
    },

    // Service Schema
    {
      '@context': 'https://schema.org/',
      '@type': 'Service',
      name: 'pomocha',
      description: 'pomocha est une application de pomodoro gamifié, gestion de projets et développement personnel.',
      provider: {
        '@type': 'Organization',
        name: 'pomocha',
      },
      url: 'https://www.pomocha.fr/',
    },

    // WebPage Schema avec les sitelinks
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: homeSEO.title,
      url: BASE_URL,
      description: homeSEO.description,
      isPartOf: {
        '@type': 'WebSite',
        url: BASE_URL,
      },
    },
  ];

  useStructuredData(structuredData);

  return null;
}
