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

  // ── LOW FIX: Added og:image so WhatsApp, LinkedIn, Twitter show a
  // preview card when someone shares kitaya.in. Without this, shares
  // show a blank card with no image.
  // Uses kitaya-hero.png (1200×630 is the ideal OG image size).
  // If you have a dedicated OG image, replace the url below.
  openGraph: {
    siteName: 'Kitaya Industries',
    locale: 'en_IN',
    type: 'website',
    url: 'https://kitaya.in',
    title: 'Kitaya Industries - Premium Assam Tea | Kitaya & TeaGate',
    description:
      'Shop premium Assam tea from Kitaya Industries. FSSAI certified, 100% Assam origin. Two brands — Kitaya for everyday chai lovers and TeaGate for premium connoisseurs.',
    images: [
      {
        url: '/images/brands/kitaya-hero.png',
        width: 1200,
        height: 630,
        alt: 'Kitaya Industries — Premium Assam Tea',
      },
    ],
  },

  // ── Twitter / X card — shows large image preview when shared on X
  twitter: {
    card: 'summary_large_image',
    title: 'Kitaya Industries - Premium Assam Tea',
    description:
      'FSSAI certified Assam tea delivered across India. Shop Kitaya and TeaGate — two brands, one origin.',
    images: ['/images/brands/kitaya-hero.png'],
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