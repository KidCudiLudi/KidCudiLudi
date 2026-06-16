'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

type Product = { id: string; name: string; price: number; category: string; slug: string };

export default function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [showPersonalize, setShowPersonalize] = useState(false);
  const [personalization, setPersonalization] = useState('');

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, category: product.category, personalization });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleAddToCart}
          className={`flex-1 font-medium py-3.5 rounded-full transition-all shadow-lg ${
            added
              ? 'bg-green-500 text-white shadow-green-500/20'
              : 'bg-[#D4726A] hover:bg-[#C4625A] text-white shadow-[#D4726A]/20 hover:shadow-xl hover:-translate-y-0.5'
          }`}
        >
          {added ? '✓ Dodano do koszyka!' : '🛒 Dodaj do koszyka'}
        </button>
        <button
          onClick={() => setShowPersonalize(true)}
          className="px-5 border-2 border-[#D4726A] text-[#D4726A] hover:bg-[#D4726A] hover:text-white rounded-full transition-all font-medium text-sm"
        >
          Personalizuj
        </button>
      </div>

      {showPersonalize && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-[#3D2B1F]">Personalizuj zamówienie</h3>
              <button onClick={() => setShowPersonalize(false)} className="text-[#8B6F5E] text-2xl">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">Twoje życzenia</label>
                <textarea
                  rows={3}
                  value={personalization}
                  onChange={(e) => setPersonalization(e.target.value)}
                  placeholder="Opisz czego potrzebujesz — kolor, długość, styl..."
                  className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] resize-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">Zdjęcia inspiracji</label>
                <label className="border-2 border-dashed border-[#F5EDE8] rounded-xl p-6 flex flex-col items-center cursor-pointer hover:border-[#D4726A]/40 transition-colors">
                  <span className="text-3xl mb-2">📎</span>
                  <span className="text-sm text-[#8B6F5E]">Kliknij by dodać zdjęcia</span>
                  <input type="file" className="hidden" multiple accept="image/*" />
                </label>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">Zdjęcia Twoich włosów</label>
                <label className="border-2 border-dashed border-[#F5EDE8] rounded-xl p-6 flex flex-col items-center cursor-pointer hover:border-[#D4726A]/40 transition-colors">
                  <span className="text-3xl mb-2">🖼️</span>
                  <span className="text-sm text-[#8B6F5E]">Kliknij by dodać zdjęcia</span>
                  <input type="file" className="hidden" multiple accept="image/*" />
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowPersonalize(false)} className="flex-1 border border-[#E8D5C4] text-[#8B6F5E] py-3 rounded-full text-sm">Anuluj</button>
              <button onClick={() => { handleAddToCart(); setShowPersonalize(false); }} className="flex-1 bg-[#D4726A] hover:bg-[#C4625A] text-white py-3 rounded-full text-sm font-medium transition-colors">
                Dodaj do koszyka
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
