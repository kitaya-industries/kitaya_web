export const company = {
  name: 'Kitaya Industries Private Limited',
  shortName: 'Kitaya Industries',
  tagline: 'Premium Assam Tea',
  address: {
    line1: '11, Old Industrial Area',
    city: 'Alwar',
    state: 'Rajasthan',
    pincode: '301001',
    country: 'India',
    full: '11, Old Industrial Area, Alwar - 301001, Rajasthan, India',
  },
  contact: {
    phone: '+91 9079720031',
    phoneClean: '919079720031',
    email: 'kitayaind@gmail.com',
    website: 'https://kitaya.in',
  },
  legal: {
    cin: 'U01797RJ2022PTC106405',
    gst: '08AALCK2924K1ZX',
    fssai: ['1222501000', '12225010000228'], // Two FSSAI numbers from packaging - confirm which is current
  },
  certifications: [
    { name: 'FSSAI Licensed', icon: 'shield-check' },
    { name: 'NABL Lab Tested', icon: 'flask-round' },
    { name: 'GST Registered', icon: 'file-check' },
    { name: '100% Assam Origin', icon: 'map-pin' },
  ],
  social: {
    instagram: '', // TODO: Add when ready
    facebook: '', // TODO: Add when ready
    linkedin: '', // TODO: Add when ready
    amazon: '', // TODO: Add Amazon store link
  },
};

export const brands = {
  kitaya: {
    name: 'Kitaya',
    tagline: 'Magical Taste',
    positioning: 'Everyday Excellence',
    description: 'Bold Assam CTC tea for the perfect daily chai. Rich colour, strong flavour, magical in every cup.',
    longDescription:
      'Kitaya is crafted for those who love a strong, bold cup of chai every day. Our CTC tea delivers rich colour, full-bodied flavour, and an unmistakable aroma that makes every morning better. Sourced 100% from the tea gardens of Assam.',
    color: {
      primary: '#C62828',
      dark: '#8E0000',
      light: '#FF5F52',
    },
    logo: '/images/brands/kitaya-logo.png',
  },
  teagate: {
    name: 'TeaGate',
    tagline: 'Assam Premium Tea',
    positioning: 'Premium Collection',
    description:
      'Carefully selected from premium Assam tea gardens. Delivers a rich colour and robust flavour.',
    longDescription:
      'TeaGate tea is handpicked from the finest Assam tea gardens. Each leaf is carefully selected to deliver a rich colour, robust flavour, and an aroma that elevates your tea experience. Tested in our NABL accredited lab and tasted by master tea tasters for consistent quality.',
    color: {
      primary: '#1A237E',
      mid: '#283593',
      light: '#534BAE',
    },
    logo: '/images/brands/teagate-logo.png',
  },
};