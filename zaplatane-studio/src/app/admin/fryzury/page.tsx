'use client';
import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import Modal from '@/components/admin/Modal';
import StatusBadge from '@/components/admin/StatusBadge';
import { InputField, SelectField, TextareaField, ToggleField, FormActions } from '@/components/admin/FormField';
import { HAIR_STYLES } from '@/lib/utils';

type Style = typeof HAIR_STYLES[0] & { active: boolean };

const initialStyles: Style[] = HAIR_STYLES.map((s) => ({ ...s, active: true }));

const empty = { name: '', slug: '', price: '0', duration: '', wearTime: '', difficulty: 'Łatwy', category: 'braids', description: '', isBestseller: false, isNew: false, active: true };

export default function AdminFryzuryPage() {
  const [styles, setStyles] = useState<Style[]>(initialStyles);
  const [modal, setModal] = useState<null | 'add' | 'edit'>(null);
  const [editTarget, setEditTarget] = useState<Style | null>(null);
  const [form, setForm] = useState<typeof empty>({ ...empty });
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = styles.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm({ ...empty }); setModal('add'); };
  const openEdit = (s: Style) => {
    setForm({ name: s.name, slug: s.slug, price: String(s.price), duration: s.duration, wearTime: s.wearTime, difficulty: s.difficulty, category: s.category, description: '', isBestseller: s.isBestseller, isNew: s.isNew, active: s.active });
    setEditTarget(s);
    setModal('edit');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal === 'add') {
      const newStyle: Style = { id: Date.now().toString(), name: form.name, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'), price: Number(form.price), duration: form.duration, wearTime: form.wearTime, difficulty: form.difficulty, category: form.category, isBestseller: form.isBestseller, isNew: form.isNew, active: form.active };
      setStyles([...styles, newStyle]);
    } else if (editTarget) {
      setStyles(styles.map((s) => s.id === editTarget.id ? { ...s, ...form, price: Number(form.price) } : s));
    }
    setModal(null);
  };

  const handleDelete = () => {
    if (deleteId) setStyles(styles.filter((s) => s.id !== deleteId));
    setDeleteId(null);
  };

  const toggleActive = (id: string) => setStyles(styles.map((s) => s.id === id ? { ...s, active: !s.active } : s));

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      <AdminHeader title="Fryzury" subtitle={`${styles.length} fryzur w katalogu`} action={{ label: 'Dodaj fryzurę', onClick: openAdd }} />

      <div className="p-8">
        {/* Search */}
        <div className="bg-white rounded-2xl border border-[#F5EDE8] p-4 mb-6 flex gap-4">
          <div className="flex-1 relative">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Szukaj fryzury..." className="w-full border border-[#F5EDE8] rounded-xl px-4 py-2.5 text-sm pl-9 outline-none focus:border-[#D4726A]" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A96E] text-sm">🔍</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#F5EDE8] shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F5EDE8] bg-[#FDF9F6]">
                {['Fryzura', 'Cena', 'Czas', 'Noszenie', 'Trudność', 'Status', 'Tagi', 'Akcje'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-[#8B6F5E] uppercase tracking-wide font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-[#F5EDE8] last:border-0 hover:bg-[#FDF9F6] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center text-xl">🪢</div>
                      <div>
                        <p className="font-medium text-[#3D2B1F]">{s.name}</p>
                        <p className="text-xs text-[#C9A96E]">/fryzury/{s.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-bold text-[#D4726A]">{s.price} zł</td>
                  <td className="px-5 py-4 text-[#8B6F5E]">{s.duration}</td>
                  <td className="px-5 py-4 text-[#8B6F5E]">{s.wearTime}</td>
                  <td className="px-5 py-4 text-[#8B6F5E]">{s.difficulty}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleActive(s.id)}>
                      <StatusBadge status={s.active ? 'active' : 'inactive'} />
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      {s.isBestseller && <StatusBadge status="bestseller" />}
                      {s.isNew && <StatusBadge status="new" />}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(s)} className="text-xs bg-[#F5EDE8] hover:bg-[#D4726A] hover:text-white text-[#8B6F5E] px-3 py-1.5 rounded-full transition-colors">Edytuj</button>
                      <button onClick={() => setDeleteId(s.id)} className="text-xs bg-red-50 hover:bg-red-500 hover:text-white text-red-600 px-3 py-1.5 rounded-full transition-colors">Usuń</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Dodaj fryzurę' : 'Edytuj fryzurę'} wide>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Nazwa fryzury" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Boho Braids" required />
            <InputField label="Slug URL" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="boho-braids" hint="Zostaw puste — wygeneruje się automatycznie" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <InputField label="Cena (zł)" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} required />
            <InputField label="Czas wykonania" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} placeholder="3-5h" required />
            <InputField label="Czas noszenia" value={form.wearTime} onChange={(v) => setForm({ ...form, wearTime: v })} placeholder="4-6 tygodni" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="Trudność" value={form.difficulty} onChange={(v) => setForm({ ...form, difficulty: v })} options={[{ value: 'Łatwy', label: 'Łatwy' }, { value: 'Średni', label: 'Średni' }, { value: 'Trudny', label: 'Trudny' }]} />
            <SelectField label="Kategoria" value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={[{ value: 'braids', label: 'Braidy' }, { value: 'ponytails', label: 'Ponytaile' }, { value: 'cornrows', label: 'Cornrows' }]} />
          </div>
          <TextareaField label="Opis" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="Opis fryzury..." rows={3} />
          <div className="border border-[#F5EDE8] rounded-xl p-4 space-y-1">
            <ToggleField label="Aktywna (widoczna w katalogu)" checked={form.active} onChange={(v) => setForm({ ...form, active: v })} />
            <ToggleField label="Bestseller" checked={form.isBestseller} onChange={(v) => setForm({ ...form, isBestseller: v })} />
            <ToggleField label="Nowość" checked={form.isNew} onChange={(v) => setForm({ ...form, isNew: v })} />
          </div>
          <div className="border-2 border-dashed border-[#F5EDE8] rounded-xl p-6 text-center cursor-pointer hover:border-[#D4726A]/40 transition-colors">
            <div className="text-3xl mb-2">🖼️</div>
            <p className="text-sm text-[#8B6F5E]">Kliknij by dodać zdjęcia (max 10)</p>
            <p className="text-xs text-[#C9A96E] mt-1">JPG, PNG — min. 800×800px</p>
          </div>
          <FormActions onCancel={() => setModal(null)} submitLabel={modal === 'add' ? 'Dodaj fryzurę' : 'Zapisz zmiany'} />
        </form>
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Usuń fryzurę">
        <div className="text-center py-4">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-[#3D2B1F] font-medium mb-2">Na pewno chcesz usunąć tę fryzurę?</p>
          <p className="text-sm text-[#8B6F5E]">Tej operacji nie można cofnąć.</p>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => setDeleteId(null)} className="flex-1 border border-[#E8D5C4] text-[#8B6F5E] py-3 rounded-full text-sm">Anuluj</button>
          <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full text-sm font-medium transition-colors">Usuń</button>
        </div>
      </Modal>
    </div>
  );
}
