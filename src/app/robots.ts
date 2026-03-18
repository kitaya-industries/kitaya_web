import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/cart',
          '/checkout',
          '/admin',               // FIXED: was missing — admin panel should never be indexed
          '/order-confirmation',  // FIXED: private order pages shouldn't be indexed
          '/track-order',         // FIXED: private tracking pages shouldn't be indexed
          '/api/',
        ],
      },
    ],
    sitemap: 'https://kitaya.in/sitemap.xml',
  };
}