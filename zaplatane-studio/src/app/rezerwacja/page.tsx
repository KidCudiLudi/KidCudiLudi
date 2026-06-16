'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HAIR_STYLES } from '@/lib/utils';

const DAYS = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];
const TIME_SLOTS = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

function generateCalendar(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const days_in_month = new Date(year, month + 1, 0).getDate();
  const offset = first === 0 ? 6 : first - 1;
  return { offset, days_in_month };
}

export default function RezerwacjaPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [step, setStep] = useState<'calendar' | 'summary' | 'payment'>('calendar');

  const { offset, days_in_month } = generateCalendar(viewYear, viewMonth);

  const months = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];

  const chosenStyle = HAIR_STYLES.find((s) => s.id === selectedStyle);
  const deposit = 100;
  const remaining = chosenStyle ? chosenStyle.price - deposit : 0;

  const unavailableDays = [3, 7, 10, 14, 17, 21, 24, 28];

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0); }
    else setViewMonth(viewMonth + 1);
  };

  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#F5EDE8] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-[#3D2B1F] mb-2">Rezerwacja Wizyty</h1>
          <p className="text-[#8B6F5E]">Wybierz termin i fryzurę, wpłać zadatek online</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[
            { key: 'calendar', label: '1. Termin' },
            { key: 'summary', label: '2. Podsumowanie' },
            { key: 'payment', label: '3. Płatność' },
          ].map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s.key ? 'bg-[#D4726A] text-white' : 'bg-[#F5EDE8] text-[#8B6F5E]'
              }`}>
                {i + 1}
              </div>
              <span className={`text-sm ${step === s.key ? 'text-[#D4726A] font-medium' : 'text-[#8B6F5E]'}`}>
                {s.label}
              </span>
              {i < 2 && <span className="text-[#E8D5C4] mx-2">→</span>}
            </div>
          ))}
        </div>

        {step === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#F5EDE8] p-6 shadow-sm">
              <h2 className="font-display font-bold text-[#3D2B1F] mb-6">Wybierz termin wizyty</h2>

              {/* Month nav */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="text-[#8B6F5E] hover:text-[#D4726A] transition-colors p-2">‹</button>
                <p className="font-display font-semibold text-[#3D2B1F]">{months[viewMonth]} {viewYear}</p>
                <button onClick={nextMonth} className="text-[#8B6F5E] hover:text-[#D4726A] transition-colors p-2">›</button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-[#C9A96E] uppercase py-1">{d}</div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array(offset).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
                {Array(days_in_month).fill(null).map((_, i) => {
                  const day = i + 1;
                  const isPast = new Date(viewYear, viewMonth, day) < today;
                  const isUnavailable = unavailableDays.includes(day);
                  const isSelected = selectedDate === day;
                  const isToday = today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;

                  return (
                    <button
                      key={day}
                      disabled={isPast || isUnavailable}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square rounded-full text-sm font-medium transition-all ${
                        isSelected ? 'bg-[#D4726A] text-white shadow-lg' :
                        isPast || isUnavailable ? 'text-[#E8D5C4] cursor-not-allowed' :
                        isToday ? 'border-2 border-[#D4726A] text-[#D4726A]' :
                        'text-[#3D2B1F] hover:bg-[#F5E8E7] hover:text-[#D4726A]'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div className="mt-6 border-t border-[#F5EDE8] pt-6">
                  <h3 className="text-sm font-medium text-[#3D2B1F] mb-4">
                    Wybierz godzinę — {selectedDate} {months[viewMonth]}
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedTime === t
                            ? 'bg-[#D4726A] text-white'
                            : 'bg-[#F5EDE8] text-[#3D2B1F] hover:bg-[#E8D5C4]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Style selection */}
              {selectedDate && selectedTime && (
                <div className="mt-6 border-t border-[#F5EDE8] pt-6">
                  <h3 className="text-sm font-medium text-[#3D2B1F] mb-4">Wybierz fryzurę</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {HAIR_STYLES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedStyle(s.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-sm ${
                          selectedStyle === s.id
                            ? 'border-[#D4726A] bg-[#F5E8E7]'
                            : 'border-[#F5EDE8] hover:border-[#D4726A]/40'
                        }`}
                      >
                        <span className="font-medium text-[#3D2B1F]">{s.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#8B6F5E]">{s.duration}</span>
                          <span className="text-[#D4726A] font-medium">{s.price} zł</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDate && selectedTime && selectedStyle && (
                <button
                  onClick={() => setStep('summary')}
                  className="mt-6 w-full bg-[#D4726A] hover:bg-[#C4625A] text-white font-medium py-3.5 rounded-full transition-colors"
                >
                  Przejdź do podsumowania →
                </button>
              )}
            </div>

            {/* Info panel */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#F5EDE8] p-5 shadow-sm">
                <h3 className="font-display font-bold text-[#3D2B1F] mb-3">ℹ️ Informacje o rezerwacji</h3>
                <ul className="space-y-2 text-sm text-[#8B6F5E]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4726A] mt-0.5">✓</span>
                    Zadatek wynosi <strong className="text-[#3D2B1F]">100 zł</strong> i jest bezzwrotny
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4726A] mt-0.5">✓</span>
                    Resztę kwoty płacisz na miejscu
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4726A] mt-0.5">✓</span>
                    Anulacja wizyty — zadatek nie podlega zwrotowi
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4726A] mt-0.5">✓</span>
                    Przypomnienie SMS dzień przed wizytą
                  </li>
                </ul>
              </div>

              <div className="bg-[#F5E8E7] rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🐕</span>
                  <div>
                    <p className="font-medium text-[#3D2B1F] text-sm">Sammy mówi:</p>
                    <p className="text-xs text-[#D4726A] italic">&ldquo;Nie mogę się doczekać Twojej wizyty!&rdquo;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'summary' && chosenStyle && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-[#F5EDE8] p-8 shadow-sm">
            <h2 className="font-display font-bold text-[#3D2B1F] text-xl mb-6">Podsumowanie rezerwacji</h2>
            <div className="space-y-4 text-sm mb-8">
              <div className="flex justify-between py-3 border-b border-[#F5EDE8]">
                <span className="text-[#8B6F5E]">Fryzura</span>
                <span className="font-medium text-[#3D2B1F]">{chosenStyle.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#F5EDE8]">
                <span className="text-[#8B6F5E]">Data</span>
                <span className="font-medium text-[#3D2B1F]">{selectedDate} {months[viewMonth]} {viewYear}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#F5EDE8]">
                <span className="text-[#8B6F5E]">Godzina</span>
                <span className="font-medium text-[#3D2B1F]">{selectedTime}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#F5EDE8]">
                <span className="text-[#8B6F5E]">Cena fryzury</span>
                <span className="font-medium text-[#3D2B1F]">{chosenStyle.price} zł</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#F5EDE8]">
                <span className="text-[#8B6F5E]">Zadatek (teraz)</span>
                <span className="font-bold text-[#D4726A]">{deposit} zł</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[#8B6F5E]">Do dopłaty na wizytę</span>
                <span className="font-medium text-[#3D2B1F]">{remaining} zł</span>
              </div>
            </div>
            <p className="text-xs text-[#8B6F5E] bg-[#FDF9F6] rounded-xl p-3 mb-6">
              ⚠️ Wpłacając zadatek akceptujesz, że jest on bezzwrotny w przypadku anulowania wizyty.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setStep('calendar')} className="flex-1 border border-[#E8D5C4] text-[#8B6F5E] py-3 rounded-full text-sm">
                ← Wróć
              </button>
              <button onClick={() => setStep('payment')} className="flex-1 bg-[#D4726A] hover:bg-[#C4625A] text-white font-medium py-3 rounded-full transition-colors">
                Wpłać zadatek {deposit} zł →
              </button>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-[#F5EDE8] p-8 shadow-sm text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="font-display font-bold text-[#3D2B1F] text-xl mb-2">Bezpieczna płatność</h2>
            <p className="text-[#8B6F5E] text-sm mb-8">Kwota do zapłaty: <strong className="text-[#D4726A] text-lg">100 zł</strong></p>

            <div className="space-y-4 mb-8 text-left">
              <div>
                <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">Numer karty</label>
                <input type="text" placeholder="•••• •••• •••• ••••" className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D4726A]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">Ważna do</label>
                  <input type="text" placeholder="MM/RR" className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D4726A]" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">CVV</label>
                  <input type="text" placeholder="•••" className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D4726A]" />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">Imię i nazwisko</label>
                <input type="text" placeholder="Anna Kowalska" className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D4726A]" />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {['BLIK', 'Visa', 'MC', 'Apple Pay', 'G Pay'].map((p) => (
                <span key={p} className="bg-[#F5EDE8] rounded-lg px-3 py-1.5 text-xs text-[#8B6F5E] font-medium">{p}</span>
              ))}
            </div>

            <button className="w-full bg-[#D4726A] hover:bg-[#C4625A] text-white font-bold py-4 rounded-full transition-colors text-lg shadow-lg shadow-[#D4726A]/25">
              Zapłać 100 zł 🔒
            </button>
            <p className="text-xs text-[#8B6F5E] mt-3">Płatność obsługiwana przez Stripe SSL</p>
          </div>
        )}
      </div>
    </div>
  );
}
