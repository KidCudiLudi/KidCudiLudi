'use client';
import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import Modal from '@/components/admin/Modal';
import { InputField, TextareaField, FormActions } from '@/components/admin/FormField';

type Subscriber = { id: string; email: string; name?: string; joinDate: string; active: boolean; tags: string[] };
type Campaign = { id: string; subject: string; sentAt: string; recipients: number; opens: number; clicks: number };

const mockSubs: Subscriber[] = [
  { id: '1', email: 'klaudia@example.com', name: 'Klaudia M.', joinDate: '2023-01-15', active: true, tags: ['klientka', 'vip'] },
  { id: '2', email: 'martyna@example.com', name: 'Martyna K.', joinDate: '2022-11-20', active: true, tags: ['klientka'] },
  { id: '3', email: 'natalia@example.com', joinDate: '2024-03-01', active: true, tags: ['nowa'] },
  { id: '4', email: 'ola@example.com', name: 'Aleksandra P.', joinDate: '2022-06-10', active: false, tags: ['klientka', 'vip'] },
  { id: '5', email: 'zofia@example.com', name: 'Zofia T.', joinDate: '2024-04-20', active: true, tags: ['nowa'] },
  { id: '6', email: 'julia@example.com', joinDate: '2024-05-01', active: true, tags: [] },
];

const mockCampaigns: Campaign[] = [
  { id: '1', subject: 'Promocja na czerwiec — braidy -15%!', sentAt: '2024-05-01', recipients: 234, opens: 156, clicks: 42 },
  { id: '2', subject: 'Nowe fryzury w katalogu ✨', sentAt: '2024-04-15', recipients: 218, opens: 142, clicks: 38 },
  { id: '3', subject: 'Ekskluzywny ebook: Pielęgnacja warkoczów', sentAt: '2024-03-20', recipients: 195, opens: 121, clicks: 67 },
];

export default function AdminNewsletterPage() {
  const [subs, setSubs] = useState<Subscriber[]>(mockSubs);
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [tab, setTab] = useState<'subscribers' | 'campaigns' | 'send'>('subscribers');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ subject: '', content: '' });

  const active = subs.filter((s) => s.active).length;

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      <AdminHeader title="Newsletter" subtitle={`${active} aktywnych subskrybentów`} action={tab === 'send' ? undefined : { label: 'Wyślij newsletter', onClick: () => setModal(true) }} />

      <div className="p-8">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Subskrybenci', value: subs.length, icon: '📧' },
            { label: 'Aktywni', value: active, icon: '✅' },
            { label: 'Kampanie', value: campaigns.length, icon: '📨' },
            { label: 'Śr. open rate', value: `${Math.round(campaigns.reduce((s, c) => s + c.opens / c.recipients, 0) / campaigns.length * 100)}%`, icon: '👁️' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#F5EDE8] p-4 shadow-sm">
              <span className="text-2xl">{s.icon}</span>
              <p className="font-display text-xl font-bold text-[#3D2B1F] mt-2">{s.value}</p>
              <p className="text-xs text-[#8B6F5E]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6 bg-white rounded-2xl border border-[#F5EDE8] p-2 w-fit shadow-sm">
          {([['subscribers', 'Subskrybenci'], ['campaigns', 'Kampanie']] as const).map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === k ? 'bg-[#D4726A] text-white' : 'text-[#8B6F5E] hover:text-[#D4726A]'}`}>{label}</button>
          ))}
        </div>

        {tab === 'subscribers' && (
          <div className="bg-white rounded-2xl border border-[#F5EDE8] shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#F5EDE8] bg-[#FDF9F6]">
                  {['Email', 'Imię', 'Tagi', 'Data', 'Status', 'Akcje'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-[#8B6F5E] uppercase tracking-wide font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subs.map((s) => (
                  <tr key={s.id} className="border-b border-[#F5EDE8] last:border-0 hover:bg-[#FDF9F6] transition-colors">
                    <td className="px-5 py-4 text-[#3D2B1F]">{s.email}</td>
                    <td className="px-5 py-4 text-[#8B6F5E]">{s.name ?? '—'}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        {s.tags.map((t) => (
                          <span key={t} className="text-xs bg-[#F5EDE8] text-[#8B6F5E] px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#8B6F5E]">{s.joinDate}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                        {s.active ? 'Aktywny' : 'Wypisany'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => setSubs(subs.map((sub) => sub.id === s.id ? { ...sub, active: !sub.active } : sub))} className="text-xs bg-[#F5EDE8] hover:bg-red-50 hover:text-red-600 text-[#8B6F5E] px-3 py-1.5 rounded-full transition-colors">
                        {s.active ? 'Wypisz' : 'Przywróć'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'campaigns' && (
          <div className="space-y-3">
            {campaigns.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border border-[#F5EDE8] shadow-sm p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-[#3D2B1F]">{c.subject}</h3>
                    <p className="text-xs text-[#8B6F5E] mt-0.5">Wysłano {c.sentAt} · {c.recipients} odbiorców</p>
                  </div>
                  <div className="flex gap-6 text-center">
                    <div>
                      <p className="font-bold text-[#D4726A]">{Math.round(c.opens / c.recipients * 100)}%</p>
                      <p className="text-xs text-[#8B6F5E]">Open rate</p>
                    </div>
                    <div>
                      <p className="font-bold text-[#C9A96E]">{Math.round(c.clicks / c.recipients * 100)}%</p>
                      <p className="text-xs text-[#8B6F5E]">Click rate</p>
                    </div>
                    <div>
                      <p className="font-bold text-[#8B6F5E]">{c.opens}</p>
                      <p className="text-xs text-[#8B6F5E]">Otwarć</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Wyślij newsletter" wide>
        <form onSubmit={(e) => { e.preventDefault(); setModal(false); }} className="space-y-4">
          <div className="bg-[#FDF9F6] rounded-xl p-3 text-sm text-[#8B6F5E]">
            📧 Zostanie wysłany do <strong className="text-[#3D2B1F]">{active} aktywnych subskrybentów</strong>
          </div>
          <InputField label="Temat wiadomości" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} required />
          <TextareaField label="Treść (HTML lub tekst)" value={form.content} onChange={(v) => setForm({ ...form, content: v })} rows={10} placeholder="Treść emaila..." />
          <FormActions onCancel={() => setModal(false)} submitLabel={`Wyślij do ${active} osób`} />
        </form>
      </Modal>
    </div>
  );
}
