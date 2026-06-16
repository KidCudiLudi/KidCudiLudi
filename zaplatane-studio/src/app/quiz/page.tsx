'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HAIR_STYLES } from '@/lib/utils';

const steps = [
  {
    title: 'Jaka jest długość Twoich włosów?',
    options: [
      { label: 'Krótkie', desc: 'Do ramion', icon: '✂️' },
      { label: 'Średnie', desc: 'Do łopatek', icon: '💇' },
      { label: 'Długie', desc: 'Do pasa', icon: '🌸' },
      { label: 'Bardzo długie', desc: 'Poniżej pasa', icon: '✨' },
    ],
  },
  {
    title: 'Jaki jest typ Twoich włosów?',
    options: [
      { label: 'Proste', desc: 'Bez fal', icon: '〰️' },
      { label: 'Kręcone', desc: 'Naturalne loki', icon: '🌀' },
      { label: 'Grube', desc: 'Gęste i mocne', icon: '💪' },
      { label: 'Cienkie', desc: 'Delikatne', icon: '🌾' },
    ],
  },
  {
    title: 'Jaki masz styl życia?',
    options: [
      { label: 'Aktywny / sportowy', desc: 'Dużo ćwiczę', icon: '🏃' },
      { label: 'Praca biurowa', desc: 'Elegancki look', icon: '💼' },
      { label: 'Dużo podróżuję', desc: 'Wygoda to klucz', icon: '✈️' },
      { label: 'Mix wszystkiego', desc: 'Zmienne życie', icon: '🎭' },
    ],
  },
  {
    title: 'Jakie masz preferencje stylowe?',
    options: [
      { label: 'Naturalne', desc: 'Subtelny look', icon: '🌿' },
      { label: 'Efektowne', desc: 'Chcę wow!', icon: '💫' },
      { label: 'Sportowe', desc: 'Funkcjonalne', icon: '🎽' },
      { label: 'Klasyczne', desc: 'Ponadczasowe', icon: '👑' },
    ],
  },
  {
    title: 'Jak długo chcesz nosić fryzurę?',
    options: [
      { label: '1–2 tygodnie', desc: 'Krótki czas', icon: '📅' },
      { label: '3–4 tygodnie', desc: 'Średni czas', icon: '🗓️' },
      { label: '1–2 miesiące', desc: 'Długi czas', icon: '📆' },
      { label: 'Powyżej 2 miesięcy', desc: 'Maksymalnie długo', icon: '🏆' },
    ],
  },
  {
    title: 'Jaki jest Twój budżet?',
    options: [
      { label: 'Do 300 zł', desc: 'Ekonomicznie', icon: '💵' },
      { label: '300–500 zł', desc: 'Umiarkowanie', icon: '💳' },
      { label: 'Powyżej 500 zł', desc: 'Premium', icon: '💎' },
    ],
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const currentStep = steps[step];
  const progress = ((step) / steps.length) * 100;

  const handleSelect = (option: string) => setSelected(option);

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (step + 1 >= steps.length) {
      setShowResults(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep(step - 1);
    setAnswers(answers.slice(0, -1));
    setSelected(null);
  };

  const recommendations = HAIR_STYLES.slice(0, 3);

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#FDF9F6] py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-6xl mb-4">👧</div>
            <h1 className="font-display text-3xl font-bold text-[#3D2B1F] mb-3">Świetnie! Oto Twoje fryzury</h1>
            <p className="text-[#8B6F5E]">Na podstawie Twoich odpowiedzi wybrałam dla Ciebie:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {recommendations.map((style, i) => (
              <div key={style.id} className="bg-white rounded-2xl overflow-hidden border border-[#F5EDE8] shadow-sm">
                <div className="aspect-video bg-gradient-to-br from-[#F5E8E7] to-[#E8D5C4] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl">🪢</div>
                    {i === 0 && <span className="text-xs bg-[#D4726A] text-white px-2 py-0.5 rounded-full mt-2 inline-block">Idealny wybór!</span>}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-[#3D2B1F]">{style.name}</h3>
                  <p className="text-[#D4726A] font-medium text-sm mt-1">od {style.price} zł</p>
                  <p className="text-xs text-[#8B6F5E] mt-1">⏱ {style.duration} · 📅 {style.wearTime}</p>
                  <Link
                    href="/rezerwacja"
                    className="mt-4 block w-full bg-[#D4726A] hover:bg-[#C4625A] text-white text-center text-sm font-medium py-2 rounded-full transition-colors"
                  >
                    Rezerwuj wizytę
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => { setStep(0); setAnswers([]); setSelected(null); setShowResults(false); }}
              className="border border-[#D4726A] text-[#D4726A] hover:bg-[#D4726A] hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Zrób quiz jeszcze raz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF9F6] py-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-[#8B6F5E] mb-2">
            <span>Pytanie {step + 1} z {steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-[#F5EDE8] rounded-full">
            <div className="h-2 bg-[#D4726A] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Mascot */}
        <div className="flex items-center gap-4 mb-8 bg-white rounded-2xl p-4 border border-[#F5EDE8] shadow-sm">
          <div className="text-4xl">👧</div>
          <div className="bg-[#F5E8E7] rounded-2xl rounded-tl-none px-4 py-3 flex-1">
            <p className="text-[#3D2B1F] font-medium text-sm">{currentStep.title}</p>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {currentStep.options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                selected === opt.label
                  ? 'border-[#D4726A] bg-[#F5E8E7]'
                  : 'border-[#F5EDE8] bg-white hover:border-[#D4726A]/40'
              }`}
            >
              <span className="text-3xl">{opt.icon}</span>
              <div>
                <p className={`font-medium ${selected === opt.label ? 'text-[#D4726A]' : 'text-[#3D2B1F]'}`}>{opt.label}</p>
                <p className="text-xs text-[#8B6F5E]">{opt.desc}</p>
              </div>
              {selected === opt.label && <span className="ml-auto text-[#D4726A] text-xl">✓</span>}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="px-6 py-3 border border-[#E8D5C4] text-[#8B6F5E] rounded-full text-sm font-medium disabled:opacity-40 hover:border-[#D4726A] hover:text-[#D4726A] transition-colors"
          >
            ← Wstecz
          </button>
          <button
            onClick={handleNext}
            disabled={!selected}
            className="flex-1 bg-[#D4726A] hover:bg-[#C4625A] disabled:opacity-40 text-white font-medium py-3 rounded-full transition-colors"
          >
            {step + 1 === steps.length ? 'Zobacz wyniki ✨' : 'Dalej →'}
          </button>
        </div>
      </div>
    </div>
  );
}
