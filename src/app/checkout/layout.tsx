import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout - Kitaya Industries',
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
