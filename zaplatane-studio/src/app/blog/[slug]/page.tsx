import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/utils';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — Blog Zaplątane Studio`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#F5EDE8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#8B6F5E]">
            <Link href="/" className="hover:text-[#D4726A]">Strona główna</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#D4726A]">Blog</Link>
            <span>/</span>
            <span className="text-[#3D2B1F] font-medium truncate max-w-xs">{post.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs text-[#D4726A] font-medium uppercase tracking-widest">{post.category}</span>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[#3D2B1F] mt-2 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#8B6F5E]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F5E8E7] flex items-center justify-center">👩</div>
              <span>Zaplątane Studio</span>
            </div>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} czytania</span>
          </div>
        </div>

        {/* Cover image */}
        <div className="aspect-video bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] rounded-3xl flex items-center justify-center mb-10">
          <div className="text-center">
            <div className="text-8xl">
              {post.category === 'Pielęgnacja' ? '🌿' : post.category === 'Poradniki' ? '💡' : post.category === 'Historia fryzur' ? '📚' : '✨'}
            </div>
            <p className="text-[#D4726A] text-sm mt-3">Zdjęcie okładkowe</p>
            <p className="text-[#C9A96E] text-xs mt-1">Dodaj w panelu admina</p>
          </div>
        </div>

        {/* Lead */}
        <p className="text-xl text-[#8B6F5E] leading-relaxed mb-8 font-light border-l-4 border-[#D4726A] pl-6">
          {post.excerpt}
        </p>

        {/* Content placeholder */}
        <div className="prose prose-lg max-w-none">
          <div className="space-y-6 text-[#8B6F5E] leading-relaxed">
            <div className="bg-white border border-[#F5EDE8] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">✍️</span>
                <p className="font-medium text-[#3D2B1F]">Treść artykułu</p>
              </div>
              <p className="text-sm">
                Treść artykułu &ldquo;{post.title}&rdquo; zostanie dodana w panelu administratora.
                Możesz tam napisać pełny tekst, dodać zdjęcia i sformatować artykuł.
              </p>
              <Link href="/admin" className="inline-block mt-4 text-[#D4726A] text-sm font-medium hover:underline">
                Przejdź do panelu admina →
              </Link>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-10 pt-8 border-t border-[#F5EDE8]">
          <div className="flex flex-wrap gap-2">
            {['warkocze', post.category.toLowerCase(), 'zaplatane studio'].map((tag) => (
              <span key={tag} className="bg-[#F5EDE8] text-[#8B6F5E] text-xs px-3 py-1.5 rounded-full">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mt-8 p-6 bg-white border border-[#F5EDE8] rounded-2xl flex flex-wrap items-center gap-4">
          <p className="font-medium text-[#3D2B1F] text-sm">Udostępnij artykuł:</p>
          {['Instagram', 'Facebook', 'Pinterest'].map((s) => (
            <button key={s} className="text-sm text-[#8B6F5E] hover:text-[#D4726A] transition-colors border border-[#F5EDE8] px-4 py-1.5 rounded-full hover:border-[#D4726A]">
              {s}
            </button>
          ))}
        </div>

        {/* Related articles */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-[#3D2B1F] mb-8">Podobne artykuły</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="group bg-white border border-[#F5EDE8] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="aspect-video bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center text-4xl">
                  {p.category === 'Pielęgnacja' ? '🌿' : p.category === 'Poradniki' ? '💡' : '📖'}
                </div>
                <div className="p-4">
                  <span className="text-xs text-[#D4726A] font-medium">{p.category}</span>
                  <h3 className="font-display font-semibold text-[#3D2B1F] group-hover:text-[#D4726A] transition-colors mt-1 text-sm leading-snug">{p.title}</h3>
                  <p className="text-xs text-[#C9A96E] mt-2">{p.readTime} czytania</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
