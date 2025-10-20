import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

export function SEO({
  title = "AgentiLab.ai - AI Development & Innovation",
  description = "AgentiLab.ai is an AI development firm building the future of intelligent software. Specializing in AI-powered messaging, creative tools, and security solutions.",
  canonical,
  ogImage = "/og-image.png",
  ogType = "website",
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const metaTags = {
      description,
      "og:title": title,
      "og:description": description,
      "og:type": ogType,
      "og:image": ogImage,
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": ogImage,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement("meta");
        if (name.startsWith("og:") || name.startsWith("twitter:")) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    });

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }, [title, description, canonical, ogImage, ogType]);

  return null;
}
