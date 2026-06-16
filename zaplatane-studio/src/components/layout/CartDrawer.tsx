'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

type Props = { open: boolean; onClose: () => void };

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQuantity, total, count } = useCart();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={onClose} />
      )}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F5EDE8]">
          <h2 className="font-display font-bold text-[#3D2B1F] text-lg">
            Koszyk {count > 0 && <span className="text-[#D4726A]">({count})</span>}
          </h2>
          <button onClick={onClose} className="text-[#8B6F5E] hover:text-[#3D2B1F] text-2xl">×</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-[#8B6F5E]">Koszyk jest pusty</p>
              <p className="text-xs text-[#C9A96E] mt-1">Sammy czeka na Twoje zamówienie 🐕</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-[#F5EDE8] pb-4">
                  <div className="w-16 h-16 bg-[#F5E8E7] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {item.category === 'ebooki' ? '📖' : '🪢'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#3D2B1F] text-sm truncate">{item.name}</p>
                    <p className="text-[#D4726A] font-bold">{item.price} zł</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 bg-[#F5EDE8] rounded-full text-sm flex items-center justify-center hover:bg-[#D4726A] hover:text-white transition-colors">−</button>
                      <span className="text-sm font-medium text-[#3D2B1F] w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 bg-[#F5EDE8] rounded-full text-sm flex items-center justify-center hover:bg-[#D4726A] hover:text-white transition-colors">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-[#C9A96E] hover:text-[#D4726A] transition-colors text-xl self-start">×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#F5EDE8] px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display font-bold text-[#3D2B1F]">Razem</span>
              <span className="font-display font-bold text-[#D4726A] text-xl">{total} zł</span>
            </div>
            <Link
              href="/sklep/koszyk"
              onClick={onClose}
              className="block w-full bg-[#D4726A] hover:bg-[#C4625A] text-white text-center font-medium py-3.5 rounded-full transition-colors"
            >
              Przejdź do kasy
            </Link>
            <button onClick={onClose} className="block w-full text-center text-sm text-[#8B6F5E] mt-3 hover:text-[#D4726A]">
              Kontynuuj zakupy
            </button>
          </div>
        )}
      </div>
    </>
  );
}
