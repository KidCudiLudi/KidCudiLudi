'use client';
import { useState } from 'react';

const topics = ['Rezerwacja wizyty', 'Pytanie o fryzurę', 'Zamówienie ze sklepu', 'Współpraca', 'Inne'];

export default function KontaktPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: topics[0], message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setSending(false);
  };

  return (
    <div className="bg-[#FDF9F6] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#D4726A] text-sm uppercase tracking-widest font-medium">♥ Kontakt</span>
          <h1 className="font-display text-3xl font-bold text-[#3D2B1F] mt-2">Napisz do mnie</h1>
          <p className="text-[#8B6F5E] mt-2">Odpowiem najszybciej jak to możliwe — zwykle w ciągu 24 godzin.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-5">
            {[
              { icon: '✉️', label: 'E-mail', value: 'zaplatane.studio@gmail.com', href: 'mailto:zaplatane.studio@gmail.com' },
              { icon: '📞', label: 'Telefon', value: '+48 123 456 789', href: 'tel:+48123456789' },
              { icon: '📍', label: 'Lokalizacja', value: 'Wrocław (dokładny adres po umówieniu)', href: null },
              { icon: '🕐', label: 'Godziny pracy', value: 'Pon–Pt: 9–19\nSobota: 10–16', href: null },
            ].map((c) => (
              <div key={c.label} className="bg-white border border-[#F5EDE8] rounded-2xl p-5 shadow-sm flex items-start gap-4">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#C9A96E] font-medium mb-1">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-sm text-[#3D2B1F] hover:text-[#D4726A] transition-colors font-medium">{c.value}</a>
                  ) : (
                    <p className="text-sm text-[#3D2B1F] font-medium whitespace-pre-line">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Socials */}
            <div className="bg-white border border-[#F5EDE8] rounded-2xl p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-[#C9A96E] font-medium mb-3">Social media</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: '📸', label: 'Instagram', href: '#' },
                  { icon: '🎵', label: 'TikTok', href: '#' },
                  { icon: '📌', label: 'Pinterest', href: '#' },
                  { icon: '📘', label: 'Facebook', href: '#' },
                ].map((s) => (
                  <a key={s.label} href={s.href} className="flex items-center gap-2 text-sm text-[#8B6F5E] hover:text-[#D4726A] transition-colors p-2 rounded-lg hover:bg-[#F5E8E7]">
                    <span>{s.icon}</span>{s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Mascot */}
            <div className="bg-[#F5E8E7] rounded-2xl p-5 flex items-center gap-4">
              <span className="text-4xl">🐕</span>
              <div>
                <p className="text-sm font-medium text-[#3D2B1F]">Sammy czeka!</p>
                <p className="text-xs text-[#D4726A] italic">&ldquo;Napisz, na pewno odpiszemy!&rdquo;</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-[#F5EDE8] shadow-sm p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="text-7xl mb-4">💌</div>
                  <h3 className="font-display text-2xl font-bold text-[#3D2B1F] mb-2">Wiadomość wysłana!</h3>
                  <p className="text-[#8B6F5E]">Dziękuję za kontakt. Odezwę się najszybciej jak to możliwe.</p>
                  <button onClick={() => setSent(false)} className="mt-6 border border-[#D4726A] text-[#D4726A] hover:bg-[#D4726A] hover:text-white px-8 py-3 rounded-full font-medium transition-colors text-sm">
                    Wyślij kolejną wiadomość
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">Imię i nazwisko *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Anna Kowalska"
                        className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">Adres e-mail *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="anna@example.com"
                        className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">Telefon (opcjonalnie)</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+48 500 000 000"
                        className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">Temat *</label>
                      <select
                        value={form.topic}
                        onChange={(e) => setForm({ ...form, topic: e.target.value })}
                        className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] transition-colors"
                      >
                        {topics.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">Wiadomość *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Napisz coś..."
                      className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input type="checkbox" required id="rodo" className="mt-1 accent-[#D4726A]" />
                    <label htmlFor="rodo" className="text-xs text-[#8B6F5E] leading-relaxed">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na wiadomość, zgodnie z{' '}
                      <a href="/regulamin" className="text-[#D4726A] hover:underline">Polityką prywatności</a>.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-[#D4726A] hover:bg-[#C4625A] disabled:opacity-60 text-white font-medium py-4 rounded-full transition-all shadow-lg shadow-[#D4726A]/20"
                  >
                    {sending ? 'Wysyłam...' : 'Wyślij wiadomość ♥'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
