import { useEffect } from "react";

export type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  url?: string;
  schema?: Record<string, any> | null;
};

function upsertMeta(attr: "name" | "property", key: string, value: string) {
  if (!value) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export function useSEO({ title, description, keywords, ogImage, url, schema }: SEOProps) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) upsertMeta("name", "description", description);
    if (keywords?.length) upsertMeta("name", "keywords", keywords.join(", "));

    if (title) upsertMeta("property", "og:title", title);
    if (description) upsertMeta("property", "og:description", description);
    if (ogImage) upsertMeta("property", "og:image", ogImage);
    if (url) upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");

    // Twitter minimal
    if (title) upsertMeta("name", "twitter:title", title);
    if (description) upsertMeta("name", "twitter:description", description);
    if (ogImage) upsertMeta("name", "twitter:image", ogImage);
    upsertMeta("name", "twitter:card", "summary_large_image");

    // JSON-LD structured data
    if (schema) {
      const id = "jsonld-primary";
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = id;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }
  }, [title, description, keywords, ogImage, url, schema]);
}

export const localBusinessSchema = (opts?: Partial<{
  name: string;
  url: string;
  telephone: string;
  email: string;
  address: string;
  sameAs: string[];
}>) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: opts?.name ?? "Waseem Architects",
  url: opts?.url ?? window.location.origin,
  telephone: opts?.telephone ?? "+92 300 111 2223",
  email: opts?.email ?? "info@waseemarchitects.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: opts?.address ?? "Lahore, Pakistan",
    addressCountry: "PK",
  },
  image: opts?.url ? `${opts.url}/og.jpg` : undefined,
  sameAs: opts?.sameAs ?? [],
});
