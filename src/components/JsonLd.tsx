interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ============================================
// SCHEMA GENERATORS
// ============================================

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kitaya Industries Private Limited',
    alternateName: 'Kitaya Industries',
    url: 'https://kitaya.in',
    logo: 'https://kitaya.in/images/brands/kitaya-logo.png',
    description:
      'Kitaya Industries is a tea manufacturer and exporter based in India, offering premium Assam CTC tea and black tea under two brands - Kitaya and TeaGate.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '11, Old Industrial Area',
      addressLocality: 'Alwar',
      addressRegion: 'Rajasthan',
      postalCode: '301001',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9079720031',
      contactType: 'customer service',
      email: 'kitayaind@gmail.com',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [],
    brand: [
      {
        '@type': 'Brand',
        name: 'Kitaya',
        description: 'Bold Assam CTC tea for daily chai lovers.',
      },
      {
        '@type': 'Brand',
        name: 'TeaGate',
        description: 'Premium Assam tea for discerning tea connoisseurs.',
      },
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kitaya Industries',
    url: 'https://kitaya.in',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kitaya.in/shop?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function productSchema(product: {
  slug: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  mrp: number;
  weight: string;
  images: string[];
}) {
  const brandName = product.brand === 'kitaya' ? 'Kitaya' : 'TeaGate';
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${brandName} ${product.name} ${product.weight}`,
    description: product.description,
    image: product.images.map((img) => `https://kitaya.in${img}`),
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Kitaya Industries Private Limited',
    },
    sku: product.slug,
    weight: {
      '@type': 'QuantitativeValue',
      value: product.weight.replace(/[^0-9]/g, ''),
      unitCode: product.weight.includes('Kg') ? 'KGM' : 'GRM',
    },
    offers: {
      '@type': 'Offer',
      url: `https://kitaya.in/shop/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Kitaya Industries',
      },
    },
    category: 'Tea',
    material: '100% Black Tea',
    countryOfOrigin: {
      '@type': 'Country',
      name: 'India',
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function blogPostSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kitaya Industries Private Limited',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kitaya.in/images/brands/kitaya-logo.png',
      },
    },
    datePublished: post.publishedAt,
    mainEntityOfPage: `https://kitaya.in/blog/${post.slug}`,
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Kitaya Industries Private Limited',
    image: 'https://kitaya.in/images/brands/kitaya-logo.png',
    '@id': 'https://kitaya.in',
    url: 'https://kitaya.in',
    telephone: '+91-9079720031',
    email: 'kitayaind@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '11, Old Industrial Area',
      addressLocality: 'Alwar',
      addressRegion: 'Rajasthan',
      postalCode: '301001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 27.5530,
      longitude: 76.6346,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: 'Rs 70 - Rs 600',
  };
}