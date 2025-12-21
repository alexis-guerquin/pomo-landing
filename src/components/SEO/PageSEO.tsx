import { usePageMeta } from '../../hooks/usePageMeta';
import { useStructuredData } from '../../hooks/useStructuredData';
import type { WebPageSchema, BreadcrumbSchema } from '../../hooks/useStructuredData';
import { SEO_CONFIG } from '../../config/seo.config';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  ogImage?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

/**
 * Composant SEO réutilisable pour toutes les pages
 * Gère automatiquement les meta tags et les données structurées
 */
export function PageSEO({
  title,
  description,
  keywords = SEO_CONFIG.defaultKeywords,
  path,
  ogImage = SEO_CONFIG.defaultImage,
  breadcrumbs = [],
}: PageSEOProps) {
  const fullUrl = `${SEO_CONFIG.baseUrl}${path}`;
  const fullImageUrl = ogImage.startsWith('http') 
    ? ogImage 
    : `${SEO_CONFIG.baseUrl}${ogImage}`;

  // Meta tags
  usePageMeta({
    title,
    description,
    keywords: keywords.join(', '),
    canonicalUrl: fullUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: fullImageUrl,
    ogUrl: fullUrl,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: fullImageUrl,
  });

  // Données structurées
  const webPageSchema: WebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url: fullUrl,
    description,
    isPartOf: {
      '@type': 'WebSite',
      url: SEO_CONFIG.baseUrl,
    },
  };

  // Ajouter le breadcrumb si fourni
  if (breadcrumbs.length > 0) {
    const breadcrumbSchema: BreadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
    
    webPageSchema.breadcrumb = breadcrumbSchema;
  }

  useStructuredData(webPageSchema);

  return null;
}

