'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { icon: '📊', label: 'Dashboard', href: '/admin' },
  { icon: '📅', label: 'Wizyty', href: '/admin/wizyty' },
  { icon: '👩', label: 'Klientki', href: '/admin/klientki' },
  { icon: '🪢', label: 'Fryzury', href: '/admin/fryzury' },
  { icon: '🛍️', label: 'Sklep', href: '/admin/sklep' },
  { icon: '✍️', label: 'Blog', href: '/admin/blog' },
  { icon: '🎟️', label: 'Kupony', href: '/admin/kupony' },
  { icon: '💎', label: 'Klub', href: '/admin/klub' },
  { icon: '⭐', label: 'Opinie', href: '/admin/opinie' },
  { icon: '✉️', label: 'Newsletter', href: '/admin/newsletter' },
  { icon: '⚙️', label: 'Ustawienia', href: '/admin/ustawienia' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <div className="min-h-screen bg-[#FDF9F6] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#3D2B1F] flex flex-col min-h-screen fixed top-0 left-0 z-20">
        <div className="p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🪢</span>
            <div>
              <p className="font-display text-white font-semibold text-sm leading-tight">Zaplątane</p>
              <p className="text-[#C9A96E] text-xs">Panel Admina</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 overflow-y-auto">
          {nav.map((item) => {
            const active = path === item.href || (item.href !== '/admin' && path.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm transition-all ${
                  active ? 'bg-[#D4726A] text-white font-medium' : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#D4726A]/30 flex items-center justify-center text-lg">👩</div>
            <div>
              <p className="text-white text-xs font-medium">Administrator</p>
              <p className="text-white/40 text-xs">zaplatane.studio</p>
            </div>
          </div>
          <Link href="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">← Wróć do strony</Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-56 min-h-screen">
        {children}
      </main>
    </div>
  );
}
