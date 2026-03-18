import type { Metadata } from 'next';
import '@/styles/globals.css';
import { CartProvider } from '@/lib/cart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Kitaya Industries - Premium Assam Tea | Kitaya & TeaGate',
  description:
    'Shop premium Assam tea from Kitaya Industries. Two brands - Kitaya for everyday chai lovers and TeaGate for premium tea connoisseurs. FSSAI certified, 100% Assam origin.',
  metadataBase: new URL('https://kitaya.in'),
  icons: {
    icon: '/images/brands/logo-url.png',
    shortcut: '/images/brands/logo-url.png',
    apple: '/images/brands/logo-url.png',
  },
  openGraph: {
    siteName: 'Kitaya Industries',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}