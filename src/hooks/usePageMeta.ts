import { useEffect } from 'react';

export type PageMeta = {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  keywords?: string;
  canonicalUrl?: string;
};

function upsertMeta(attribute: 'name' | 'property', value: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}=\"${value}\"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let tag = document.querySelector<HTMLLinkElement>(`link[rel=\"${rel}\"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = meta.title;

    // Meta description
    if (meta.description) {
      upsertMeta('name', 'description', meta.description);
    }

    // Keywords
    if (meta.keywords) {
      upsertMeta('name', 'keywords', meta.keywords);
    }

    // Canonical URL
    if (meta.canonicalUrl) {
      upsertLink('canonical', meta.canonicalUrl);
    }

    // Open Graph
    upsertMeta('property', 'og:title', meta.ogTitle || meta.title);
    if (meta.ogDescription || meta.description) {
      upsertMeta('property', 'og:description', meta.ogDescription || meta.description || '');
    }
    if (meta.ogImage) {
      upsertMeta('property', 'og:image', meta.ogImage);
    }
    if (meta.ogUrl) {
      upsertMeta('property', 'og:url', meta.ogUrl);
    }
    upsertMeta('property', 'og:type', meta.ogType || 'website');
    upsertMeta('property', 'og:site_name', 'Pomocha');
    upsertMeta('property', 'og:locale', 'fr_FR');

    // Twitter Card
    upsertMeta('name', 'twitter:card', meta.twitterCard || 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.twitterTitle || meta.ogTitle || meta.title);
    if (meta.twitterDescription || meta.ogDescription || meta.description) {
      upsertMeta('name', 'twitter:description', meta.twitterDescription || meta.ogDescription || meta.description || '');
    }
    if (meta.twitterImage || meta.ogImage) {
      upsertMeta('name', 'twitter:image', meta.twitterImage || meta.ogImage || '');
    }

    return () => {
      document.title = previousTitle;
    };
  }, [
    meta.title,
    meta.description,
    meta.ogTitle,
    meta.ogDescription,
    meta.ogImage,
    meta.ogUrl,
    meta.ogType,
    meta.twitterCard,
    meta.twitterTitle,
    meta.twitterDescription,
    meta.twitterImage,
    meta.keywords,
    meta.canonicalUrl
  ]);
}
