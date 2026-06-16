'use client';
import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { InputField, TextareaField, ToggleField } from '@/components/admin/FormField';

type Section = 'kontakt' | 'godziny' | 'social' | 'platnosci' | 'powiadomienia';

const DAYS = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

export default function AdminUstawieniaPage() {
  const [active, setActive] = useState<Section>('kontakt');
  const [saved, setSaved] = useState(false);

  const [kontakt, setKontakt] = useState({
    name: 'Zaplątane Studio', email: 'zaplatane.studio@gmail.com', phone: '+48 123 456 789',
    address: 'ul. Świdnicka 21/3', city: 'Wrocław', postalCode: '50-066',
    bio: 'Specjalizujemy się w afrykańskich warkoczach i ochronnych fryzurach. Pasja do włosów od 2018 roku.',
  });

  const [hours, setHours] = useState([
    { day: 'Poniedziałek', open: '09:00', close: '19:00', closed: false },
    { day: 'Wtorek', open: '09:00', close: '19:00', closed: false },
    { day: 'Środa', open: '09:00', close: '19:00', closed: false },
    { day: 'Czwartek', open: '09:00', close: '19:00', closed: false },
    { day: 'Piątek', open: '09:00', close: '19:00', closed: false },
    { day: 'Sobota', open: '10:00', close: '16:00', closed: false },
    { day: 'Niedziela', open: '10:00', close: '14:00', closed: true },
  ]);

  const [social, setSocial] = useState({
    instagram: 'zaplatane.studio', tiktok: 'zaplatane.studio',
    facebook: 'ZaplątaneStudio', pinterest: 'zaplatane_studio',
  });

  const [notifications, setNotifications] = useState({
    emailNewBooking: true, emailNewOrder: true, emailNewReview: true,
    smsReminder: false, smsNewBooking: false,
  });

  const [payments, setPayments] = useState({
    deposit: '100', stripePublicKey: '', stripeSecretKey: '',
    p24Enabled: false, blikEnabled: true, cardEnabled: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sections: { key: Section; label: string; icon: string }[] = [
    { key: 'kontakt', label: 'Kontakt', icon: '📍' },
    { key: 'godziny', label: 'Godziny otwarcia', icon: '🕐' },
    { key: 'social', label: 'Media społecznościowe', icon: '📱' },
    { key: 'platnosci', label: 'Płatności', icon: '💳' },
    { key: 'powiadomienia', label: 'Powiadomienia', icon: '🔔' },
  ];

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      <AdminHeader title="Ustawienia" subtitle="Konfiguracja studia" />

      <div className="p-8 flex gap-6">
        {/* Side nav */}
        <div className="w-56 flex-shrink-0 space-y-1">
          {sections.map((s) => (
            <button key={s.key} onClick={() => setActive(s.key)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active === s.key ? 'bg-[#D4726A] text-white shadow-sm' : 'text-[#8B6F5E] hover:bg-white hover:text-[#3D2B1F]'}`}>
              <span>{s.icon}</span>{s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-2xl border border-[#F5EDE8] shadow-sm p-6">
          {active === 'kontakt' && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-[#3D2B1F] text-lg mb-5">Dane kontaktowe</h2>
              <InputField label="Nazwa studia" value={kontakt.name} onChange={(v) => setKontakt({ ...kontakt, name: v })} />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Email" type="email" value={kontakt.email} onChange={(v) => setKontakt({ ...kontakt, email: v })} />
                <InputField label="Telefon" value={kontakt.phone} onChange={(v) => setKontakt({ ...kontakt, phone: v })} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2"><InputField label="Adres" value={kontakt.address} onChange={(v) => setKontakt({ ...kontakt, address: v })} /></div>
                <InputField label="Kod pocztowy" value={kontakt.postalCode} onChange={(v) => setKontakt({ ...kontakt, postalCode: v })} />
              </div>
              <InputField label="Miasto" value={kontakt.city} onChange={(v) => setKontakt({ ...kontakt, city: v })} />
              <TextareaField label="Opis studia (bio)" value={kontakt.bio} onChange={(v) => setKontakt({ ...kontakt, bio: v })} rows={3} />
            </div>
          )}

          {active === 'godziny' && (
            <div className="space-y-3">
              <h2 className="font-display font-bold text-[#3D2B1F] text-lg mb-5">Godziny otwarcia</h2>
              {hours.map((h, i) => (
                <div key={h.day} className="flex items-center gap-4 py-2 border-b border-[#F5EDE8] last:border-0">
                  <span className="w-32 text-sm font-medium text-[#3D2B1F]">{h.day}</span>
                  <ToggleField label="" checked={!h.closed} onChange={(v) => setHours(hours.map((hr, j) => j === i ? { ...hr, closed: !v } : hr))} />
                  {!h.closed ? (
                    <div className="flex items-center gap-3">
                      <input type="time" value={h.open} onChange={(e) => setHours(hours.map((hr, j) => j === i ? { ...hr, open: e.target.value } : hr))} className="border border-[#F5EDE8] rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#D4726A]" />
                      <span className="text-[#8B6F5E]">—</span>
                      <input type="time" value={h.close} onChange={(e) => setHours(hours.map((hr, j) => j === i ? { ...hr, close: e.target.value } : hr))} className="border border-[#F5EDE8] rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#D4726A]" />
                    </div>
                  ) : (
                    <span className="text-sm text-[#C9A96E]">Zamknięte</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {active === 'social' && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-[#3D2B1F] text-lg mb-5">Media społecznościowe</h2>
              <InputField label="Instagram (login)" value={social.instagram} onChange={(v) => setSocial({ ...social, instagram: v })} hint="Bez @ i bez https://" />
              <InputField label="TikTok (login)" value={social.tiktok} onChange={(v) => setSocial({ ...social, tiktok: v })} hint="Bez @ i bez https://" />
              <InputField label="Facebook (nazwa strony)" value={social.facebook} onChange={(v) => setSocial({ ...social, facebook: v })} />
              <InputField label="Pinterest (login)" value={social.pinterest} onChange={(v) => setSocial({ ...social, pinterest: v })} />
            </div>
          )}

          {active === 'platnosci' && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-[#3D2B1F] text-lg mb-5">Płatności i zadatek</h2>
              <InputField label="Wysokość zadatku (zł)" type="number" value={payments.deposit} onChange={(v) => setPayments({ ...payments, deposit: v })} hint="Zadatek bezzwrotny pobierany przy rezerwacji" />
              <div className="border border-[#F5EDE8] rounded-xl p-4 space-y-3">
                <p className="text-xs font-medium text-[#C9A96E] uppercase tracking-wide">Metody płatności</p>
                <ToggleField label="Karta (Stripe)" checked={payments.cardEnabled} onChange={(v) => setPayments({ ...payments, cardEnabled: v })} />
                <ToggleField label="BLIK" checked={payments.blikEnabled} onChange={(v) => setPayments({ ...payments, blikEnabled: v })} />
                <ToggleField label="Przelewy24" checked={payments.p24Enabled} onChange={(v) => setPayments({ ...payments, p24Enabled: v })} />
              </div>
              <div className="space-y-3">
                <p className="text-xs font-medium text-[#C9A96E] uppercase tracking-wide">Klucze API Stripe</p>
                <InputField label="Klucz publiczny (pk_...)" value={payments.stripePublicKey} onChange={(v) => setPayments({ ...payments, stripePublicKey: v })} hint="Widoczny w dashboardzie Stripe" />
                <InputField label="Klucz tajny (sk_...)" value={payments.stripeSecretKey} onChange={(v) => setPayments({ ...payments, stripeSecretKey: v })} hint="Przechowywany tylko na serwerze" />
              </div>
            </div>
          )}

          {active === 'powiadomienia' && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-[#3D2B1F] text-lg mb-5">Powiadomienia</h2>
              <div className="border border-[#F5EDE8] rounded-xl p-4 space-y-3">
                <p className="text-xs font-medium text-[#C9A96E] uppercase tracking-wide mb-2">Email</p>
                <ToggleField label="Nowa rezerwacja" checked={notifications.emailNewBooking} onChange={(v) => setNotifications({ ...notifications, emailNewBooking: v })} />
                <ToggleField label="Nowe zamówienie" checked={notifications.emailNewOrder} onChange={(v) => setNotifications({ ...notifications, emailNewOrder: v })} />
                <ToggleField label="Nowa opinia" checked={notifications.emailNewReview} onChange={(v) => setNotifications({ ...notifications, emailNewReview: v })} />
              </div>
              <div className="border border-[#F5EDE8] rounded-xl p-4 space-y-3">
                <p className="text-xs font-medium text-[#C9A96E] uppercase tracking-wide mb-2">SMS</p>
                <ToggleField label="Nowa rezerwacja" checked={notifications.smsNewBooking} onChange={(v) => setNotifications({ ...notifications, smsNewBooking: v })} />
                <ToggleField label="Przypomnienie 24h przed wizytą" checked={notifications.smsReminder} onChange={(v) => setNotifications({ ...notifications, smsReminder: v })} />
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-[#F5EDE8] flex items-center gap-4">
            <button onClick={handleSave} className="bg-[#D4726A] hover:bg-[#C4625A] text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
              Zapisz zmiany
            </button>
            {saved && <span className="text-sm text-green-600 font-medium">✓ Zapisano!</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
