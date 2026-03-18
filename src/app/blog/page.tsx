import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts } from '@/data/blog';
import { blogFaqs } from '@/data/faqs';
import FAQAccordion from '@/components/FAQAccordion';
import { createMeta, pageMeta } from '@/data/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = createMeta(
  pageMeta.blog.title,
  pageMeta.blog.description,
  '/blog'
);

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <section className="pt-32 pb-20 px-6 lg:px-[60px] bg-bg min-h-screen">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <div className="text-[12px] text-warm-gray tracking-[1px] mb-10">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">Blog</span>
          </div>

          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="section-label">Tea Journal</div>
            <h1 className="section-title">Insights, Recipes &amp; Tea Knowledge</h1>
            <p className="text-warm-gray text-base font-light max-w-[550px] mx-auto mt-4 leading-7">
              Explore the world of Assam tea with brewing guides, health benefits, industry insights, and recipes from Kitaya Industries.
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20 text-warm-gray text-[15px] font-light">
              No posts published yet. Check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <article className="bg-white h-full flex flex-col hover:-translate-y-1 transition-all duration-400 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

                    {/* Cover image */}
                    <div className="aspect-[16/10] bg-bg-dark overflow-hidden relative">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        /* Fallback placeholder if no image yet */
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                              backgroundImage:
                                'repeating-linear-gradient(45deg, transparent, transparent 40px, #C5A55A 40px, #C5A55A 41px)',
                            }}
                          />
                          <span className="text-gold/30 text-4xl relative z-10">&#9749;</span>
                        </div>
                      )}
                      {/* Category pill over image */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-bg-dark/80 backdrop-blur-sm text-gold text-[9px] tracking-[2px] uppercase px-3 py-1.5 font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-warm-gray text-[11px]">{post.readTime}</span>
                      </div>

                      <h2 className="font-display text-lg font-medium text-charcoal mb-3 group-hover:text-gold transition-colors leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-warm-gray text-[14px] leading-6 font-light flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="mt-6 pt-4 border-t border-charcoal/5 flex items-center justify-between">
                        <span className="text-warm-gray text-[12px] font-light">
                          {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="text-gold text-[12px] tracking-[2px] uppercase group-hover:tracking-[3px] transition-all">
                          Read More
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* SEO Content */}
          <div className="mt-20 max-w-[800px] mx-auto">
            <h2 className="font-display text-2xl font-normal text-charcoal mb-5">About Our Tea Journal</h2>
            <p className="text-warm-gray text-[15px] leading-8 font-light">
              The Kitaya Industries tea journal is your resource for everything related to Assam tea, Indian chai culture, and the tea industry. We share practical brewing guides for making the perfect cup of chai, explore the health benefits of black tea backed by research, explain tea processing methods like CTC and orthodox manufacturing, and provide insights into the Assam tea industry. Whether you are a casual tea drinker or a tea connoisseur, our blog helps you understand and appreciate what goes into every cup of quality Assam tea.
            </p>
          </div>
        </div>
      </section>

      <FAQAccordion faqs={blogFaqs} sectionLabel="Blog Questions" sectionTitle="Frequently Asked Questions" />
    </>
  );
}