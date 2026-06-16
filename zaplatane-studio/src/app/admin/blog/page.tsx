'use client';
import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import Modal from '@/components/admin/Modal';
import StatusBadge from '@/components/admin/StatusBadge';
import { InputField, SelectField, TextareaField, ToggleField, FormActions } from '@/components/admin/FormField';
import { BLOG_POSTS } from '@/lib/utils';

type Post = typeof BLOG_POSTS[0] & { published: boolean; views: number };

const initial: Post[] = BLOG_POSTS.map((p, i) => ({ ...p, published: i < 4, views: Math.floor(Math.random() * 2000) + 100 }));
const empty = { title: '', slug: '', excerpt: '', category: 'pielegnacja', content: '', published: false };

const catLabels: Record<string, string> = { pielegnacja: 'Pielęgnacja', fryzury: 'Fryzury', inspiracje: 'Inspiracje', poradniki: 'Poradniki' };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>(initial);
  const [modal, setModal] = useState<null | 'add' | 'edit'>(null);
  const [editTarget, setEditTarget] = useState<Post | null>(null);
  const [form, setForm] = useState<typeof empty>({ ...empty });
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm({ ...empty }); setModal('add'); };
  const openEdit = (p: Post) => {
    setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt, category: p.category, content: '', published: p.published });
    setEditTarget(p);
    setModal('edit');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal === 'add') {
      const newPost: Post = { id: Date.now().toString(), title: form.title, slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'), excerpt: form.excerpt, category: form.category, date: new Date().toISOString().split('T')[0], readTime: '5 min', published: form.published, views: 0 };
      setPosts([newPost, ...posts]);
    } else if (editTarget) {
      setPosts(posts.map((p) => p.id === editTarget.id ? { ...p, ...form } : p));
    }
    setModal(null);
  };

  const togglePublished = (id: string) => setPosts(posts.map((p) => p.id === id ? { ...p, published: !p.published } : p));

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      <AdminHeader title="Blog" subtitle={`${posts.length} artykułów`} action={{ label: 'Nowy artykuł', onClick: openAdd }} />

      <div className="p-8">
        <div className="bg-white rounded-2xl border border-[#F5EDE8] p-4 mb-6 flex gap-4">
          <div className="flex-1 relative">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Szukaj artykułu..." className="w-full border border-[#F5EDE8] rounded-xl px-4 py-2.5 text-sm pl-9 outline-none focus:border-[#D4726A]" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A96E]">🔍</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#F5EDE8] shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F5EDE8] bg-[#FDF9F6]">
                {['Tytuł', 'Kategoria', 'Data', 'Wyświetlenia', 'Status', 'Akcje'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-[#8B6F5E] uppercase tracking-wide font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-[#F5EDE8] last:border-0 hover:bg-[#FDF9F6] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center text-xl flex-shrink-0">📝</div>
                      <div>
                        <p className="font-medium text-[#3D2B1F]">{p.title}</p>
                        <p className="text-xs text-[#C9A96E]">/blog/{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#8B6F5E]">{catLabels[p.category] ?? p.category}</td>
                  <td className="px-5 py-4 text-[#8B6F5E]">{p.date}</td>
                  <td className="px-5 py-4 text-[#8B6F5E]">{p.views.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => togglePublished(p.id)}>
                      <StatusBadge status={p.published ? 'published' : 'draft'} />
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="text-xs bg-[#F5EDE8] hover:bg-[#D4726A] hover:text-white text-[#8B6F5E] px-3 py-1.5 rounded-full transition-colors">Edytuj</button>
                      <button onClick={() => setDeleteId(p.id)} className="text-xs bg-red-50 hover:bg-red-500 hover:text-white text-red-600 px-3 py-1.5 rounded-full transition-colors">Usuń</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Nowy artykuł' : 'Edytuj artykuł'} wide>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Tytuł" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
            <InputField label="Slug URL" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} hint="Auto-generowany" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="Kategoria" value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={Object.entries(catLabels).map(([v, l]) => ({ value: v, label: l }))} />
          </div>
          <TextareaField label="Zajawka" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} rows={2} />
          <TextareaField label="Treść artykułu" value={form.content} onChange={(v) => setForm({ ...form, content: v })} rows={8} placeholder="Treść w formacie Markdown..." />
          <div className="border-2 border-dashed border-[#F5EDE8] rounded-xl p-6 text-center cursor-pointer hover:border-[#D4726A]/40 transition-colors">
            <div className="text-3xl mb-2">🖼️</div>
            <p className="text-sm text-[#8B6F5E]">Kliknij by dodać zdjęcie okładki</p>
          </div>
          <div className="border border-[#F5EDE8] rounded-xl p-4">
            <ToggleField label="Opublikowany" checked={form.published} onChange={(v) => setForm({ ...form, published: v })} />
          </div>
          <FormActions onCancel={() => setModal(null)} submitLabel={modal === 'add' ? 'Dodaj artykuł' : 'Zapisz zmiany'} />
        </form>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Usuń artykuł">
        <div className="text-center py-4">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-[#3D2B1F] font-medium">Na pewno chcesz usunąć ten artykuł?</p>
          <p className="text-sm text-[#8B6F5E] mt-1">Tej operacji nie można cofnąć.</p>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => setDeleteId(null)} className="flex-1 border border-[#E8D5C4] text-[#8B6F5E] py-3 rounded-full text-sm">Anuluj</button>
          <button onClick={() => { setPosts(posts.filter((p) => p.id !== deleteId)); setDeleteId(null); }} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full text-sm font-medium transition-colors">Usuń</button>
        </div>
      </Modal>
    </div>
  );
}
