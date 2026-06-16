'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RejestracjaPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Hasła nie są identyczne.'); return; }
    if (form.password.length < 8) { setError('Hasło musi mieć minimum 8 znaków.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    router.push('/konto');
  };

  return (
    <div className="min-h-screen bg-[#FDF9F6] flex items-center justify-center p-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-[#F5E8E7] flex items-center justify-center text-3xl shadow-sm">🪢</div>
            <div>
              <p className="font-display font-semibold text-[#3D2B1F] text-xl">Zaplątane Studio</p>
              <p className="text-[#C9A96E] text-xs tracking-widest uppercase">— Studio —</p>
            </div>
          </Link>
          <h1 className="font-display text-2xl font-bold text-[#3D2B1F] mt-6">Dołącz do nas</h1>
          <p className="text-[#8B6F5E] text-sm mt-1">Załóż konto i dołącz do Klubu Zaplątanych ♥</p>
        </div>

        {/* Perks */}
        <div className="bg-gradient-to-br from-[#F5E8E7] to-[#FDF9F6] rounded-2xl border border-[#E8D5C4] p-4 mb-6">
          <p className="text-xs font-medium text-[#3D2B1F] mb-2">Z kontem otrzymujesz:</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-[#8B6F5E]">
            {['Historia wizyt', 'Zbierasz Renomę', 'Kupony i nagrody', 'Ulubione fryzury'].map((p) => (
              <div key={p} className="flex items-center gap-1.5"><span className="text-[#D4726A]">✓</span>{p}</div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#F5EDE8] shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>
            )}

            {[
              { key: 'name', label: 'Imię i nazwisko', type: 'text', placeholder: 'Anna Kowalska', required: true },
              { key: 'email', label: 'Adres e-mail', type: 'email', placeholder: 'anna@example.com', required: true },
              { key: 'phone', label: 'Numer telefonu (opcjonalnie)', type: 'tel', placeholder: '+48 500 000 000', required: false },
              { key: 'password', label: 'Hasło (min. 8 znaków)', type: 'password', placeholder: '••••••••', required: true },
              { key: 'confirm', label: 'Powtórz hasło', type: 'password', placeholder: '••••••••', required: true },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">{field.label}</label>
                <input
                  type={field.type}
                  required={field.required}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] transition-colors"
                />
              </div>
            ))}

            <div className="flex items-start gap-3">
              <input type="checkbox" required id="terms" className="mt-1 accent-[#D4726A]" />
              <label htmlFor="terms" className="text-xs text-[#8B6F5E] leading-relaxed">
                Akceptuję{' '}
                <Link href="/regulamin" className="text-[#D4726A] hover:underline">Regulamin</Link>
                {' '}i{' '}
                <Link href="/regulamin" className="text-[#D4726A] hover:underline">Politykę prywatności</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4726A] hover:bg-[#C4625A] disabled:opacity-60 text-white font-medium py-3.5 rounded-full transition-all shadow-lg shadow-[#D4726A]/20 mt-2"
            >
              {loading ? 'Tworzę konto...' : 'Załóż konto ♥'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#F5EDE8] text-center">
            <p className="text-sm text-[#8B6F5E]">
              Masz już konto?{' '}
              <Link href="/logowanie" className="text-[#D4726A] font-medium hover:underline">Zaloguj się</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
