import { supabase } from '@/lib/supabase';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  imageUrl: string | null;
}

// Map Supabase row to BlogPost interface
function mapRow(row: Record<string, unknown>): BlogPost {
  return {
    slug: row.slug as string,
    title: row.title as string,
    excerpt: (row.excerpt as string) ?? '',
    content: row.content as string,
    category: (row.category as string) ?? 'Tea Knowledge',
    author: (row.author as string) ?? 'Kitaya Industries',
    publishedAt: row.published_at
      ? new Date(row.published_at as string).toISOString().split('T')[0]
      : new Date(row.created_at as string).toISOString().split('T')[0],
    readTime: (row.read_time as string) ?? '5 min read',
    metaTitle: (row.meta_title as string) ?? (row.title as string),
    metaDescription: (row.meta_description as string) ?? (row.excerpt as string) ?? '',
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
    imageUrl: (row.image_url as string) ?? null,
  };
}

// Fetch all published blog posts, sorted by published_at desc
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('[blog] getAllBlogPosts error:', error.message);
    return [];
  }

  return (data ?? []).map(mapRow);
}

// Fetch a single post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !data) {
    console.error('[blog] getBlogPostBySlug error:', error?.message);
    return null;
  }

  return mapRow(data as Record<string, unknown>);
}

// Fetch all slugs for generateStaticParams (ISR-friendly)
export async function getAllBlogSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('is_published', true);

  if (error || !data) return [];
  return data.map((r: { slug: string }) => r.slug);
}