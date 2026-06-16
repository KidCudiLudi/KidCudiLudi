import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#3D2B1F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#D4726A]/20 flex items-center justify-center text-xl">🪢</div>
              <div>
                <div className="font-display font-semibold text-lg leading-tight">Zaplątane</div>
                <div className="text-[#C9A96E] text-xs tracking-[0.15em] uppercase leading-tight">— Studio —</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Piękne warkocze, stworzone dla Ciebie. Profesjonalne zaplatanie włosów, akcesoria i wiedza.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: '📸', label: 'Instagram', href: '#' },
                { icon: '🎵', label: 'TikTok', href: '#' },
                { icon: '📘', label: 'Facebook', href: '#' },
                { icon: '📌', label: 'Pinterest', href: '#' },
              ].map((s) => (
                <a key={s.label} href={s.href} className="w-9 h-9 bg-white/10 hover:bg-[#D4726A] rounded-full flex items-center justify-center transition-colors text-sm" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-[#C9A96E] mb-4">Nawigacja</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {['Strona główna', 'Fryzury', 'Sklep', 'Ebooki', 'O mnie', 'Kontakt', 'Blog', 'Klub Zaplątanych'].map((item) => (
                <li key={item}><Link href="#" className="hover:text-[#D4726A] transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-[#C9A96E] mb-4">Obsługa Klienta</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {[
                'Jak umówić wizytę?',
                'Płatności i dostawa',
                'Zwroty i reklamacje',
                'Regulamin',
                'Polityka prywatności',
                'FAQ',
              ].map((item) => (
                <li key={item}><Link href="/regulamin" className="hover:text-[#D4726A] transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-[#C9A96E] mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <span>✉️</span>
                <span>zaplatane.studio@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📞</span>
                <span>+48 123 456 789</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Wrocław</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🕐</span>
                <div>
                  <div>Pon–Pt: 9:00–19:00</div>
                  <div>Sobota: 10:00–16:00</div>
                </div>
              </li>
            </ul>
            {/* Payments */}
            <div className="mt-6">
              <h4 className="font-display text-xs uppercase tracking-widest text-[#C9A96E] mb-3">Płatności</h4>
              <div className="flex flex-wrap gap-2">
                {['BLIK', 'Visa', 'MC', 'Apple Pay', 'G Pay'].map((p) => (
                  <span key={p} className="bg-white/10 rounded px-2 py-1 text-xs text-white/70">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© 2024 Zaplątane Studio. Wszelkie prawa zastrzeżone.</p>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>🔒</span>
            <span>Bezpieczne zakupy — SSL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
