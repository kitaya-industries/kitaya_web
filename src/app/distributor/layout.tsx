import { createMeta } from '@/data/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = createMeta(
  'Become a Distributor - Kitaya and TeaGate Assam Tea | Kitaya Industries',
  'Partner with Kitaya Industries as a distributor or stockist. Carry Kitaya and TeaGate premium Assam tea in your retail network. Competitive margins, growing brands, open territories across India.',
  '/distributor'
);

export default function DistributorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
