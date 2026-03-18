// src/app/sitemap.ts
//
// MEDIUM FIX: Removed seoPages and hardcoded blogSlugs arrays.
// All 6 SEO landing pages (/buy-assam-tea-online, /premium-tea-india etc.)
// and 3 blog post slugs don't exist yet — Google was hitting 404s on all of
// them, hurting crawl budget and SEO trust.
//
// Add blog slugs back here once the posts are actually published.
// Add seoPages back once those landing pages are actually built.

import { MetadataRoute } from 'next';
import { products } from '@/data/products';

const BASE_URL = 'https://kitaya.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Brand pages
  const brandPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/kitaya`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/teagate`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Product pages — auto-generated from live product data
  const productPages: MetadataRoute.Sitemap = products
    .filter((p) => p.isActive)
    .map((product) => ({
      url: `${BASE_URL}/shop/${product.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  // B2B pages
  const b2bPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/export`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/distributor`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Blog index only — add individual post slugs here once posts are published:
  // { url: `${BASE_URL}/blog/what-is-ctc-tea`, ... }
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Policy pages
  const policyPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/shipping-policy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/refund-policy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  return [
    ...corePages,
    ...brandPages,
    ...productPages,
    ...b2bPages,
    ...blogPages,
    ...policyPages,
  ];
}