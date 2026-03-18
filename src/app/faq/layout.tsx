import { createMeta } from '@/data/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = createMeta(
  'FAQs - Kitaya Industries | Assam Tea, Orders, Shipping, Export',
  'Find answers to common questions about Kitaya and TeaGate Assam tea, ordering, shipping, quality certifications, bulk orders, and export inquiries from Kitaya Industries.',
  '/faq'
);

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
