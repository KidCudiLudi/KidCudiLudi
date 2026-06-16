'use client';
import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import Modal from '@/components/admin/Modal';
import { InputField, TextareaField, FormActions } from '@/components/admin/FormField';
import { CLUB_LEVELS } from '@/lib/utils';

type Level = typeof CLUB_LEVELS[0] & { memberCount: number; perks: string[] };

const initial: Level[] = CLUB_LEVELS.map((l, i) => ({
  ...l,
  memberCount: Math.max(0, Math.floor(200 / (i + 1))),
  perks: [
    i >= 1 ? 'Priorytetowa rezerwacja' : '',
    i >= 2 ? 'Rabat 5% na produkty' : '',
    i >= 3 ? 'Bezpłatna konsultacja' : '',
    i >= 5 ? 'Rabat 10% na fryzury' : '',
    i >= 7 ? 'Ekskluzywne zniżki VIP' : '',
  ].filter(Boolean),
}));

export default function AdminKlubPage() {
  const [levels, setLevels] = useState<Level[]>(initial);
  const [editTarget, setEditTarget] = useState<Level | null>(null);
  const [form, setForm] = useState({ minRenoma: '0', perks: '' });

  const totalMembers = levels.reduce((s, l) => s + l.memberCount, 0);

  const openEdit = (l: Level) => {
    setForm({ minRenoma: String(l.minRenoma), perks: l.perks.join('\n') });
    setEditTarget(l);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    setLevels(levels.map((l) => l.name === editTarget.name
      ? { ...l, minRenoma: Number(form.minRenoma), perks: form.perks.split('\n').filter(Boolean) }
      : l
    ));
    setEditTarget(null);
  };

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      <AdminHeader title="Klub Sploty" subtitle={`${totalMembers} członkiń w ${levels.length} poziomach`} />

      <div className="p-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {levels.map((l) => (
            <div key={l.name} className="bg-white rounded-2xl border border-[#F5EDE8] p-3 shadow-sm text-center">
              <div className="text-2xl mb-1">{l.emoji}</div>
              <p className="font-bold text-xs text-[#3D2B1F]" style={{ color: l.color }}>{l.name}</p>
              <p className="text-xl font-display font-bold text-[#3D2B1F] mt-1">{l.memberCount}</p>
              <p className="text-xs text-[#8B6F5E]">członkiń</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {levels.map((l) => (
            <div key={l.name} className="bg-white rounded-2xl border border-[#F5EDE8] shadow-sm p-5 flex items-start gap-5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: l.color + '20' }}>
                {l.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display font-bold text-[#3D2B1F]">{l.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ backgroundColor: l.color }}>
                    od {l.minRenoma.toLocaleString()} Renomy
                  </span>
                  <span className="text-xs text-[#8B6F5E]">{l.memberCount} klientek</span>
                </div>
                {l.perks.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {l.perks.map((perk) => (
                      <span key={perk} className="text-xs bg-[#FDF9F6] border border-[#F5EDE8] text-[#8B6F5E] px-2.5 py-1 rounded-full">✓ {perk}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#C9A96E]">Brak dodatkowych przywilejów — poziom bazowy</p>
                )}
              </div>
              <button onClick={() => openEdit(l)} className="text-xs bg-[#F5EDE8] hover:bg-[#D4726A] hover:text-white text-[#8B6F5E] px-4 py-2 rounded-full transition-colors flex-shrink-0">
                Edytuj
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title={`Edytuj poziom ${editTarget?.emoji} ${editTarget?.name}`} wide>
        <form onSubmit={handleSave} className="space-y-4">
          <InputField label="Minimalna Renoma" type="number" value={form.minRenoma} onChange={(v) => setForm({ ...form, minRenoma: v })} hint="Próg punktowy do osiągnięcia tego poziomu" required />
          <TextareaField label="Przywileje (każdy w nowej linii)" value={form.perks} onChange={(v) => setForm({ ...form, perks: v })} rows={5} placeholder="Priorytetowa rezerwacja&#10;Rabat 5% na produkty&#10;Bezpłatna konsultacja" />
          <FormActions onCancel={() => setEditTarget(null)} submitLabel="Zapisz poziom" />
        </form>
      </Modal>
    </div>
  );
}
