'use client';
import { useState } from 'react';

const sidebarLinks = [
  { icon: '📊', label: 'Dashboard', key: 'dashboard' },
  { icon: '📅', label: 'Wizyty', key: 'wizyty' },
  { icon: '👩', label: 'Klientki', key: 'klientki' },
  { icon: '🪢', label: 'Fryzury', key: 'fryzury' },
  { icon: '🛍️', label: 'Sklep', key: 'sklep' },
  { icon: '✍️', label: 'Blog', key: 'blog' },
  { icon: '🎟️', label: 'Kupony', key: 'kupony' },
  { icon: '💎', label: 'Klub', key: 'klub' },
  { icon: '⭐', label: 'Opinie', key: 'opinie' },
  { icon: '✉️', label: 'Newsletter', key: 'newsletter' },
  { icon: '⚙️', label: 'Ustawienia', key: 'ustawienia' },
];

const stats = [
  { label: 'Przychody dziś', value: '2 400 zł', change: '+12%', icon: '💰', positive: true },
  { label: 'Wizyty (mies.)', value: '156', change: '+8%', icon: '📅', positive: true },
  { label: 'Nowe klientki', value: '892', change: '+15%', icon: '👩', positive: true },
  { label: 'Zamówienia', value: '312', change: '+22%', icon: '📦', positive: true },
];

const recentBookings = [
  { client: 'Klaudia M.', style: 'Boho Braids', date: '2024-05-15 14:00', status: 'Potwierdzona', price: 450 },
  { client: 'Martyna K.', style: 'Knotless Braids', date: '2024-05-16 10:00', status: 'Oczekuje', price: 400 },
  { client: 'Natalia W.', style: 'Stitch Braids', date: '2024-05-17 12:00', status: 'Potwierdzona', price: 380 },
  { client: 'Aleksandra P.', style: 'Cornrows', date: '2024-05-18 9:00', status: 'Oczekuje', price: 280 },
  { client: 'Zofia T.', style: 'Goddess Braids', date: '2024-05-19 15:00', status: 'Potwierdzona', price: 400 },
];

const popularStyles = [
  { name: 'Boho Braids', count: 42, pct: 28 },
  { name: 'Knotless Braids', count: 38, pct: 25 },
  { name: 'Box Braids', count: 30, pct: 20 },
  { name: 'Stitch Braids', count: 24, pct: 16 },
  { name: 'Inne', count: 22, pct: 11 },
];

const weeklyRevenue = [1200, 1800, 1500, 2200, 1900, 2800, 2400];
const weekDays = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];
const maxRev = Math.max(...weeklyRevenue);

export default function AdminPage() {
  const [active, setActive] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#FDF9F6] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#3D2B1F] flex flex-col min-h-screen">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪢</span>
            <div>
              <p className="font-display text-white font-semibold text-sm leading-tight">Zaplątane Studio</p>
              <p className="text-[#C9A96E] text-xs">Panel Administratora</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          {sidebarLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => setActive(link.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm transition-all text-left ${
                active === link.key
                  ? 'bg-[#D4726A] text-white font-medium'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4726A]/20 flex items-center justify-center text-xl">👩</div>
            <div>
              <p className="text-white text-sm font-medium">Admin</p>
              <p className="text-white/40 text-xs">zaplatane.studio</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        {active === 'dashboard' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-2xl font-bold text-[#3D2B1F]">Dashboard</h1>
                <p className="text-[#8B6F5E] text-sm mt-1">Maj 2024 — przegląd</p>
              </div>
              <div className="flex gap-2">
                {['Dziś', 'Tydzień', 'Miesiąc', 'Rok'].map((p) => (
                  <button
                    key={p}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      p === 'Miesiąc' ? 'bg-[#D4726A] text-white' : 'bg-white border border-[#F5EDE8] text-[#8B6F5E] hover:border-[#D4726A]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-[#F5EDE8] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{s.icon}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      s.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {s.change}
                    </span>
                  </div>
                  <p className="font-display text-2xl font-bold text-[#3D2B1F]">{s.value}</p>
                  <p className="text-xs text-[#8B6F5E] mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Revenue chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[#F5EDE8] p-6 shadow-sm">
                <h3 className="font-display font-bold text-[#3D2B1F] mb-6">Przychody (ostatni tydzień)</h3>
                <div className="flex items-end gap-3 h-40">
                  {weeklyRevenue.map((rev, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-[#8B6F5E]">{rev.toLocaleString()}</span>
                      <div
                        className="w-full bg-gradient-to-t from-[#D4726A] to-[#E8A4A0] rounded-t-lg transition-all"
                        style={{ height: `${(rev / maxRev) * 120}px` }}
                      />
                      <span className="text-xs text-[#8B6F5E]">{weekDays[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular styles */}
              <div className="bg-white rounded-2xl border border-[#F5EDE8] p-6 shadow-sm">
                <h3 className="font-display font-bold text-[#3D2B1F] mb-6">Popularne fryzury</h3>
                <div className="space-y-4">
                  {popularStyles.map((style) => (
                    <div key={style.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-[#3D2B1F] font-medium">{style.name}</span>
                        <span className="text-[#8B6F5E]">{style.count}</span>
                      </div>
                      <div className="h-2 bg-[#F5EDE8] rounded-full">
                        <div
                          className="h-2 bg-gradient-to-r from-[#D4726A] to-[#E8A4A0] rounded-full"
                          style={{ width: `${style.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent bookings */}
            <div className="bg-white rounded-2xl border border-[#F5EDE8] shadow-sm">
              <div className="flex items-center justify-between p-6 border-b border-[#F5EDE8]">
                <h3 className="font-display font-bold text-[#3D2B1F]">Nadchodzące wizyty</h3>
                <button className="text-[#D4726A] text-sm hover:underline">Zobacz wszystkie</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-[#F5EDE8]">
                      {['Klientka', 'Fryzura', 'Data i godzina', 'Status', 'Kwota'].map((h) => (
                        <th key={h} className="px-6 py-3 text-xs font-medium text-[#8B6F5E] uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b, i) => (
                      <tr key={i} className="border-b border-[#F5EDE8] last:border-0 hover:bg-[#FDF9F6] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#F5E8E7] flex items-center justify-center text-sm">👩</div>
                            <span className="text-sm font-medium text-[#3D2B1F]">{b.client}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#8B6F5E]">{b.style}</td>
                        <td className="px-6 py-4 text-sm text-[#8B6F5E]">{b.date}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            b.status === 'Potwierdzona'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-yellow-50 text-yellow-700'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-[#D4726A]">{b.price} zł</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {active !== 'dashboard' && (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">🚧</div>
            <h2 className="font-display text-2xl font-bold text-[#3D2B1F] mb-2">
              {sidebarLinks.find((l) => l.key === active)?.label}
            </h2>
            <p className="text-[#8B6F5E]">Sekcja w trakcie budowy. Sammy pracuje nad tym!</p>
            <div className="text-4xl mt-4">🐕</div>
          </div>
        )}
      </main>
    </div>
  );
}
