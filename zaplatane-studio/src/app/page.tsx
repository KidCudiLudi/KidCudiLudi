import Link from 'next/link';
import { HAIR_STYLES, TESTIMONIALS, BLOG_POSTS } from '@/lib/utils';

const quickNav = [
  { icon: '🪢', title: 'Fryzury', desc: 'Zobacz pełną ofertę fryzur i umów wizytę', href: '/fryzury' },
  { icon: '🛍️', title: 'Sklep', desc: 'Włosy, akcesoria, zestawy i kucyki', href: '/sklep' },
  { icon: '📖', title: 'Ebooki', desc: 'Poradniki i ebooki dla pięknych włosów', href: '/sklep?cat=ebooki' },
  { icon: '💎', title: 'Klub Zaplątanych', desc: 'Zbieraj Sploty i ciesz się wyjątkowymi korzyściami', href: '/klub' },
];

const visitSteps = [
  { num: '1', title: 'Wybierz fryzurę', desc: 'Zobacz katalog fryzur i wybierz swoją ulubioną.', icon: '🪢' },
  { num: '2', title: 'Umów termin', desc: 'Wybierz dogodny termin i wpłać zadatek online.', icon: '📅' },
  { num: '3', title: 'Wizyta', desc: 'Odpoczni, a ja zajmę się Twoimi włosami.', icon: '💕' },
  { num: '4', title: 'Ciesz się efektem', desc: 'Poczuj się piękna i pewna siebie każdego dnia!', icon: '📸' },
];

export default function HomePage() {
  const popularStyles = HAIR_STYLES.slice(0, 4);
  const latestPosts = BLOG_POSTS.slice(0, 3);

  return (
    <div className="bg-[#FDF9F6]">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FDF9F6] via-[#F5EDE8] to-[#F5E8E7] min-h-[90vh] flex items-center">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-20 w-80 h-80 bg-[#E8A4A0]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#C9A96E]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[#D4726A] text-sm font-medium uppercase tracking-widest mb-6">
              ♥ Profesjonalne zaplatanie włosów ♥
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-[#3D2B1F] leading-tight mb-4">
              Piękne warkocze,
              <br />
              <span className="italic text-[#D4726A]">stworzone dla Ciebie</span>
            </h1>
            <p className="text-[#8B6F5E] text-lg leading-relaxed mb-10 max-w-md">
              Zadbam o Twoje włosy z pasją i dokładnością.
              Poczuj się wyjątkowo każdego dnia.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/rezerwacja"
                className="bg-[#D4726A] hover:bg-[#C4625A] text-white font-medium px-8 py-3.5 rounded-full transition-all shadow-lg shadow-[#D4726A]/25 hover:shadow-xl hover:-translate-y-0.5"
              >
                Umów Wizytę
              </Link>
              <Link
                href="/fryzury"
                className="border-2 border-[#D4726A] text-[#D4726A] hover:bg-[#D4726A] hover:text-white font-medium px-8 py-3.5 rounded-full transition-all"
              >
                Zobacz Fryzury
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-10">
              {['Profesjonalnie', 'Z pasją', 'Z miłości do kobiet'].map((badge, i) => (
                <div key={badge} className="flex items-center gap-2 text-[#8B6F5E] text-sm">
                  <span>{['👑', '♡', '✦'][i]}</span>
                  <span className="uppercase tracking-wide font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-[60px] bg-gradient-to-br from-[#E8A4A0]/30 to-[#C9A96E]/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl max-w-xs">
                  <div className="text-8xl mb-4">🪢</div>
                  <p className="font-display text-xl text-[#3D2B1F] font-semibold">Twoje piękno</p>
                  <p className="text-[#D4726A] italic font-display">zaczyna się od Ciebie</p>
                </div>
              </div>
              {/* Floating mascots */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-3 shadow-lg">
                <div className="text-4xl">🐕</div>
                <p className="text-xs text-[#D4726A] font-medium text-center mt-1">Sammy</p>
              </div>
              <div className="absolute top-4 -left-4 bg-white rounded-2xl p-3 shadow-lg">
                <div className="text-4xl">👧</div>
                <p className="text-xs text-[#D4726A] font-medium text-center mt-1">Ambasadorka</p>
              </div>
              {/* Circular badge */}
              <div className="absolute top-8 right-8 w-20 h-20 rounded-full border-2 border-[#C9A96E] bg-white/90 flex items-center justify-center text-center p-2">
                <p className="text-[9px] text-[#8B6F5E] font-medium uppercase tracking-tight leading-tight">Twoje piękno zaczyna się od Ciebie</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK NAV ── */}
      <section className="border-b border-[#F5EDE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickNav.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group border border-[#F5EDE8] hover:border-[#D4726A]/30"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-display font-semibold text-[#3D2B1F] group-hover:text-[#D4726A] transition-colors">{item.title}</h3>
                  <p className="text-sm text-[#8B6F5E] mt-1 leading-snug">{item.desc}</p>
                  <span className="text-[#D4726A] text-sm mt-2 inline-block">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR STYLES + CLUB CARD ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Styles grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl font-bold text-[#3D2B1F]">
                  Najpopularniejsze fryzury <span className="text-[#D4726A]">♥</span>
                </h2>
                <Link href="/fryzury" className="text-[#D4726A] text-sm font-medium uppercase tracking-wide hover:underline">
                  Zobacz wszystkie
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {popularStyles.map((style) => (
                  <Link
                    key={style.id}
                    href={`/fryzury/${style.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-[#F5EDE8] hover:border-[#D4726A]/20"
                  >
                    {/* Image placeholder */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl">🪢</div>
                        <p className="text-[#D4726A] text-xs mt-2">Zdjęcie fryzury</p>
                      </div>
                      <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-[#D4726A] hover:bg-[#D4726A] hover:text-white transition-colors">
                        ♡
                      </button>
                      {style.isBestseller && (
                        <span className="absolute top-3 left-3 bg-[#C9A96E] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                          Bestseller
                        </span>
                      )}
                      {style.isNew && (
                        <span className="absolute top-3 left-3 bg-[#D4726A] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                          Nowość
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-[#3D2B1F] group-hover:text-[#D4726A] transition-colors">
                        {style.name}
                      </h3>
                      <p className="text-[#8B6F5E] text-sm mt-1">od {style.price} zł</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-[#C9A96E] bg-[#C9A96E]/10 rounded-full px-3 py-1">
                          {style.duration}
                        </span>
                        <span className="text-[#D4726A] text-sm font-medium">Zobacz →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Pagination dots */}
              <div className="flex justify-center gap-2 mt-6">
                {[0,1,2].map((i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#D4726A]' : 'bg-[#E8D5C4]'}`} />
                ))}
              </div>
            </div>

            {/* Club card */}
            <div className="bg-white rounded-3xl border border-[#F5EDE8] shadow-sm p-6">
              <div className="text-center mb-4">
                <p className="text-[#8B6F5E] text-xs uppercase tracking-widest font-medium">Klub Zaplątanych ♥</p>
                <h3 className="font-display text-xl font-bold text-[#3D2B1F] mt-1">Twoja Karta</h3>
              </div>
              <div className="bg-gradient-to-br from-[#D4726A] to-[#C4625A] rounded-2xl p-5 text-white mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest opacity-80">poziom</span>
                  <span className="text-lg">♥</span>
                </div>
                <p className="font-display text-3xl font-bold mb-1">ROSE</p>
                <p className="text-sm opacity-80">1350 Renomy</p>
                {/* Progress bar */}
                <div className="mt-4 bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2" style={{ width: '75%' }} />
                </div>
                <p className="text-xs opacity-70 mt-2">Do poziomu PEARL: 180 Renomy</p>
              </div>
              {/* Mascot */}
              <div className="bg-[#FDF9F6] rounded-2xl p-4 flex items-center gap-4">
                <div className="text-4xl">🐕</div>
                <div>
                  <p className="text-sm font-medium text-[#3D2B1F]">Sammy kibicuje Ci</p>
                  <p className="text-xs text-[#8B6F5E]">w zdobywaniu kolejnych poziomów! ♥</p>
                </div>
              </div>
              <Link
                href="/klub"
                className="mt-4 block w-full bg-[#D4726A] hover:bg-[#C4625A] text-white text-center font-medium py-3 rounded-full transition-colors"
              >
                Zobacz swój profil
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW VISIT WORKS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-12">
            <div className="text-4xl">🌸</div>
            <h2 className="font-display text-2xl font-bold text-[#3D2B1F]">Jak wygląda wizyta w Zaplątane Studio?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visitSteps.map((step, i) => (
              <div key={step.num} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F5E8E7] flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <div>
                  <p className="text-[#D4726A] text-xs font-bold uppercase tracking-wide mb-1">{step.num}. {step.title}</p>
                  <p className="text-sm text-[#8B6F5E] leading-snug">{step.desc}</p>
                </div>
                {i < visitSteps.length - 1 && (
                  <span className="hidden lg:block text-[#E8D5C4] text-xl mt-3">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-2xl font-bold text-[#3D2B1F]">
              Opinie moich klientek <span className="text-[#D4726A]">♥</span>
            </h2>
            <Link href="/fryzury" className="text-[#D4726A] text-sm uppercase tracking-wide hover:underline">
              Zobacz wszystkie
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#F5EDE8] shadow-sm">
                <div className="flex text-[#C9A96E] text-lg mb-4">
                  {'★'.repeat(t.rating)}
                </div>
                <p className="text-[#8B6F5E] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F5E8E7] flex items-center justify-center text-lg">👩</div>
                  <div>
                    <p className="font-medium text-[#3D2B1F] text-sm">{t.name}</p>
                    <p className="text-[#C9A96E] text-xs">{t.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#D4726A] text-sm uppercase tracking-widest mb-2">@zaplatane.studio</p>
              <h2 className="font-display text-2xl font-bold text-[#3D2B1F] mb-4">
                Zobacz mnie na Instagramie <span className="text-[#D4726A]">♥</span>
              </h2>
              <p className="text-[#8B6F5E] mb-6">Śledź nasze konto, by być na bieżąco z nowymi fryzurami i inspiracjami.</p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-[#3D2B1F] text-[#3D2B1F] hover:bg-[#3D2B1F] hover:text-white font-medium px-6 py-2.5 rounded-full transition-all"
              >
                📸 Obserwuj mnie
              </a>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🪢</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-2xl font-bold text-[#3D2B1F]">Ze świata warkoczów</h2>
            <Link href="/blog" className="text-[#D4726A] text-sm uppercase tracking-wide hover:underline">
              Czytaj więcej
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-[#F5EDE8] shadow-sm hover:shadow-md transition-all">
                <div className="aspect-video bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center">
                  <span className="text-4xl">📖</span>
                </div>
                <div className="p-5">
                  <span className="text-xs text-[#D4726A] font-medium uppercase tracking-wide">{post.category}</span>
                  <h3 className="font-display font-semibold text-[#3D2B1F] group-hover:text-[#D4726A] transition-colors mt-1">{post.title}</h3>
                  <p className="text-sm text-[#8B6F5E] mt-2 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 mt-4 text-xs text-[#C9A96E]">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} czytania</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-16 bg-gradient-to-br from-[#3D2B1F] to-[#5C3D2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex items-center gap-6">
              <div className="text-5xl">✉️</div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Bądź na bieżąco!</h2>
                <p className="text-white/60 mt-2">Nowe fryzury, promocje i porady prosto na Twoją skrzynkę.</p>
              </div>
            </div>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Twój adres e-mail"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-full px-5 py-3 outline-none focus:border-[#D4726A] transition-colors text-sm"
              />
              <button
                type="submit"
                className="bg-[#D4726A] hover:bg-[#C4625A] text-white font-medium px-6 py-3 rounded-full transition-colors whitespace-nowrap"
              >
                Zapisz mnie
              </button>
            </form>
          </div>
          {/* Dog mascot */}
          <div className="mt-8 flex justify-end">
            <div className="text-right">
              <span className="text-4xl">🐕</span>
              <p className="text-white/40 text-xs mt-1">Sammy czeka na Ciebie!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
