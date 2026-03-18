# Kitaya Industries — kitaya.in

Premium Assam tea e-commerce website for Kitaya Industries Private Limited.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** Supabase (minimal — orders, inquiries, blog only)
- **Payments:** Razorpay (Phase 3)
- **Hosting:** Vercel

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/kitaya-industries/kitaya_web.git
cd kitaya_web

# 2. Install dependencies
npm install

# 3. Set up environment variables
# .env.local is already configured — verify the values

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Navbar, Footer, CartProvider)
│   ├── page.tsx            # Homepage
│   ├── shop/
│   │   ├── page.tsx        # Shop listing
│   │   └── [slug]/         # Product detail (dynamic)
│   ├── kitaya/             # Kitaya brand page (Phase 2)
│   ├── teagate/            # TeaGate brand page (Phase 2)
│   ├── about/              # About page (Phase 2)
│   ├── export/             # Export & B2B (Phase 4)
│   ├── contact/            # Contact page (Phase 2)
│   ├── blog/               # Blog (Phase 4)
│   ├── faq/                # Master FAQ (Phase 2)
│   ├── cart/               # Cart (Phase 3)
│   └── checkout/           # Checkout (Phase 3)
├── components/             # Shared React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── BrandCard.tsx
│   ├── ProductCard.tsx
│   ├── FAQAccordion.tsx
│   ├── StorySection.tsx
│   ├── ExportCTA.tsx
│   └── CertificationsStrip.tsx
├── data/                   # Static data (frontend-first architecture)
│   ├── products.ts         # All 4 SKUs
│   ├── faqs.ts             # All page-specific FAQs
│   ├── seo.ts              # Meta titles, descriptions
│   ├── company.ts          # Company info, certifications
│   └── navigation.ts       # Nav & footer links
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── cart.tsx            # Cart context (React state)
└── styles/
    └── globals.css         # Tailwind + custom styles
```

## Architecture

**Frontend-first, Supabase-minimal.**

- Product data, FAQs, SEO meta, page content → static TypeScript files
- Supabase → only orders, inquiries, blog posts
- Next.js SSG for all static pages → instant load times
- Cart state → React Context (no DB)

## Adding Product Images

Place product images in `public/images/products/`:
- `kitaya-250-front.jpg`, `kitaya-250-back.jpg`
- `kitaya-1kg-front.jpg`, `kitaya-1kg-back.jpg`
- `teagate-250-front.jpg`, `teagate-250-back.jpg`
- `teagate-1kg-front.jpg`, `teagate-1kg-back.jpg`

Place brand logos in `public/images/brands/`:
- `kitaya-logo.png`
- `teagate-logo.png`

## Build Phases

- **Phase 1 ✅** — Foundation: Homepage, Shop, Product Detail
- **Phase 2** — Brand pages, About, Contact, FAQ, Policy pages
- **Phase 3** — Cart, Checkout, Razorpay, Orders (Supabase)
- **Phase 4** — Export, Distributor, Blog, SEO pages
- **Phase 5** — Polish, mobile audit, analytics, launch

## Deployment (Vercel)

1. Push to GitHub
2. Connect repo in Vercel dashboard
3. Add environment variables in Vercel project settings
4. Deploy
5. Point kitaya.in DNS to Vercel (when ready)

## License

Private — Kitaya Industries Private Limited
