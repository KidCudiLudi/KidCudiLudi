import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/utils';

const categories = ['Wszystkie', 'Pielęgnacja', 'Poradniki', 'Historia fryzur', 'O marce', 'Nowości'];

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#F5EDE8] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-[#3D2B1F] mb-2">Blog</h1>
          <p className="text-[#8B6F5E]">Wiedza, inspiracje i świat pięknych warkoczów</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                c === 'Wszystkie'
                  ? 'bg-[#D4726A] text-white'
                  : 'bg-white border border-[#F5EDE8] text-[#8B6F5E] hover:border-[#D4726A] hover:text-[#D4726A]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="block group mb-10 bg-white rounded-3xl overflow-hidden border border-[#F5EDE8] shadow-sm hover:shadow-md transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center min-h-64">
              <div className="text-center">
                <div className="text-8xl">📖</div>
                <p className="text-[#D4726A] text-sm mt-2">Wyróżniony artykuł</p>
              </div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="text-[#D4726A] text-sm font-medium uppercase tracking-wide">{featured.category}</span>
              <h2 className="font-display text-2xl font-bold text-[#3D2B1F] group-hover:text-[#D4726A] transition-colors mt-2 mb-4">
                {featured.title}
              </h2>
              <p className="text-[#8B6F5E] leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-[#C9A96E]">
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime} czytania</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Grid + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#F5EDE8] shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-video bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center">
                  <span className="text-4xl">
                    {post.category === 'Pielęgnacja' ? '🌿' :
                     post.category === 'Poradniki' ? '💡' :
                     post.category === 'Historia fryzur' ? '📚' :
                     post.category === 'O marce' ? '♥' : '✨'}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-xs text-[#D4726A] font-medium uppercase tracking-wide">{post.category}</span>
                  <h3 className="font-display font-semibold text-[#3D2B1F] group-hover:text-[#D4726A] transition-colors mt-1 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#8B6F5E] line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-[#C9A96E]">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} czytania</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Popular posts */}
            <div className="bg-white rounded-2xl border border-[#F5EDE8] p-5 shadow-sm">
              <h3 className="font-display font-bold text-[#3D2B1F] mb-4">Popularne artykuły</h3>
              {BLOG_POSTS.slice(0, 4).map((post, i) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="flex items-start gap-3 py-3 border-b border-[#F5EDE8] last:border-0 group">
                  <span className="font-display font-bold text-[#E8D5C4] text-xl flex-shrink-0">0{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-[#3D2B1F] group-hover:text-[#D4726A] transition-colors leading-snug">{post.title}</p>
                    <p className="text-xs text-[#C9A96E] mt-1">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl border border-[#F5EDE8] p-5 shadow-sm">
              <h3 className="font-display font-bold text-[#3D2B1F] mb-4">Tagi</h3>
              <div className="flex flex-wrap gap-2">
                {['warkocze', 'braids', 'pielęgnacja', 'styling', 'poradniki', 'lato', 'zima', 'knotless', 'boho', 'cornrows'].map((tag) => (
                  <span key={tag} className="bg-[#F5EDE8] text-[#8B6F5E] hover:bg-[#D4726A] hover:text-white text-xs px-3 py-1.5 rounded-full cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-gradient-to-br from-[#F5E8E7] to-[#FDF9F6] rounded-2xl border border-[#E8D5C4] p-5">
              <div className="text-3xl mb-3">✉️</div>
              <h3 className="font-display font-semibold text-[#3D2B1F] mb-2">Bądź na bieżąco</h3>
              <p className="text-sm text-[#8B6F5E] mb-4">Nowe artykuły prosto na Twoją skrzynkę.</p>
              <input type="email" placeholder="Twój e-mail" className="w-full border border-[#F5EDE8] rounded-xl px-3 py-2.5 text-sm mb-2 outline-none focus:border-[#D4726A]" />
              <button className="w-full bg-[#D4726A] hover:bg-[#C4625A] text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
                Zapisz się
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
