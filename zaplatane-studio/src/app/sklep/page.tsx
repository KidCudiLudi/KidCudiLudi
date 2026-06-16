'use client';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/utils';

const categories = [
  { key: 'all', label: 'Wszystkie', icon: '🛍️' },
  { key: 'sety', label: 'Sety wielorazowe', icon: '🪢' },
  { key: 'ponytaile', label: 'Ponytaile', icon: '🎀' },
  { key: 'akcesoria', label: 'Akcesoria', icon: '✨' },
  { key: 'ebooki', label: 'Ebooki', icon: '📖' },
];

type PersonalizationForm = {
  message: string;
  productName: string;
};

export default function SklepPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [personalizing, setPersonalizing] = useState<PersonalizationForm | null>(null);
  const [cart, setCart] = useState<string[]>([]);

  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const addToCart = (id: string) => setCart([...cart, id]);

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#F5EDE8] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-[#3D2B1F] mb-2">Sklep</h1>
          <p className="text-[#8B6F5E]">Włosy, akcesoria, zestawy i poradniki</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar categories */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#F5EDE8] p-5 sticky top-20">
              <h3 className="font-display font-bold text-[#3D2B1F] mb-4">Kategorie</h3>
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActiveCategory(c.key)}
                  className={`flex items-center gap-3 w-full text-left py-2.5 px-3 rounded-xl mb-1 transition-colors text-sm ${
                    activeCategory === c.key
                      ? 'bg-[#F5E8E7] text-[#D4726A] font-medium'
                      : 'text-[#8B6F5E] hover:text-[#D4726A] hover:bg-[#F5E8E7]/50'
                  }`}
                >
                  <span>{c.icon}</span>
                  {c.label}
                </button>
              ))}

              {/* Personalization info */}
              <div className="mt-6 bg-[#F5E8E7] rounded-xl p-4">
                <h4 className="font-display font-semibold text-[#3D2B1F] text-sm mb-2">Personalizacja</h4>
                <p className="text-xs text-[#8B6F5E] leading-relaxed">
                  Powiedz nam czego potrzebujesz! Każdy produkt możesz spersonalizować.
                </p>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="lg:col-span-3">
            <p className="text-sm text-[#8B6F5E] mb-6">
              Pokazuję: <strong className="text-[#3D2B1F]">{filtered.length}</strong> produktów
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-[#F5EDE8] shadow-sm hover:shadow-md transition-all group">
                  {/* Image */}
                  <div className="aspect-square bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center relative">
                    <div className="text-center">
                      <div className="text-6xl">
                        {product.category === 'ebooki' ? '📖' : product.category === 'ponytaile' ? '🎀' : product.category === 'akcesoria' ? '✨' : '🪢'}
                      </div>
                      <p className="text-[#D4726A] text-xs mt-1">Zdjęcie produktu</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-[#C9A96E] font-medium uppercase tracking-wide">
                      {categories.find((c) => c.key === product.category)?.label}
                    </span>
                    <h3 className="font-display font-semibold text-[#3D2B1F] mt-1 group-hover:text-[#D4726A] transition-colors">
                      {product.name}
                    </h3>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mt-1">
                      {'★★★★★'.split('').map((s, i) => (
                        <span key={i} className="text-[#C9A96E] text-sm">{s}</span>
                      ))}
                      <span className="text-xs text-[#8B6F5E] ml-1">(24)</span>
                    </div>
                    {/* Color swatches (for applicable products) */}
                    {product.category === 'sety' && (
                      <div className="flex gap-1 mt-2">
                        {['#8B4513', '#5C3D2E', '#D4726A', '#C9A96E', '#E8D5C4'].map((c) => (
                          <div key={c} className="w-4 h-4 rounded-full border border-white shadow-sm cursor-pointer" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    )}
                    <p className="text-[#D4726A] font-bold text-lg mt-2">{product.price} zł</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setPersonalizing({ message: '', productName: product.name })}
                        className="flex-1 border border-[#D4726A] text-[#D4726A] hover:bg-[#F5E8E7] text-sm font-medium py-2 rounded-full transition-colors"
                      >
                        Personalizuj
                      </button>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="flex-1 bg-[#D4726A] hover:bg-[#C4625A] text-white text-sm font-medium py-2 rounded-full transition-colors flex items-center justify-center gap-1"
                      >
                        🛒 Kup
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Personalization Modal */}
      {personalizing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-[#3D2B1F]">
                Personalizuj swój zestaw
              </h3>
              <button onClick={() => setPersonalizing(null)} className="text-[#8B6F5E] hover:text-[#3D2B1F] text-2xl">×</button>
            </div>
            <p className="text-sm text-[#8B6F5E] mb-6">
              Produkt: <strong className="text-[#3D2B1F]">{personalizing.productName}</strong>
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium mb-1 block">Napisz czego potrzebujesz</label>
                <textarea
                  rows={3}
                  value={personalizing.message}
                  onChange={(e) => setPersonalizing({ ...personalizing, message: e.target.value })}
                  placeholder="Napisz coś..."
                  className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] resize-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium mb-1 block">Zdjęcia inspiracji</label>
                <div className="border-2 border-dashed border-[#F5EDE8] rounded-xl p-6 text-center cursor-pointer hover:border-[#D4726A]/40 transition-colors">
                  <div className="text-3xl mb-2">📎</div>
                  <p className="text-sm text-[#8B6F5E]">Dodaj zdjęcia</p>
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium mb-1 block">Zdjęcia Twoich włosów</label>
                <div className="border-2 border-dashed border-[#F5EDE8] rounded-xl p-6 text-center cursor-pointer hover:border-[#D4726A]/40 transition-colors">
                  <div className="text-3xl mb-2">🖼️</div>
                  <p className="text-sm text-[#8B6F5E]">Dodaj zdjęcia</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setPersonalizing(null)} className="flex-1 border border-[#E8D5C4] text-[#8B6F5E] py-3 rounded-full text-sm">Anuluj</button>
              <button className="flex-1 bg-[#D4726A] hover:bg-[#C4625A] text-white py-3 rounded-full text-sm font-medium transition-colors">
                Dodaj do koszyka
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
