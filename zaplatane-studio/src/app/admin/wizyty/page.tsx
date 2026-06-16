'use client';
import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import Modal from '@/components/admin/Modal';
import StatusBadge from '@/components/admin/StatusBadge';
import { SelectField, TextareaField } from '@/components/admin/FormField';

type Booking = {
  id: string; client: string; email: string; phone: string;
  style: string; date: string; time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number; depositPaid: boolean; notes?: string;
};

const mock: Booking[] = [
  { id: '1', client: 'Klaudia M.', email: 'klaudia@example.com', phone: '+48 500 111 222', style: 'Boho Braids', date: '2024-05-15', time: '14:00', status: 'confirmed', price: 450, depositPaid: true, notes: 'Prosi o włosy do pasa' },
  { id: '2', client: 'Martyna K.', email: 'martyna@example.com', phone: '+48 600 333 444', style: 'Knotless Braids', date: '2024-05-16', time: '10:00', status: 'pending', price: 400, depositPaid: true },
  { id: '3', client: 'Natalia W.', email: 'natalia@example.com', phone: '+48 700 555 666', style: 'Stitch Braids', date: '2024-05-17', time: '12:00', status: 'confirmed', price: 380, depositPaid: true },
  { id: '4', client: 'Aleksandra P.', email: 'ola@example.com', phone: '+48 510 777 888', style: 'Cornrows', date: '2024-05-10', time: '9:00', status: 'completed', price: 280, depositPaid: true },
  { id: '5', client: 'Zofia T.', email: 'zofia@example.com', phone: '+48 520 999 000', style: 'Goddess Braids', date: '2024-05-08', time: '15:00', status: 'cancelled', price: 400, depositPaid: true, notes: 'Anulowała 2 dni przed' },
];

export default function AdminWizytyPage() {
  const [bookings, setBookings] = useState<Booking[]>(mock);
  const [detail, setDetail] = useState<Booking | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [newNote, setNewNote] = useState('');

  const filtered = bookings.filter((b) => statusFilter === 'all' || b.status === statusFilter);

  const updateStatus = (id: string, status: Booking['status']) => {
    setBookings(bookings.map((b) => b.id === id ? { ...b, status } : b));
    if (detail?.id === id) setDetail({ ...detail, status });
  };

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      <AdminHeader title="Wizyty" subtitle={`${bookings.length} wizyt łącznie`} />

      <div className="p-8">
        {/* Status tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl border border-[#F5EDE8] p-2 w-fit shadow-sm">
          {Object.entries({ all: 'Wszystkie', pending: 'Oczekuje', confirmed: 'Potwierdzone', completed: 'Zrealizowane', cancelled: 'Anulowane' }).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setStatusFilter(k)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${statusFilter === k ? 'bg-[#D4726A] text-white shadow-sm' : 'text-[#8B6F5E] hover:text-[#D4726A]'}`}
            >
              {label}
              <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${statusFilter === k ? 'bg-white/20 text-white' : 'bg-[#F5EDE8] text-[#8B6F5E]'}`}>
                {statusCounts[k as keyof typeof statusCounts]}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#F5EDE8] shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F5EDE8] bg-[#FDF9F6]">
                {['Klientka', 'Fryzura', 'Data', 'Status', 'Zadatek', 'Kwota', 'Akcje'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-[#8B6F5E] uppercase tracking-wide font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-[#F5EDE8] last:border-0 hover:bg-[#FDF9F6] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#F5E8E7] flex items-center justify-center text-sm flex-shrink-0">👩</div>
                      <div>
                        <p className="font-medium text-[#3D2B1F]">{b.client}</p>
                        <p className="text-xs text-[#8B6F5E]">{b.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#8B6F5E]">{b.style}</td>
                  <td className="px-5 py-4 text-[#8B6F5E]">{b.date} <span className="font-medium text-[#3D2B1F]">{b.time}</span></td>
                  <td className="px-5 py-4"><StatusBadge status={b.status} /></td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${b.depositPaid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      {b.depositPaid ? '✓ Wpłacony' : '✗ Brak'}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-[#D4726A]">{b.price} zł</td>
                  <td className="px-5 py-4">
                    <button onClick={() => setDetail(b)} className="text-xs bg-[#F5EDE8] hover:bg-[#D4726A] hover:text-white text-[#8B6F5E] px-3 py-1.5 rounded-full transition-colors">
                      Szczegóły
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Szczegóły wizyty" wide>
        {detail && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#FDF9F6] rounded-xl p-4 space-y-2">
                <p className="text-xs uppercase tracking-wide text-[#C9A96E] font-medium mb-2">Klientka</p>
                <p className="font-medium text-[#3D2B1F]">{detail.client}</p>
                <p className="text-sm text-[#8B6F5E]">{detail.email}</p>
                <p className="text-sm text-[#8B6F5E]">{detail.phone}</p>
              </div>
              <div className="bg-[#FDF9F6] rounded-xl p-4 space-y-2">
                <p className="text-xs uppercase tracking-wide text-[#C9A96E] font-medium mb-2">Wizyta</p>
                <p className="font-medium text-[#3D2B1F]">{detail.style}</p>
                <p className="text-sm text-[#8B6F5E]">{detail.date} o {detail.time}</p>
                <p className="font-bold text-[#D4726A]">{detail.price} zł (zadatek: 100 zł)</p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium mb-2">Zmień status</p>
              <SelectField
                label=""
                value={detail.status}
                onChange={(v) => updateStatus(detail.id, v as Booking['status'])}
                options={[
                  { value: 'pending', label: 'Oczekuje' },
                  { value: 'confirmed', label: 'Potwierdzona' },
                  { value: 'completed', label: 'Zrealizowana' },
                  { value: 'cancelled', label: 'Anulowana' },
                ]}
              />
            </div>

            {detail.notes && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
                📝 {detail.notes}
              </div>
            )}

            <TextareaField label="Notatka" value={newNote} onChange={setNewNote} placeholder="Dodaj notatkę do wizyty..." rows={3} />

            <div className="flex gap-3 pt-4 border-t border-[#F5EDE8]">
              <a href={`mailto:${detail.email}`} className="flex-1 border border-[#D4726A] text-[#D4726A] text-center py-3 rounded-full text-sm hover:bg-[#D4726A] hover:text-white transition-colors font-medium">
                ✉️ Napisz e-mail
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
