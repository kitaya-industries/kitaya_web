import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogSlugs, getAllBlogPosts } from '@/data/blog';
import JsonLd, { blogPostSchema, breadcrumbSchema } from '@/components/JsonLd';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      ...(post.imageUrl ? { images: [{ url: post.imageUrl }] } : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = await getAllBlogPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const blocks = post.content.split('\n\n').filter((b) => b.trim());

  function renderBlock(block: string, i: number) {
    const trimmed = block.trim();

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="font-display text-2xl font-normal text-charcoal mt-10 mb-4 leading-snug">
          {trimmed.replace(/^## /, '')}
        </h2>
      );
    }

    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={i} className="font-display text-xl font-normal text-charcoal mt-8 mb-3 leading-snug">
          {trimmed.replace(/^### /, '')}
        </h3>
      );
    }

    if (trimmed.split('\n').every((line) => /^[-*]\s/.test(line.trim()) || line.trim() === '')) {
      const items = trimmed
        .split('\n')
        .map((l) => l.trim().replace(/^[-*]\s/, ''))
        .filter(Boolean);
      return (
        <ul key={i} className="list-none space-y-2 mb-6 pl-0">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-warm-gray text-[16px] leading-7 font-light">
              <span className="text-gold mt-1 text-xs">&#9670;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (trimmed.startsWith('**') && trimmed.includes('**')) {
      return (
        <p key={i} className="text-charcoal text-[16px] leading-8 font-medium mb-6">
          {trimmed.replace(/\*\*/g, '')}
        </p>
      );
    }

    return (
      <p key={i} className="text-warm-gray text-[16px] leading-8 font-light mb-6">
        {trimmed}
      </p>
    );
  }

  return (
    <div className="relative">
      <JsonLd data={blogPostSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://kitaya.in' },
          { name: 'Blog', url: 'https://kitaya.in/blog' },
          { name: post.title, url: `https://kitaya.in/blog/${post.slug}` },
        ])}
      />

      {/* Navbar theme anchor — dark when image present, also covers no-image posts at top */}
      {!post.imageUrl && (
        <div data-nav-theme="dark" className="absolute top-0 left-0 right-0 h-32 pointer-events-none" />
      )}
      {post.imageUrl && (
        <div
          data-nav-theme="dark"
          className="relative w-full h-[45vh] md:h-[55vh] bg-bg-dark overflow-hidden"
        >
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark gradient so header text below reads cleanly */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(26,26,24,0.2) 0%, rgba(26,26,24,0.6) 100%)' }}
          />
          {/* Category + read time overlay at bottom of image */}
          <div className="absolute bottom-8 left-6 lg:left-[60px] flex items-center gap-3">
            <span className="bg-bg-dark/80 backdrop-blur-sm text-gold text-[9px] tracking-[2px] uppercase px-3 py-1.5 font-medium">
              {post.category}
            </span>
            <span className="text-white/60 text-[11px]">{post.readTime}</span>
          </div>
        </div>
      )}

      <section className={`${post.imageUrl ? 'pt-12' : 'pt-32'} pb-20 px-6 lg:px-[60px] bg-bg`}>
        <div className="max-w-[800px] mx-auto">

          {/* Breadcrumb */}
          <div className="text-[12px] text-warm-gray tracking-[1px] mb-10">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">{post.title}</span>
          </div>

          {/* Article Header */}
          <div className="mb-12">
            {/* Show category here only if no hero image (otherwise shown on image) */}
            {!post.imageUrl && (
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] tracking-[2px] uppercase text-gold font-medium">{post.category}</span>
                <span className="text-warm-gray text-[11px]">{post.readTime}</span>
              </div>
            )}
            <h1 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal text-charcoal leading-tight mb-5">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-warm-gray text-[13px] font-light">
              <span>By {post.author}</span>
              <span>|</span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <article className="mb-20">
            {blocks.map((block, i) => renderBlock(block, i))}

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-charcoal/8">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] tracking-[1px] uppercase text-warm-gray border border-charcoal/10 px-4 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* CTA */}
          <div className="bg-bg-dark p-8 md:p-12 text-center mb-16">
            <h3 className="font-display text-2xl text-bg-warm mb-3">Try Our Assam Tea</h3>
            <p className="text-warm-gray text-sm font-light mb-6 max-w-[400px] mx-auto">
              Experience the bold taste of Assam black tea from Kitaya or the premium selection from TeaGate.
            </p>
            <Link href="/shop" className="btn-primary inline-block">Shop Now</Link>
          </div>

          {/* Related Posts */}
          {otherPosts.length > 0 && (
            <div>
              <h3 className="font-display text-2xl text-charcoal mb-8">More from the Tea Journal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherPosts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                    <article className="bg-white overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                      {/* Related post image */}
                      {p.imageUrl && (
                        <div className="relative aspect-[16/8] overflow-hidden">
                          <Image
                            src={p.imageUrl}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <span className="text-[10px] tracking-[2px] uppercase text-gold font-medium">{p.category}</span>
                        <h4 className="font-display text-lg font-medium text-charcoal mt-2 mb-2 group-hover:text-gold transition-colors leading-snug">
                          {p.title}
                        </h4>
                        <p className="text-warm-gray text-[13px] leading-6 font-light line-clamp-2">{p.excerpt}</p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}