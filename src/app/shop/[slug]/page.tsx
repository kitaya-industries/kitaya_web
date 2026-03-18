import { notFound } from 'next/navigation';
import { products, getProductBySlug } from '@/data/products';
import { productMeta } from '@/data/seo';
import { productFaqs } from '@/data/faqs';
import ProductDetailClient from './ProductDetailClient';
import FAQAccordion from '@/components/FAQAccordion';
import JsonLd, { productSchema, breadcrumbSchema, faqSchema } from '@/components/JsonLd';
import type { Metadata } from 'next';

// Generate static paths for all products
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// Dynamic metadata per product
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const meta = productMeta[params.slug];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    openGraph: { title: meta.title, description: meta.description },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const siblingProduct = getProductBySlug(product.siblingSlug);
  const brandName = product.brand === 'kitaya' ? 'Kitaya' : 'TeaGate';

  return (
    <>
      <JsonLd data={productSchema(product)} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: 'https://kitaya.in' },
        { name: 'Shop', url: 'https://kitaya.in/shop' },
        { name: `${brandName} ${product.name} ${product.weight}`, url: `https://kitaya.in/shop/${product.slug}` },
      ])} />
      <JsonLd data={faqSchema(productFaqs)} />
      <ProductDetailClient product={product} siblingProduct={siblingProduct || null} />
      <FAQAccordion
        faqs={productFaqs}
        sectionLabel="Product Questions"
        sectionTitle="Frequently Asked Questions"
      />
    </>
  );
}