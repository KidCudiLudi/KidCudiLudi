import Link from 'next/link';
import { PRODUCTS } from '@/lib/utils';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductActions from './ProductActions';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return { title: `${product.name} — Sklep Zaplątane Studio` };
}

const categoryLabels: Record<string, string> = {
  sety: 'Sety wielorazowe', ponytaile: 'Ponytaile', akcesoria: 'Akcesoria', ebooki: 'Ebooki',
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  const isDigital = product.category === 'ebooki';
  const isHygiene = product.category === 'ponytaile' || product.category === 'sety';

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#F5EDE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#8B6F5E]">
            <Link href="/" className="hover:text-[#D4726A]">Strona główna</Link>
            <span>/</span>
            <Link href="/sklep" className="hover:text-[#D4726A]">Sklep</Link>
            <span>/</span>
            <span className="text-[#3D2B1F] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] rounded-3xl flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-9xl">
                  {product.category === 'ebooki' ? '📖' : product.category === 'ponytaile' ? '🎀' : product.category === 'akcesoria' ? '✨' : '🪢'}
                </div>
                <p className="text-[#D4726A] text-sm mt-3 font-medium">Zdjęcie produktu</p>
                <p className="text-[#C9A96E] text-xs mt-1">Dodaj zdjęcia w panelu admina</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-[#F5EDE8] rounded-xl flex items-center justify-center text-xl cursor-pointer hover:ring-2 hover:ring-[#D4726A] transition-all">
                  {product.category === 'ebooki' ? '📖' : '🪢'}
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="text-xs text-[#C9A96E] font-medium uppercase tracking-wide">
              {categoryLabels[product.category]}
            </span>
            <h1 className="font-display text-3xl font-bold text-[#3D2B1F] mt-1 mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-[#C9A96E]">{'★★★★★'}</div>
              <span className="text-sm text-[#8B6F5E]">4.8 (16 opinii)</span>
            </div>

            <p className="font-display text-4xl font-bold text-[#D4726A] mb-6">{product.price} zł</p>

            {/* Description placeholder */}
            <div className="bg-white border border-[#F5EDE8] rounded-2xl p-5 mb-6">
              <h3 className="font-medium text-[#3D2B1F] mb-2">O produkcie</h3>
              <p className="text-sm text-[#8B6F5E] leading-relaxed">
                Szczegółowy opis produktu {product.name} zostanie dodany wkrótce. Skontaktuj się ze mną, jeśli masz pytania.
              </p>
            </div>

            {/* Hygiene / digital warnings */}
            {isHygiene && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4 text-xs text-yellow-800">
                ⚠️ Produkt higieniczny — po rozpakowaniu nie podlega zwrotowi (zgodnie z regulaminem).
              </div>
            )}
            {isDigital && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-xs text-blue-800">
                📲 Produkt cyfrowy — dostęp natychmiastowy po zakupie. Nie podlega zwrotowi po pobraniu.
              </div>
            )}

            {/* Client actions */}
            <ProductActions product={product} />
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#3D2B1F] mb-8">Podobne produkty</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link key={p.id} href={`/sklep/${p.slug}`} className="group bg-white border border-[#F5EDE8] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-video bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center text-4xl">
                    {p.category === 'ebooki' ? '📖' : '🪢'}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-[#3D2B1F] group-hover:text-[#D4726A] transition-colors text-sm">{p.name}</h3>
                    <p className="text-[#D4726A] font-bold mt-1">{p.price} zł</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
