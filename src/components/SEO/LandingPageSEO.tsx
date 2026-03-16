import { usePageMeta } from '../../hooks/usePageMeta';
import { useStructuredData } from '../../hooks/useStructuredData';
import type { StructuredData } from '../../hooks/useStructuredData';
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
    ogImage: `${BASE_URL}${SEO_CONFIG.defaultImage}`,
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
      logo: `${BASE_URL}/logo.png`,
      description: t.seo.organizationDescription,
      sameAs: [
        'https://x.com/Team_Pomocha',
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
      name: 'Pomocha',
      operatingSystem: 'Web, iOS, Android',
      applicationCategory: 'ProductivityApplication',
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
      breadcrumb: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t.components.landingPage.breadcrumbs.home,
            item: BASE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t.components.landingPage.breadcrumbs.concept,
            item: `${BASE_URL}/concept`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: t.components.landingPage.breadcrumbs.app,
            item: `${BASE_URL}/app`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: t.components.landingPage.breadcrumbs.extension,
            item: `${BASE_URL}/extension`,
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: t.components.landingPage.breadcrumbs.contact,
            item: `${BASE_URL}/contact`,
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: t.components.landingPage.breadcrumbs.legal,
            item: `${BASE_URL}/legal`,
          },
        ],
      },
    },
  ];

  useStructuredData(structuredData);

  return null;
}

