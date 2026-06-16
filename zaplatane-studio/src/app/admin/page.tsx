'use client';
import { useState } from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/admin/StatusBadge';

const stats = [
  { label: 'Przychody (maj)', value: '24 580 zł', change: '+12%', icon: '💰', positive: true, sub: 'vs kwiecień' },
  { label: 'Wizyty (maj)', value: '156', change: '+8%', icon: '📅', positive: true, sub: 'potwierdzone' },
  { label: 'Klientki łącznie', value: '892', change: '+15%', icon: '👩', positive: true, sub: 'zarejestrowane' },
  { label: 'Zamówienia', value: '312', change: '+22%', icon: '📦', positive: true, sub: 'zrealizowane' },
];

const recentBookings = [
  { client: 'Klaudia M.', style: 'Boho Braids', date: '2024-05-15', time: '14:00', status: 'confirmed', price: 450 },
  { client: 'Martyna K.', style: 'Knotless Braids', date: '2024-05-16', time: '10:00', status: 'pending', price: 400 },
  { client: 'Natalia W.', style: 'Stitch Braids', date: '2024-05-17', time: '12:00', status: 'confirmed', price: 380 },
  { client: 'Aleksandra P.', style: 'Cornrows', date: '2024-05-18', time: '9:00', status: 'pending', price: 280 },
  { client: 'Zofia T.', style: 'Goddess Braids', date: '2024-05-19', time: '15:00', status: 'confirmed', price: 400 },
];

const recentOrders = [
  { id: '#001', client: 'Klaudia M.', product: 'Set Premium Rose', status: 'completed', price: 249 },
  { id: '#002', client: 'Anna P.', product: 'Ebook Pielęgnacja', status: 'completed', price: 29 },
  { id: '#003', client: 'Maja W.', product: 'Ponytail Ombre', status: 'pending', price: 89 },
];

const popularStyles = [
  { name: 'Boho Braids', count: 42, pct: 28, color: '#D4726A' },
  { name: 'Knotless Braids', count: 38, pct: 25, color: '#E8A4A0' },
  { name: 'Box Braids', count: 30, pct: 20, color: '#C9A96E' },
  { name: 'Stitch Braids', count: 24, pct: 16, color: '#8B6F5E' },
  { name: 'Inne', count: 22, pct: 11, color: '#E8D5C4' },
];

const weeklyRevenue = [1200, 1800, 1500, 2200, 1900, 2800, 2400];
const weekDays = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];
const maxRev = Math.max(...weeklyRevenue);

const quickLinks = [
  { icon: '🪢', label: 'Dodaj fryzurę', href: '/admin/fryzury' },
  { icon: '📦', label: 'Dodaj produkt', href: '/admin/sklep' },
  { icon: '✍️', label: 'Nowy artykuł', href: '/admin/blog' },
  { icon: '🎟️', label: 'Nowy kupon', href: '/admin/kupony' },
];

export default function AdminDashboard() {
  const [period, setPeriod] = useState('Miesiąc');

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      {/* Top bar */}
      <div className="bg-white border-b border-[#F5EDE8] px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#3D2B1F]">Dashboard</h1>
          <p className="text-sm text-[#8B6F5E] mt-0.5">Maj 2024 · Witaj z powrotem! 👋</p>
        </div>
        <div className="flex gap-2">
          {['Dziś', 'Tydzień', 'Miesiąc', 'Rok'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                period === p ? 'bg-[#D4726A] text-white' : 'bg-white border border-[#F5EDE8] text-[#8B6F5E] hover:border-[#D4726A]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#F5EDE8] p-5 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{s.icon}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.positive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                  {s.change}
                </span>
              </div>
              <p className="font-display text-2xl font-bold text-[#3D2B1F]">{s.value}</p>
              <p className="text-xs text-[#8B6F5E] mt-1">{s.label}</p>
              <p className="text-xs text-[#C9A96E]">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#F5EDE8] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-[#3D2B1F]">Przychody — ostatni tydzień</h3>
              <p className="text-sm font-bold text-[#D4726A]">13 900 zł łącznie</p>
            </div>
            <div className="flex items-end gap-2 h-36">
              {weeklyRevenue.map((rev, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs text-[#8B6F5E] font-medium">{(rev/1000).toFixed(1)}k</span>
                  <div
                    className="w-full bg-gradient-to-t from-[#D4726A] to-[#E8A4A0] rounded-t-lg hover:from-[#C4625A] hover:to-[#D4726A] transition-colors cursor-pointer"
                    style={{ height: `${(rev / maxRev) * 108}px` }}
                  />
                  <span className="text-xs text-[#8B6F5E]">{weekDays[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular styles */}
          <div className="bg-white rounded-2xl border border-[#F5EDE8] p-6 shadow-sm">
            <h3 className="font-display font-bold text-[#3D2B1F] mb-5">Popularne fryzury</h3>
            <div className="space-y-4">
              {popularStyles.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#3D2B1F] font-medium">{s.name}</span>
                    <span className="text-[#8B6F5E]">{s.count} wiz.</span>
                  </div>
                  <div className="h-2 bg-[#F5EDE8] rounded-full">
                    <div className="h-2 rounded-full transition-all" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tables + Quick links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bookings */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#F5EDE8] shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F5EDE8]">
              <h3 className="font-display font-bold text-[#3D2B1F]">Nadchodzące wizyty</h3>
              <Link href="/admin/wizyty" className="text-[#D4726A] text-sm hover:underline">Wszystkie →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#F5EDE8]">
                    {['Klientka', 'Fryzura', 'Data', 'Status', 'Kwota'].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs text-[#8B6F5E] uppercase tracking-wide font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b, i) => (
                    <tr key={i} className="border-b border-[#F5EDE8] last:border-0 hover:bg-[#FDF9F6] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#F5E8E7] flex items-center justify-center text-sm">👩</div>
                          <span className="font-medium text-[#3D2B1F]">{b.client}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[#8B6F5E]">{b.style}</td>
                      <td className="px-5 py-3.5 text-[#8B6F5E]">{b.date} {b.time}</td>
                      <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                      <td className="px-5 py-3.5 font-bold text-[#D4726A]">{b.price} zł</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick actions + recent orders */}
          <div className="space-y-4">
            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-[#F5EDE8] p-5 shadow-sm">
              <h3 className="font-display font-bold text-[#3D2B1F] mb-4">Szybkie akcje</h3>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="flex items-center gap-2 p-3 bg-[#FDF9F6] rounded-xl hover:bg-[#F5E8E7] transition-colors border border-[#F5EDE8] hover:border-[#D4726A]/30">
                    <span className="text-xl">{l.icon}</span>
                    <span className="text-xs font-medium text-[#3D2B1F]">{l.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent orders */}
            <div className="bg-white rounded-2xl border border-[#F5EDE8] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-[#3D2B1F]">Ostatnie zamówienia</h3>
                <Link href="/admin/sklep" className="text-[#D4726A] text-xs hover:underline">Wszystkie →</Link>
              </div>
              <div className="space-y-3">
                {recentOrders.map((o) => (
                  <div key={o.id} className="flex items-center gap-3 text-sm">
                    <span className="text-xs text-[#C9A96E] font-mono w-10">{o.id}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#3D2B1F] truncate">{o.client}</p>
                      <p className="text-xs text-[#8B6F5E] truncate">{o.product}</p>
                    </div>
                    <span className="font-bold text-[#D4726A] flex-shrink-0">{o.price} zł</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
