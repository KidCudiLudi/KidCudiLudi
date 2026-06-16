import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'O mnie — Zaplątane Studio',
  description: 'Poznaj historię Zaplątane Studio i moją pasję do zaplatania włosów.',
};

const values = [
  { icon: '💕', title: 'Pasja', desc: 'Zaplatanie włosów to moja pasja od lat. Każda fryzura to dla mnie małe dzieło sztuki.' },
  { icon: '🌸', title: 'Kobiecość', desc: 'Wierzę, że każda kobieta zasługuje na piękno i pewność siebie każdego dnia.' },
  { icon: '🪢', title: 'Jakość', desc: 'Używam wyłącznie sprawdzonych produktów i technik, które dbają o zdrowie Twoich włosów.' },
  { icon: '💎', title: 'Społeczność', desc: 'Zaplątane Studio to nie tylko salon — to społeczność kobiet, które wspierają się nawzajem.' },
];

const timeline = [
  { year: '2019', event: 'Pierwsze warkocze — dla przyjaciółki na wakacje' },
  { year: '2020', event: 'Kurs profesjonalnego braidingu w Londynie' },
  { year: '2021', event: 'Pierwsze klientki — mała pracownia domowa' },
  { year: '2022', event: 'Otwarcie własnego studia we Wrocławiu' },
  { year: '2023', event: 'Ponad 500 klientek i launch Klubu Zaplątanych' },
  { year: '2024', event: 'Nowa strona, sklep online i ebooki dla Was!' },
];

export default function OMniePage() {
  return (
    <div className="bg-[#FDF9F6] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#FDF9F6] via-[#F5EDE8] to-[#F5E8E7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#D4726A] text-sm uppercase tracking-widest font-medium">♥ O mnie</span>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-[#3D2B1F] mt-2 mb-6 leading-tight">
                Cześć, jestem<br />
                <span className="italic text-[#D4726A]">właścicielką Zaplątane Studio</span>
              </h1>
              <p className="text-[#8B6F5E] text-lg leading-relaxed mb-8">
                Mam na imię [Twoje imię] i od kilku lat z pasją zaplatam włosy pięknych kobiet.
                Zaplątane Studio to moje marzenie — miejsce, gdzie każda klientka czuje się wyjątkowo.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/rezerwacja" className="bg-[#D4726A] hover:bg-[#C4625A] text-white font-medium px-8 py-3.5 rounded-full transition-all shadow-lg shadow-[#D4726A]/25">
                  Umów wizytę
                </Link>
                <Link href="/kontakt" className="border-2 border-[#D4726A] text-[#D4726A] hover:bg-[#D4726A] hover:text-white font-medium px-8 py-3.5 rounded-full transition-all">
                  Napisz do mnie
                </Link>
              </div>
            </div>

            {/* Photo placeholder */}
            <div className="relative">
              <div className="aspect-[3/4] max-w-sm mx-auto bg-gradient-to-br from-[#E8A4A0]/30 to-[#C9A96E]/20 rounded-[60px] flex items-center justify-center">
                <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl">
                  <div className="text-8xl mb-4">👩</div>
                  <p className="font-display text-[#3D2B1F] font-semibold">Twoje zdjęcie</p>
                  <p className="text-[#D4726A] text-sm mt-1">Dodaj w panelu admina</p>
                </div>
              </div>
              {/* Floating stats */}
              <div className="absolute -bottom-4 left-0 bg-white rounded-2xl p-4 shadow-lg">
                <p className="font-display font-bold text-2xl text-[#D4726A]">500+</p>
                <p className="text-xs text-[#8B6F5E]">zadowolonych klientek</p>
              </div>
              <div className="absolute top-8 -right-4 bg-white rounded-2xl p-4 shadow-lg">
                <p className="font-display font-bold text-2xl text-[#C9A96E]">5★</p>
                <p className="text-xs text-[#8B6F5E]">średnia opinii</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[#3D2B1F] text-center mb-12">
            W co wierzę
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6 bg-[#FDF9F6] rounded-2xl border border-[#F5EDE8]">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display font-bold text-[#3D2B1F] mb-2">{v.title}</h3>
                <p className="text-sm text-[#8B6F5E] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[#3D2B1F] text-center mb-12">
            Moja historia
          </h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#E8D5C4]" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={item.year} className="flex gap-6 relative">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white border-2 border-[#D4726A] flex items-center justify-center z-10 shadow-sm">
                    <span className="text-xs font-bold text-[#D4726A]">{item.year}</span>
                  </div>
                  <div className="flex-1 pt-4">
                    <p className="text-[#3D2B1F] font-medium">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F5E8E7]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <span className="text-5xl">👧</span>
            <span className="text-5xl">🐕</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-[#3D2B1F] mb-4">
            Czekam na Ciebie!
          </h2>
          <p className="text-[#8B6F5E] mb-8">
            Umów się na wizytę i przekonaj się sama, dlaczego klientki do mnie wracają.
          </p>
          <Link href="/rezerwacja" className="inline-block bg-[#D4726A] hover:bg-[#C4625A] text-white font-medium px-10 py-4 rounded-full transition-all shadow-lg shadow-[#D4726A]/25 text-lg">
            Umów wizytę ♥
          </Link>
        </div>
      </section>
    </div>
  );
}
