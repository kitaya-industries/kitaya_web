export interface Product {
  slug: string;
  name: string;
  brand: 'kitaya' | 'teagate';
  tagline: string;
  weight: string;
  weightGrams: number;
  price: number;       // selling price (includes shipping subsidy baked in)
  mrp: number;         // maximum retail price printed on pack
  shippingDiscount: number; // amount to subtract from live Delhivery rate at checkout
  description: string;
  longDescription: string;
  images: string[];
  ingredients: string;
  nutritionFacts: {
    energy: string;
    protein: string;
    carbohydrates: string;
    fat: string;
    cholesterol: string;
    sodium?: string;
    vitamins?: string;
    minerals?: string;
    note: string;
  };
  brewingInstructions: {
    teaspoons: number;
    water: string;
    temp: string;
    time: string;
    note: string;
  };
  storageInstructions: string;
  siblingSlug: string;
  isActive: boolean;
  sortOrder: number;
}

export const products: Product[] = [
  // ── Kitaya 250g ────────────────────────────────────────────────────────────
  {
    slug: 'kitaya-assam-250g',
    name: 'Assam Bold Black Tea',
    brand: 'kitaya',
    tagline: 'Magical Taste',
    weight: '250g',
    weightGrams: 250,
    price: 89,
    mrp: 120,
    shippingDiscount: 19, // new price 89 - original 70 = 19
    description: 'Bold Assam CTC tea for the perfect daily chai. Rich colour, strong flavour, magical in every cup.',
    longDescription: 'Kitaya Assam Bold Black Tea is crafted for those who love a strong, full-bodied cup of chai every morning. Made from 100% Assam CTC tea, it delivers a deep rich colour, robust flavour, and an aroma that fills the room. Whether you brew it with milk and sugar for a classic Indian chai or enjoy it black, Kitaya brings the magic of Assam\'s finest tea gardens to your cup.',
    images: ['/images/products/kitaya-250gm-front-1.png', '/images/products/kitaya-250gm-back-1.png'],
    ingredients: '100% Black Tea (CTC)',
    nutritionFacts: {
      energy: '100 kcal',
      protein: '20g',
      carbohydrates: '4g',
      fat: 'Traces',
      cholesterol: 'Nil',
      vitamins: 'Traces',
      minerals: 'Traces',
      note: 'Made from 1g of tea in 100ml of potable water. Does not include values of added milk and sugar.',
    },
    brewingInstructions: {
      teaspoons: 1,
      water: '150-200ml',
      temp: '100°C',
      time: '3-5 mins',
      note: 'Add milk and sugar as per your preference.',
    },
    storageInstructions: 'Store in a cool and dry place, away from sunlight and strong odours, in an airtight container.',
    siblingSlug: 'kitaya-assam-1kg',
    isActive: true,
    sortOrder: 1,
  },

  // ── Kitaya 1kg ─────────────────────────────────────────────────────────────
  {
    slug: 'kitaya-assam-1kg',
    name: 'Assam Bold Black Tea',
    brand: 'kitaya',
    tagline: 'Magical Tea',
    weight: '1 Kg',
    weightGrams: 1000,
    price: 338,
    mrp: 480,
    shippingDiscount: 38, // 338 - 300 = 38
    description: 'Premium Assam CTC tea in a value family pack. Strong liquor, rich aroma, and full-bodied taste.',
    longDescription: 'Kitaya Assam Bold Black Tea in the convenient 1 Kg pack is perfect for families who love their daily chai strong and flavorful. Handpicked from select Assam tea gardens, this premium CTC tea delivers a strong liquor, rich aroma, and full-bodied taste that makes every cup satisfying. The value pack ensures you never run out of your favourite tea.',
    images: ['/images/products/kitaya-1kg-front.png', '/images/products/kitaya-1kg-back.png'],
    ingredients: '100% Black Tea (CTC)',
    nutritionFacts: {
      energy: '133 kcal',
      protein: '20g',
      carbohydrates: '60g',
      fat: '0.8g',
      cholesterol: '0g',
      sodium: '20mg',
      note: 'Typical values per 100g of dry tea. Brewed tea contains negligible calories.',
    },
    brewingInstructions: {
      teaspoons: 1,
      water: '150-180ml',
      temp: '100°C',
      time: '3-5 mins',
      note: 'Add milk and sugar as per your preference.',
    },
    storageInstructions: 'Store in a cool and dry place, away from direct sunlight, moisture and strong odours. After opening, store in an airtight container.',
    siblingSlug: 'kitaya-assam-250g',
    isActive: true,
    sortOrder: 2,
  },

  // ── Kitaya 2x250g ──────────────────────────────────────────────────────────
  {
    slug: 'kitaya-assam-250g-2pack',
    name: 'Assam Bold Black Tea',
    brand: 'kitaya',
    tagline: 'Magical Taste · Twin Pack',
    weight: '2 × 250g',
    weightGrams: 500,
    price: 168,
    mrp: 240,
    shippingDiscount: 28, // 168 - 140 = 28
    description: 'Two packs of Kitaya bold Assam CTC tea. Stock up and save — bold chai taste every day, twice the magic.',
    longDescription: 'The Kitaya Twin Pack gives you two 250g packs of our bold Assam CTC tea at a special bundled price. Perfect for households that go through tea quickly or for gifting alongside your own pack. Same 100% Assam origin, same NABL lab tested quality — just more of what you love. Each 250g pack brews approximately 100 cups of strong kadak chai.',
    images: ['/images/products/kitaya-500gm-front.png', '/images/products/kitaya-250gm-back.png'],
    ingredients: '100% Black Tea (CTC)',
    nutritionFacts: {
      energy: '100 kcal',
      protein: '20g',
      carbohydrates: '4g',
      fat: 'Traces',
      cholesterol: 'Nil',
      vitamins: 'Traces',
      minerals: 'Traces',
      note: 'Made from 1g of tea in 100ml of potable water. Does not include values of added milk and sugar.',
    },
    brewingInstructions: {
      teaspoons: 1,
      water: '150-200ml',
      temp: '100°C',
      time: '3-5 mins',
      note: 'Add milk and sugar as per your preference. For a stronger kadak chai, use 1.5 teaspoons per cup.',
    },
    storageInstructions: 'Store in a cool and dry place, away from sunlight and strong odours, in an airtight container after opening.',
    siblingSlug: 'kitaya-assam-250g',
    isActive: true,
    sortOrder: 3,
  },

  // ── Kitaya 2x1kg ───────────────────────────────────────────────────────────
  {
    slug: 'kitaya-assam-1kg-2pack',
    name: 'Assam Bold Black Tea',
    brand: 'kitaya',
    tagline: 'Magical Taste · Bulk Twin Pack',
    weight: '2 × 1 Kg',
    weightGrams: 2000,
    price: 656,
    mrp: 960,
    shippingDiscount: 56, // 656 - 600 = 56
    description: 'Two 1 Kg packs of Kitaya bold Assam CTC tea. Maximum value for serious chai lovers — never run out.',
    longDescription: 'The Kitaya Bulk Twin Pack is for households and small businesses that take their chai seriously. Two full 1 Kg packs of our bold Assam CTC tea at a special bundled price. Each pack brews approximately 400 cups of strong kadak chai, giving you a combined 800 cups of the same 100% Assam origin, NABL lab tested quality you trust.',
    images: ['/images/products/kitaya-2kg-front.png', '/images/products/kitaya-1kg-back.png'],
    ingredients: '100% Black Tea (CTC)',
    nutritionFacts: {
      energy: '133 kcal',
      protein: '20g',
      carbohydrates: '60g',
      fat: '0.8g',
      cholesterol: '0g',
      sodium: '20mg',
      note: 'Typical values per 100g of dry tea. Brewed tea contains negligible calories.',
    },
    brewingInstructions: {
      teaspoons: 1,
      water: '150-180ml',
      temp: '100°C',
      time: '3-5 mins',
      note: 'Add milk and sugar as per your preference.',
    },
    storageInstructions: 'Store in a cool and dry place, away from direct sunlight, moisture and strong odours. After opening, store in an airtight container.',
    siblingSlug: 'kitaya-assam-1kg',
    isActive: true,
    sortOrder: 4,
  },

  // ── TeaGate 250g ───────────────────────────────────────────────────────────
  {
    slug: 'teagate-assam-premium-250g',
    name: 'Assam Premium Tea',
    brand: 'teagate',
    tagline: 'Premium Selection',
    weight: '250g',
    weightGrams: 250,
    price: 118,
    mrp: 150,
    shippingDiscount: 18, // 118 - 100 = 18
    description: 'Carefully selected from premium Assam tea gardens. Delivers a rich colour and robust flavour.',
    longDescription: 'TeaGate Assam Premium Tea is handpicked from the finest tea gardens in Assam, India. Each leaf is carefully selected to deliver a rich colour, robust flavour, and an aroma that elevates your tea experience. Whether you enjoy it as a strong black tea or with milk, TeaGate brings the premium taste of Assam\'s best gardens to your cup. Tested in our NABL accredited lab and tasted by master tea tasters for consistent quality.',
    images: ['/images/products/teagate-250gm-front.png', '/images/products/teagate-250gm-back.png'],
    ingredients: '100% Black Tea',
    nutritionFacts: {
      energy: '100 kcal',
      protein: '20g',
      carbohydrates: '4g',
      fat: 'Traces',
      cholesterol: 'Nil',
      vitamins: 'Traces',
      minerals: 'Traces',
      note: 'Made from 2g of tea in 100ml of potable water. Does not include values of added milk and sugar.',
    },
    brewingInstructions: {
      teaspoons: 1,
      water: '150-200ml',
      temp: '100°C',
      time: '3-5 mins',
      note: 'Milk and sugar as per preference.',
    },
    storageInstructions: 'Store in a cool and dry place, away from direct sunlight and strong odour. Keep in an airtight container after opening.',
    siblingSlug: 'teagate-assam-premium-1kg',
    isActive: true,
    sortOrder: 5,
  },

  // ── TeaGate 1kg ────────────────────────────────────────────────────────────
  {
    slug: 'teagate-assam-premium-1kg',
    name: 'Assam Premium Tea',
    brand: 'teagate',
    tagline: 'Premium Selection',
    weight: '1 Kg',
    weightGrams: 1000,
    price: 442,
    mrp: 600,
    shippingDiscount: 42, // 442 - 400 = 42
    description: 'Handpicked premium Assam tea in a value pack. Rich colour, robust flavour, full-bodied taste.',
    longDescription: 'TeaGate Assam Premium Tea in the 1 Kg pack brings you the finest Assam tea at exceptional value. Carefully selected from premium Assam tea gardens, this tea delivers a rich colour, robust flavour, and a full-bodied taste that discerning tea lovers appreciate. Every batch is tested in our NABL accredited lab and tasted by master tea tasters, ensuring you get the same premium quality in every cup.',
    images: ['/images/products/teagate-1kg-front.png', '/images/products/teagate-1kg-back.png'],
    ingredients: '100% Black Tea',
    nutritionFacts: {
      energy: '100 kcal',
      protein: '20g',
      carbohydrates: '4g',
      fat: 'Traces',
      cholesterol: 'Nil',
      vitamins: 'Traces',
      minerals: 'Traces',
      note: 'Made from 2g of tea in 100ml of potable water. Does not include values of added milk and sugar.',
    },
    brewingInstructions: {
      teaspoons: 1,
      water: '150-200ml',
      temp: '100°C',
      time: '3-5 mins',
      note: 'Milk and sugar as per preference.',
    },
    storageInstructions: 'Store in a cool and dry place, away from direct sunlight and strong odour. Keep in an airtight container after opening.',
    siblingSlug: 'teagate-assam-premium-250g',
    isActive: true,
    sortOrder: 6,
  },

  // ── TeaGate 2x250g ─────────────────────────────────────────────────────────
  {
    slug: 'teagate-assam-premium-250g-2pack',
    name: 'Assam Premium Tea',
    brand: 'teagate',
    tagline: 'Premium Selection · Twin Pack',
    weight: '2 × 250g',
    weightGrams: 500,
    price: 226,
    mrp: 300,
    shippingDiscount: 31, // 226 - 195 = 31
    description: 'Two packs of TeaGate premium Assam tea. Handpicked quality, twin pack value — the finest Assam tea, doubled.',
    longDescription: 'The TeaGate Twin Pack gives you two 250g packs of our handpicked premium Assam tea at a special bundled price. Ideal for gifting, sharing, or simply ensuring you always have the finest Assam tea at hand. Both packs carry the same NABL lab tested and master tea taster approved quality that makes TeaGate one of the best premium tea brands in India.',
    images: ['/images/products/teagate-500gm-front.png', '/images/products/teagate-250gm-back.png'],
    ingredients: '100% Black Tea',
    nutritionFacts: {
      energy: '100 kcal',
      protein: '20g',
      carbohydrates: '4g',
      fat: 'Traces',
      cholesterol: 'Nil',
      vitamins: 'Traces',
      minerals: 'Traces',
      note: 'Made from 2g of tea in 100ml of potable water. Does not include values of added milk and sugar.',
    },
    brewingInstructions: {
      teaspoons: 1,
      water: '150-200ml',
      temp: '100°C',
      time: '3-5 mins',
      note: 'Milk and sugar as per preference. Also excellent as a clean black tea without milk.',
    },
    storageInstructions: 'Store in a cool and dry place, away from direct sunlight and strong odour. Keep in an airtight container after opening.',
    siblingSlug: 'teagate-assam-premium-250g',
    isActive: true,
    sortOrder: 7,
  },

  // ── TeaGate 2x1kg ──────────────────────────────────────────────────────────
  {
    slug: 'teagate-assam-premium-1kg-2pack',
    name: 'Assam Premium Tea',
    brand: 'teagate',
    tagline: 'Premium Selection · Bulk Twin Pack',
    weight: '2 × 1 Kg',
    weightGrams: 2000,
    price: 854,
    mrp: 1200,
    shippingDiscount: 54, // 854 - 800 = 54
    description: 'Two 1 Kg packs of TeaGate premium Assam tea. The finest Assam tea in bulk — for those who never compromise.',
    longDescription: 'The TeaGate Bulk Twin Pack delivers two full 1 Kg packs of our handpicked premium Assam tea at an exceptional bundled price. Perfect for premium tea enthusiasts, households with high consumption, or businesses wanting to offer their guests the finest Assam tea. Same NABL lab tested, master tea taster approved quality — in maximum quantity.',
    images: ['/images/products/teagate-2kg-front.png', '/images/products/teagate-1kg-back.png'],
    ingredients: '100% Black Tea',
    nutritionFacts: {
      energy: '100 kcal',
      protein: '20g',
      carbohydrates: '4g',
      fat: 'Traces',
      cholesterol: 'Nil',
      vitamins: 'Traces',
      minerals: 'Traces',
      note: 'Made from 2g of tea in 100ml of potable water. Does not include values of added milk and sugar.',
    },
    brewingInstructions: {
      teaspoons: 1,
      water: '150-200ml',
      temp: '100°C',
      time: '3-5 mins',
      note: 'Milk and sugar as per preference. Also excellent as a clean black tea without milk.',
    },
    storageInstructions: 'Store in a cool and dry place, away from direct sunlight and strong odour. Keep in an airtight container after opening.',
    siblingSlug: 'teagate-assam-premium-1kg',
    isActive: true,
    sortOrder: 8,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByBrand(brand: 'kitaya' | 'teagate'): Product[] {
  return products.filter((p) => p.brand === brand && p.isActive);
}

export function getAllActiveProducts(): Product[] {
  return products.filter((p) => p.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

// Helper used at checkout:
// actualShipping = liveDelieveryRate - cartShippingDiscount
// cartShippingDiscount = sum of shippingDiscount across all items in cart
export function getCartShippingDiscount(items: { product: Product; quantity: number }[]): number {
  return items.reduce((total, item) => total + item.product.shippingDiscount * item.quantity, 0);
}

// Total cart weight in grams — used to call Delhivery rate API
export function getCartWeightGrams(items: { product: Product; quantity: number }[]): number {
  const productWeight = items.reduce((total, item) => total + item.product.weightGrams * item.quantity, 0);
  const packagingWeight = 150; // flat packaging per order
  return productWeight + packagingWeight;
}