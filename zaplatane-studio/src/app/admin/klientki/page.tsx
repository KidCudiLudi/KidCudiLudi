'use client';
import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import Modal from '@/components/admin/Modal';
import { CLUB_LEVELS } from '@/lib/utils';

type Client = {
  id: string; name: string; email: string; phone: string;
  level: string; renoma: number; sploty: number;
  visits: number; totalSpent: number; joinDate: string;
};

const mock: Client[] = [
  { id: '1', name: 'Klaudia M.', email: 'klaudia@example.com', phone: '+48 500 111 222', level: 'ROSE', renoma: 1350, sploty: 780, visits: 8, totalSpent: 3200, joinDate: '2023-01-15' },
  { id: '2', name: 'Martyna K.', email: 'martyna@example.com', phone: '+48 600 333 444', level: 'PEARL', renoma: 2100, sploty: 1200, visits: 12, totalSpent: 5800, joinDate: '2022-11-20' },
  { id: '3', name: 'Natalia W.', email: 'natalia@example.com', phone: '+48 700 555 666', level: 'BLUSH', renoma: 350, sploty: 120, visits: 2, totalSpent: 780, joinDate: '2024-03-01' },
  { id: '4', name: 'Aleksandra P.', email: 'ola@example.com', phone: '+48 510 777 888', level: 'VELVET', renoma: 4200, sploty: 2800, visits: 22, totalSpent: 9400, joinDate: '2022-06-10' },
  { id: '5', name: 'Zofia T.', email: 'zofia@example.com', phone: '+48 520 999 000', level: 'NUDE', renoma: 100, sploty: 0, visits: 1, totalSpent: 400, joinDate: '2024-04-20' },
];

export default function AdminKlientkiPage() {
  const [clients] = useState<Client[]>(mock);
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState<Client | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'renoma' | 'visits' | 'totalSpent'>('totalSpent');

  const filtered = [...clients]
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.includes(search))
    .sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number) || a.name.localeCompare(b.name));

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      <AdminHeader title="Klientki" subtitle={`${clients.length} zarejestrowanych`} />

      <div className="p-8">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Łącznie', value: clients.length, icon: '👩' },
            { label: 'Aktywne (mies.)', value: 3, icon: '✨' },
            { label: 'Śr. wizyt/os.', value: (clients.reduce((s, c) => s + c.visits, 0) / clients.length).toFixed(1), icon: '📅' },
            { label: 'Śr. wydatki/os.', value: `${Math.round(clients.reduce((s, c) => s + c.totalSpent, 0) / clients.length)} zł`, icon: '💰' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#F5EDE8] p-4 shadow-sm">
              <span className="text-2xl">{s.icon}</span>
              <p className="font-display text-xl font-bold text-[#3D2B1F] mt-2">{s.value}</p>
              <p className="text-xs text-[#8B6F5E]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search + sort */}
        <div className="bg-white rounded-2xl border border-[#F5EDE8] p-4 mb-6 flex gap-4">
          <div className="flex-1 relative">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Szukaj klientki..." className="w-full border border-[#F5EDE8] rounded-xl px-4 py-2.5 text-sm pl-9 outline-none focus:border-[#D4726A]" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A96E]">🔍</span>
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="border border-[#F5EDE8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D4726A]">
            <option value="totalSpent">Sortuj: Wydatki</option>
            <option value="renoma">Sortuj: Renoma</option>
            <option value="visits">Sortuj: Wizyty</option>
            <option value="name">Sortuj: Imię</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl border border-[#F5EDE8] shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F5EDE8] bg-[#FDF9F6]">
                {['Klientka', 'Kontakt', 'Poziom', 'Renoma', 'Sploty', 'Wizyty', 'Łącznie', 'Akcje'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-[#8B6F5E] uppercase tracking-wide font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const lvl = CLUB_LEVELS.find((l) => l.name === c.level);
                return (
                  <tr key={c.id} className="border-b border-[#F5EDE8] last:border-0 hover:bg-[#FDF9F6] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#F5E8E7] flex items-center justify-center text-lg flex-shrink-0">👩</div>
                        <div>
                          <p className="font-medium text-[#3D2B1F]">{c.name}</p>
                          <p className="text-xs text-[#C9A96E]">od {c.joinDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-[#8B6F5E]">{c.email}</p>
                      <p className="text-xs text-[#8B6F5E]">{c.phone}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: lvl?.color ?? '#D4726A' }}>
                        {lvl?.emoji} {c.level}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-[#3D2B1F]">{c.renoma.toLocaleString()}</td>
                    <td className="px-5 py-4 text-[#C9A96E] font-medium">{c.sploty.toLocaleString()}</td>
                    <td className="px-5 py-4 text-[#8B6F5E]">{c.visits}</td>
                    <td className="px-5 py-4 font-bold text-[#D4726A]">{c.totalSpent.toLocaleString()} zł</td>
                    <td className="px-5 py-4">
                      <button onClick={() => setDetail(c)} className="text-xs bg-[#F5EDE8] hover:bg-[#D4726A] hover:text-white text-[#8B6F5E] px-3 py-1.5 rounded-full transition-colors">Profil</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!detail} onClose={() => setDetail(null)} title="Profil klientki">
        {detail && (
          <div className="space-y-5">
            <div className="flex items-center gap-5 bg-[#FDF9F6] rounded-2xl p-5">
              <div className="w-16 h-16 rounded-full bg-[#D4726A]/20 flex items-center justify-center text-4xl">👩</div>
              <div>
                <h3 className="font-display font-bold text-[#3D2B1F] text-xl">{detail.name}</h3>
                <p className="text-[#8B6F5E] text-sm">{detail.email}</p>
                <p className="text-[#8B6F5E] text-sm">{detail.phone}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Poziom', value: `${CLUB_LEVELS.find(l=>l.name===detail.level)?.emoji} ${detail.level}` },
                { label: 'Renoma', value: detail.renoma.toLocaleString() },
                { label: 'Sploty', value: detail.sploty.toLocaleString() },
                { label: 'Wizyty', value: detail.visits },
                { label: 'Łącznie wydane', value: `${detail.totalSpent.toLocaleString()} zł` },
                { label: 'Klientka od', value: detail.joinDate },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-[#F5EDE8] rounded-xl p-3">
                  <p className="text-xs text-[#C9A96E] font-medium">{s.label}</p>
                  <p className="font-bold text-[#3D2B1F] mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-4 border-t border-[#F5EDE8]">
              <a href={`mailto:${detail.email}`} className="flex-1 border border-[#D4726A] text-[#D4726A] text-center py-3 rounded-full text-sm font-medium hover:bg-[#D4726A] hover:text-white transition-colors">
                ✉️ Napisz
              </a>
              <button onClick={() => setDetail(null)} className="flex-1 bg-[#D4726A] hover:bg-[#C4625A] text-white py-3 rounded-full text-sm font-medium transition-colors">
                Zamknij
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
