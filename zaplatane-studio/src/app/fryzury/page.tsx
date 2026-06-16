'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HAIR_STYLES } from '@/lib/utils';

const categories = ['Wszystkie', 'Braidy', 'Ponytaile', 'Cornrows'];
const difficulties = ['Wszystkie', 'Łatwy', 'Średni', 'Trudny'];

export default function FryzuryPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Wszystkie');
  const [difficulty, setDifficulty] = useState('Wszystkie');
  const [sortBy, setSortBy] = useState('Popularne');
  const [showQuizModal, setShowQuizModal] = useState(false);

  const filtered = HAIR_STYLES.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Wszystkie' || s.category === category.toLowerCase();
    const matchDiff = difficulty === 'Wszystkie' || s.difficulty === difficulty;
    return matchSearch && matchCat && matchDiff;
  });

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#F5EDE8] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-[#3D2B1F] mb-2">Katalog Fryzur</h1>
          <p className="text-[#8B6F5E]">Odkryj nasze fryzury i znajdź idealną dla siebie</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#F5EDE8] p-5 sticky top-20">
              <h3 className="font-display font-bold text-[#3D2B1F] mb-4">Filtry</h3>

              <div className="mb-5">
                <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium mb-2 block">Rodzaj fryzury</label>
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`block w-full text-left text-sm py-1.5 px-2 rounded-lg mb-1 transition-colors ${
                      category === c ? 'bg-[#F5E8E7] text-[#D4726A] font-medium' : 'text-[#8B6F5E] hover:text-[#D4726A]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="mb-5">
                <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium mb-2 block">Poziom trudności</label>
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`block w-full text-left text-sm py-1.5 px-2 rounded-lg mb-1 transition-colors ${
                      difficulty === d ? 'bg-[#F5E8E7] text-[#D4726A] font-medium' : 'text-[#8B6F5E] hover:text-[#D4726A]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="mb-5">
                <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium mb-2 block">Cena (zł)</label>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Od" className="w-full border border-[#F5EDE8] rounded-lg px-2 py-1.5 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A]" />
                  <span className="text-[#8B6F5E]">–</span>
                  <input type="number" placeholder="Do" className="w-full border border-[#F5EDE8] rounded-lg px-2 py-1.5 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A]" />
                </div>
              </div>

              <button
                className="w-full bg-[#F5E8E7] hover:bg-[#D4726A] hover:text-white text-[#D4726A] font-medium py-2.5 rounded-full text-sm transition-colors"
                onClick={() => { setCategory('Wszystkie'); setDifficulty('Wszystkie'); setSearch(''); }}
              >
                Resetuj filtry
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Search + sort bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Szukaj fryzury..."
                  className="w-full border border-[#F5EDE8] bg-white rounded-full px-5 py-2.5 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] pl-10"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C9A96E]">🔍</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-[#F5EDE8] bg-white rounded-full px-4 py-2.5 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A]"
              >
                {['Popularne', 'Cena rosnąco', 'Cena malejąco', 'Najnowsze'].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <p className="text-sm text-[#8B6F5E] mb-6">Znaleziono: <strong className="text-[#3D2B1F]">{filtered.length}</strong> fryzur</p>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((style) => (
                <div key={style.id} className="bg-white rounded-2xl overflow-hidden border border-[#F5EDE8] shadow-sm hover:shadow-md transition-all group">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl">🪢</div>
                      <p className="text-[#D4726A] text-xs mt-1">Zdjęcie fryzury</p>
                    </div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-[#D4726A] hover:bg-[#D4726A] hover:text-white transition-colors text-lg">
                      ♡
                    </button>
                    {style.isBestseller && (
                      <span className="absolute bottom-3 left-3 bg-[#C9A96E] text-white text-xs px-2 py-0.5 rounded-full font-medium">⭐ Bestseller</span>
                    )}
                    {style.isNew && (
                      <span className="absolute bottom-3 left-3 bg-[#D4726A] text-white text-xs px-2 py-0.5 rounded-full font-medium">✨ Nowość</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-[#3D2B1F] group-hover:text-[#D4726A] transition-colors">{style.name}</h3>
                    <p className="text-[#D4726A] font-medium mt-1">od {style.price} zł</p>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-[#8B6F5E]">
                      <div className="flex items-center gap-1">⏱ {style.duration}</div>
                      <div className="flex items-center gap-1">📅 {style.wearTime}</div>
                      <div className="flex items-center gap-1">📊 {style.difficulty}</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Link
                        href={`/fryzury/${style.slug}`}
                        className="flex-1 border border-[#D4726A] text-[#D4726A] hover:bg-[#D4726A] hover:text-white text-center text-sm font-medium py-2 rounded-full transition-colors"
                      >
                        Szczegóły
                      </Link>
                      <Link
                        href="/rezerwacja"
                        className="flex-1 bg-[#D4726A] hover:bg-[#C4625A] text-white text-center text-sm font-medium py-2 rounded-full transition-colors"
                      >
                        Rezerwuj
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz floating button */}
      <button
        onClick={() => setShowQuizModal(true)}
        className="fixed bottom-8 right-8 bg-[#D4726A] hover:bg-[#C4625A] text-white font-medium px-5 py-3.5 rounded-full shadow-lg shadow-[#D4726A]/30 hover:shadow-xl transition-all flex items-center gap-2 text-sm"
      >
        ✨ Czy ta fryzura jest dla mnie?
      </button>

      {/* Quiz modal */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="text-5xl mb-4">👧</div>
            <h3 className="font-display text-xl font-bold text-[#3D2B1F] mb-2">Odkryj swoją fryzurę!</h3>
            <p className="text-[#8B6F5E] text-sm mb-6">Odpowiedz na kilka pytań, a ja dobiorę dla Ciebie idealną fryzurę.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowQuizModal(false)} className="flex-1 border border-[#E8D5C4] text-[#8B6F5E] py-2.5 rounded-full text-sm">Anuluj</button>
              <Link href="/quiz" className="flex-1 bg-[#D4726A] text-white py-2.5 rounded-full text-sm font-medium hover:bg-[#C4625A] transition-colors" onClick={() => setShowQuizModal(false)}>
                Zaczynamy!
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
