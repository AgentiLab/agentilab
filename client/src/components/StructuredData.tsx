interface StructuredDataProps {
  data: Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AgentiLab.ai",
  url: "https://agentilab.ai",
  logo: "https://agentilab.ai/logo.png",
  description: "AI development firm specializing in intelligent software solutions",
  sameAs: [
    "https://twitter.com/agentilab",
    "https://github.com/agentilab",
    "https://linkedin.com/company/agentilab"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@agentilab.ai",
    contactType: "Customer Service"
  }
};

export function createProjectSchema(project: {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    image: project.image,
    applicationCategory: "DeveloperApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    ...(project.liveUrl && { url: project.liveUrl })
  };
}
