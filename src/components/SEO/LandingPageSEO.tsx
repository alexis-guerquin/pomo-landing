import { usePageMeta } from '../../hooks/usePageMeta';
import { useStructuredData } from '../../hooks/useStructuredData';
import type { StructuredData } from '../../hooks/useStructuredData';
import { SEO_CONFIG, PAGE_SEO } from '../../config/seo.config';

const BASE_URL = SEO_CONFIG.baseUrl;

export function LandingPageSEO() {
  const homeSEO = PAGE_SEO.home;

  // Meta tags optimisés pour Google
  usePageMeta({
    title: homeSEO.title,
    description: homeSEO.description,
    keywords: homeSEO.keywords.join(', '),
    canonicalUrl: BASE_URL,
    ogTitle: 'Pomocha – App Pomodoro gamifiée pour rester focus et productif',
    ogDescription:
      'Minuteur Pomodoro avec système de récompenses, missions quotidiennes et statistiques détaillées. Transformez votre concentration en progression mesurable.',
    ogImage: `${BASE_URL}${SEO_CONFIG.defaultImage}`,
    ogUrl: BASE_URL,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Pomocha – La meilleure app Pomodoro gamifiée',
    twitterDescription:
      'Restez concentré avec des sessions Pomodoro, débloquez des badges et suivez votre progression. L\'app qui rend le focus addictif.',
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
      description:
        'Application de minuteur Pomodoro avec gamification et statistiques pour améliorer la productivité et la concentration',
      sameAs: [
        // Ajoutez vos réseaux sociaux ici
        // 'https://twitter.com/pomocha',
        // 'https://facebook.com/pomocha',
      ],
    },

    // Website Schema avec SearchAction pour la barre de recherche Google
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Pomocha',
      url: BASE_URL,
      description:
        'Application Pomodoro avec récompenses et statistiques pour transformer votre concentration en progression',
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
      name: 'Pomocha – App Pomodoro avec récompenses et statistiques',
      url: BASE_URL,
      description:
        'Transformez votre concentration en progression avec Pomocha : minuteur Pomodoro, missions quotidiennes, badges, trophées et statistiques de focus.',
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
            name: 'Accueil',
            item: BASE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'À propos',
            item: `${BASE_URL}#about`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Fonctionnalités',
            item: `${BASE_URL}#features`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Minuteur Pomodoro',
            item: `${BASE_URL}/features/pomodoro-timer`,
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Récompenses & Motivation',
            item: `${BASE_URL}/features/rewards-system`,
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: 'Statistiques de Focus',
            item: `${BASE_URL}/features/statistics`,
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: 'Pour les étudiants',
            item: `${BASE_URL}/use-cases/students`,
          },
          {
            '@type': 'ListItem',
            position: 8,
            name: 'Pour les freelances',
            item: `${BASE_URL}/use-cases/freelancers`,
          },
        ],
      },
    },
  ];

  useStructuredData(structuredData);

  return null;
}

