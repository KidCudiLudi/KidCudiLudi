import Link from 'next/link';
import { HAIR_STYLES, TESTIMONIALS } from '@/lib/utils';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import StyleActions from './StyleActions';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return HAIR_STYLES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const style = HAIR_STYLES.find((s) => s.slug === slug);
  if (!style) return {};
  return {
    title: `${style.name} — Zaplątane Studio`,
    description: `Fryzura ${style.name} — od ${style.price} zł. Czas wykonania: ${style.duration}. Umów wizytę online.`,
  };
}

export default async function StylePage({ params }: Props) {
  const { slug } = await params;
  const style = HAIR_STYLES.find((s) => s.slug === slug);
  if (!style) notFound();

  const related = HAIR_STYLES.filter((s) => s.id !== style.id).slice(0, 3);

  const difficultyColor = {
    'Łatwy': 'bg-green-50 text-green-700',
    'Średni': 'bg-yellow-50 text-yellow-700',
    'Trudny': 'bg-red-50 text-red-700',
  }[style.difficulty] ?? 'bg-gray-50 text-gray-700';

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#F5EDE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#8B6F5E]">
            <Link href="/" className="hover:text-[#D4726A]">Strona główna</Link>
            <span>/</span>
            <Link href="/fryzury" className="hover:text-[#D4726A]">Fryzury</Link>
            <span>/</span>
            <span className="text-[#3D2B1F] font-medium">{style.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            {/* Main image */}
            <div className="aspect-square bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] rounded-3xl flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-9xl">🪢</div>
                <p className="text-[#D4726A] text-sm mt-3 font-medium">Zdjęcie główne</p>
                <p className="text-[#C9A96E] text-xs mt-1">Dodaj zdjęcia w panelu admina</p>
              </div>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-[#F5EDE8] to-[#E8D5C4] rounded-xl flex items-center justify-center text-2xl cursor-pointer hover:ring-2 hover:ring-[#D4726A] transition-all">
                  🪢
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {style.isBestseller && <span className="bg-[#C9A96E] text-white text-xs px-2 py-0.5 rounded-full font-medium">⭐ Bestseller</span>}
              {style.isNew && <span className="bg-[#D4726A] text-white text-xs px-2 py-0.5 rounded-full font-medium">✨ Nowość</span>}
            </div>

            <h1 className="font-display text-3xl font-bold text-[#3D2B1F] mb-2">{style.name}</h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-[#C9A96E]">{'★★★★★'}</div>
              <span className="text-sm text-[#8B6F5E]">4.9 (38 opinii)</span>
            </div>

            <p className="font-display text-4xl font-bold text-[#D4726A] mb-6">
              od {style.price} zł
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: '⏱', label: 'Czas wykonania', value: style.duration },
                { icon: '📅', label: 'Czas noszenia', value: style.wearTime },
                { icon: '📊', label: 'Poziom trudności', value: style.difficulty, badge: difficultyColor },
                { icon: '👩', label: 'Dla kogo', value: 'Dla każdego' },
              ].map((spec) => (
                <div key={spec.label} className="bg-white border border-[#F5EDE8] rounded-xl p-3">
                  <p className="text-xs text-[#C9A96E] mb-1">{spec.icon} {spec.label}</p>
                  {spec.badge ? (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${spec.badge}`}>{spec.value}</span>
                  ) : (
                    <p className="text-sm font-medium text-[#3D2B1F]">{spec.value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Description placeholder */}
            <div className="bg-[#FDF9F6] border border-[#F5EDE8] rounded-2xl p-5 mb-6">
              <p className="text-[#8B6F5E] text-sm leading-relaxed">
                Opis fryzury {style.name} zostanie dodany wkrótce. Skontaktuj się ze mną, aby dowiedzieć się więcej o tej stylizacji i sprawdzić, czy jest odpowiednia dla Twoich włosów.
              </p>
            </div>

            {/* CTA buttons — client component */}
            <StyleActions style={style} />

            {/* Deposit info */}
            <div className="mt-4 bg-[#F5E8E7] rounded-2xl p-4 flex items-start gap-3">
              <span className="text-xl mt-0.5">💡</span>
              <div>
                <p className="text-sm font-medium text-[#3D2B1F]">Zadatek bezzwrotny: 100 zł</p>
                <p className="text-xs text-[#8B6F5E] mt-1">Resztę ({style.price - 100} zł) płacisz gotówką lub kartą w dniu wizyty.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Care section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: '💧', title: 'Nawilżanie', desc: 'Nawilżaj skórę głowy i warkocze specjalnym olejkiem co 2–3 dni. Unikaj nadmiaru produktów.' },
            { icon: '🛁', title: 'Mycie', desc: 'Myj warkocze raz w tygodniu szamponem bez siarczanów. Delikatnie masuj skórę głowy.' },
            { icon: '😴', title: 'Sen', desc: 'Śpij w satynowej czapce lub na satynowej poszewce, aby redukować tarcie i zachować fryzurę dłużej.' },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-[#F5EDE8] rounded-2xl p-6 shadow-sm">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-display font-bold text-[#3D2B1F] mb-2">{item.title}</h3>
              <p className="text-sm text-[#8B6F5E] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[#3D2B1F] mb-8">
            Opinie klientek <span className="text-[#D4726A]">♥</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <div key={i} className="bg-white border border-[#F5EDE8] rounded-2xl p-5 shadow-sm">
                <div className="flex text-[#C9A96E] text-lg mb-3">{'★'.repeat(t.rating)}</div>
                <p className="text-[#8B6F5E] text-sm leading-relaxed italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#F5E8E7] flex items-center justify-center">👩</div>
                  <div>
                    <p className="text-sm font-medium text-[#3D2B1F]">{t.name}</p>
                    <p className="text-xs text-[#C9A96E]">{t.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related styles */}
        <div>
          <h2 className="font-display text-2xl font-bold text-[#3D2B1F] mb-8">Podobne fryzury</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((s) => (
              <Link key={s.id} href={`/fryzury/${s.slug}`} className="group bg-white border border-[#F5EDE8] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="aspect-video bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center text-4xl">🪢</div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-[#3D2B1F] group-hover:text-[#D4726A] transition-colors">{s.name}</h3>
                  <p className="text-[#D4726A] font-medium mt-1 text-sm">od {s.price} zł</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
