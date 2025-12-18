import { useEffect } from 'react';

type PageMeta = {
  title: string;
  description?: string;
};

function upsertMeta(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name=\"${name}\"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = meta.title;

    if (meta.description) {
      upsertMeta('description', meta.description);
    }

    return () => {
      document.title = previousTitle;
    };
  }, [meta.title, meta.description]);
}
