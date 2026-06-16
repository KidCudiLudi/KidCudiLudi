import Link from 'next/link';
import { CLUB_LEVELS } from '@/lib/utils';

const levelPerks: Record<string, string[]> = {
  NUDE: ['Dostęp do newslettera', 'Podstawowe zniżki na produkty'],
  BLUSH: ['5% rabatu na fryzury', 'Dostęp do ekskluzywnych treści'],
  ROSE: ['10% rabatu na fryzury', 'Priorytetowe terminy rezerwacji', 'Sploty za opinie'],
  PEARL: ['12% rabatu', 'Darmowa konsultacja stylizacyjna', 'Dostęp do limitowanych produktów'],
  SATIN: ['15% rabatu', 'Pielęgnacja gratis raz w miesiącu', 'Zaproszenia na eventy'],
  VELVET: ['18% rabatu', 'Personalizowane zestawy', 'Dedykowany doradca'],
  GOLDEN: ['20% rabatu', 'Produkty premium gratis', 'Sesja zdjęciowa fryzury'],
  DIAMOND: ['25% rabatu', 'Darmowe fryzury co 10. wizyta', 'VIP dostęp do nowości'],
  SIGNATURE: ['30% rabatu', 'Ekskluzywne limity dla Ciebie', 'Mentoring od Ambasadorki'],
  ELITE: ['35% rabatu', 'Bezpłatne fryzury raz w roku', 'Status Ambasadorki marki', 'Własna karta ELITE'],
};

const levelColors: Record<string, { bg: string; text: string; border: string }> = {
  NUDE:      { bg: '#F5EDE8', text: '#8B6F5E', border: '#E8D5C4' },
  BLUSH:     { bg: '#FCE8E8', text: '#C4525A', border: '#F5C6C0' },
  ROSE:      { bg: '#F5E8E7', text: '#D4726A', border: '#E8A4A0' },
  PEARL:     { bg: '#F5F3F1', text: '#8B8080', border: '#E0D8D0' },
  SATIN:     { bg: '#EDE8E0', text: '#7A6555', border: '#C4B5A0' },
  VELVET:    { bg: '#EDE0ED', text: '#7A4A7A', border: '#C4A0C4' },
  GOLDEN:    { bg: '#FBF5E6', text: '#9A7435', border: '#C9A96E' },
  DIAMOND:   { bg: '#E6F3FB', text: '#3580A0', border: '#A0C8E8' },
  SIGNATURE: { bg: '#E8E8E8', text: '#2D2D2D', border: '#9A9A9A' },
  ELITE:     { bg: '#FBF0D4', text: '#9A7435', border: '#C9A96E' },
};

export default function KlubPage() {
  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#3D2B1F] to-[#5C3D2E] py-20 text-center relative overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl opacity-10">🪢</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-10">💎</div>
        <div className="max-w-3xl mx-auto px-4">
          <span className="inline-block text-[#C9A96E] text-sm uppercase tracking-widest font-medium mb-4">
            ♥ Program lojalnościowy
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Klub Zaplątanych
          </h1>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Dołącz do wyjątkowej społeczności i zdobywaj nagrody za każdy krok.
            Im więcej wizytujesz — tym więcej korzyści!
          </p>
          <Link
            href="/konto"
            className="inline-block bg-[#D4726A] hover:bg-[#C4625A] text-white font-medium px-8 py-3.5 rounded-full transition-all shadow-lg shadow-[#D4726A]/25"
          >
            Dołącz do Klubu
          </Link>
        </div>
      </section>

      {/* Two currencies */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[#3D2B1F] text-center mb-10">
            Dwie waluty Klubu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#F5E8E7] to-[#FDF9F6] rounded-3xl p-8 border border-[#E8D5C4]">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="font-display text-2xl font-bold text-[#3D2B1F] mb-2">Renoma</h3>
              <p className="text-[#8B6F5E] text-sm mb-4 leading-relaxed">
                Renoma to Twój poziom lojalności. Zdobywasz ją za każdą wizytę, zakup i aktywność.
                Im więcej Renomy — tym wyższy poziom i lepsze korzyści!
              </p>
              <ul className="space-y-2 text-sm text-[#8B6F5E]">
                <li className="flex items-center gap-2"><span className="text-[#C9A96E]">✓</span> +100 za każdą wizytę</li>
                <li className="flex items-center gap-2"><span className="text-[#C9A96E]">✓</span> +50 za zakup produktu</li>
                <li className="flex items-center gap-2"><span className="text-[#C9A96E]">✓</span> +25 za opinię</li>
                <li className="flex items-center gap-2"><span className="text-[#C9A96E]">✓</span> +10 za polecenie znajomej</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#FBF5E6] to-[#FDF9F6] rounded-3xl p-8 border border-[#C9A96E]/30">
              <div className="text-5xl mb-4">🧶</div>
              <h3 className="font-display text-2xl font-bold text-[#3D2B1F] mb-2">Sploty</h3>
              <p className="text-[#8B6F5E] text-sm mb-4 leading-relaxed">
                Sploty to Twoja waluta do wydawania w sklepie i na usługi.
                Każde 10 Renomy = 1 Splot. Wydawaj je na rabaty i nagrody!
              </p>
              <ul className="space-y-2 text-sm text-[#8B6F5E]">
                <li className="flex items-center gap-2"><span className="text-[#C9A96E]">✓</span> 1 Splot = 1 zł rabatu</li>
                <li className="flex items-center gap-2"><span className="text-[#C9A96E]">✓</span> Wymień na produkty ze sklepu</li>
                <li className="flex items-center gap-2"><span className="text-[#C9A96E]">✓</span> Zniżka na kolejną wizytę</li>
                <li className="flex items-center gap-2"><span className="text-[#C9A96E]">✓</span> Dostęp do limitowanych nagród</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Levels */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[#3D2B1F] text-center mb-4">
            Poziomy Klubu Zaplątanych
          </h2>
          <p className="text-[#8B6F5E] text-center mb-12 max-w-2xl mx-auto">
            10 poziomów, 10 unikalnych postaci ambasadorek i ich wiernego Sammy&apos;ego.
            Każdy poziom to nowy świat korzyści!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CLUB_LEVELS.map((level, i) => {
              const colors = levelColors[level.name];
              const perks = levelPerks[level.name] || [];
              return (
                <div
                  key={level.name}
                  className="rounded-2xl border-2 p-4 text-center hover:shadow-lg transition-all"
                  style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                >
                  {/* Level number */}
                  <div className="text-xs font-medium mb-3 opacity-50" style={{ color: colors.text }}>
                    #{i + 1}
                  </div>

                  {/* Mascot placeholder */}
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl"
                    style={{ backgroundColor: colors.border }}
                  >
                    👧
                  </div>

                  {/* Sammy variant */}
                  <div className="text-lg mb-2">🐕</div>

                  {/* Level name */}
                  <h3
                    className="font-display font-bold text-lg mb-1"
                    style={{ color: colors.text }}
                  >
                    {level.emoji} {level.name}
                  </h3>

                  <p className="text-xs mb-3 opacity-60" style={{ color: colors.text }}>
                    od {level.minRenoma.toLocaleString()} Renomy
                  </p>

                  {/* Perks */}
                  <div className="space-y-1 text-left">
                    {perks.slice(0, 2).map((perk, j) => (
                      <p key={j} className="text-xs flex items-start gap-1" style={{ color: colors.text }}>
                        <span className="opacity-70">✓</span>
                        <span className="opacity-80">{perk}</span>
                      </p>
                    ))}
                    {perks.length > 2 && (
                      <p className="text-xs opacity-50" style={{ color: colors.text }}>
                        +{perks.length - 2} więcej...
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F5E8E7]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <span className="text-5xl">👧</span>
            <span className="text-5xl">🐕</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-[#3D2B1F] mb-4">
            Gotowa dołączyć do Klubu?
          </h2>
          <p className="text-[#8B6F5E] mb-8">
            Zarezerwuj pierwszą wizytę i od razu zacznij zbierać Renomę!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rezerwacja" className="bg-[#D4726A] hover:bg-[#C4625A] text-white font-medium px-8 py-3.5 rounded-full transition-all shadow-lg shadow-[#D4726A]/25">
              Umów wizytę
            </Link>
            <Link href="/konto" className="border-2 border-[#D4726A] text-[#D4726A] hover:bg-[#D4726A] hover:text-white font-medium px-8 py-3.5 rounded-full transition-all">
              Mój profil
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
