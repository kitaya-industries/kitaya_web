import { pageMeta, createMeta } from '@/data/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = createMeta(
  pageMeta.shop.title,
  pageMeta.shop.description,
  '/shop'
);

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
