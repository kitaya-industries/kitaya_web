import { Metadata } from 'next';

const SITE_URL = 'https://kitaya.in';
const SITE_NAME = 'Kitaya Industries';

export function createMeta(
  title: string,
  description: string,
  path: string = '/',
  noIndex: boolean = false
): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export const pageMeta: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Kitaya Industries - Buy Premium Assam Tea Online | Kitaya & TeaGate Brands',
    description:
      'Buy premium Assam CTC tea and black tea online from Kitaya Industries. Two brands - Kitaya for bold daily chai and TeaGate for premium tea lovers. FSSAI certified, NABL lab tested, 100% Assam origin. Shop now at kitaya.in',
  },
  shop: {
    title: 'Buy Assam Tea Online - Kitaya & TeaGate | 250g & 1 Kg Packs',
    description:
      'Shop premium Assam CTC tea and black tea online. Kitaya bold chai tea from Rs 70 and TeaGate premium Assam tea from Rs 100. FSSAI certified, lab tested. Free delivery across India.',
  },
  kitaya: {
    title: 'Kitaya Tea - Bold Assam CTC Tea for Daily Chai | Buy Online',
    description:
      'Kitaya brings you bold, strong Assam CTC tea for the perfect kadak chai every day. Deep colour, rich flavour, magical taste. 100% Assam origin, FSSAI certified. Available in 250g and 1 Kg packs.',
  },
  teagate: {
    title: 'TeaGate - Premium Assam Tea | Best Indian Tea for Connoisseurs',
    description:
      'TeaGate premium Assam tea is handpicked from select gardens for rich colour and robust flavour. Among the best tea brands in India for discerning tea lovers. NABL lab tested, FSSAI certified.',
  },
  about: {
    title: 'About Kitaya Industries - Assam Tea Manufacturer & Exporter from India',
    description:
      'Kitaya Industries Private Limited is a tea manufacturer and exporter based in India. We source premium Assam CTC and black tea directly from tea gardens. FSSAI licensed, NABL lab tested.',
  },
  export: {
    title: 'Tea Export from India - Bulk Assam Tea Supplier & Exporter | Kitaya Industries',
    description:
      'Looking for a reliable Indian tea exporter? Kitaya Industries offers bulk Assam CTC tea, premium black tea, private labeling, and custom blends. FSSAI certified, NABL lab tested. Request a quote.',
  },
  distributor: {
    title: 'Become a Tea Distributor in India - Kitaya & TeaGate | Kitaya Industries',
    description:
      'Partner with Kitaya Industries as a tea distributor or stockist. Carry Kitaya and TeaGate premium Assam tea brands. Competitive trade margins, marketing support, growing demand.',
  },
  blog: {
    title: 'Tea Journal - Assam Tea Knowledge, Chai Recipes & Brewing Guides | Kitaya Industries',
    description:
      'Explore tea knowledge from Kitaya Industries. Learn about CTC tea processing, health benefits of Assam black tea, masala chai recipes, brewing guides, and Indian tea industry insights.',
  },
  faq: {
    title: 'Frequently Asked Questions - Assam Tea, Orders & Export | Kitaya Industries',
    description:
      'Find answers about Kitaya and TeaGate Assam tea, online orders, shipping, quality certifications, bulk orders, private label tea, and export inquiries from Kitaya Industries.',
  },
  contact: {
    title: 'Contact Kitaya Industries - Assam Tea Manufacturer & Supplier',
    description:
      'Get in touch with Kitaya Industries for orders, export inquiries, distribution partnerships, or general questions. Call +91 9079720031 or email kitayaind@gmail.com.',
  },
  cart: {
    title: 'Your Cart - Kitaya Industries',
    description: 'Review your selected Assam tea products before checkout.',
  },
  checkout: {
    title: 'Checkout - Kitaya Industries',
    description: 'Complete your order for premium Assam tea from Kitaya Industries.',
  },
  // SEO landing pages
  'assam-tea-online': {
    title: 'Buy Assam Tea Online - Fresh from Assam Tea Gardens | Kitaya Industries',
    description:
      'Buy authentic Assam CTC tea and premium black tea online from Kitaya Industries. Direct from Assam gardens, FSSAI certified, NABL lab tested. Starting from Rs 70. Order now for delivery across India.',
  },
  'premium-tea-india': {
    title: 'Premium Tea India - Best Assam Tea Brand | TeaGate by Kitaya Industries',
    description:
      'Discover India\'s finest premium Assam tea. TeaGate offers handpicked leaves with rich colour, robust flavour, and superior quality. Among the best Indian tea brands for tea connoisseurs.',
  },
  'ctc-tea-wholesale': {
    title: 'CTC Tea Wholesale - Bulk Assam CTC Tea Manufacturer & Supplier India',
    description:
      'Buy CTC tea wholesale from Kitaya Industries, a leading Assam CTC tea manufacturer. Bulk supply from 100 Kg to container loads. FSSAI certified, NABL lab tested. Competitive wholesale pricing.',
  },
  'tea-export-india': {
    title: 'Tea Export from India - Certified Assam Tea Exporter & Supplier',
    description:
      'Export premium Assam CTC and black tea from India with Kitaya Industries. Complete export documentation, FSSAI certified, NABL lab tested. Private label and bulk supply for international markets.',
  },
  'bulk-tea-supplier': {
    title: 'Bulk Tea Supplier India - Wholesale Assam Tea at Competitive Prices',
    description:
      'Trusted bulk tea supplier from India. Kitaya Industries offers premium Assam CTC and black tea in wholesale quantities. Direct from gardens, NABL certified. MOQ from 100 Kg.',
  },
  'private-label-tea': {
    title: 'Private Label Tea India - Start Your Own Tea Brand | Kitaya Industries',
    description:
      'Launch your own tea brand with Kitaya Industries\' private label service. Premium Assam tea, custom packaging, FSSAI compliance, competitive MOQ from 100 Kg. Your brand, our quality tea.',
  },
  'privacy-policy': {
    title: 'Privacy Policy - Kitaya Industries',
    description: 'Privacy policy for kitaya.in. Learn how Kitaya Industries collects, uses, and protects your personal information.',
  },
  'terms-and-conditions': {
    title: 'Terms and Conditions - Kitaya Industries',
    description: 'Terms and conditions for using kitaya.in and purchasing Assam tea products from Kitaya Industries Private Limited.',
  },
  'shipping-policy': {
    title: 'Shipping & Delivery Policy - Kitaya Industries',
    description: 'Shipping and delivery policy for Assam tea orders placed on kitaya.in. Delivery timelines, charges, and tracking information.',
  },
  'refund-policy': {
    title: 'Refund & Return Policy - Kitaya Industries',
    description: 'Refund and return policy for tea products purchased from kitaya.in. Eligible scenarios, refund timelines, and cancellation process.',
  },
};

// Product-specific meta
export const productMeta: Record<string, { title: string; description: string }> = {
  'kitaya-assam-250g': {
    title: 'Kitaya Assam CTC Tea 250g - Bold Chai Tea | Buy Online at Rs 89',
    description:
      'Buy Kitaya 250g Assam CTC tea online at Rs 89 (MRP Rs 120). Bold, strong daily chai with deep colour and magical taste. 100% Assam origin, FSSAI certified, NABL lab tested. Order at kitaya.in',
  },
  'kitaya-assam-1kg': {
    title: 'Kitaya Assam CTC Tea 1 Kg - Family Pack | Buy Online at Rs 338',
    description:
      'Buy Kitaya 1 Kg Assam CTC tea online at Rs 338 (MRP Rs 480). Value family pack for daily kadak chai lovers. Strong liquor, rich aroma, 100% Assam origin. FSSAI certified.',
  },
  'teagate-assam-premium-250g': {
    title: 'TeaGate Premium Assam Tea 250g - Best Indian Tea | Buy Online at Rs 118',
    description:
      'Buy TeaGate 250g premium Assam tea online at Rs 118 (MRP Rs 150). Handpicked from select Assam gardens. Rich colour, robust flavour. FSSAI certified, NABL lab tested.',
  },
  'teagate-assam-premium-1kg': {
    title: 'TeaGate Premium Assam Tea 1 Kg - Best Assam Tea Brand | Buy Online at Rs 442',
    description:
      'Buy TeaGate 1 Kg premium Assam tea online at Rs 442 (MRP Rs 600). The finest Assam tea for connoisseurs. Rich aroma, full-bodied taste. FSSAI certified, NABL lab tested.',
  },
  'kitaya-assam-250g-2pack': {
    title: 'Kitaya Assam CTC Tea Twin Pack 2 x 250g | Buy Online at Rs 168',
    description:
      'Buy Kitaya Twin Pack — 2 x 250g bold Assam CTC tea at Rs 168 (MRP Rs 240). Stock up and save on your favourite kadak chai tea. 100% Assam origin, FSSAI certified, NABL lab tested.',
  },
  'teagate-assam-premium-250g-2pack': {
    title: 'TeaGate Premium Assam Tea Twin Pack 2 x 250g | Buy Online at Rs 226',
    description:
      'Buy TeaGate Twin Pack — 2 x 250g premium Assam tea at Rs 226 (MRP Rs 300). Handpicked quality doubled. Perfect for gifting or stocking up. FSSAI certified, NABL lab tested.',
  },
  'kitaya-assam-1kg-2pack': {
    title: 'Kitaya Assam CTC Tea Bulk Twin Pack 2 x 1 Kg | Buy Online at Rs 656',
    description:
      'Buy Kitaya Bulk Twin Pack — 2 x 1 Kg bold Assam CTC tea at Rs 656 (MRP Rs 960). Maximum value for serious chai lovers. 800+ cups of strong kadak chai. 100% Assam origin, FSSAI certified.',
  },
  'teagate-assam-premium-1kg-2pack': {
    title: 'TeaGate Premium Assam Tea Bulk Twin Pack 2 x 1 Kg | Buy Online at Rs 854',
    description:
      'Buy TeaGate Bulk Twin Pack — 2 x 1 Kg premium Assam tea at Rs 854 (MRP Rs 1200). The finest Assam tea in bulk. NABL lab tested, FSSAI certified. Best value for premium tea lovers.',
  },
};