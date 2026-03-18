import { createMeta } from '@/data/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = createMeta(
  'Export Assam Tea from India - Bulk Tea Supplier | Kitaya Industries',
  'Looking for a reliable Indian tea exporter? Kitaya Industries offers bulk Assam CTC and premium black tea, private labeling, and custom blends. FSSAI and NABL certified. Request a quote.',
  '/export'
);

export default function ExportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
