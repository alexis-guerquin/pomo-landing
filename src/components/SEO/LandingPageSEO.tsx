import { usePageMeta } from '../../hooks/usePageMeta';
import { useStructuredData } from '../../hooks/useStructuredData';
import type { StructuredData } from '../../hooks/useStructuredData';
import { SEO_CONFIG } from '../../config/seo.config';
import { useI18n } from '../../contexts/I18nContext';

const BASE_URL = SEO_CONFIG.baseUrl;

export function LandingPageSEO() {
  const { t } = useI18n();
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
        'https://www.reddit.com/r/pomocha/',
      ],
    },

    // Website Schema avec SearchAction pour la barre de recherche Google
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Pomocha',
      url: BASE_URL,
      description: t.seo.defaultDescription,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
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
            name: t.components.landingPage.breadcrumbs.about,
            item: `${BASE_URL}#about`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: t.components.landingPage.breadcrumbs.features,
            item: `${BASE_URL}#features`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: t.components.landingPage.breadcrumbs.pomodoroTimer,
            item: `${BASE_URL}/features/pomodoro-timer`,
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: t.components.landingPage.breadcrumbs.rewards,
            item: `${BASE_URL}/features/rewards-system`,
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: t.components.landingPage.breadcrumbs.statistics,
            item: `${BASE_URL}/features/statistics`,
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: t.components.landingPage.breadcrumbs.students,
            item: `${BASE_URL}/use-cases/students`,
          },
          {
            '@type': 'ListItem',
            position: 8,
            name: t.components.landingPage.breadcrumbs.freelancers,
            item: `${BASE_URL}/use-cases/freelancers`,
          },
        ],
      },
    },
  ];

  useStructuredData(structuredData);

  return null;
}

