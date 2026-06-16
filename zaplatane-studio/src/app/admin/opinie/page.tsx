'use client';
import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';

type Review = {
  id: string; client: string; style: string; rating: number;
  text: string; date: string; status: 'pending' | 'approved' | 'hidden';
  source: 'site' | 'google' | 'instagram';
};

const mock: Review[] = [
  { id: '1', client: 'Klaudia M.', style: 'Boho Braids', rating: 5, text: 'Absolutnie zachwycona! Fryzura trzyma się już 5 tygodni i nadal wygląda pięknie. Polecam z całego serca!', date: '2024-05-10', status: 'approved', source: 'site' },
  { id: '2', client: 'Martyna K.', style: 'Knotless Braids', rating: 5, text: 'Profesjonalne podejście, świetna atmosfera. Efekt przerósł moje oczekiwania.', date: '2024-05-08', status: 'approved', source: 'google' },
  { id: '3', client: 'Zofia T.', style: 'Stitch Braids', rating: 4, text: 'Bardzo fajnie wykonane, tylko trochę długo czekałam na termin. Sama fryzura super!', date: '2024-05-06', status: 'pending', source: 'site' },
  { id: '4', client: 'Anna N.', style: 'Box Braids', rating: 2, text: 'Byłam rozczarowana — braidy zaczęły się luzować po 2 tygodniach. Spodziewałam się więcej.', date: '2024-05-04', status: 'pending', source: 'site' },
  { id: '5', client: 'Julia R.', style: 'Cornrows', rating: 5, text: '100% polecam! Najlepsza fryzura jaką miałam. Wrócę na pewno ✨', date: '2024-04-28', status: 'approved', source: 'instagram' },
];

const sourceIcon: Record<string, string> = { site: '🌐', google: '🔍', instagram: '📸' };
const sourceLabel: Record<string, string> = { site: 'Strona', google: 'Google', instagram: 'Instagram' };

export default function AdminOpinieePage() {
  const [reviews, setReviews] = useState<Review[]>(mock);
  const [filter, setFilter] = useState('all');

  const filtered = reviews.filter((r) => filter === 'all' || r.status === filter);
  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    hidden: reviews.filter((r) => r.status === 'hidden').length,
  };
  const avgRating = reviews.filter(r => r.status === 'approved').reduce((s, r) => s + r.rating, 0) / reviews.filter(r => r.status === 'approved').length;

  const updateStatus = (id: string, status: Review['status']) => setReviews(reviews.map((r) => r.id === id ? { ...r, status } : r));

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      <AdminHeader title="Opinie" subtitle={`${reviews.length} opinii łącznie`} />

      <div className="p-8">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Średnia ocena', value: `${avgRating.toFixed(1)} ⭐`, icon: '⭐' },
            { label: 'Oczekujące', value: counts.pending, icon: '⏳' },
            { label: 'Zatwierdzone', value: counts.approved, icon: '✅' },
            { label: 'Ukryte', value: counts.hidden, icon: '🙈' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#F5EDE8] p-4 shadow-sm">
              <span className="text-2xl">{s.icon}</span>
              <p className="font-display text-xl font-bold text-[#3D2B1F] mt-2">{s.value}</p>
              <p className="text-xs text-[#8B6F5E]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6 bg-white rounded-2xl border border-[#F5EDE8] p-2 w-fit shadow-sm">
          {Object.entries({ all: 'Wszystkie', pending: 'Oczekujące', approved: 'Zatwierdzone', hidden: 'Ukryte' }).map(([k, label]) => (
            <button key={k} onClick={() => setFilter(k)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${filter === k ? 'bg-[#D4726A] text-white' : 'text-[#8B6F5E] hover:text-[#D4726A]'}`}>
              {label}
              <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${filter === k ? 'bg-white/20 text-white' : 'bg-[#F5EDE8] text-[#8B6F5E]'}`}>{counts[k as keyof typeof counts]}</span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className={`bg-white rounded-2xl border shadow-sm p-5 ${r.status === 'pending' ? 'border-[#C9A96E]/40' : 'border-[#F5EDE8]'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-[#F5E8E7] flex items-center justify-center text-lg flex-shrink-0">👩</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium text-[#3D2B1F]">{r.client}</p>
                      <span className="text-xs text-[#C9A96E]">{r.style}</span>
                      <span className="text-xs text-[#8B6F5E]">{sourceIcon[r.source]} {sourceLabel[r.source]}</span>
                      <span className="text-xs text-[#8B6F5E]">{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <span key={star} className={star <= r.rating ? 'text-[#C9A96E]' : 'text-[#E8D5C4]'}>★</span>
                      ))}
                    </div>
                    <p className="text-sm text-[#3D2B1F]">{r.text}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <StatusBadge status={r.status === 'approved' ? 'confirmed' : r.status === 'pending' ? 'pending' : 'cancelled'} />
                  <div className="flex gap-2">
                    {r.status !== 'approved' && (
                      <button onClick={() => updateStatus(r.id, 'approved')} className="text-xs bg-green-50 hover:bg-green-500 hover:text-white text-green-700 px-3 py-1.5 rounded-full transition-colors">Zatwierdź</button>
                    )}
                    {r.status !== 'hidden' && (
                      <button onClick={() => updateStatus(r.id, 'hidden')} className="text-xs bg-[#F5EDE8] hover:bg-[#8B6F5E] hover:text-white text-[#8B6F5E] px-3 py-1.5 rounded-full transition-colors">Ukryj</button>
                    )}
                    {r.status === 'hidden' && (
                      <button onClick={() => updateStatus(r.id, 'approved')} className="text-xs bg-[#F5EDE8] hover:bg-[#D4726A] hover:text-white text-[#8B6F5E] px-3 py-1.5 rounded-full transition-colors">Przywróć</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
