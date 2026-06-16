'use client';
import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import Modal from '@/components/admin/Modal';
import StatusBadge from '@/components/admin/StatusBadge';
import { InputField, SelectField, TextareaField, ToggleField, FormActions } from '@/components/admin/FormField';
import { PRODUCTS } from '@/lib/utils';

type Product = typeof PRODUCTS[0] & { stock: number; active: boolean };

const initial: Product[] = PRODUCTS.map((p) => ({ ...p, stock: Math.floor(Math.random() * 50) + 5, active: true }));
const empty = { name: '', slug: '', price: '0', category: 'sety', description: '', stock: '10', active: true };

const catLabels: Record<string, string> = { sety: 'Sety wielorazowe', ponytaile: 'Ponytaile', akcesoria: 'Akcesoria', ebooki: 'Ebooki' };
const catIcon: Record<string, string> = { sety: '🪢', ponytaile: '🎀', akcesoria: '✨', ebooki: '📖' };

export default function AdminSklepPage() {
  const [products, setProducts] = useState<Product[]>(initial);
  const [modal, setModal] = useState<null | 'add' | 'edit'>(null);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<typeof empty>({ ...empty });
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (catFilter === 'all' || p.category === catFilter)
  );

  const openAdd = () => { setForm({ ...empty }); setModal('add'); };
  const openEdit = (p: Product) => {
    setForm({ name: p.name, slug: p.slug, price: String(p.price), category: p.category, description: '', stock: String(p.stock), active: p.active });
    setEditTarget(p);
    setModal('edit');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal === 'add') {
      setProducts([...products, { id: Date.now().toString(), name: form.name, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'), price: Number(form.price), category: form.category, stock: Number(form.stock), active: form.active }]);
    } else if (editTarget) {
      setProducts(products.map((p) => p.id === editTarget.id ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p));
    }
    setModal(null);
  };

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      <AdminHeader title="Sklep" subtitle={`${products.length} produktów`} action={{ label: 'Dodaj produkt', onClick: openAdd }} />

      <div className="p-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-[#F5EDE8] p-4 mb-6 flex flex-wrap gap-4">
          <div className="flex-1 relative min-w-48">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Szukaj produktu..." className="w-full border border-[#F5EDE8] rounded-xl px-4 py-2.5 text-sm pl-9 outline-none focus:border-[#D4726A]" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A96E] text-sm">🔍</span>
          </div>
          <div className="flex gap-2">
            {['all', 'sety', 'ponytaile', 'akcesoria', 'ebooki'].map((c) => (
              <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${catFilter === c ? 'bg-[#D4726A] text-white' : 'bg-[#F5EDE8] text-[#8B6F5E] hover:text-[#D4726A]'}`}>
                {c === 'all' ? 'Wszystkie' : catLabels[c]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-[#F5EDE8] shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="aspect-square bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center text-5xl relative">
                {catIcon[p.category] ?? '🪢'}
                <div className="absolute top-2 right-2">
                  <StatusBadge status={p.active ? 'active' : 'inactive'} />
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs text-[#C9A96E] font-medium">{catLabels[p.category]}</span>
                <h3 className="font-medium text-[#3D2B1F] mt-0.5 mb-2 leading-snug">{p.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-[#D4726A]">{p.price} zł</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.stock < 5 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                    {p.category === 'ebooki' ? '∞' : `${p.stock} szt.`}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="flex-1 text-xs bg-[#F5EDE8] hover:bg-[#D4726A] hover:text-white text-[#8B6F5E] py-2 rounded-full transition-colors">Edytuj</button>
                  <button onClick={() => setDeleteId(p.id)} className="text-xs bg-red-50 hover:bg-red-500 hover:text-white text-red-500 px-3 py-2 rounded-full transition-colors">🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Dodaj produkt' : 'Edytuj produkt'} wide>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Nazwa produktu" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <InputField label="Slug URL" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} hint="Auto-generowany" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <InputField label="Cena (zł)" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} required />
            <SelectField label="Kategoria" value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={Object.entries(catLabels).map(([v, l]) => ({ value: v, label: l }))} />
            <InputField label="Stan magazynowy" type="number" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} hint="0 = niedostępny" />
          </div>
          <TextareaField label="Opis produktu" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={3} />
          <div className="border border-[#F5EDE8] rounded-xl p-4">
            <ToggleField label="Aktywny (widoczny w sklepie)" checked={form.active} onChange={(v) => setForm({ ...form, active: v })} />
          </div>
          <div className="border-2 border-dashed border-[#F5EDE8] rounded-xl p-6 text-center cursor-pointer hover:border-[#D4726A]/40 transition-colors">
            <div className="text-3xl mb-2">🖼️</div>
            <p className="text-sm text-[#8B6F5E]">Kliknij by dodać zdjęcia produktu</p>
          </div>
          <FormActions onCancel={() => setModal(null)} submitLabel={modal === 'add' ? 'Dodaj produkt' : 'Zapisz'} />
        </form>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Usuń produkt">
        <div className="text-center py-4">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-[#3D2B1F] font-medium">Na pewno chcesz usunąć ten produkt?</p>
          <p className="text-sm text-[#8B6F5E] mt-1">Tej operacji nie można cofnąć.</p>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => setDeleteId(null)} className="flex-1 border border-[#E8D5C4] text-[#8B6F5E] py-3 rounded-full text-sm">Anuluj</button>
          <button onClick={() => { setProducts(products.filter((p) => p.id !== deleteId)); setDeleteId(null); }} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full text-sm font-medium transition-colors">Usuń</button>
        </div>
      </Modal>
    </div>
  );
}
