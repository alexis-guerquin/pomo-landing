import { useEffect } from 'react';

export type StructuredData = 
  | OrganizationSchema
  | WebSiteSchema
  | WebPageSchema
  | BreadcrumbSchema
  | SoftwareApplicationSchema;

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

export interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    '@type': string;
    target: string;
    'query-input': string;
  };
}

export interface WebPageSchema {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  name: string;
  url: string;
  description?: string;
  isPartOf?: {
    '@type': 'WebSite';
    url: string;
  };
  breadcrumb?: BreadcrumbSchema;
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface SoftwareApplicationSchema {
  '@context': 'https://schema.org';
  '@type': 'SoftwareApplication';
  name: string;
  operatingSystem: string;
  applicationCategory: string;
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    ratingCount: string;
  };
}

/**
 * Hook pour injecter des données structurées JSON-LD dans le head
 * Ces données aident Google à comprendre votre contenu et à afficher des rich snippets
 */
export function useStructuredData(data: StructuredData | StructuredData[]) {
  useEffect(() => {
    const dataArray = Array.isArray(data) ? data : [data];
    const scriptElements: HTMLScriptElement[] = [];

    dataArray.forEach((structuredData, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${index}`;
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
      scriptElements.push(script);
    });

    return () => {
      scriptElements.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [data]);
}

