'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import CartDrawer from './CartDrawer';

const navLinks = [
  { href: '/', label: 'Strona Główna' },
  { href: '/fryzury', label: 'Fryzury' },
  { href: '/sklep', label: 'Sklep' },
  { href: '/blog', label: 'Blog' },
  { href: '/o-mnie', label: 'O mnie' },
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/rezerwacja', label: 'Rezerwacja' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();
  const { user } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#F5EDE8] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#F5E8E7] flex items-center justify-center text-xl">🪢</div>
              <div>
                <div className="font-display font-semibold text-[#3D2B1F] text-lg leading-tight">Zaplątane</div>
                <div className="text-[#C9A96E] text-xs tracking-[0.15em] uppercase leading-tight">— Studio —</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-[#8B6F5E] hover:text-[#D4726A] transition-colors uppercase tracking-wide">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-2">
              <button className="text-[#8B6F5E] hover:text-[#D4726A] transition-colors p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {user ? (
                <Link href="/konto" className="hidden sm:flex items-center gap-1.5 text-sm text-[#8B6F5E] hover:text-[#D4726A] transition-colors">
                  <div className="w-7 h-7 rounded-full bg-[#D4726A] flex items-center justify-center text-white text-xs font-bold">
                    {user.name[0]}
                  </div>
                  <span className="font-medium text-xs uppercase tracking-wide hidden lg:block">{user.name}</span>
                </Link>
              ) : (
                <Link href="/logowanie" className="hidden sm:flex items-center gap-1 text-sm text-[#8B6F5E] hover:text-[#D4726A] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium text-xs uppercase tracking-wide hidden lg:block">Moje Konto</span>
                </Link>
              )}

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-[#8B6F5E] hover:text-[#D4726A] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4726A] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {count}
                  </span>
                )}
              </button>

              <button className="md:hidden p-2 text-[#8B6F5E]" onClick={() => setMobileOpen(!mobileOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden py-4 border-t border-[#F5EDE8]">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block py-3 text-sm font-medium text-[#8B6F5E] hover:text-[#D4726A] uppercase tracking-wide" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href={user ? '/konto' : '/logowanie'} className="block py-3 text-sm font-medium text-[#8B6F5E] hover:text-[#D4726A] uppercase tracking-wide" onClick={() => setMobileOpen(false)}>
                {user ? 'Moje Konto' : 'Logowanie'}
              </Link>
            </div>
          )}
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
