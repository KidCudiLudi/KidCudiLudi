'use client';
import { useState } from 'react';
import { CLUB_LEVELS, HAIR_STYLES, TESTIMONIALS } from '@/lib/utils';

const tabs = ['Moje wizyty', 'Zakupy', 'Kupony', 'Ulubione', 'Historia zamówień', 'Ustawienia'];

const mockBookings = [
  { id: '1', style: 'Boho Braids', date: '2024-05-15 14:00', status: 'Potwierdzona', price: 450 },
  { id: '2', style: 'Knotless Braids', date: '2024-04-20 10:00', status: 'Zrealizowana', price: 400 },
  { id: '3', style: 'Stitch Braids', date: '2024-03-10 12:00', status: 'Zrealizowana', price: 380 },
];

const mockCoupons = [
  { code: 'ROSE10', discount: '10%', validUntil: '2024-12-31', status: 'Aktywny' },
  { code: 'BIRTHDAY50', discount: '50 zł', validUntil: '2024-06-30', status: 'Aktywny' },
];

export default function KontoPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const userLevel = 'ROSE';
  const userRenoma = 1350;
  const userSploty = 780;
  const currentLevelData = CLUB_LEVELS.find((l) => l.name === userLevel)!;
  const nextLevelData = CLUB_LEVELS[CLUB_LEVELS.findIndex((l) => l.name === userLevel) + 1];
  const progress = nextLevelData
    ? Math.round(((userRenoma - currentLevelData.minRenoma) / (nextLevelData.minRenoma - currentLevelData.minRenoma)) * 100)
    : 100;

  return (
    <div className="bg-[#FDF9F6] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile header */}
        <div className="bg-white rounded-3xl border border-[#F5EDE8] shadow-sm p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E8A4A0] to-[#D4726A] flex items-center justify-center text-5xl shadow-lg">
                👩
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#D4726A] border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">✏</span>
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start mb-2">
                <h1 className="font-display text-2xl font-bold text-[#3D2B1F]">Klaudia</h1>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: currentLevelData.color }}
                >
                  {currentLevelData.emoji} {userLevel}
                </span>
              </div>
              <p className="text-[#8B6F5E] text-sm mb-4">klaudia@example.com</p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                <div>
                  <p className="font-display text-xl font-bold text-[#3D2B1F]">{userRenoma.toLocaleString()}</p>
                  <p className="text-xs text-[#8B6F5E] uppercase tracking-wide">Renoma</p>
                </div>
                <div className="border-l border-[#F5EDE8] pl-6">
                  <p className="font-display text-xl font-bold text-[#3D2B1F]">{userSploty.toLocaleString()}</p>
                  <p className="text-xs text-[#8B6F5E] uppercase tracking-wide">Sploty</p>
                </div>
                <div className="border-l border-[#F5EDE8] pl-6">
                  <p className="font-display text-xl font-bold text-[#3D2B1F]">3</p>
                  <p className="text-xs text-[#8B6F5E] uppercase tracking-wide">Wizyty</p>
                </div>
              </div>

              {/* Level progress */}
              {nextLevelData && (
                <div className="mt-4 max-w-sm">
                  <div className="flex items-center justify-between text-xs text-[#8B6F5E] mb-1">
                    <span>{userLevel}</span>
                    <span>{nextLevelData.name} ({nextLevelData.minRenoma - userRenoma} Renomy)</span>
                  </div>
                  <div className="h-2 bg-[#F5EDE8] rounded-full">
                    <div
                      className="h-2 bg-gradient-to-r from-[#D4726A] to-[#E8A4A0] rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 mb-6 bg-white rounded-2xl border border-[#F5EDE8] p-2 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-[#D4726A] text-white shadow-sm'
                  : 'text-[#8B6F5E] hover:text-[#D4726A]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-2xl border border-[#F5EDE8] shadow-sm p-6">
          {activeTab === 'Moje wizyty' && (
            <div>
              <h2 className="font-display font-bold text-[#3D2B1F] text-xl mb-6">Moje wizyty</h2>
              <div className="space-y-4">
                {mockBookings.map((b) => (
                  <div key={b.id} className="flex items-center justify-between p-4 border border-[#F5EDE8] rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#F5E8E7] flex items-center justify-center text-2xl">🪢</div>
                      <div>
                        <p className="font-medium text-[#3D2B1F]">{b.style}</p>
                        <p className="text-sm text-[#8B6F5E]">{b.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#D4726A]">{b.price} zł</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        b.status === 'Potwierdzona' ? 'bg-green-100 text-green-700' : 'bg-[#F5E8E7] text-[#D4726A]'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Kupony' && (
            <div>
              <h2 className="font-display font-bold text-[#3D2B1F] text-xl mb-6">Moje kupony</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockCoupons.map((c) => (
                  <div key={c.code} className="border-2 border-dashed border-[#D4726A]/30 rounded-2xl p-5 bg-[#FDF9F6]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-display font-bold text-[#D4726A]">{c.discount}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{c.status}</span>
                    </div>
                    <p className="font-mono text-sm font-bold text-[#3D2B1F] bg-white rounded-lg px-3 py-2 border border-[#F5EDE8]">
                      {c.code}
                    </p>
                    <p className="text-xs text-[#8B6F5E] mt-2">Ważny do: {c.validUntil}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Ulubione' && (
            <div>
              <h2 className="font-display font-bold text-[#3D2B1F] text-xl mb-6">Ulubione fryzury</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {HAIR_STYLES.slice(0, 3).map((s) => (
                  <div key={s.id} className="bg-[#FDF9F6] rounded-xl p-3 border border-[#F5EDE8]">
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center mb-2 text-3xl">
                      🪢
                    </div>
                    <p className="text-sm font-medium text-[#3D2B1F]">{s.name}</p>
                    <p className="text-xs text-[#D4726A]">od {s.price} zł</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Ustawienia' && (
            <div>
              <h2 className="font-display font-bold text-[#3D2B1F] text-xl mb-6">Ustawienia konta</h2>
              <div className="space-y-5 max-w-md">
                {[
                  { label: 'Imię i nazwisko', value: 'Klaudia Kowalska', type: 'text' },
                  { label: 'Adres e-mail', value: 'klaudia@example.com', type: 'email' },
                  { label: 'Numer telefonu', value: '+48 500 123 456', type: 'tel' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A]"
                    />
                  </div>
                ))}
                <button className="bg-[#D4726A] hover:bg-[#C4625A] text-white font-medium px-8 py-3 rounded-full transition-colors text-sm">
                  Zapisz zmiany
                </button>
              </div>
            </div>
          )}

          {!['Moje wizyty', 'Kupony', 'Ulubione', 'Ustawienia'].includes(activeTab) && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🐕</div>
              <p className="text-[#8B6F5E]">Sekcja &ldquo;{activeTab}&rdquo; — wkrótce dostępna!</p>
              <p className="text-xs text-[#C9A96E] mt-1">Sammy pracuje nad tym!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
