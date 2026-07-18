import { useEffect } from 'react';

const SITE_URL = 'https://www.snoutscout.info';

function upsertMeta(attr, key, content) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

/** Sets per-route title, meta description, canonical, and OG/Twitter tags. */
export default function useSEO({ title, description, path = '/' }) {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title;

        upsertMeta('name', 'description', description);
        upsertMeta('property', 'og:title', title);
        upsertMeta('property', 'og:description', description);
        upsertMeta('name', 'twitter:title', title);
        upsertMeta('name', 'twitter:description', description);

        const url = `${SITE_URL}${path}`;
        upsertMeta('property', 'og:url', url);

        let canonical = document.head.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        const previousCanonical = canonical.getAttribute('href');
        canonical.setAttribute('href', url);

        return () => {
            document.title = previousTitle;
            if (previousCanonical) canonical.setAttribute('href', previousCanonical);
        };
    }, [title, description, path]);
}
