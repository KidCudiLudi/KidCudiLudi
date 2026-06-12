// Baza notatek dla doradcy klienta w sklepie zoologicznym.
// Każda notatka = jeden temat ze szkolenia/materiałów.
//
// source: 'training'  -> informacja pochodzi bezpośrednio z przesłanych materiałów szkoleniowych
//         'extra'     -> rozszerzenie / wyjaśnienie dodane przez trenera (AI)
//
// Struktura jednej notatki:
// {
//   id: 'unikalny-slug',
//   title: 'Tytuł tematu',
//   category: 'Jedna z CATEGORIES',
//   tags: ['tag1', 'tag2', ...],
//   updated: 'YYYY-MM-DD',
//   sections: {
//     najwazniejsze: [{ text, source }],
//     coWiedziec: [{ text, source }],
//     jakWytlumaczyc: [{ text, source }],   // może zawierać przykładowe dialogi
//     pytania: [{ text, source }],
//     bledy: [{ text, source }],
//     dodatkowe: [{ text, source }],
//     powtorka: [{ text, source }],
//     kartaProduktu: null | {
//       dlaJakichZwierzat, glowneZalety, kiedyPolecac, kiedyNiePolecac,
//       najczestszePytania: [string], gotowaOdpowiedz
//     },
//     zapamietaj: null | [{ text, source }]
//   }
// }

const CATEGORIES = [
  'Psy',
  'Koty',
  'Akwarystyka',
  'Terrarystyka',
  'Gryzonie i ptaki',
  'Żywienie i suplementacja',
  'Pielęgnacja i higiena',
  'Zdrowie',
  'Obsługa klienta i sprzedaż',
  'Inne',
];

const NOTES = [
  {
    id: 'demo-karma-sucha-vs-mokra',
    title: '[PRZYKŁAD] Karma sucha vs mokra – jak doradzać klientowi',
    category: 'Żywienie i suplementacja',
    tags: ['psy', 'koty', 'karma sucha', 'karma mokra', 'porównanie produktów', 'sprzedaż'],
    updated: '2026-06-12',
    isDemo: true,
    sections: {
      najwazniejsze: [
        { text: 'To jest notatka DEMONSTRACYJNA – pokazuje format, w jakim będą tworzone Twoje notatki. Nie pochodzi z żadnego szkolenia.', source: 'extra' },
        { text: 'Karma sucha (granulat) i mokra (saszetki/konserwy) różnią się głównie zawartością wody: sucha ma ok. 6–10% wody, mokra 70–85%.', source: 'extra' },
        { text: 'Żadna z form nie jest "lepsza" sama z siebie – wybór zależy od potrzeb zwierzaka, stylu życia właściciela i budżetu.', source: 'extra' },
        { text: 'Najczęściej najlepsze efekty daje karmienie mieszane (sucha + mokra), o ile łączny bilans kalorii i składników jest pilnowany.', source: 'extra' },
      ],
      coWiedziec: [
        { text: 'Karma sucha jest energetyczna (więcej kalorii w mniejszej objętości) – łatwiej o przekarmienie, jeśli właściciel "na oko" odmierza porcje.', source: 'extra' },
        { text: 'Karma mokra wspiera nawodnienie organizmu – szczególnie ważne dla kotów, które z natury piją mało wody i są podatne na problemy z nerkami i drogami moczowymi.', source: 'extra' },
        { text: 'Karma sucha mechanicznie wspomaga oczyszczanie zębów z kamienia (efekt ograniczony, nie zastępuje szczotkowania).', source: 'extra' },
        { text: 'Karma mokra ma zwykle krótszy termin przydatności po otwarciu (24–48h w lodówce) – istotne przy zwierzętach jedzących mało na raz.', source: 'extra' },
        { text: 'Cena za dzień karmienia: karma mokra jest zazwyczaj droższa w przeliczeniu na dzień niż sucha tej samej klasy.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Czy mokra karma jest lepsza od suchej?" — Doradca: "To zależy od Pana/Pani kota/psa. Mokra karma to świetny sposób na dodatkowe nawodnienie, co jest ważne np. przy kotach, ale sucha karma jest praktyczna, dłużej trzyma świeżość i wspiera higienę jamy ustnej. Wiele osób łączy oba rodzaje – np. sucha karma na cały dzień + porcja mokrej karmy raz dziennie jako urozmaicenie."', source: 'extra' },
        { text: 'Jeśli klient ma kota z historią problemów z drogami moczowymi – podkreśl rolę nawodnienia i zaproponuj większy udział karmy mokrej lub karmę moczanową, ale zaznacz, że dieta lecznicza wymaga konsultacji z weterynarzem.', source: 'extra' },
      ],
      pytania: [
        { text: 'Jaki to gatunek i wiek zwierzaka (szczeniak/kociak, dorosły, senior)?', source: 'extra' },
        { text: 'Czy zwierzak ma jakieś problemy zdrowotne (nerki, układ moczowy, zęby, waga)?', source: 'extra' },
        { text: 'Jak wygląda dzień zwierzaka – czy jest często sam, czy karma musi długo zostawać świeża w misce?', source: 'extra' },
        { text: 'Czy zwierzak pije dużo wody, czy raczej unika picia?', source: 'extra' },
        { text: 'Jaki budżet dzienny/miesięczny na żywienie ma klient?', source: 'extra' },
      ],
      bledy: [
        { text: 'Mówienie klientowi, że jeden rodzaj karmy jest "zawsze lepszy" – brzmi jak opinia, nie porada dopasowana do zwierzaka.', source: 'extra' },
        { text: 'Ignorowanie kwestii nawodnienia przy kotach – to jeden z najważniejszych argumentów sprzedażowych dla karmy mokrej.', source: 'extra' },
        { text: 'Polecanie drastycznej, nagłej zmiany karmy – zawsze wspomnij o min. 7-dniowym okresie przejściowym, żeby uniknąć biegunki/wymiotów.', source: 'extra' },
        { text: 'Nieporównywanie produktów "per kaloria" tylko "per kilogram/opakowanie" – klient może się pomylić co do rzeczywistego kosztu i wydajności.', source: 'extra' },
      ],
      dodatkowe: [
        { text: 'Przy przejściu na nową karmę: 7–10 dni, stopniowo zwiększając udział nowej karmy (np. 25% → 50% → 75% → 100% co 2 dni).', source: 'extra' },
        { text: 'Karma mokra może być świetnym sposobem podania leków lub maskowania smaku suplementów.', source: 'extra' },
        { text: 'Dla zwierząt z nadwagą karma mokra (niższa gęstość kaloryczna na gram) czasem pomaga w kontroli porcji – większa objętość przy tej samej liczbie kalorii daje uczucie sytości.', source: 'extra' },
      ],
      powtorka: [
        { text: 'Sucha: mniej wody (6–10%), więcej kalorii, dłużej świeża, wspiera zęby.', source: 'extra' },
        { text: 'Mokra: więcej wody (70–85%), wspiera nawodnienie (ważne dla kotów), krótszy czas przydatności po otwarciu.', source: 'extra' },
        { text: 'Karmienie mieszane = często najlepszy kompromis.', source: 'extra' },
        { text: 'Zmiana karmy = zawsze 7–10 dni przejścia.', source: 'extra' },
        { text: 'Zawsze pytaj o wiek, zdrowie, styl życia i budżet przed rekomendacją.', source: 'extra' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Koty mają słaby instynkt picia wody – niedostatek wody zwiększa ryzyko problemów z nerkami i drogami moczowymi. To kluczowy argument na rzecz karmy mokrej lub mieszanej.', source: 'extra' },
        { text: 'Przekarmienie suchą karmą to jedna z głównych przyczyn nadwagi u psów i kotów domowych – zawsze warto zapytać, czy klient odmierza porcje, np. kubkiem miarowym lub wagą.', source: 'extra' },
      ],
    },
  },
];
