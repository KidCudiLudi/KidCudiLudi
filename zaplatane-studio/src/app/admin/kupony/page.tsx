'use client';
import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import Modal from '@/components/admin/Modal';
import StatusBadge from '@/components/admin/StatusBadge';
import { InputField, SelectField, ToggleField, FormActions } from '@/components/admin/FormField';

type Coupon = {
  id: string; code: string; type: 'percent' | 'fixed'; value: number;
  minOrder: number; usageLimit: number; usedCount: number;
  expiresAt: string; active: boolean; scope: 'all' | 'fryzury' | 'sklep';
};

const mock: Coupon[] = [
  { id: '1', code: 'WELCOME10', type: 'percent', value: 10, minOrder: 0, usageLimit: 100, usedCount: 34, expiresAt: '2024-12-31', active: true, scope: 'all' },
  { id: '2', code: 'LATO50', type: 'fixed', value: 50, minOrder: 300, usageLimit: 50, usedCount: 12, expiresAt: '2024-08-31', active: true, scope: 'fryzury' },
  { id: '3', code: 'SKLEP15', type: 'percent', value: 15, minOrder: 100, usageLimit: 200, usedCount: 89, expiresAt: '2024-09-30', active: false, scope: 'sklep' },
  { id: '4', code: 'VIP20', type: 'percent', value: 20, minOrder: 500, usageLimit: 30, usedCount: 5, expiresAt: '2024-12-31', active: true, scope: 'all' },
];

const empty = { code: '', type: 'percent' as const, value: '10', minOrder: '0', usageLimit: '100', expiresAt: '', active: true, scope: 'all' as const };

const scopeLabels: Record<string, string> = { all: 'Wszystko', fryzury: 'Fryzury', sklep: 'Sklep' };

export default function AdminKuponyPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(mock);
  const [modal, setModal] = useState<null | 'add' | 'edit'>(null);
  const [editTarget, setEditTarget] = useState<Coupon | null>(null);
  const [form, setForm] = useState<typeof empty>({ ...empty });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const totalStats = {
    active: coupons.filter((c) => c.active).length,
    used: coupons.reduce((s, c) => s + c.usedCount, 0),
    saved: coupons.reduce((s, c) => s + c.usedCount * (c.type === 'fixed' ? c.value : c.value * 3), 0),
  };

  const openAdd = () => { setForm({ ...empty }); setModal('add'); };
  const openEdit = (c: Coupon) => {
    setForm({ code: c.code, type: c.type, value: String(c.value), minOrder: String(c.minOrder), usageLimit: String(c.usageLimit), expiresAt: c.expiresAt, active: c.active, scope: c.scope });
    setEditTarget(c);
    setModal('edit');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal === 'add') {
      setCoupons([...coupons, { id: Date.now().toString(), code: form.code.toUpperCase(), type: form.type, value: Number(form.value), minOrder: Number(form.minOrder), usageLimit: Number(form.usageLimit), usedCount: 0, expiresAt: form.expiresAt, active: form.active, scope: form.scope }]);
    } else if (editTarget) {
      setCoupons(coupons.map((c) => c.id === editTarget.id ? { ...c, ...form, code: form.code.toUpperCase(), value: Number(form.value), minOrder: Number(form.minOrder), usageLimit: Number(form.usageLimit) } : c));
    }
    setModal(null);
  };

  const toggleActive = (id: string) => setCoupons(coupons.map((c) => c.id === id ? { ...c, active: !c.active } : c));

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      <AdminHeader title="Kupony" subtitle={`${coupons.length} kodów rabatowych`} action={{ label: 'Nowy kupon', onClick: openAdd }} />

      <div className="p-8">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Aktywne kupony', value: totalStats.active, icon: '🎟️' },
            { label: 'Łącznie użyć', value: totalStats.used, icon: '✅' },
            { label: 'Szac. oszczędności klientek', value: `~${totalStats.saved.toLocaleString()} zł`, icon: '💸' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#F5EDE8] p-4 shadow-sm">
              <span className="text-2xl">{s.icon}</span>
              <p className="font-display text-xl font-bold text-[#3D2B1F] mt-2">{s.value}</p>
              <p className="text-xs text-[#8B6F5E]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#F5EDE8] shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F5EDE8] bg-[#FDF9F6]">
                {['Kod', 'Typ', 'Zakres', 'Min. zamówienie', 'Użycie', 'Wygasa', 'Status', 'Akcje'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-[#8B6F5E] uppercase tracking-wide font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-b border-[#F5EDE8] last:border-0 hover:bg-[#FDF9F6] transition-colors">
                  <td className="px-5 py-4">
                    <span className="font-mono font-bold text-[#3D2B1F] bg-[#F5EDE8] px-2 py-1 rounded-lg">{c.code}</span>
                  </td>
                  <td className="px-5 py-4 font-bold text-[#D4726A]">
                    {c.type === 'percent' ? `-${c.value}%` : `-${c.value} zł`}
                  </td>
                  <td className="px-5 py-4 text-[#8B6F5E]">{scopeLabels[c.scope]}</td>
                  <td className="px-5 py-4 text-[#8B6F5E]">{c.minOrder > 0 ? `${c.minOrder} zł` : '—'}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-20 h-1.5 bg-[#F5EDE8] rounded-full">
                        <div className="h-1.5 bg-[#D4726A] rounded-full" style={{ width: `${Math.min((c.usedCount / c.usageLimit) * 100, 100)}%` }} />
                      </div>
                      <span className="text-xs text-[#8B6F5E]">{c.usedCount}/{c.usageLimit}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#8B6F5E]">{c.expiresAt}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleActive(c.id)}>
                      <StatusBadge status={c.active ? 'active' : 'inactive'} />
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(c)} className="text-xs bg-[#F5EDE8] hover:bg-[#D4726A] hover:text-white text-[#8B6F5E] px-3 py-1.5 rounded-full transition-colors">Edytuj</button>
                      <button onClick={() => setDeleteId(c.id)} className="text-xs bg-red-50 hover:bg-red-500 hover:text-white text-red-600 px-3 py-1.5 rounded-full transition-colors">Usuń</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Nowy kupon' : 'Edytuj kupon'} wide>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Kod kuponu" value={form.code} onChange={(v) => setForm({ ...form, code: v.toUpperCase() })} placeholder="WELCOME10" required />
            <SelectField label="Zakres" value={form.scope} onChange={(v) => setForm({ ...form, scope: v as typeof form.scope })} options={Object.entries(scopeLabels).map(([v, l]) => ({ value: v, label: l }))} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <SelectField label="Typ rabatu" value={form.type} onChange={(v) => setForm({ ...form, type: v as 'percent' | 'fixed' })} options={[{ value: 'percent', label: 'Procentowy (%)' }, { value: 'fixed', label: 'Kwotowy (zł)' }]} />
            <InputField label={form.type === 'percent' ? 'Wartość (%)' : 'Wartość (zł)'} type="number" value={form.value} onChange={(v) => setForm({ ...form, value: v })} required />
            <InputField label="Min. zamówienie (zł)" type="number" value={form.minOrder} onChange={(v) => setForm({ ...form, minOrder: v })} hint="0 = bez limitu" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Limit użyć" type="number" value={form.usageLimit} onChange={(v) => setForm({ ...form, usageLimit: v })} required />
            <InputField label="Data wygaśnięcia" type="date" value={form.expiresAt} onChange={(v) => setForm({ ...form, expiresAt: v })} required />
          </div>
          <div className="border border-[#F5EDE8] rounded-xl p-4">
            <ToggleField label="Aktywny" checked={form.active} onChange={(v) => setForm({ ...form, active: v })} />
          </div>
          <FormActions onCancel={() => setModal(null)} submitLabel={modal === 'add' ? 'Utwórz kupon' : 'Zapisz'} />
        </form>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Usuń kupon">
        <div className="text-center py-4">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-[#3D2B1F] font-medium">Na pewno chcesz usunąć ten kupon?</p>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => setDeleteId(null)} className="flex-1 border border-[#E8D5C4] text-[#8B6F5E] py-3 rounded-full text-sm">Anuluj</button>
          <button onClick={() => { setCoupons(coupons.filter((c) => c.id !== deleteId)); setDeleteId(null); }} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full text-sm font-medium transition-colors">Usuń</button>
        </div>
      </Modal>
    </div>
  );
}
