import { createMeta } from '@/data/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = createMeta(
  'Contact Kitaya Industries - Assam Tea Inquiries, Orders and Support',
  'Get in touch with Kitaya Industries for Assam tea orders, export inquiries, distribution partnerships, or product questions. Call +91 9079720031 or email kitayaind@gmail.com.',
  '/contact'
);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
