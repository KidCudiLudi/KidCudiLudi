// Baza wiedzy doradcy klienta w sklepie zoologicznym (Maxi Zoo).
//
// Każdy "temat" (notatka) może być:
//  - notatką szkoleniową / poradnikiem (sections.* z listami punktów),
//  - i/lub kartą produktu (sections.kartaProduktu) — wtedy zawiera pełny
//    profil sprzedażowy konkretnego produktu.
//
// source: 'training'  -> informacja pochodzi z materiałów szkoleniowych / od producenta
//         'extra'     -> wiedza ekspercka dodana jako rozszerzenie (wyraźnie oznaczona)
//
// OSTRZEŻENIA (sections.ostrzezenia): lista obiektów { level, text }
//   level: 'red'    -> 🔴 Niebezpieczeństwo (np. "toksyczne dla kotów")
//          'yellow' -> 🟡 Ważna informacja (np. "wymagana konsultacja weterynaryjna")
//          'green'  -> 🟢 Dobre zastosowanie / zalecenie
//
// KARTA PRODUKTU (sections.kartaProduktu) — pełna struktura wg wzorca:
// {
//   producent, marka, kategoria, zdjecie (url, opcjonalnie),
//   opis,
//   cechy: [string],                 // najważniejsze cechy
//   korzysciKlient: [string],
//   korzysciZwierze: [string],
//   dlaKogo: string,                 // dla kogo produkt jest przeznaczony
//   dlaKogoNie: string,              // dla kogo NIE jest przeznaczony
//   przeciwwskazania: [string],
//   naCoZwrocicUwage: [string],
//   najczestszeBledy: [string],      // najczęstsze błędy klientów
//   pytaniaDoKlienta: [string],
//   alternatywy: [string],
//   produktyUzupelniajace: [string],
//   crossSelling: [string],
//   upselling: [string],
//   faq: [{ q: string, a: string }],
//   argumentySprzedazowe: [string],
//   skroconaWersja: string           // skrócona wersja do szybkiej obsługi klienta
// }
//
// Struktura jednej notatki:
// {
//   id: 'unikalny-slug',
//   title: 'Tytuł tematu',
//   category: 'Jedna z CATEGORIES',
//   tags: ['tag1', 'tag2', ...],
//   updated: 'YYYY-MM-DD',
//   sections: {
//     ostrzezenia: [{ level, text }],
//     najwazniejsze: [{ text, source }],
//     coWiedziec: [{ text, source }],
//     jakWytlumaczyc: [{ text, source }],
//     pytania: [{ text, source }],
//     bledy: [{ text, source }],
//     dodatkowe: [{ text, source }],
//     powtorka: [{ text, source }],
//     kartaProduktu: null | { ...patrz wyżej },
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
  'Marki i asortyment',
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
      ostrzezenia: [],
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

  {
    id: 'przyklad-permetryna',
    title: '[PRZYKŁAD] Preparat przeciw pasożytom z permetryną (dla psów)',
    category: 'Zdrowie',
    tags: ['psy', 'pasożyty', 'permetryna', 'kleszcze', 'pchły', 'toksyczność', 'koty', 'karta produktu'],
    updated: '2026-06-12',
    isDemo: true,
    sections: {
      ostrzezenia: [
        { level: 'red', text: 'UWAGA – PRODUKT TOKSYCZNY DLA KOTÓW. Permetryna jest pyretroidem, którego koty nie są w stanie skutecznie metabolizować (brak odpowiednich enzymów wątrobowych – glukuronyltransferazy). Nawet niewielki kontakt (np. polizanie psa zaraz po aplikacji albo "przeniesienie" produktu z psa na kota we wspólnym łóżku) może wywołać u kota poważne zatrucie neurologiczne: drgawki, ślinotrzeźnienie, drżenia mięśni, w ciężkich przypadkach zgon. To NIE jest "może zaszkodzić" – to realne, częste i dobrze opisane zatrucia zgłaszane do lecznic weterynaryjnych.' },
        { level: 'yellow', text: 'Nie stosować u szczeniąt poniżej wieku/wagi wskazanej na etykiecie (zwykle 7–8 tyg. i min. 1,5–2 kg, zależnie od producenta).' },
        { level: 'yellow', text: 'Nie stosować u suk w ciąży/karmiących bez wcześniejszej konsultacji z weterynarzem – sprawdź etykietę konkretnego produktu.' },
        { level: 'yellow', text: 'Po aplikacji miejscowej (spot-on) zwierzę nie powinno być kąpane ani moczone przez okres wskazany na etykiecie (zwykle 24–48h), bo zmniejsza to skuteczność.' },
      ],
      najwazniejsze: [
        { text: 'Permetryna to syntetyczny pyretroid o działaniu owadobójczym i odstraszającym (repelentnym) – skuteczna przeciw kleszczom, pchłom, komarom i muchom (w tym muchom kałowym, owadom przenoszącym leiszmaniozę).', source: 'training' },
        { text: 'Produkty z permetryną są przeznaczone WYŁĄCZNIE dla psów. Nigdy nie wolno ich stosować u kotów – ani jako "mniejsza dawka", ani "w wersji dla kota".', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Działanie repelentne (odstraszające) jest dużą zaletą permetryny względem niektórych innych substancji – ogranicza liczbę ukłuć/ukąszeń, nie tylko zabija pasożyta po kontakcie.', source: 'extra' },
        { text: 'Forma podania to najczęściej pipeta (spot-on) na skórę w okolicy karku/łopatek, czasem obroża.', source: 'training' },
        { text: 'Czas działania zależy od produktu – typowo 2–4 tygodnie dla pipet.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Mam psa i kota, mogę użyć tej samej pipety na obu?" — Doradca: "Absolutnie nie. Ten produkt zawiera permetrynę, która jest bezpieczna dla psów, ale silnie toksyczna dla kotów – nawet kontakt z sierścią psa po aplikacji może zaszkodzić kotu. Jeśli mają Państwo w domu kota, polecę produkt bez permetryny, bezpieczny dla obu gatunków, albo poproszę o rozdzielenie zwierząt na czas wchłaniania preparatu."', source: 'extra' },
        { text: 'Jeśli klient ma TYLKO psa, ale kot sąsiada/rodziny ma kontakt z tym psem – również warto o tym wspomnieć i zaproponować bezpieczniejszą alternatywę albo poinformować o konieczności separacji zwierząt.', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy produkt jest dla psa czy dla kota?', source: 'extra' },
        { text: 'Jaka waga i wiek psa?', source: 'extra' },
        { text: 'Czy w domu jest kot lub inny pies, z którym zwierzę ma bliski kontakt (wspólne legowisko, wspólna zabawa)?', source: 'extra' },
        { text: 'Czy pies jest wychodzący/spotyka inne zwierzęta na zewnątrz?', source: 'extra' },
        { text: 'Czy suka jest w ciąży lub karmi szczenięta?', source: 'extra' },
        { text: 'Jaka jest forma preferowana przez klienta – pipeta, obroża, spray, tabletka?', source: 'extra' },
      ],
      bledy: [
        { text: 'Sprzedanie produktu z permetryną klientowi, który ma w domu kota, bez ostrzeżenia – to jeden z najpoważniejszych błędów w doradztwie zoologicznym i może skończyć się śmiercią zwierzęcia.', source: 'extra' },
        { text: '"Przepisywanie" dawki psiej dla kota "bo jest mniejszy" – permetryna jest toksyczna niezależnie od dawki, mechanizm toksyczności jest metaboliczny, nie tylko zależny od ilości.', source: 'extra' },
        { text: 'Niezwrócenie uwagi na minimalną wagę/wiek psa wskazaną na opakowaniu.', source: 'extra' },
      ],
      dodatkowe: [
        { text: 'Jeśli doszło do kontaktu kota z permetryną (np. polizanie psa) – klient powinien NATYCHMIAST skontaktować się z lecznicą weterynaryjną, najlepiej w trybie pilnym/24h. Objawy zatrucia mogą pojawić się dopiero po kilku godzinach.', source: 'extra' },
        { text: 'Bezpieczne dla kotów alternatywy przeciw pasożytom to preparaty na bazie np. fipronilu, imidaklopridu, fluralanera, selamektyny, sarolanera – ale zawsze sprawdź konkretny produkt i jego rejestrację dla gatunku.', source: 'extra' },
      ],
      powtorka: [
        { text: 'Permetryna = tylko psy. Toksyczna dla kotów (brak enzymu do metabolizowania pyretroidów).', source: 'extra' },
        { text: 'Zawsze pytaj, czy w domu jest kot, nawet jeśli klient kupuje produkt dla psa.', source: 'extra' },
        { text: 'Działa też repelentnie – odstrasza kleszcze/komary, nie tylko zabija.', source: 'extra' },
        { text: 'Sprawdź minimalny wiek/wagę psa na etykiecie przed sprzedażą.', source: 'extra' },
      ],
      kartaProduktu: {
        producent: 'Przykładowy producent (uzupełnij wg konkretnego produktu)',
        marka: 'Przykładowa marka',
        kategoria: 'Preparaty przeciw pasożytom zewnętrznym – spot-on dla psów',
        zdjecie: '',
        opis: 'Pipeta przeciw kleszczom, pchłom i komarom na bazie permetryny, do aplikacji na skórę psa. Działa zarówno owadobójczo (zabija pasożyty po kontakcie), jak i repelentnie (odstrasza, ogranicza liczbę ukłuć).',
        cechy: [
          'Działanie owadobójcze + repelentne (odstraszające)',
          'Skuteczność przeciw kleszczom, pchłom, komarom, muchom',
          'Forma spot-on (pipeta) – łatwa aplikacja',
          'Czas działania ok. 2–4 tygodnie (zależnie od produktu)',
        ],
        korzysciKlient: [
          'Wygodna, rzadka aplikacja (raz na kilka tygodni)',
          'Ochrona przed kilkoma rodzajami pasożytów jednym produktem',
          'Działanie odstraszające ogranicza ryzyko przeniesienia chorób (np. boreliozy, babeszjozy)',
        ],
        korzysciZwierze: [
          'Mniej ukąszeń = mniejszy dyskomfort i swędzenie',
          'Niższe ryzyko chorób przenoszonych przez kleszcze i komary',
        ],
        dlaKogo: 'Zdrowe, dorosłe i starsze psy spełniające minimalną wagę/wiek wskazany na etykiecie. Psy wychodzące, podróżujące, mające kontakt z innymi zwierzętami i naturą.',
        dlaKogoNie: 'Koty (zawsze), szczenięta poniżej minimalnego wieku/wagi, suki w ciąży/karmiące bez konsultacji z weterynarzem, psy z nadwrażliwością na pyretroidy w wywiadzie.',
        przeciwwskazania: [
          'Stosowanie u kotów – ryzyko ciężkiego zatrucia neurologicznego, możliwy zgon',
          'Stosowanie u bardzo małych/młodych szczeniąt poza zakresem z etykiety',
          'Aplikacja na uszkodzoną skórę, rany, podrażnienia',
        ],
        naCoZwrocicUwage: [
          'Czy w domu/otoczeniu zwierzęcia jest kot',
          'Waga i wiek psa vs. zakres na etykiecie',
          'Czy klient stosuje już inny preparat przeciwpasożytniczy (ryzyko przedawkowania substancji aktywnych)',
          'Termin ważności i przechowywanie (z dala od dzieci i zwierząt)',
        ],
        najczestszeBledy: [
          'Zakup "na wszelki wypadek" produktu dla kota bez sprawdzenia, że dom ma też psa i odwrotnie',
          'Aplikacja na mokrą sierść tuż po kąpieli – zmniejsza skuteczność',
          'Kąpanie zwierzęcia zbyt szybko po aplikacji',
        ],
        pytaniaDoKlienta: [
          'Pies czy kot?',
          'Jaka waga i wiek zwierzęcia?',
          'Czy zwierzę jest wychodzące czy niewychodzące?',
          'Czy w domu są inne zwierzęta, zwłaszcza koty?',
          'Czy zwierzę miało wcześniej reakcje alergiczne na preparaty przeciwpasożytnicze?',
          'Czy planowany jest wyjazd w tereny o wysokim ryzyku kleszczowym (las, woda)?',
        ],
        alternatywy: [
          'Preparaty na bazie fipronilu (psy i koty – w wersjach dedykowanych)',
          'Preparaty na bazie fluralaneru/sarolaneru w formie tabletek (psy)',
          'Obroże przeciwpasożytnicze jako uzupełnienie lub alternatywa',
        ],
        produktyUzupelniajace: [
          'Szampon przeciw pasożytom',
          'Grzebień do wykrywania pcheł',
          'Preparat na otoczenie (sprej na legowisko, dom)',
        ],
        crossSelling: [
          'Preparaty na komary/kleszcze do stosowania na czas wyjazdów wakacyjnych',
          'Witaminy/suplementy wspierające kondycję skóry i sierści',
        ],
        upselling: [
          'Pakiet roczny (kilka pipet z rabatem) zamiast jednorazowej sztuki',
          'Produkt o dłuższym czasie działania (np. 4 tyg. zamiast 2 tyg.)',
        ],
        faq: [
          { q: 'Czy mogę użyć tego na kota w mniejszej dawce?', a: 'Nie. Permetryna jest toksyczna dla kotów niezależnie od dawki – mechanizm zatrucia jest metaboliczny, nie dawkowy.' },
          { q: 'Po jakim czasie mogę wykąpać psa po aplikacji?', a: 'Zgodnie z etykietą – zwykle po 24–48h, by nie zmniejszyć skuteczności preparatu.' },
          { q: 'Czy to zabezpiecza też przed komarami przenoszącymi pasożyty (np. dirofilariozę)?', a: 'Działanie repelentne ogranicza liczbę ukłuć komarów, co realnie zmniejsza ryzyko, ale nie jest to lek przeciw dirofilariozie – przy wyjazdach na południe Europy warto rozważyć dodatkową profilaktykę po konsultacji z weterynarzem.' },
        ],
        argumentySprzedazowe: [
          'Podwójne działanie: zabija i odstrasza – mniej ukąszeń od samego początku',
          'Wygoda – jedna aplikacja na kilka tygodni ochrony',
          'Szerokie spektrum: kleszcze, pchły, komary, muchy',
        ],
        skroconaWersja: 'Pipeta na kleszcze/pchły/komary TYLKO dla psów. NIGDY dla kotów (silnie toksyczne!). Zawsze pytaj, czy w domu jest kot. Sprawdź wagę/wiek psa na etykiecie. Po aplikacji nie kąpać 24–48h.',
      },
      zapamietaj: [
        { text: 'KAŻDY produkt z permetryną = pytanie o kota w domu. To pytanie może uratować życie zwierzęciu.', source: 'extra' },
        { text: 'Toksyczność permetryny dla kotów nie zależy od dawki – nie ma "bezpiecznej małej dawki".', source: 'extra' },
      ],
    },
  },

  {
    id: 'przyklad-racica',
    title: '[PRZYKŁAD] Racica wołowa – przysmak do żucia dla psów',
    category: 'Psy',
    tags: ['psy', 'przysmaki', 'żucie', 'zęby', 'szczenięta', 'seniorzy', 'karta produktu', 'racica'],
    updated: '2026-06-12',
    isDemo: true,
    sections: {
      ostrzezenia: [
        { level: 'red', text: 'Ryzyko zadławienia / złamania zęba przy nieodpowiednim doborze do wielkości i siły zgryzu psa – zawsze dopasuj rozmiar przysmaku do psa.' },
        { level: 'yellow', text: 'Nie polecać szczeniakom w okresie wymiany zębów (ok. 3–7 miesiąc życia) – twarda racica może uszkodzić wyrzynające się zęby lub przyspieszyć ich utratę.' },
        { level: 'yellow', text: 'Nie polecać psom seniorom ze słabym/uszkodzonym uzębieniem, periodontozą lub po zabiegach stomatologicznych – ryzyko złamania zęba na bardzo twardym produkcie.' },
        { level: 'yellow', text: 'Nie polecać psom z historią problemów trawiennych po przysmakach pochodzenia zwierzęcego (wrażliwy żołądek) bez wcześniejszego sprawdzenia tolerancji.' },
      ],
      najwazniejsze: [
        { text: 'Racica wołowa to naturalny przysmak do żucia, wysokobiałkowy, niskotłuszczowy, bez dodatku zbóż – dobry wybór dla psów na diecie bezzbożowej lub z alergiami pokarmowymi na zboża.', source: 'training' },
        { text: 'Długie żucie wspiera mechaniczne usuwanie kamienia nazębnego i daje psu zajęcie (redukcja stresu, nudy, niepożądanych zachowań np. gryzienia mebli).', source: 'extra' },
      ],
      coWiedziec: [
        { text: 'Racica jest bardzo twarda – to zaleta (długo zajmuje psa) i jednocześnie ryzyko (możliwość złamania zęba, zwłaszcza trzonowców, przy zbyt agresywnym żuciu).', source: 'extra' },
        { text: 'Produkt wysokokaloryczny – przy częstym podawaniu należy odjąć odpowiednią porcję od dziennej dawki karmy, by uniknąć nadwagi.', source: 'extra' },
        { text: 'U psów żarłocznych warto nadzorować żucie – przy próbie połknięcia większego kawałka istnieje ryzyko zadławienia lub niedrożności przewodu pokarmowego.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Mój pies ma 4 miesiące, czy może dostać racicę?" — Doradca: "Lepiej jeszcze nie – w tym wieku Pana pies wymienia zęby mleczne na stałe, a twarda racica mogłaby je uszkodzić albo sprawić, że ząb wypadnie przedwcześnie. Polecam na ten czas miękkie gryzaki dedykowane szczeniakom, a racicę wprowadzić, gdy zęby stałe będą już w pełni wyrznięte, czyli zwykle po 7.–8. miesiącu."', source: 'extra' },
        { text: 'Klient: "Mój pies ma 11 lat i ostatnio miał usuwany ząb." — Doradca: "W takim przypadku odradzałbym/odradzałabym racicę – to bardzo twardy przysmak i istnieje ryzyko uszkodzenia pozostałych zębów. Mogę zaproponować coś miększego, np. uszy/płucka suszone albo gryzaki dentystyczne o miękkiej strukturze."', source: 'extra' },
      ],
      pytania: [
        { text: 'Ile lat ma pies i czy zmienia obecnie zęby (szczenięta 3–7 miesiąc życia)?', source: 'extra' },
        { text: 'Jaka to rasa/wielkość psa? (dopasowanie rozmiaru racicy)', source: 'extra' },
        { text: 'Czy pies miał kiedyś problemy z zębami, dziąsłami lub był u weterynarza stomatologa?', source: 'extra' },
        { text: 'Czy pies "żre" przysmaki bardzo szybko, czy spokojnie ogryza?', source: 'extra' },
        { text: 'Czy pies ma wrażliwy żołądek / był na diecie eliminacyjnej?', source: 'extra' },
      ],
      bledy: [
        { text: 'Sprzedanie racicy do szczeniaka "bo to naturalny produkt, więc bezpieczny" – naturalność nie oznacza, że jest odpowiedni dla każdego etapu życia.', source: 'extra' },
        { text: 'Niedopasowanie wielkości przysmaku do wielkości psa (zbyt mały kawałek dla dużego psa = ryzyko połknięcia w całości).', source: 'extra' },
        { text: 'Brak informacji o kaloryczności – klient daje przysmak "dodatkowo" do pełnej porcji karmy, co prowadzi do nadwagi.', source: 'extra' },
      ],
      dodatkowe: [
        { text: 'Dla seniorów i psów z wrażliwym zgryzem lepszymi alternatywami są: uszy wołowe/wieprzowe, tchawice, płucka suszone, miękkie gryzaki dentystyczne – wciąż dają satysfakcję z żucia, ale są mniej ryzykowne dla zębów.', source: 'extra' },
        { text: 'Dla szczeniąt w okresie wymiany zębów dobrym wyborem są specjalne gryzaki chłodzące/miękkie, które łagodzą ból dziąseł.', source: 'extra' },
      ],
      powtorka: [
        { text: 'Racica = TAK dla zdrowych dorosłych psów z dobrym uzębieniem.', source: 'extra' },
        { text: 'Racica = NIE dla szczeniąt wymieniających zęby (3–7 mc) i seniorów ze słabym uzębieniem.', source: 'extra' },
        { text: 'Wysokokaloryczna – uważać na nadwagę, odejmować od dawki karmy.', source: 'extra' },
        { text: 'Zawsze dopasuj rozmiar do wielkości psa – ryzyko zadławienia.', source: 'extra' },
      ],
      kartaProduktu: {
        producent: 'Przykładowy producent (uzupełnij wg konkretnego produktu)',
        marka: 'Przykładowa marka',
        kategoria: 'Przysmaki do żucia – naturalne, jednoskładnikowe',
        zdjecie: '',
        opis: 'Suszona racica wołowa – naturalny, jednoskładnikowy przysmak do żucia dla psów, wysokobiałkowy, bez zbóż i dodatków.',
        cechy: [
          'Jednoskładnikowy (100% wołowina)',
          'Bez zbóż, bez dodatku cukru i konserwantów',
          'Wysoka zawartość białka, niska zawartość tłuszczu',
          'Bardzo twarda struktura – długi czas żucia',
        ],
        korzysciKlient: [
          'Długo zajmuje psa – mniej zniszczeń w domu, mniej "nudy"',
          'Naturalny skład – łatwy do uzasadnienia dla klientów szukających "czystej etykiety"',
          'Dobra opcja dla psów z alergią na zboża',
        ],
        korzysciZwierze: [
          'Mechaniczne czyszczenie zębów podczas żucia',
          'Satysfakcja behawioralna z długiego żucia (redukcja stresu)',
          'Wysokobiałkowa, niskotłuszczowa przekąska',
        ],
        dlaKogo: 'Zdrowe, dorosłe psy z pełnym, mocnym uzębieniem (po zakończeniu wymiany zębów, czyli od ok. 7.–8. miesiąca życia), bez historii problemów stomatologicznych.',
        dlaKogoNie: 'Szczenięta wymieniające zęby (ok. 3–7 mc), seniorzy ze słabym/uszkodzonym uzębieniem, psy po zabiegach stomatologicznych, psy żarłoczne/łykające bez przeżuwania, psy z wrażliwym żołądkiem na białko zwierzęce.',
        przeciwwskazania: [
          'Aktywna choroba przyzębia, ruszające się zęby',
          'Historia złamań zębów na twardych przysmakach',
          'Tendencja do połykania dużych kawałków bez żucia',
        ],
        naCoZwrocicUwage: [
          'Wiek psa (wymiana zębów)',
          'Stan uzębienia (czy pies był ostatnio u weterynarza/stomatologa)',
          'Wielkość przysmaku vs. wielkość psa i siła zgryzu',
          'Częstotliwość podawania vs. dzienna dawka kalorii',
        ],
        najczestszeBledy: [
          'Dawanie przysmaku bez nadzoru przy pierwszym razie',
          'Zbyt częste podawanie prowadzące do nadwagi',
          'Niedopasowany rozmiar do rasy/wielkości psa',
        ],
        pytaniaDoKlienta: [
          'Ile lat ma pies i jaka to rasa/wielkość?',
          'Czy pies zmienia obecnie zęby?',
          'Czy pies miał problemy z zębami/dziąsłami?',
          'Jak pies zwykle zachowuje się przy przysmakach (żuje czy łyka)?',
          'Czy pies ma wrażliwy żołądek?',
        ],
        alternatywy: [
          'Uszy wołowe/wieprzowe suszone (miększe)',
          'Tchawice wołowe suszone',
          'Płucka suszone (bardzo miękkie – dobre dla seniorów)',
          'Gryzaki dentystyczne o regulowanej twardości',
        ],
        produktyUzupelniajace: [
          'Pasta i szczoteczka do zębów dla psów',
          'Płyn do higieny jamy ustnej (dodawany do wody)',
          'Zabawki do żucia (kong, liny)',
        ],
        crossSelling: [
          'Inne przysmaki jednoskładnikowe (uszy, płucka, tchawice) do urozmaicenia',
          'Suplementy na stawy – jeśli pies jest duży/aktywny',
        ],
        upselling: [
          'Większe opakowanie zbiorcze (lepsza cena jednostkowa)',
          'Zestaw przysmaków dopasowany do wieku psa (szczenięcy / senior)',
        ],
        faq: [
          { q: 'Czy racica może zastąpić szczotkowanie zębów?', a: 'Nie – wspomaga oczyszczanie mechaniczne, ale nie zastępuje regularnego szczotkowania i kontroli weterynaryjnej.' },
          { q: 'Jak często można dawać racicę?', a: 'To zależy od wielkości psa i kaloryczności diety – zwykle 1–2 razy w tygodniu jako dodatek, nie codziennie, by nie przekarmić.' },
          { q: 'Mój pies bardzo szybko "łyka" przysmaki – czy to bezpieczne?', a: 'Przy psach łykających większe kawałki bez żucia ryzyko zadławienia/niedrożności jest wyższe – warto wybrać większy rozmiar (trudniejszy do połknięcia w całości) i obserwować psa podczas żucia.' },
        ],
        argumentySprzedazowe: [
          'Naturalny, jednoskładnikowy skład – łatwo wyjaśnić klientowi co kupuje',
          'Długi czas zajęcia psa = mniej zniszczeń i nudy w domu',
          'Wsparcie higieny jamy ustnej przy regularnym, kontrolowanym podawaniu',
        ],
        skroconaWersja: 'Dla zdrowych dorosłych psów z dobrymi zębami – TAK. Dla szczeniaków w wymianie zębów i seniorów ze słabym uzębieniem – NIE (ryzyko złamania zęba). Wysokokaloryczna – ograniczyć częstotliwość. Dopasuj rozmiar do psa (ryzyko zadławienia).',
      },
      zapamietaj: [
        { text: 'Wiek + stan zębów = pierwsze pytania przy każdym twardym przysmaku do żucia.', source: 'extra' },
        { text: '"Naturalne" nie znaczy "dla każdego" – zawsze dopasuj do etapu życia i stanu zdrowia zwierzaka.', source: 'extra' },
      ],
    },
  },

  {
    id: 'pasozyty-zewnetrzne-formy',
    title: 'Preparaty przeciw pchłom i kleszczom – rodzaje i formy',
    category: 'Zdrowie',
    tags: ['psy', 'koty', 'pasożyty', 'pchły', 'kleszcze', 'spot-on', 'krople', 'obroża', 'tabletki', 'spray', 'OTC'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Większość preparatów przeciw pchłom i kleszczom to produkty OTC (over-the-counter) – leki dostępne bez recepty, ale to wciąż leki, nie kosmetyki. Dawkowanie zależy od gatunku, wagi i wieku zwierzęcia.' },
      ],
      najwazniejsze: [
        { text: 'Ochrona przed pchłami i kleszczami dostępna jest w czterech podstawowych formach: spray, krople (spot-on), obroża, tabletki.', source: 'training' },
        { text: 'Wybór formy zależy przede wszystkim od stylu życia zwierzaka i właściciela – nie ma jednej "najlepszej" formy dla wszystkich.', source: 'extra' },
      ],
      coWiedziec: [
        { text: 'Krople (spot-on): aplikowane na skórę (kark/łopatki), wchłaniają się i rozprowadzają po organizmie/sierści, działają zwykle 4–5 tygodni. Najpopularniejsza, "ustaw i zapomnij" forma.', source: 'training' },
        { text: 'Obroże: najdłuższy czas działania (kilka miesięcy, np. 7–8 mc), dobra opcja dla osób, które łatwo zapominają o regularnej aplikacji. Wymagają prawidłowego dopasowania – nie za ciasno, nie za luźno.', source: 'extra' },
        { text: 'Tabletki: podawane doustnie (często z jedzeniem), działają systemowo – pasożyt musi ukłuć zwierzę, aby preparat zadziałał. Dobre rozwiązanie dla zwierząt, które często się kąpią/pływają lub nie tolerują aplikacji na skórę.', source: 'training' },
        { text: 'Spray: dokładne pokrycie całego ciała, przydatny przy silnej inwazji lub gdy inne formy nie są tolerowane (np. alergia na składniki spot-on). Wymaga więcej pracy przy aplikacji i czasu schnięcia.', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Która forma jest najlepsza?" — Doradca: "To zależy od Pana/Pani zwierzaka. Jeśli pies albo kot często się kąpie lub pływa, lepiej sprawdzą się tabletki, bo nie spłyną z wodą. Jeśli wolą Państwo \'ustawić i zapomnieć\' na kilka miesięcy, dobrym wyborem jest obroża. Krople (spot-on) to złoty środek – łatwa aplikacja raz na 4–5 tygodni."', source: 'extra' },
      ],
      pytania: [
        { text: 'Pies czy kot?', source: 'extra' },
        { text: 'Jaka waga i wiek zwierzęcia?', source: 'extra' },
        { text: 'Czy zwierzę często się kąpie lub pływa?', source: 'extra' },
        { text: 'Czy w domu są małe dzieci, które mają bliski kontakt ze zwierzęciem?', source: 'extra' },
        { text: 'Czy zwierzę jest wychodzące, czy ma kontakt z innymi zwierzętami?', source: 'extra' },
        { text: 'Czy szukają Państwo jednorazowej ochrony, czy preferują długoterminowe rozwiązanie (np. obroża)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Zakładanie, że każda forma i każdy produkt działa identycznie niezależnie od gatunku – wiele preparatów jest zarejestrowanych tylko dla psów (np. produkty z permetryną, takie jak Advantix) i nie wolno ich stosować u kotów.', source: 'extra' },
        { text: 'Brak informacji o konieczności nie kąpania zwierzęcia po aplikacji spot-on/sprayu (zwykle kilka dni) – zmniejsza to skuteczność produktu.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: '4 formy ochrony przed pchłami/kleszczami: spray, krople (spot-on), obroża, tabletki.', source: 'training' },
        { text: 'Większość to produkty OTC – dostępne bez recepty, ale to leki.', source: 'training' },
        { text: 'Formę dobieramy do stylu życia zwierzaka: kąpiele → tabletki, wygoda długoterminowa → obroża, standard → spot-on.', source: 'extra' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Niektóre produkty (np. zawierające permetrynę) są toksyczne dla kotów – zawsze sprawdzaj skład i przeznaczenie gatunkowe przed sprzedażą, niezależnie od formy.', source: 'extra' },
      ],
    },
  },

  {
    id: 'produkt-frontline-linia',
    title: 'Frontline – linia produktów (Spot-On, Combo, Spray)',
    category: 'Zdrowie',
    tags: ['psy', 'koty', 'pasożyty', 'pchły', 'kleszcze', 'wszy', 'fipronil', 'frontline', 'fiprex', 'tri-act', 'karta produktu', 'OTC'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Zawsze dopasuj wariant produktu (Spot-On / Combo / Tri-Act / Spray) do gatunku (pies/kot) i sprawdź minimalny wiek/wagę na etykiecie konkretnego opakowania – różne warianty mają różne zakresy.' },
        { level: 'yellow', text: 'Po aplikacji spot-on nie kąpać zwierzęcia przez czas wskazany na etykiecie (zwykle kilka dni) – kąpiel zmniejsza skuteczność.' },
        { level: 'red', text: 'Frontline Tri-Act zawiera oprócz fipronilu również permetrynę i jest przeznaczony WYŁĄCZNIE dla psów – nie stosować u kotów (ryzyko poważnego zatrucia, tak jak w przypadku innych preparatów z permetryną, np. Advantix).' },
      ],
      najwazniejsze: [
        { text: 'Frontline to linia preparatów na bazie fipronilu do zwalczania pcheł, kleszczy i wszy u psów i kotów. Dostępna w wariantach: Spot-On (krople), Combo (krople + regulator rozwoju insektów), Tri-Act (krople z dodatkiem permetryny – tylko dla psów), Spray.', source: 'training' },
        { text: 'Frontline Spot-On dla psa: zwalcza pchły i kleszcze ok. 5 tygodni, wszy do 63 dni. Frontline Spot-On dla kota: pchły i kleszcze do 4 tygodni, wszy do 42 dni.', source: 'training' },
        { text: 'Frontline Combo (pies/kot): substancja czynna fipronil + (S)-metopren – połączenie dwóch substancji czynnych działających łącznie, eliminujących wszystkie etapy cyklu rozwojowego pchły (jaja, larwy, dorosłe pchły); skuteczność potwierdzona licznymi badaniami laboratoryjnymi i klinicznymi. Dostępny w pięciu formulacjach, w tym dla kotów.', source: 'training' },
        { text: 'Frontline Tri-Act (tylko dla psów): roztwór do nakrapiania zawierający fipronil i permetrynę – leczy i zapobiega inwazji pcheł i/lub kleszczy oraz dodatkowo działa odstraszająco na komary, kąsające muchy i meszki (działanie repelentne). Wysoka skuteczność przy niskiej toksyczności dla zwierzęcia i jego otoczenia (w tym ludzi), ale TYLKO dla psów. Dostępny w pięciu formulacjach wg wagi psa.', source: 'training' },
        { text: 'Frontline Spray (pies i kot): substancja czynna fipronil, ochrona przed pchłami i kleszczami do 60 dni. Dawkowanie ok. 3–6 ml/kg (orientacyjnie ok. 6–8 pompek na kota).', source: 'training' },
        { text: 'Fiprex to inna linia produktów na bazie fipronilu (roztwór do nakrapiania dla psów i kotów) – działa bójczo na pchły w ciągu 24–48h, wnika w głąb skóry i równomiernie rozprzestrzenia się w warstwie lipidowej, a następnie jest uwalniany z gruczołów łojowych, tworząc warstwę zabezpieczającą przed ponowną inwazją pchłami przez okres do 3 miesięcy (kleszcze – ok. 3–5 tygodni). Dostępny w formulacjach m.in. Fiprex S 75 mg/0,67 ml (psy do 10 kg), Fiprex M 150 mg/2 ml (psy 10–20 kg) i Fiprex L 300 mg/4 ml (psy większe).', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Dawkowanie kropli dla psów podzielone jest na przedziały wagowe (orientacyjnie: 2–10 kg, 10–20 kg, 20–40 kg, 40–60 kg) – każdy przedział to inna pipeta.', source: 'training' },
        { text: 'Dawkowanie dla kotów Frontline Spot-On/Combo: zwykle jeden rozmiar pipety, od 8. tygodnia życia i min. 1 kg wagi.', source: 'training' },
        { text: 'Combo to "Spot-On plus" – dodatkowy składnik (metopren) działa na jaja i larwy pcheł w otoczeniu zwierzęcia (legowisko, dom), co realnie ogranicza nawroty inwazji.', source: 'extra' },
        { text: 'Fiprex to produkt o podobnym mechanizmie działania (fipronil) jak Frontline Spot-On – może być propozycją alternatywną/cenową dla klienta, ale tak jak przy każdym preparacie należy dopasować formulację (S/M/L) do wagi psa lub odpowiedni wariant dla kota.', source: 'extra' },
        { text: 'Frontline Tri-Act to opcja "rozszerzona" względem Combo – dodatkowo chroni przed komarami i muchami/meszkami (działanie repelentne), ale ze względu na permetrynę jest dostępny tylko dla psów (podobnie jak Advantix).', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Czym różni się Combo od Spot-On?" — Doradca: "Spot-On zwalcza pchły i kleszcze na zwierzęciu. Combo robi to samo, ale dodatkowo zawiera składnik, który niszczy jaja i larwy pcheł w domu – jeśli mieli Państwo problem z nawracającymi pchłami, Combo pomoże przerwać ten cykl."', source: 'extra' },
      ],
      pytania: [
        { text: 'Pies czy kot?', source: 'extra' },
        { text: 'Jaka waga zwierzęcia?', source: 'extra' },
        { text: 'Jaki wiek zwierzęcia – czy spełnia minimum z etykiety (zwykle od 8. tyg. życia)?', source: 'extra' },
        { text: 'Czy zwierzę ma już objawy inwazji pcheł (drapanie, czarne "okruszki" w sierści), czy to profilaktyka?', source: 'extra' },
        { text: 'Czy w domu są inne zwierzęta wymagające ochrony?', source: 'extra' },
      ],
      bledy: [
        { text: 'Użycie pipety w niewłaściwym przedziale wagowym (np. pipeta dla małego psa zastosowana u dużego).', source: 'extra' },
        { text: 'Kąpanie zwierzęcia zbyt szybko po aplikacji spot-on.', source: 'extra' },
        { text: 'Pomylenie wariantów Spot-On i Combo – przy nawracających inwazjach pcheł warto polecić Combo (działanie na jaja/larwy), nie sam Spot-On.', source: 'extra' },
        { text: 'Zastosowanie Frontline Tri-Act u kota – produkt zawiera permetrynę i jest przeznaczony tylko dla psów.', source: 'extra' },
      ],
      dodatkowe: [
        { text: 'Fipronil (Frontline) to inny mechanizm działania niż permetryna (np. Advantix) – produkty na bazie fipronilu są generalnie uznawane za bezpieczniejsze przy ewentualnym kontakcie pies–kot, ale zawsze trzeba stosować wariant zarejestrowany dla danego gatunku.', source: 'extra' },
      ],
      powtorka: [
        { text: 'Frontline = fipronil (+ metopren w Combo, + permetryna w Tri-Act).', source: 'training' },
        { text: 'Spot-On – krople na pchły/kleszcze/wszy. Combo – Spot-On + działanie na jaja/larwy pcheł w domu. Tri-Act – Combo-podobny + permetryna (komary/muchy), TYLKO psy. Spray – do 60 dni ochrony, dla psów i kotów.', source: 'training' },
        { text: 'Fiprex = inna linia na bazie fipronilu, formulacje S/M/L wg wagi psa, działanie do 3 miesięcy na pchły i 3–5 tyg. na kleszcze.', source: 'training' },
        { text: 'Zawsze dopasuj wariant do gatunku i przedział wagowy.', source: 'extra' },
        { text: 'Nie kąpać kilka dni po aplikacji spot-on.', source: 'extra' },
      ],
      kartaProduktu: {
        producent: 'Boehringer Ingelheim (sprawdź aktualnego dystrybutora na opakowaniu)',
        marka: 'Frontline',
        kategoria: 'Preparaty przeciw pchłom, kleszczom i wszom – krople (Spot-On, Combo) i spray',
        zdjecie: '',
        opis: 'Linia produktów na bazie fipronilu do zwalczania pcheł, kleszczy i wszy u psów i kotów. Warianty Spot-On (krople), Combo (krople + metopren – działanie na jaja/larwy pcheł) oraz Spray (dla psów i kotów).',
        cechy: [
          'Substancja czynna: fipronil (działanie owadobójcze i roztoczobójcze); w Combo dodatkowo (S)-metopren, w Tri-Act dodatkowo permetryna',
          'Spot-On dla psa: pchły/kleszcze ok. 5 tygodni, wszy do 63 dni',
          'Spot-On dla kota: pchły i kleszcze do 4 tygodni, wszy do 42 dni',
          'Combo: dodatkowo przerywa rozwój pcheł w środowisku (jaja/larwy) do ok. 8 tygodni',
          'Tri-Act (tylko psy): dodatkowo działanie repelentne na komary i kąsające muchy/meszki',
          'Spray: ochrona do 60 dni, dawkowanie ok. 3–6 ml/kg',
          'Fiprex (osobna linia, fipronil): formulacje S/M/L wg wagi psa, ochrona do 3 miesięcy (pchły) i 3–5 tygodni (kleszcze)',
        ],
        korzysciKlient: [
          'Jeden producent, kilka wariantów – łatwo dopasować formę i zakres działania',
          'Combo dodatkowo "czyści środowisko" z jaj/larw pcheł – mniej nawrotów inwazji w domu',
        ],
        korzysciZwierze: [
          'Skuteczna ochrona przed pchłami, kleszczami i wszami',
          'Warianty dedykowane gatunkowo, z dawkowaniem dopasowanym do wagi',
        ],
        dlaKogo: 'Zdrowe psy i koty od minimalnego wieku/wagi wskazanej dla danego wariantu (zwykle od 8. tygodnia życia, przy odpowiedniej masie ciała – patrz tabela dawkowania na opakowaniu).',
        dlaKogoNie: 'Szczenięta/kocięta poniżej minimalnego wieku i wagi wskazanej na etykiecie konkretnego wariantu (typowo poniżej 8. tygodnia życia / poniżej 1–2 kg, zależnie od produktu).',
        przeciwwskazania: [
          'Stosowanie u szczeniąt/kociąt poniżej wieku i wagi wskazanej na etykiecie konkretnego wariantu',
          'Stosowanie wariantu przeznaczonego dla jednego gatunku u drugiego bez sprawdzenia rejestracji produktu',
        ],
        naCoZwrocicUwage: [
          'Dokładny wariant (Spot-On / Combo / Spray) i gatunek, dla którego jest przeznaczony',
          'Przedział wagowy zwierzęcia vs. dawkowanie na opakowaniu',
          'Czas, jaki musi upłynąć przed kąpielą po aplikacji (sprawdź ulotkę)',
        ],
        najczestszeBledy: [
          'Użycie produktu w niewłaściwym przedziale wagowym',
          'Kąpanie zwierzęcia zbyt szybko po aplikacji spot-on',
          'Wybór Spot-On przy nawracających inwazjach pcheł, gdy lepszy byłby Combo',
        ],
        pytaniaDoKlienta: [
          'Pies czy kot?',
          'Jaka waga zwierzęcia?',
          'Jaki wiek zwierzęcia?',
          'Czy to profilaktyka, czy już są objawy inwazji pcheł/kleszczy?',
          'Czy w domu są inne zwierzęta wymagające ochrony?',
        ],
        alternatywy: [
          'AdTab (tabletki – izoksazolina, dla psów i kotów)',
          'Frontpro (tabletki – afoksolaner, dla psów)',
          'Foresto / Kiltix (obroże)',
          'Advantix (krople dla psów – inny skład, zawiera permetrynę, tylko dla psów)',
          'Fiprex (krople – fipronil, podobny mechanizm do Frontline Spot-On)',
          'Frontline Tri-Act (krople – fipronil + permetryna, dodatkowo komary/muchy, tylko dla psów)',
        ],
        produktyUzupelniajace: [
          'Szampon przeciw pasożytom',
          'Grzebień do wykrywania pcheł',
          'Preparat na środowisko domowe (sprej na legowisko/dom)',
        ],
        crossSelling: [
          'Preparaty odrobaczające (np. Drontal) – kompleksowa profilaktyka pasożytnicza',
          'Suplementy na skórę i sierść',
        ],
        upselling: [
          'Wariant Combo (dodatkowe działanie na środowisko) zamiast Spot-On',
          'Opakowanie wielopak (3–6 pipet) zamiast jednej sztuki',
        ],
        faq: [
          { q: 'Czy mogę użyć Frontline dla psa na kota?', a: 'Nie – zawsze stosuj wariant zarejestrowany dla danego gatunku i w odpowiedniej dawce.' },
          { q: 'Jak długo działa jedna aplikacja?', a: 'Zależy od wariantu i pasożyta – zwykle 4–5 tygodni na pchły/kleszcze; Combo dodatkowo do 8 tygodni działa na jaja/larwy pcheł w otoczeniu.' },
          { q: 'Po jakim czasie mogę wykąpać zwierzę?', a: 'Sprawdź ulotkę konkretnego produktu – zwykle zaleca się unikać kąpieli przez kilka dni po aplikacji.' },
        ],
        argumentySprzedazowe: [
          'Sprawdzona, popularna marka z kilkoma formami do wyboru',
          'Combo dodatkowo przerywa cykl rozwoju pcheł w domu – mniej nawrotów',
          'Dawkowanie dopasowane do przedziałów wagowych – precyzyjna ochrona',
        ],
        skroconaWersja: 'Frontline (fipronil, w Combo + metopren) – krople/spray/Combo na pchły, kleszcze i wszy dla psów i kotów. Dopasuj wariant do gatunku i wagi. Combo dodatkowo działa na jaja/larwy pcheł w domu. Sprawdź minimalny wiek/wagę na etykiecie. Nie kąpać kilka dni po aplikacji.',
      },
      zapamietaj: [
        { text: 'Frontline = fipronil (+ metopren w Combo). To inny mechanizm niż permetryna w Advantix – zapamiętaj, które produkty są bezpieczne dla kotów, a które nie.', source: 'extra' },
      ],
    },
  },

  {
    id: 'produkt-advantix',
    title: 'Advantix – krople przeciw pchłom, kleszczom i komarom (TYLKO dla psów)',
    category: 'Zdrowie',
    tags: ['psy', 'koty', 'pasożyty', 'pchły', 'kleszcze', 'komary', 'permetryna', 'imidakloprid', 'advantix', 'toksyczność', 'karta produktu'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'red', text: 'UWAGA – PRODUKT TOKSYCZNY DLA KOTÓW. Advantix zawiera permetrynę, którą koty nie są w stanie skutecznie metabolizować. Nawet kontakt z sierścią psa po aplikacji (polizanie, wspólne legowisko) może wywołać u kota poważne zatrucie neurologiczne: drgawki, ślinotok, drżenia mięśniowe, w ciężkich przypadkach zgon. Produkt jest przeznaczony WYŁĄCZNIE dla psów.' },
        { level: 'yellow', text: 'Zawsze pytaj, czy w domu jest kot (lub czy pies ma z kotami bliski kontakt), nawet jeśli klient kupuje produkt wyłącznie dla psa.' },
        { level: 'yellow', text: 'Nie stosować u szczeniąt poniżej wieku/wagi wskazanej na etykiecie.' },
      ],
      najwazniejsze: [
        { text: 'Advantix to preparat spot-on dla psów na bazie imidaklopridu (działanie na pchły) i permetryny (działanie na kleszcze, komary, muchy i muchówki zwane meszkami, działanie repelentne – odstraszające).', source: 'training' },
        { text: 'Ochrona przed pchłami i komarami ok. 4 tygodnie, przed kleszczami ok. 4 tygodnie. Dawkowanie wg przedziałów wagowych psa. Produkt dostępny w czterech formulacjach (wg masy ciała psa).', source: 'training' },
        { text: 'Dzięki działaniu odstraszającemu Advantix ogranicza ryzyko ukłucia psa przez kleszcza i zmniejsza ryzyko zarażenia groźnymi chorobami przenoszonymi przez kleszcze, takimi jak babeszjoza, borelioza i anaplazmoza.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Działanie repelentne (odstraszające) permetryny ogranicza liczbę ukłuć komarów i kleszczy, co zmniejsza ryzyko przenoszenia chorób takich jak babeszjoza czy dirofilarioza.', source: 'extra' },
        { text: 'To produkt o szerszym spektrum niż czysty fipronil (Frontline) – dodatkowo działa na komary i muchy, ale właśnie z tego powodu (permetryna) nie może być stosowany u kotów.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Mam psa i kota, mogę użyć tej samej pipety na obu?" — Doradca: "Absolutnie nie. Advantix zawiera permetrynę, która jest bezpieczna dla psów, ale silnie toksyczna dla kotów – nawet kontakt z sierścią psa po aplikacji może zaszkodzić kotu. Jeśli mają Państwo w domu kota, polecę produkt bez permetryny, np. z linii Frontline lub AdTab, bezpieczny dla obu gatunków."', source: 'extra' },
      ],
      pytania: [
        { text: 'Produkt jest tylko dla psów – proszę potwierdzić, że to dla psa.', source: 'extra' },
        { text: 'Czy w domu jest kot lub inny pies, z którym zwierzę ma bliski kontakt?', source: 'extra' },
        { text: 'Jaka waga i wiek psa?', source: 'extra' },
        { text: 'Czy planowany jest wyjazd w tereny o wysokim ryzyku kleszczowym/komarowym (las, woda, zagranica)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Sprzedanie produktu klientowi, który ma w domu kota, bez ostrzeżenia o toksyczności permetryny.', source: 'extra' },
        { text: 'Mylenie z produktami na bazie fipronilu (Frontline), które mają inny profil bezpieczeństwa.', source: 'extra' },
        { text: 'Niesprawdzenie minimalnej wagi/wieku szczeniaka wskazanej na opakowaniu.', source: 'extra' },
      ],
      dodatkowe: [
        { text: 'Jeśli doszło do kontaktu kota z permetryną (np. polizanie psa) – klient powinien NATYCHMIAST skontaktować się z lecznicą weterynaryjną w trybie pilnym. Objawy zatrucia mogą pojawić się dopiero po kilku godzinach.', source: 'extra' },
      ],
      powtorka: [
        { text: 'Advantix = imidakloprid + permetryna, TYLKO dla psów.', source: 'training' },
        { text: 'Permetryna = toksyczna dla kotów niezależnie od dawki – ten sam mechanizm co w przykładowej karcie "Permetryna".', source: 'extra' },
        { text: 'Zawsze pytaj o kota w domu, nawet jeśli klient kupuje produkt dla psa.', source: 'extra' },
        { text: 'Szersze spektrum niż Frontline (dodatkowo komary, muchy) – ale za cenę ograniczenia tylko do psów.', source: 'extra' },
      ],
      kartaProduktu: {
        producent: 'Sprawdź aktualnego producenta/dystrybutora na opakowaniu (linia Advantix)',
        marka: 'Advantix',
        kategoria: 'Krople (spot-on) przeciw pchłom, kleszczom i komarom – tylko dla psów',
        zdjecie: '',
        opis: 'Pipeta na bazie imidaklopridu (działa na pchły) i permetryny (działa na kleszcze, komary, muchy; działanie repelentne). Ochrona przed pchłami i komarami ok. 4 tygodnie, przed kleszczami ok. 4 tygodnie.',
        cechy: [
          'Połączenie imidaklopridu i permetryny – szerokie spektrum (pchły, kleszcze, komary, muchy)',
          'Działanie repelentne – odstrasza, ograniczając liczbę ukłuć',
          'Dawkowanie według przedziałów wagowych psa',
        ],
        korzysciKlient: [
          'Szeroka ochrona jednym produktem (pchły + kleszcze + komary)',
          'Działanie odstraszające zmniejsza ryzyko przenoszenia chorób (np. babeszjoza, dirofilarioza)',
        ],
        korzysciZwierze: [
          'Mniej ukąszeń = mniejszy dyskomfort',
          'Ochrona przed chorobami przenoszonymi przez kleszcze i komary',
        ],
        dlaKogo: 'Zdrowe, dorosłe psy spełniające minimalną wagę/wiek wskazaną na etykiecie.',
        dlaKogoNie: 'KOTY (zawsze – ryzyko ciężkiego zatrucia), szczenięta poniżej minimalnego wieku/wagi z etykiety.',
        przeciwwskazania: [
          'Stosowanie u kotów – ryzyko ciężkiego zatrucia neurologicznego (permetryna), możliwy zgon',
          'Stosowanie u szczeniąt poniżej minimalnego wieku/wagi z etykiety',
        ],
        naCoZwrocicUwage: [
          'Czy w domu/otoczeniu zwierzęcia jest kot',
          'Waga psa vs. przedziały dawkowania na opakowaniu',
        ],
        najczestszeBledy: [
          'Sprzedanie klientowi z kotem w domu bez ostrzeżenia',
          'Mylenie z produktami zawierającymi tylko fipronil (bezpieczniejszymi przy ewentualnym kontakcie z kotem)',
        ],
        pytaniaDoKlienta: [
          'Pies czy kot (produkt tylko dla psów)?',
          'Czy w domu jest kot?',
          'Jaka waga i wiek psa?',
          'Czy planowany jest wyjazd w tereny o ryzyku kleszczowym/komarowym?',
        ],
        alternatywy: [
          'Frontline (fipronil) – dla psów i kotów, sprawdź wariant',
          'AdTab, Frontpro (tabletki)',
        ],
        produktyUzupelniajace: [
          'Preparaty na komary do użytku na wyjazdy',
        ],
        crossSelling: [
          'Preparaty odrobaczające',
        ],
        upselling: [
          'Wielopak (więcej pipet) – lepsza cena jednostkowa',
        ],
        faq: [
          { q: 'Czy mogę użyć Advantix na kota w mniejszej dawce?', a: 'Nie – permetryna jest toksyczna dla kotów niezależnie od dawki.' },
          { q: 'Czy mogę kąpać psa po aplikacji?', a: 'Sprawdź ulotkę – standardowo unikać kąpieli przez kilka dni po aplikacji.' },
        ],
        argumentySprzedazowe: [
          'Szerokie spektrum ochrony (pchły, kleszcze, komary, muchy) jednym produktem',
          'Działanie repelentne – mniej ukąszeń od początku',
        ],
        skroconaWersja: 'Advantix = imidakloprid + permetryna, TYLKO dla psów. NIGDY dla kotów (toksyczne!). Zawsze pytaj o kota w domu. Sprawdź wagę/wiek psa na etykiecie.',
      },
      zapamietaj: [
        { text: 'Advantix to kolejny przykład produktu z permetryną – identyczna zasada jak w przykładowej karcie "Permetryna": TYLKO psy, zawsze pytaj o koty w domu.', source: 'extra' },
      ],
    },
  },

  {
    id: 'produkt-tabletki-frontpro-adtab',
    title: 'Tabletki przeciw pchłom i kleszczom – Frontpro, AdTab Pies, AdTab Kot',
    category: 'Zdrowie',
    tags: ['psy', 'koty', 'pasożyty', 'pchły', 'kleszcze', 'tabletki', 'frontpro', 'adtab', 'afoksolaner', 'izoksazolina', 'lotilaner', 'elanco', 'karta produktu'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Nie stosować u szczeniąt/kociąt poniżej minimalnego wieku i wagi z etykiety (orientacyjnie: Frontpro i AdTab Pies – poniżej 8. tyg. życia / poniżej 1,3 kg; AdTab Kot – poniżej 8. tyg. życia / poniżej 1,2 kg).' },
        { level: 'yellow', text: 'AdTab Pies i AdTab Kot mają różne substancje/dawki dostosowane do gatunku – nie zamieniać między psem a kotem.' },
      ],
      najwazniejsze: [
        { text: 'Tabletki przeciw pchłom i kleszczom działają systemowo – pasożyt musi ukłuć zwierzę, aby preparat zadziałał.', source: 'extra' },
        { text: 'Frontpro (dla psów): substancja czynna afoksolaner. Smaczna tabletka do rozgryzania i żucia, którą pies zjada w kilka sekund – działa szybko, zabijając pchły i kleszcze na zewnątrz i wewnątrz przez pełny miesiąc; zabija pchły, zanim złożą jaja. Można podawać niezależnie od posiłku. Dostępny w czterech wygodnych rozmiarach, bezpieczny dla psów od 8. tygodnia życia i od masy ciała 2 kg.', source: 'training' },
        { text: 'AdTab Pies / AdTab Kot: substancja czynna lotilaner – nowoczesna substancja z grupy izoksazolin. AdTab to mała, smaczna tabletka do rozgryzania i żucia o atrakcyjnym smaku, która działa natychmiastowo (zabija pchły w ciągu ok. 8 godzin, kleszcze w ciągu ok. 24 godzin od podania) oraz utrzymuje pełne działanie bójcze przez cały miesiąc. Lek odpowiedni dla wszystkich psów i kotów w wieku od 8 tygodni i o odpowiedniej masie ciała (rozmiar tabletki dobierany do wagi zwierzęcia).', source: 'training' },
        { text: 'Lotilaner ma okres półtrwania ok. tygodnia – dzięki temu nawet jeśli kolejna dawka zostanie podana z niewielkim opóźnieniem, organizm zwierzęcia nie jest "przeciążony" substancją aktywną.', source: 'training' },
        { text: 'W badaniach klinicznych producenta (Elanco) niemal 100% zwierząt dobrowolnie przyjęło tabletkę AdTab ze względu na jej smakowitość (oznaczenie "Easy to Give Approved").', source: 'training' },
        { text: 'Frontpro: dawkowanie wg przedziałów wagowych (orientacyjnie: 2–4 kg, 4–10 kg, 10–25 kg, 25–50 kg) – kleszcze do 5 tygodni, pchły do 4–5 tygodni.', source: 'training' },
        { text: 'AdTab Pies: dawkowanie wg przedziałów wagowych (orientacyjnie: 1,3–2,5 kg, 5,1–12 kg, 12–25 kg, 25–50 kg) – pchły i kleszcze do 4 tygodni.', source: 'training' },
        { text: 'AdTab Kot: pchły i kleszcze do 4 tygodni. Można podać z karmą lub bez.', source: 'training' },
        { text: 'AdTab, Foresto, Advantix i Kiltix to produkty jednego producenta (Elanco) – warto pamiętać, że to "rodzina" produktów przeciwpasożytniczych o różnych formach (tabletki, obroże, krople) i różnych profilach bezpieczeństwa (np. tylko AdTab i Foresto mają wersje dla kotów; Advantix i Kiltix tylko dla psów).', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Tabletki to dobre rozwiązanie dla zwierząt, które często się kąpią/pływają, nie tolerują aplikacji na skórę lub żyją z małymi dziećmi (brak substancji na sierści do "rozsmarowania").', source: 'extra' },
        { text: 'AdTab to jedna z niewielu linii tabletek dostępnych zarówno dla psów, jak i kotów – ale w wersjach gatunkowo-specyficznych (różne dawki/postaci), nie wolno ich zamieniać.', source: 'extra' },
        { text: '4 argumenty dla opiekuna za AdTab: tabletka jest smaczna (zwierzę zjada ją chętnie i dobrowolnie), działa bardzo szybko (eliminuje pchły i kleszcze w ciągu kilku-kilkudziesięciu godzin), jest wygodna (jedna tabletka = miesiąc ochrony, bez aplikacji na skórę) oraz bezpieczna (dawkowanie precyzyjnie dopasowane do wagi zwierzęcia, krótki okres półtrwania substancji).', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Mój pies/kot nie lubi kropli na skórę, jest coś w tabletkach?" — Doradca: "Tak, np. AdTab albo Frontpro (dla psów) – tabletkę można podać z jedzeniem, działa ok. 4–5 tygodni na pchły i kleszcze, bez konieczności aplikacji na skórę."', source: 'extra' },
      ],
      pytania: [
        { text: 'Pies czy kot?', source: 'extra' },
        { text: 'Jaka waga i wiek zwierzęcia?', source: 'extra' },
        { text: 'Czy zwierzę dobrze przyjmuje tabletki (np. w jedzeniu)?', source: 'extra' },
        { text: 'Czy zwierzę często się kąpie/pływa (argument za formą tabletkową)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Wybór niewłaściwego przedziału wagowego tabletki.', source: 'extra' },
        { text: 'Podanie tabletki AdTab Kot psu lub AdTab Pies kotu – to różne produkty z różnym dawkowaniem.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Frontpro (pies) = afoksolaner, kleszcze do 5 tyg., pchły do 4–5 tyg.', source: 'training' },
        { text: 'AdTab Pies / AdTab Kot = izoksazolina, pchły i kleszcze do 4 tyg., osobne produkty dla każdego gatunku.', source: 'training' },
        { text: 'Tabletki = dobra opcja dla zwierząt kąpiących się często lub nietolerujących aplikacji na skórę.', source: 'extra' },
      ],
      kartaProduktu: {
        producent: 'Sprawdź producenta na opakowaniu (Frontpro – Boehringer Ingelheim; AdTab – sprawdź aktualnego dystrybutora)',
        marka: 'Frontpro / AdTab',
        kategoria: 'Tabletki przeciw pchłom i kleszczom',
        zdjecie: '',
        opis: 'Doustne preparaty przeciw pchłom i kleszczom działające systemowo (po ukłuciu pasożyta). Frontpro – tylko dla psów (afoksolaner). AdTab – wersje dla psów i kotów (izoksazolina), osobne produkty.',
        cechy: [
          'Frontpro: kleszcze do 5 tyg., pchły do 4–5 tyg. (pies)',
          'AdTab Pies / AdTab Kot: pchły i kleszcze do 4 tyg.',
          'Dawkowanie wg przedziałów wagowych',
          'AdTab Kot można podać z karmą lub bez',
        ],
        korzysciKlient: [
          'Łatwe podanie – w jedzeniu, bez aplikacji na skórę',
          'Brak ryzyka "zmycia" preparatu przy kąpieli/pływaniu',
        ],
        korzysciZwierze: [
          'Brak substancji na sierści – komfort dla zwierząt z wrażliwą skórą',
          'Skuteczna ochrona systemowa przed pchłami i kleszczami',
        ],
        dlaKogo: 'Zdrowe psy (Frontpro, AdTab Pies) i koty (AdTab Kot) od minimalnego wieku/wagi z etykiety, dobrze przyjmujące tabletki.',
        dlaKogoNie: 'Szczenięta/kocięta poniżej minimalnego wieku/wagi z etykiety; zwierzęta, którym nie da się podać tabletki (warto wtedy rozważyć formę spot-on).',
        przeciwwskazania: [
          'Stosowanie u zwierząt poniżej minimalnego wieku/wagi z etykiety',
          'Zamiana produktu AdTab Pies i AdTab Kot między gatunkami',
        ],
        naCoZwrocicUwage: [
          'Gatunek i wariant produktu (Frontpro – tylko psy; AdTab – sprawdź wersję)',
          'Przedział wagowy zwierzęcia',
          'Czy zwierzę przyjmie tabletkę (w razie potrzeby podać w jedzeniu)',
        ],
        najczestszeBledy: [
          'Wybór niewłaściwego przedziału wagowego',
          'Zamiana AdTab Kot i AdTab Pies',
        ],
        pytaniaDoKlienta: [
          'Pies czy kot?',
          'Jaka waga i wiek zwierzęcia?',
          'Czy zwierzę dobrze przyjmuje tabletki?',
          'Czy zwierzę często się kąpie/pływa?',
        ],
        alternatywy: [
          'Frontline (krople, fipronil) – dla psów i kotów',
          'Advantix (krople – tylko psy, permetryna)',
          'Foresto / Kiltix (obroże)',
        ],
        produktyUzupelniajace: [
          'Preparaty odrobaczające (Drontal, Prinpet)',
        ],
        crossSelling: [
          'Suplementy na skórę i sierść',
        ],
        upselling: [
          'Większe opakowanie (więcej tabletek) – lepsza cena jednostkowa i ciągłość ochrony',
        ],
        faq: [
          { q: 'Czy mogę dać tabletkę dla psa swojemu kotu, jeśli zostały mi sztuki?', a: 'Nie – produkty dla psów i kotów mają różne dawki substancji aktywnej, nieprzeznaczone dla innego gatunku.' },
          { q: 'Czy tabletkę trzeba podać z jedzeniem?', a: 'Zależy od produktu – AdTab Kot można podać z karmą lub bez, sprawdź ulotkę konkretnego produktu dla pełnej instrukcji.' },
        ],
        argumentySprzedazowe: [
          'Wygoda – brak aplikacji na skórę, brak ryzyka zmycia przy kąpieli',
          'Skuteczność systemowa przez 4–5 tygodni',
        ],
        skroconaWersja: 'Frontpro (pies, afoksolaner) – kleszcze do 5 tyg., pchły do 4–5 tyg. AdTab Pies/Kot (izoksazolina) – pchły i kleszcze do 4 tyg., osobne produkty dla psa i kota. Sprawdź wagę/wiek na etykiecie, nie zamieniać produktów między gatunkami.',
      },
      zapamietaj: [
        { text: 'Tabletki = dobra alternatywa dla zwierząt kąpiących się/pływających lub nietolerujących kropli na skórę.', source: 'extra' },
      ],
    },
  },

  {
    id: 'produkt-foresto-kiltix',
    title: 'Obroże przeciw pchłom i kleszczom – Foresto, Kiltix',
    category: 'Zdrowie',
    tags: ['psy', 'koty', 'pasożyty', 'pchły', 'kleszcze', 'obroża', 'foresto', 'kiltix', 'karta produktu'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Obroża musi być prawidłowo dopasowana – powinno dać się wsunąć ok. 2 palce między obrożę a szyję. Zbyt ciasna może podrażniać skórę, zbyt luźna może zsunąć się lub zostać zerwana.' },
        { level: 'yellow', text: 'Kiltix zawiera propoksur (karbaminian) – przy zwierzętach starszych, chorych neurologicznie lub przyjmujących inne leki przeciwpasożytnicze zalecana konsultacja z weterynarzem przed zastosowaniem.' },
      ],
      najwazniejsze: [
        { text: 'Foresto (dla kota i psa): substancja czynna imidaklopryd + flumetryna – działanie bójcze i odstraszające (repelentne). Ochrona przed pchłami i kleszczami do 8 miesięcy.', source: 'training' },
        { text: 'Kiltix (dla psa): substancja czynna propoksur + flumetryna. Ochrona przed kleszczami i pchłami do 5–7 miesięcy, działanie odstraszające.', source: 'training' },
        { text: 'Foresto dostępna jest w dwóch rozmiarach obroży: ok. 38 cm (dla kotów i małych psów) oraz ok. 70 cm (dla psów średnich i dużych) – rozmiar dobieramy do obwodu szyi zwierzęcia.', source: 'training' },
        { text: 'Działanie odstraszające (repelentne) Foresto i Kiltix jest istotne nie tylko ze względu na pchły/kleszcze samo w sobie, ale dlatego, że ogranicza ryzyko przeniesienia chorób odkleszczowych takich jak babeszjoza, borelioza i erlichioza – kleszcz odstraszony nie zdąży się przyczepić i ukłuć.', source: 'training' },
        { text: 'Kiltix można stosować w domach z wieloma zwierzętami; w przypadku konieczności jednoczesnego stosowania innego preparatu przeciwpasożytniczego (np. doustnego) zalecana jest konsultacja z weterynarzem, zwłaszcza u psów z grupy ryzyka mutacji MDR1 (rasy typu collie).', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Obroże to forma o najdłuższym czasie działania (5–8 miesięcy) – dobra opcja dla klientów, którzy nie chcą pamiętać o regularnych aplikacjach.', source: 'extra' },
        { text: 'Foresto jest dostępna w wersji dla psów i dla kotów (różne rozmiary/dawki) – Kiltix jest przeznaczony tylko dla psów.', source: 'training' },
        { text: 'Repelentne (odstraszające) działanie obroży to ważny argument zdrowotny – nie tylko zabija pasożyty, ale zmniejsza ryzyko ukłucia i przeniesienia chorób odkleszczowych (babeszjoza, borelioza, erlichioza).', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Obroża nie ogranicza ruchów zwierzęcia?" — Doradca: "Nowoczesne obroże, takie jak Foresto czy Kiltix, są lekkie i elastyczne. Ważne jest tylko prawidłowe dopasowanie – powinno dać się wsunąć dwa palce między obrożę a szyję. Co jakiś czas warto sprawdzać, czy nie obciera skóry, szczególnie u zwierząt z gęstą sierścią."', source: 'extra' },
      ],
      pytania: [
        { text: 'Pies czy kot?', source: 'extra' },
        { text: 'Czy zwierzę nosi już inną obrożę/szelki – jak będą się ze sobą łączyć?', source: 'extra' },
        { text: 'Czy zwierzę jest starsze lub ma problemy neurologiczne (istotne przy Kiltix)?', source: 'extra' },
        { text: 'Czy zwierzę ma dostęp do wody (kąpiele/pływanie) – sprawdź odporność obroży na wodę wg etykiety.', source: 'extra' },
      ],
      bledy: [
        { text: 'Zbyt ciasne lub zbyt luźne dopasowanie obroży.', source: 'extra' },
        { text: 'Zastosowanie Kiltix (tylko dla psów) u kota.', source: 'extra' },
        { text: 'Łączenie kilku preparatów przeciwpasożytniczych (np. obroża + spot-on z tą samą grupą substancji) bez konsultacji z weterynarzem – ryzyko przedawkowania.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Foresto (pies i kot) – imidaklopryd + flumetryna, do 8 miesięcy ochrony.', source: 'training' },
        { text: 'Kiltix (tylko pies) – propoksur + flumetryna, do 7 miesięcy ochrony.', source: 'training' },
        { text: 'Obroża = najdłuższy czas działania, ale wymaga prawidłowego dopasowania.', source: 'extra' },
      ],
      kartaProduktu: {
        producent: 'Sprawdź producenta na opakowaniu (linie Foresto / Kiltix)',
        marka: 'Foresto / Kiltix',
        kategoria: 'Obroże przeciw pchłom i kleszczom',
        zdjecie: '',
        opis: 'Obroże o długim czasie działania przeciw pchłom i kleszczom. Foresto – dla psów i kotów (imidaklopryd + flumetryna, do 8 miesięcy). Kiltix – dla psów (propoksur + flumetryna, do 7 miesięcy).',
        cechy: [
          'Foresto: pies i kot, do 8 miesięcy ochrony',
          'Kiltix: tylko pies, do 7 miesięcy ochrony, dodatkowe działanie odstraszające',
          'Brak konieczności regularnych aplikacji',
        ],
        korzysciKlient: [
          'Jedna obroża = wiele miesięcy ochrony bez dodatkowych czynności',
          'Niski koszt w przeliczeniu na miesiąc ochrony',
        ],
        korzysciZwierze: [
          'Stała, długotrwała ochrona przed pchłami i kleszczami',
          'Działanie odstraszające – mniej ukąszeń',
        ],
        dlaKogo: 'Zdrowe psy (Foresto, Kiltix) i koty (Foresto) – właściciele preferujący długoterminową, niskoangażującą ochronę.',
        dlaKogoNie: 'Koty – w przypadku Kiltix (tylko dla psów); zwierzęta z nadwrażliwością na składniki obroży lub problemami dermatologicznymi w okolicy szyi.',
        przeciwwskazania: [
          'Zastosowanie Kiltix u kota',
          'Nadwrażliwość na składniki aktywne obroży',
        ],
        naCoZwrocicUwage: [
          'Prawidłowe dopasowanie (ok. 2 palce między obrożą a szyją)',
          'Gatunek i rozmiar obroży (Foresto: ok. 38 cm dla kotów/małych psów, ok. 70 cm dla psów średnich i dużych)',
          'Czy zwierzę nie ma już innego preparatu przeciwpasożytniczego z tej samej grupy substancji',
          'Czy pies należy do ras z grupy ryzyka mutacji MDR1 (np. collie i rasy pokrewne) – przy łączeniu z innymi preparatami zalecana konsultacja z weterynarzem',
        ],
        najczestszeBledy: [
          'Zbyt ciasne/zbyt luźne dopasowanie',
          'Zastosowanie Kiltix u kota',
        ],
        pytaniaDoKlienta: [
          'Pies czy kot?',
          'Czy zwierzę nosi już obrożę/szelki?',
          'Czy zwierzę jest starsze lub ma problemy zdrowotne (Kiltix – propoksur)?',
        ],
        alternatywy: [
          'Frontline / AdTab / Frontpro (krople, tabletki)',
          'Advantix (krople – tylko psy)',
        ],
        produktyUzupelniajace: [
          'Preparaty odrobaczające',
        ],
        crossSelling: [],
        upselling: [
          'Foresto (dłuższy czas działania) jako opcja premium względem krótszych obroży',
        ],
        faq: [
          { q: 'Czy obroża działa od razu po założeniu?', a: 'Pełne działanie rozwija się przez kilka dni po założeniu – sprawdź ulotkę konkretnego produktu.' },
          { q: 'Czy mogę kąpać zwierzę z obrożą?', a: 'Sprawdź odporność na wodę na etykiecie – większość obroży toleruje okazjonalną kąpiel, ale może to skracać czas działania.' },
        ],
        argumentySprzedazowe: [
          'Do 7–8 miesięcy ochrony z jednej obroży – wygoda i niski koszt miesięczny',
          'Działanie odstraszające zmniejsza liczbę ukłuć',
        ],
        skroconaWersja: 'Foresto (pies i kot) – do 8 mc ochrony. Kiltix (tylko pies) – do 7 mc ochrony. Dopasuj obrożę (2 palce luzu), nie stosuj Kiltix u kotów, przy starszych psach z Kiltix rozważ konsultację z weterynarzem.',
      },
      zapamietaj: [
        { text: 'Kiltix = TYLKO pies. Foresto = pies i kot (różne wersje). Sprawdzaj gatunek przed sprzedażą.', source: 'extra' },
      ],
    },
  },

  {
    id: 'odrobaczanie-psy-koty',
    title: 'Preparaty odrobaczające – Drontal, Prinpet, Hipra',
    category: 'Zdrowie',
    tags: ['psy', 'koty', 'pasożyty', 'odrobaczanie', 'glisty', 'tasiemiec', 'drontal', 'prinpet', 'dronspot', 'szczenięta', 'kocięta', 'zoonozy'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Odrobaczanie (pasożyty wewnętrzne) i ochrona przed pchłami/kleszczami (pasożyty zewnętrzne) to dwie różne sprawy – klient często potrzebuje obu, ale to są inne produkty.' },
        { level: 'yellow', text: 'Zawsze sprawdzaj minimalny wiek i wagę zwierzęcia – preparaty dla szczeniąt/kociąt mają inne dawkowanie niż dla zwierząt dorosłych.' },
      ],
      najwazniejsze: [
        { text: 'Drontal dla psów: tabletki odrobaczające podawane doustnie. Można stosować od 2.–3. tygodnia życia (w zależności od wariantu produktu – sprawdź konkretne opakowanie). Dostępne warianty m.in. Drontal Dog Flavour 150/144/50 mg (2 tabletki w opakowaniu) oraz Drontal Plus Flavour 35 kg – wariant w wyższej dawce dla dużych psów (powyżej 35 kg).', source: 'training' },
        { text: 'Drontal dla kotów: tabletki odrobaczające 230 mg/90 mg, od 6. tygodnia życia i min. 1 kg wagi. Dawkowanie: 1 tabletka na 4 kg masy ciała.', source: 'training' },
        { text: 'Tabletki Drontal mają kształt małej kostki i zawierają substancję smakową, co ułatwia podanie zwierzęciu.', source: 'training' },
        { text: 'Drontal skutecznie działa na wszystkie powszechnie występujące typy robaków jelitowych (glisty, tasiemce, nicienie).', source: 'training' },
        { text: 'Niektóre gatunki tasiemców i nicieni mogą przenosić się na człowieka i wywoływać poważne choroby (pasożyty zoonotyczne) – odrobaczanie zwierzęcia jest więc ważne nie tylko dla samego zwierzęcia, ale i dla jego właścicieli.', source: 'training' },
        { text: 'Dronspot to preparat odrobaczający dla kotów w postaci kropli do nakrapiania na skórę (spot-on) – pierwszy lek do odrobaczania kotów w tej formie, o statusie OTC (dostępny bez recepty w sklepach zoologicznych). Dostępny w formulacjach m.in. 30 mg/7,5 mg, 60 mg/15 mg i 96 mg/24 mg, dawkowanych wg masy ciała kota. Skuteczny przeciwko tasiemcom i nicieniom.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Standardowy schemat odrobaczania (wiedza ogólna, zawsze warto polecić konsultację z weterynarzem przy ustalaniu harmonogramu): szczenięta/kocięta odrobaca się częściej, np. co 2 tygodnie do ok. 3. miesiąca życia, później co 1–3 miesiące u młodych zwierząt, a u zdrowych dorosłych zwykle co 3 miesiące (częściej u zwierząt polujących/wychodzących).', source: 'extra' },
        { text: 'Prinpet w formie kropli/pasty jest łatwiejszy do podania małym kociętom niż tabletka – dobra propozycja, gdy klient zgłasza trudności z podaniem tabletki.', source: 'training' },
        { text: 'Dronspot to dobra alternatywa dla kotów, którym trudno podać tabletkę – preparat aplikuje się na skórę, podobnie jak krople na pchły/kleszcze, ale działa na pasożyty wewnętrzne (odrobaczanie).', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Mój kociak ma 7 tygodni, czy mogę go odrobaczyć?" — Doradca: "Tak, w tym wieku można już zastosować preparaty przeznaczone dla małych kociąt, np. Prinpet w formie kropli – łatwiej podać niż tabletkę. Tabletki typu Drontal dla kotów są zalecane od 6. tygodnia życia i min. 1 kg wagi."', source: 'extra' },
        { text: 'Klient: "Kupiłem już krople na kleszcze, czy muszę dodatkowo odrobaczać?" — Doradca: "Tak, to są dwie różne kwestie – krople/obroże/tabletki na pchły i kleszcze działają na pasożyty zewnętrzne, a preparaty odrobaczające (np. Drontal) na pasożyty wewnętrzne, takie jak glisty czy tasiemce. Warto stosować oba rodzaje profilaktyki."', source: 'extra' },
      ],
      pytania: [
        { text: 'Pies czy kot, jaki wiek i waga?', source: 'extra' },
        { text: 'Kiedy było ostatnie odrobaczanie?', source: 'extra' },
        { text: 'Czy zwierzę poluje, ma kontakt z innymi zwierzętami lub jest często na zewnątrz?', source: 'extra' },
        { text: 'Czy w domu są małe dzieci (znaczenie ze względu na pasożyty zoonotyczne)?', source: 'extra' },
        { text: 'Czy zwierzę dobrze przyjmuje tabletki, czy lepsza będzie forma kropli/pasty?', source: 'extra' },
      ],
      bledy: [
        { text: 'Dzielenie tabletek "na oko" bez uwzględnienia dawkowania na wagę.', source: 'extra' },
        { text: 'Zbyt rzadkie odrobaczanie zwierząt wychodzących/polujących.', source: 'extra' },
        { text: 'Mylenie odrobaczania (pasożyty wewnętrzne) z ochroną przed pchłami/kleszczami (pasożyty zewnętrzne) – klient może uznać, że jeden produkt "wystarczy na wszystko".', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Drontal (pies) – tabletki w kształcie kostki, od 2.–3. tyg. życia, dawkowanie wg wagi; wariant Plus Flavour 35 kg dla dużych psów.', source: 'training' },
        { text: 'Drontal (kot) – tabletki 230 mg/90 mg, od 6. tyg. życia i 1 kg wagi, 1 tabl./4 kg.', source: 'training' },
        { text: 'Prinpet – krople/pasta dla małych kociąt od 6. tyg. życia – łatwiejsze podanie niż tabletka.', source: 'training' },
        { text: 'Dronspot – krople (spot-on) odrobaczające dla kotów, OTC, dawkowanie wg wagi.', source: 'training' },
        { text: 'Niektóre robaki są zoonotyczne – mogą zarażać ludzi, więc odrobaczanie chroni całą rodzinę.', source: 'training' },
        { text: 'Odrobaczanie ≠ ochrona przed pchłami/kleszczami – to dwa różne tematy profilaktyki.', source: 'extra' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Odrobaczanie wewnętrzne i ochrona przed pchłami/kleszczami (zewnętrzne) to DWIE różne rzeczy – klient może potrzebować obu produktów.', source: 'extra' },
        { text: 'Dla kotów, którym trudno podać tabletkę, Dronspot (spot-on) jest dobrą alternatywą dla Drontal/Prinpet w formie doustnej.', source: 'extra' },
      ],
    },
  },

  {
    id: 'cykl-sprzedazy-maxi-zoo',
    title: 'Cykl sprzedaży Maxi Zoo – 4 kroki obsługi klienta',
    category: 'Obsługa klienta i sprzedaż',
    tags: ['sprzedaż', 'obsługa klienta', 'szkolenie', 'cykl sprzedaży', 'aktywne słuchanie', 'crossselling'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Cykl sprzedaży Maxi Zoo składa się z 4 kroków: 1) Przywitaj i nawiąż kontakt, 2) Zapytaj i opowiedz, 3) Zaproponuj produkt dodatkowy i upewnij w wyborze, 4) Przeprowadź sprawną transakcję.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Krok 1 – Przywitaj i nawiąż kontakt: pierwsze wrażenie ma duże znaczenie. Zwróć uwagę na to, jak Klient odbiera pierwszy kontakt – uśmiech, otwarta postawa, szybka reakcja na wejście Klienta do sklepu/podejście do regału.', source: 'training' },
        { text: 'Krok 1 – elementy aktywnego słuchania: (1) okazuj zainteresowanie tym, co mówi Klient, (2) nie przerywaj, koncentruj się na tym, co mówi, (3) parafrazuj/powtarzaj własnymi słowami to, co usłyszałeś, (4) zadawaj dodatkowe pytania o szczegóły, (5) podsumuj usłyszane informacje i oczekiwania Klienta.', source: 'training' },
        { text: 'Krok 2 – Zapytaj i opowiedz: stosuj "regułę lejka" – zaczynaj od pytań ogólnych, otwartych, a następnie doprecyzowuj pytaniami zamkniętymi/alternatywnymi. Pytania otwarte najszybciej pokazują, na czym zależy Klientowi.', source: 'training' },
        { text: 'Krok 2 – zapytaj Klienta o jego dotychczasowe doświadczenia: co się sprawdziło, co nie zadziałało, jakich produktów już używał.', source: 'training' },
        { text: 'Krok 3 – Zaproponuj produkt dodatkowy i upewnij w wyborze: (1) zaproponuj z sensem – dobierz produkt dodatkowy tak, by realnie pomagał Klientowi, (2) pokaż z potrzeby – połącz propozycję z tym, co Klient już wybrał (np. "skoro wybiera Pan/Pani karmę dla wrażliwego brzuszka, to świetnie sprawdzą się też te smakołyki o łagodnej recepturze"), (3) upraszczaj decyzję – potwierdzaj wybór Klienta ("to bardzo dobry wybór, wielu opiekunów wraca po niego").', source: 'training' },
        { text: 'Krok 4 – Przeprowadź sprawną transakcję: dokończ obsługę przy kasie szybko i bezproblemowo, to też dobry moment, by wspomnieć o programie lojalnościowym (App&Friends / Łapki Friends), jeśli Klient go jeszcze nie ma.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Przykład pełnej rozmowy: "Dzień dobry, w czym mogę pomóc?" (krok 1) → "Dla jakiego zwierzaka szukają Państwo karmy? Czy ma jakieś szczególne potrzeby – wiek, alergie, problemy trawienne?" (krok 2, pytania otwarte → doprecyzowujące) → "Skoro Państwa kot ma wrażliwy żołądek, ta karma będzie dobrym wyborem. Do tego polecam smakołyki o łagodnej recepturze – wielu opiekunów kotów z wrażliwym żołądkiem korzysta z tego zestawu." (krok 3) → "Czy mają Państwo już naszą aplikację Friends? Przy tym zakupie zbierze Pan/Pani już pierwszą łapkę." (krok 4)', source: 'extra' },
      ],
      pytania: [
        { text: 'Jakie pytania otwarte zadać na start? np. "W czym mogę pomóc?", "Dla jakiego zwierzaka szukają Państwo produktu?", "Co jest dla Pana/Pani najważniejsze przy wyborze?"', source: 'extra' },
        { text: 'Jakie pytania doprecyzowujące (zamknięte/alternatywne)? np. "Czy zwierzak ma alergie?", "Karma sucha czy mokra?", "Czy to dla szczeniaka/kociaka, czy dorosłego zwierzaka?"', source: 'extra' },
      ],
      bledy: [
        { text: 'Przechodzenie od razu do prezentacji produktu bez zapytania o potrzeby Klienta (pominięcie kroku 2).', source: 'extra' },
        { text: 'Proponowanie produktu dodatkowego "na siłę", niezwiązanego z tym, co Klient już wybrał – krok 3 traci sens, gdy propozycja nie ma logicznego związku z potrzebą.', source: 'extra' },
        { text: 'Przerywanie Klientowi w trakcie opisywania potrzeb.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: '4 kroki: Przywitaj i nawiąż kontakt → Zapytaj i opowiedz → Zaproponuj produkt dodatkowy i upewnij w wyborze → Przeprowadź sprawną transakcję.', source: 'training' },
        { text: 'Aktywne słuchanie: zainteresowanie, nie przerywaj, parafrazuj, dopytuj, podsumuj.', source: 'training' },
        { text: 'Reguła lejka: pytania ogólne/otwarte → pytania doprecyzowujące/zamknięte.', source: 'training' },
        { text: 'Produkt dodatkowy: z sensem, z potrzeby, z potwierdzeniem decyzji Klienta.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Krok 3 (produkt dodatkowy) działa najlepiej, gdy wynika bezpośrednio z tego, co Klient powiedział w kroku 2 – stąd znaczenie dobrego zadawania pytań i słuchania.', source: 'extra' },
      ],
    },
  },

  {
    id: 'narzedzia-sprzedazowe-perswazja',
    title: 'Przydatne narzędzia w rozmowie z Klientem – social proof, autorytet, niedostępność',
    category: 'Obsługa klienta i sprzedaż',
    tags: ['sprzedaż', 'obsługa klienta', 'szkolenie', 'perswazja', 'social proof', 'autorytet'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Stosuj techniki perswazji etycznie i tylko wtedy, gdy produkt naprawdę odpowiada na potrzebę Klienta i dobro zwierzęcia. Nie naciskaj na zakup wbrew interesowi Klienta lub zwierzęcia.' },
      ],
      najwazniejsze: [
        { text: 'Społeczny dowód słuszności (social proof): Klienci często decydują się na produkt, bo "inni go wybierają i są zadowoleni". Możesz opisać, że dany produkt jest często wybierany i chwalony przez innych Klientów.', source: 'training' },
        { text: 'Reguła autorytetu: jako doradca jesteś dla Klienta autorytetem w temacie produktów zoologicznych – Twoja opinia ma realny wpływ na decyzję. Mów z przekonaniem, ale w oparciu o rzeczywistą wiedzę o produkcie.', source: 'training' },
        { text: 'Reguła niedostępności: ludzie silniej reagują na ryzyko utraty czegoś niż na perspektywę zdobycia czegoś nowego (np. ograniczona promocja, ostatnie sztuki).', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Te trzy zasady (social proof, autorytet, niedostępność) to klasyczne reguły wpływu społecznego – w sklepie zoologicznym najlepiej działają, gdy są używane szczerze: rzeczywista popularność produktu, rzeczywista wiedza ekspercka, rzeczywiście ograniczona promocja.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Social proof: "Ta karma jest jedną z najczęściej wybieranych przez właścicieli kotów z wrażliwym żołądkiem – mamy dużo pozytywnych opinii."', source: 'extra' },
        { text: 'Autorytet: "Z naszego doświadczenia ten szampon naprawdę dobrze sprawdza się przy suchej skórze – polecam go regularnie i dostajemy dobry feedback."', source: 'extra' },
        { text: 'Niedostępność: "Ta promocja na karmę kończy się w tym tygodniu, a przy Państwa zużyciu to spora różnica w cenie na cały miesiąc."', source: 'extra' },
      ],
      pytania: [],
      bledy: [
        { text: 'Wymyślanie "popularności" lub "promocji", które nie istnieją – to nieetyczne i podważa zaufanie do sklepu, gdy Klient to zweryfikuje.', source: 'extra' },
        { text: 'Nadużywanie presji czasu/niedostępności przy każdej rozmowie – Klienci szybko to wyłapują i tracą zaufanie.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Social proof – "inni Klienci też wybierają i są zadowoleni".', source: 'training' },
        { text: 'Autorytet – Ty jako doradca jesteś źródłem wiarygodnej opinii.', source: 'training' },
        { text: 'Niedostępność – ograniczona promocja/dostępność motywuje do decyzji.', source: 'training' },
        { text: 'Wszystkie 3 zasady stosuj tylko w oparciu o prawdę.', source: 'extra' },
      ],
      kartaProduktu: null,
      zapamietaj: [],
    },
  },

  {
    id: 'analiza-potrzeb-i-potrzeby-klientow',
    title: 'Analiza potrzeb Klienta – co naprawdę kieruje wyborem',
    category: 'Obsługa klienta i sprzedaż',
    tags: ['sprzedaż', 'obsługa klienta', 'szkolenie', 'analiza potrzeb', 'pytania do klienta'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Analiza potrzeb to szukanie odpowiedzi na pytania: Dlaczego Klientowi na tym zależy? Dlaczego to jest dla Klienta ważne? Co chce dzięki temu osiągnąć?', source: 'training' },
        { text: 'Kluczowe pytania o produkt: Jakiego produktu Klient poszukuje (jaki skład, jaka funkcja, do czego jest mu potrzebny)? Ile potrzebuje i na jaki czas? Jakich produktów Klient już używał – co się sprawdziło, a co nie? Czy szuka czegoś nowego/innego modelu?', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Nie zakładaj z góry, co jest dla Klienta najważniejsze – dla jednej osoby kluczowa będzie cena, dla innej wygoda, dla kolejnej zdrowie/dieta zwierzęcia, a dla innej relacja i czas spędzany ze zwierzęciem.', source: 'training' },
        { text: 'Elementy potrzeb Klienta, które warto rozpoznać w rozmowie: zdrowie zwierzęcia, wygoda użytkowania, ekonomia/cena, bezpieczeństwo, estetyka/wygląd, relacja właściciela ze zwierzęciem.', source: 'training' },
        { text: 'Zadawanie pytań pomaga nie tylko dobrać produkt, ale też zauważyć okazje do dodatkowej rekomendacji (np. Klient zaangażowany w dobrostan zwierzęcia może być zainteresowany akcesoriami wzbogacającymi środowisko zwierzaka).', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Przykład: Klient pyta o karmę "bez zbóż". Zamiast od razu polecać konkretny produkt, dopytaj: "Co jest powodem takiego wyboru – alergia zdiagnozowana u weterynarza, czy ogólna profilaktyka?" Odpowiedź zmienia, czy lepszym wyborem będzie standardowa karma bezzbożowa, czy dieta weterynaryjna (np. linia Select Gold Medica).', source: 'extra' },
      ],
      pytania: [
        { text: 'Dlaczego Państwu na tym zależy / dlaczego to jest ważne?', source: 'training' },
        { text: 'Co chcą Państwo dzięki temu osiągnąć?', source: 'training' },
        { text: 'Jaki skład/funkcja produktu jest potrzebna i do czego?', source: 'training' },
        { text: 'Ile produktu potrzeba i na jaki czas?', source: 'training' },
        { text: 'Jakich produktów już Państwo używali – co się sprawdziło, a co nie?', source: 'training' },
        { text: 'Szukają Państwo czegoś nowego, czy zamiennika dotychczasowego produktu?', source: 'training' },
      ],
      bledy: [
        { text: 'Zakładanie, że cena jest najważniejsza dla każdego Klienta – czasem ważniejsze są zdrowie, wygoda lub bezpieczeństwo.', source: 'training' },
        { text: 'Brak dopytania o dotychczasowe doświadczenia – ryzyko polecenia produktu, który Klient już wypróbował i odrzucił.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Analiza potrzeb = pytania o "dlaczego" i "do czego", nie tylko "co".', source: 'training' },
        { text: 'Elementy potrzeb: zdrowie, wygoda, ekonomia, bezpieczeństwo, estetyka, relacja ze zwierzęciem.', source: 'training' },
        { text: 'Zawsze pytaj o dotychczasowe doświadczenia Klienta z produktami.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [],
    },
  },

  {
    id: 'crossselling-upselling-maxi-zoo',
    title: 'Cross-selling i upselling w praktyce',
    category: 'Obsługa klienta i sprzedaż',
    tags: ['sprzedaż', 'obsługa klienta', 'szkolenie', 'crossselling', 'upselling'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Cross-selling – dobieramy do głównego zakupu Klienta inny produkt, który realnie pomaga i pasuje do tego, co Klient wybrał.', source: 'training' },
        { text: 'Upselling – pokazujemy lepszą opcję: przedstawiamy ofertę, która daje Klientowi więcej wartości przy ulepszeniu tego samego produktu (np. większe opakowanie, wyższa linia produktowa).', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Cross-selling w praktyce: zadbaj o to, by produkt dodatkowy realnie spełniał potrzebę Klienta. Twórz personalizowaną propozycję – każdy Klient jest inny. Proponuj tylko produkty, które rzeczywiście mają sens z głównym zakupem. Dziel się własnym doświadczeniem i doświadczeniem innych Klientów. Szukaj produktów komplementarnych, które uzupełniają główny zakup.', source: 'training' },
        { text: 'Przykład cross-sellingu: Klient kupuje karmę dla psa z wrażliwym żołądkiem → zaproponuj smakołyki o łagodnej recepturze, dopasowane do tej samej linii.', source: 'training' },
        { text: 'Przykład upsellingu: Klient wybiera standardową karmę → pokaż linię premium/weterynaryjną (np. Select Gold Medica), jeśli zwierzę ma konkretny problem zdrowotny, który ta linia adresuje.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Cross-selling: "Skoro wybiera Pan/Pani karmę dla wrażliwego brzuszka, to świetnie sprawdzą się też te smakołyki o łagodnej recepturze – mają podobny, delikatny skład."', source: 'training' },
        { text: 'Upselling: "Mogę zaproponować lepszą opcję – ta karma ma w składzie dodatkowo [korzyść], co przy problemach, o których Pan/Pani wspominał/a, może dać lepsze efekty."', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy produkt dodatkowy faktycznie odpowiada na potrzebę, o której Klient już wspomniał?', source: 'extra' },
        { text: 'Czy lepsza/wyższa wersja produktu adresuje konkretny problem zdrowotny lub potrzebę zwierzęcia Klienta?', source: 'extra' },
      ],
      bledy: [
        { text: 'Proponowanie produktu dodatkowego niezwiązanego z głównym zakupem – traktowane jako "naciąganie", a nie pomoc.', source: 'training' },
        { text: 'Upselling bez uzasadnienia – Klient nie rozumie, dlaczego ma zapłacić więcej, jeśli nie wskazano konkretnej korzyści.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Cross-selling = dodatkowy produkt, który pasuje i pomaga.', source: 'training' },
        { text: 'Upselling = lepsza wersja tego samego produktu, z konkretną korzyścią.', source: 'training' },
        { text: 'Zawsze łącz propozycję z potrzebą, o której Klient już mówił.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Cross-selling i upselling działają najlepiej jako naturalna kontynuacja rozmowy o potrzebach Klienta (krok 3 cyklu sprzedaży Maxi Zoo), nie jako oddzielna "akcja sprzedażowa".', source: 'extra' },
      ],
    },
  },

  {
    id: 'program-lojalnosciowy-friends',
    title: 'Program lojalnościowy Friends – App&Friends, Łapki Friends, Kupon Powitalny',
    category: 'Obsługa klienta i sprzedaż',
    tags: ['sprzedaż', 'obsługa klienta', 'szkolenie', 'program lojalnościowy', 'Friends', 'Łapki Friends', 'aplikacja', 'rabaty'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Szczegóły dat, procentów i warunków programu (kupony, łapki, rabaty) mogą się zmieniać – przed przekazaniem informacji Klientowi sprawdź aktualne warunki w materiałach/aplikacji Maxi Zoo, jeśli minął dłuższy czas od ostatniego szkolenia.' },
      ],
      najwazniejsze: [
        { text: 'Kupon Powitalny: nowy Klient dołączający do programu Friends (poprzez aplikację) otrzymuje kupon -10% na pierwsze zakupy. Kupon jest ważny 30 dni od momentu dołączenia/wygenerowania.', source: 'training' },
        { text: 'Łapki Friends – zasada zbierania: każdy zakup powyżej 50 zł = 1 "łapka" (liczone zarówno w sklepach stacjonarnych, jak i online, z opcją zakup & odbiór w sklepie / click & collect).', source: 'training' },
        { text: 'Łapki Friends – nagroda: po zebraniu 4 łapek Klient otrzymuje rabat 15% na kolejne zakupy, w formie kuponu w aplikacji, ważnego 90 dni.', source: 'training' },
        { text: '"Ceny z Friends": zeskanowanie kodu QR w aplikacji daje dostęp do cen specjalnych na wybrane artykuły – rabat działa automatycznie, nie trzeba go dodatkowo aktywować.', source: 'training' },
        { text: 'Kupon -10% dla Klientów Friends przy zakupie min. 4 produktów z kategorii "Need Food" (karma podstawowa) – to narzędzie wspierające cross-selling/większe koszyki zakupowe.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Program Friends to główne narzędzie budowania lojalności – warto wspominać o nim na końcu obsługi (krok 4 cyklu sprzedaży), zwłaszcza jeśli Klient robi większe zakupy lub wraca regularnie.', source: 'extra' },
        { text: 'Kupon powitalny jest istotnym argumentem, by zachęcić nowego Klienta do instalacji aplikacji – od razu daje wymierną korzyść (-10%).', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Czy mam jakąś zniżkę?" — Doradca: "Jeśli nie mają Państwo jeszcze naszej aplikacji Friends, mogę pomóc ją zainstalować – od razu otrzymają Państwo kupon -10% na dzisiejsze zakupy, ważny przez 30 dni od aktywacji. Dodatkowo za każde zakupy powyżej 50 zł zbierają Państwo łapki – 4 łapki to rabat 15% na kolejne zakupy."', source: 'extra' },
        { text: 'Klient: "Co to za kod QR na produktach?" — Doradca: "To funkcja Ceny z Friends – po zeskanowaniu kodu w aplikacji od razu widzą Państwo cenę specjalną dla użytkowników Friends, bez potrzeby dodatkowej aktywacji rabatu."', source: 'training' },
      ],
      pytania: [
        { text: 'Czy Klient ma już aplikację Maxi Zoo Friends?', source: 'extra' },
        { text: 'Czy Klient robi zakupy regularnie (czy warto podkreślić długoterminowe korzyści z programu)?', source: 'extra' },
        { text: 'Czy koszyk Klienta przekracza 50 zł (możliwość zdobycia łapki) lub zawiera min. 4 produkty Need Food (możliwość kuponu -10%)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Nieinformowanie Klienta o programie lojalnościowym, gdy robi większe/regularne zakupy – pominięta korzyść dla Klienta i utracona szansa na zbudowanie lojalności.', source: 'extra' },
        { text: 'Podawanie nieaktualnych warunków (np. nieaktualnego % rabatu) – zawsze warto zerknąć na aktualne materiały, jeśli zasady mogły się zmienić.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Kupon powitalny: -10% na pierwsze zakupy, ważny 30 dni, po dołączeniu do Friends.', source: 'training' },
        { text: 'Łapki Friends: zakup >50 zł = 1 łapka; 4 łapki = rabat 15% (kupon w aplikacji, 90 dni).', source: 'training' },
        { text: 'Ceny z Friends: kod QR = cena specjalna, bez aktywacji.', source: 'training' },
        { text: 'Kupon -10% przy min. 4 produktach Need Food dla Klientów Friends.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Program Friends to dobry "krok 4" cyklu sprzedaży – naturalne zamknięcie obsługi, które buduje lojalność i zwiększa szansę na powrót Klienta.', source: 'extra' },
      ],
    },
  },

  {
    id: 'przeglad-marek-maxi-zoo',
    title: 'Przegląd marek Maxi Zoo – marki własne i zewnętrzne',
    category: 'Marki i asortyment',
    tags: ['marki', 'asortyment', 'marki własne', 'Wiejska Zagroda', 'Real Nature', 'Select Gold', 'Take Care', 'Dogs Creek', 'AniOne', 'MultiFit', 'Premiere', 'Moments'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Marki własne (Maxi Zoo) – po co istnieją: budowanie lojalności Klientów, większa marża i kontrola nad ceną, dopasowanie do potrzeb Klientów, wyróżnienie się na rynku.', source: 'training' },
        { text: 'Marki zewnętrzne – po co są w asortymencie: zaufanie i rozpoznawalność oferty, uzupełnienie asortymentu, budowanie pozycji eksperta, możliwość porównania produktów i edukacji Klienta.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Wiejska Zagroda (marka własna): filozofia "human grade" – składniki zdatne do spożycia przez człowieka, bez zbóż, glutenu, sztucznych konserwantów i barwników. Proste, przejrzyste receptury. Oferta: karma sucha i mokra dla psów i kotów, linie monobiałkowe i bezzbożowe, smaki inspirowane naturą (np. kurczak z jagnięciną, kaczka z żurawiną, fasola z kurkami). Doceniana za smakowitość, prosty skład, wysoką strawność, brak sztucznych dodatków. Polecana przez weterynarzy i hodowców.', source: 'training' },
        { text: 'Real Nature ("Najcenniejsze z natury"): marka stawiająca na jakość i czystość receptur, wysoki udział składników naturalnych w karmach dla psów i kotów.', source: 'training' },
        { text: 'Select Gold Medica (Veterinary Diet): linia diet weterynaryjnych dla psów (i kotów) z problemami zdrowotnymi, opracowana we współpracy z lekarzami weterynarii i dietetykami – wsparcie leczenia dietetycznego pod nadzorem weterynarza.', source: 'training' },
        { text: 'Take Care: linia produktów do pielęgnacji/higieny psów i kotów (kosmetyki groomerskie) – "niezawodny ekspert z sercem", produkty wykorzystywane też przez profesjonalistów branży groomerskiej.', source: 'training' },
        { text: 'Dogs Creek: marka outdoor dla aktywnych psów i ich opiekunów – szelki, obroże, smycze, ubrania dla psów, akcesoria turystyczne (miski podróżne, plecaki), zabawki do aportowania, sprzęt do sportów z psem.', source: 'training' },
        { text: 'AniOne: marka akcesoriów i zabawek dla psów i kotów – "więcej codziennej zabawy z Twoim pupilem" (np. linia zabawek Pebe & Kitty).', source: 'training' },
        { text: 'MultiFit ("Simply a good choice"): marka uniwersalna – akcesoria i produkty dla wielu gatunków zwierząt domowych (psy, koty, gryzonie, ptaki, ryby), dopasowane do codziennych potrzeb.', source: 'training' },
        { text: 'PREMIERE: linia karm dla psów i kotów z kompleksową receptura odżywczą, łatwo przyswajalną formułą i wysokiej jakości składnikami – pozycjonowana jako oferta dla wszystkich pupili.', source: 'training' },
        { text: 'Moments: linia przysmaków/karmy mokrej dla kotów ("My helping of LOVE every Moment") – produkty o charakterze "smakowego rytuału" między opiekunem a kotem.', source: 'training' },
        { text: 'Naturalnie i Czysto: marka eko – produkty z surowców naturalnych/odnawialnych, opakowania przyjazne środowisku, formuły bezpieczne dla zwierząt i ludzi ("Miłość dla zwierząt i szacunek dla natury").', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Czym różni się Wiejska Zagroda od Real Nature?" — Doradca: "Obie marki stawiają na naturalny, przejrzysty skład, ale Wiejska Zagroda mocno akcentuje składniki \'human grade\' i polskie inspiracje smakowe (np. kurczak z jagnięciną), a Real Nature kładzie nacisk na czystość receptury i wysoki udział składników naturalnych. Mogę pokazać Państwu obie, by porównać skład pod kątem potrzeb Pana/Pani zwierzaka."', source: 'extra' },
        { text: 'Klient: "Mój pies ma zdiagnozowaną chorobę i weterynarz zalecił dietę – czy macie coś specjalnego?" — Doradca: "Tak, mamy linię Select Gold Medica – diety weterynaryjne opracowane razem z lekarzami weterynarii i dietetykami, dedykowane konkretnym problemom zdrowotnym. Polecam jednak potwierdzić z weterynarzem konkretny wariant diety."', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy Klient szuka konkretnej marki, czy jest otwarty na propozycje w danym budżecie/segmencie?', source: 'extra' },
        { text: 'Czy zwierzę ma zdiagnozowany problem zdrowotny wymagający diety weterynaryjnej (Select Gold Medica)?', source: 'extra' },
        { text: 'Czy dla Klienta ważne są wartości "eko" / naturalny skład (Wiejska Zagroda, Real Nature, Naturalnie i Czysto)?', source: 'extra' },
        { text: 'Czy Klient szuka akcesoriów uniwersalnych (MultiFit) czy specjalistycznych (Dogs Creek – outdoor, Take Care – pielęgnacja)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Polecanie diety weterynaryjnej (Select Gold Medica) bez ustalenia, czy zwierzę ma faktyczne zalecenie lekarza weterynarii – dieta lecznicza powinna być stosowana pod nadzorem weterynaryjnym.', source: 'extra' },
        { text: 'Brak wiedzy o własnych markach Maxi Zoo – marki własne to często najlepsza relacja jakości do ceny i ważny argument konkurencyjny sklepu.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Marki własne = lojalność, marża, dopasowanie, wyróżnienie. Marki zewnętrzne = zaufanie, uzupełnienie oferty, ekspertyza, edukacja Klienta.', source: 'training' },
        { text: 'Wiejska Zagroda i Real Nature – karmy "naturalne"/human grade, bez zbóż.', source: 'training' },
        { text: 'Select Gold Medica – diety weterynaryjne, współpraca z lekarzami.', source: 'training' },
        { text: 'Take Care – pielęgnacja/grooming. Dogs Creek – outdoor. AniOne – zabawki/akcesoria. MultiFit – uniwersalne akcesoria dla wielu gatunków. PREMIERE – karmy kompleksowe. Moments – przysmaki dla kotów. Naturalnie i Czysto – marka eko.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Znajomość własnego portfolio marek (zwłaszcza marek własnych Maxi Zoo) to jeden z najszybszych sposobów na zaproponowanie Klientowi dobrze dopasowanej alternatywy w ramach budżetu.', source: 'extra' },
      ],
    },
  },
  {
    id: 'marka-real-nature-linie',
    title: 'REAL NATURE – linie WILDERNESS, Original, Country Selection',
    category: 'Żywienie i suplementacja',
    tags: ['psy', 'koty', 'karma sucha', 'karma mokra', 'real nature', 'marka własna', 'bez zbóż'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Real Nature to marka własna Maxi Zoo, stawiająca na naturalny skład i wysoki udział mięsa w recepturach.', source: 'training' },
        { text: 'Linia WILDERNESS: receptura bezzbożowa, z wysoką zawartością mięsa, zbliżona do naturalnej diety przodków psów i kotów.', source: 'training' },
        { text: 'Linia Original: klasyczna receptura z udziałem zbóż, dobry stosunek jakości do ceny – baza oferty Real Nature.', source: 'training' },
        { text: 'Linia Country Selection: receptura o ograniczonej liczbie składników (zwykle jedno źródło białka) – dobra propozycja przy podejrzeniu alergii lub nietolerancji pokarmowej.', source: 'training' },
        { text: 'Oznaczenia typu "5 z 7" lub "6 z 7" na opakowaniach to skrót komunikujący, ile z siedmiu wyróżnionych przez markę cech (np. wysoka zawartość mięsa, brak zbóż, brak sztucznych dodatków, dodatek owoców/ziół) zawiera dany produkt – dokładną listę tych siedmiu cech warto zweryfikować na opakowaniu lub w aktualnych materiałach marketingowych.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Dawkowanie zawsze zgodnie z tabelą na opakowaniu – zależy od masy ciała, wieku i poziomu aktywności zwierzęcia.', source: 'training' },
        { text: 'WILDERNESS – dobra propozycja dla klientów szukających diety zbliżonej do naturalnej, bezzbożowej, z wysokim udziałem mięsa.', source: 'extra' },
        { text: 'Country Selection – warto zaproponować przy powtarzających się problemach skórnych lub trawiennych zwierzęcia, jako opcję do obserwacji (eliminacyjnie), pamiętając, że diagnoza alergii wymaga konsultacji weterynaryjnej.', source: 'extra' },
        { text: 'Original to dobry punkt startowy dla klientów, którzy nie mają szczególnych wymagań dietetycznych i szukają sprawdzonej, klasycznej karmy w rozsądnej cenie.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Gdy klient pyta o różnicę między liniami Real Nature, można wyjaśnić: Original to klasyczna receptura z udziałem zbóż i dobrym stosunkiem jakości do ceny; WILDERNESS jest bezzbożowa, z wyższą zawartością mięsa, bliższa naturalnej diecie; Country Selection ma ograniczoną liczbę składników i jedno źródło białka, co bywa pomocne przy wrażliwych żołądkach lub podejrzeniu alergii.', source: 'extra' },
        { text: 'Gdy klient pyta, co oznacza oznaczenie 5 z 7 albo 6 z 7, można wyjaśnić, że to liczba spełnionych przez dany produkt cech z zestawu siedmiu, które marka uznaje za ważne (np. źródło mięsa, brak zbóż, naturalne dodatki) – warto pokazać dokładną listę cech na opakowaniu.', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy zwierzę miało wcześniej problemy z alergiami lub nietolerancjami pokarmowymi?', source: 'extra' },
        { text: 'Czy klient szuka karmy bezzbożowej, czy nie ma takiego wymogu?', source: 'extra' },
        { text: 'Jaka jest masa ciała, wiek i poziom aktywności zwierzęcia (do prawidłowego dawkowania)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Dobieranie karmy na oko, bez sprawdzenia tabeli dawkowania na opakowaniu – ryzyko nadmiernego lub niedostatecznego karmienia.', source: 'extra' },
        { text: 'Mylenie linii Original z WILDERNESS pod względem zawartości zbóż – to dwie różne receptury.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'WILDERNESS = bezzbożowa, wysoka zawartość mięsa.', source: 'training' },
        { text: 'Original = klasyczna receptura z udziałem zbóż, dobra relacja jakości do ceny.', source: 'training' },
        { text: 'Country Selection = ograniczona liczba składników, dobra przy podejrzeniu alergii/nietolerancji.', source: 'training' },
        { text: '5 z 7 / 6 z 7 = liczba spełnionych cech z zestawu marki – zweryfikuj listę cech na opakowaniu.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Dokładną treść siedmiu cech w oznaczeniu "x z 7" oraz aktualne warianty smakowe i gramatury warto zweryfikować na bieżąco w katalogu lub na opakowaniach.', source: 'extra' },
      ],
    },
  },
  {
    id: 'karmy-premium-brit-nd-bozita-fitfun',
    title: 'Karmy premium – Brit, N&D (Farmina), Bozita, FIT+FUN',
    category: 'Żywienie i suplementacja',
    tags: ['psy', 'koty', 'karma premium', 'brit', 'farmina', 'n&d', 'bozita', 'fit+fun', 'marki'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Brit – czeska marka karm dla psów i kotów z szeroką ofertą, od podstawowej do premium; linie obejmują m.in. Brit Premium, Brit Care (formuły funkcjonalne, np. wsparcie stawów, skóry i sierści) oraz Brit Mono Protein (ograniczona liczba składników, jedno źródło białka).', source: 'training' },
        { text: 'N&D (Nature & Diet) – linia marki Farmina (Włochy); karmy bezzbożowe lub z bardzo niską zawartością zbóż (np. tzw. ancestral grain – orkisz, owies), z wysokim udziałem świeżego mięsa lub ryby.', source: 'training' },
        { text: 'Bozita – szwedzka marka karm, produkowana w Szwecji; znana m.in. z karm mokrych w formie pasztetu w tubie, a także karm suchych; stawia na łatwą przyswajalność i jakość składników skandynawskich.', source: 'training' },
        { text: 'FIT+FUN – marka karm i przysmaków dla wielu gatunków zwierząt (psy, koty, a także gryzonie/małe ssaki i ptaki) – dobra propozycja dla klientów posiadających różne zwierzęta w domu.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'N&D/Farmina jest często wybierana przez klientów szukających karm grain-free lub o niskiej zawartości węglowodanów, gotowych zapłacić wyższą cenę za jakość składników.', source: 'extra' },
        { text: 'Bozita w tubie to wygodna forma dawkowania – popularna jako dodatek do karmy suchej (urozmaicenie, nawodnienie) lub jako samodzielne karmienie mokre.', source: 'extra' },
        { text: 'FIT+FUN warto mieć w pamięci przy obsłudze klientów posiadających gryzonie, ptaki lub inne małe zwierzęta – nie tylko psy i koty.', source: 'extra' },
        { text: 'Brit Care i Brit Mono Protein to dobre propozycje przy specyficznych potrzebach (np. wsparcie stawów, wrażliwy układ pokarmowy, alergie) w ramach marki Brit.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Gdy klient porównuje karmy premium, warto wskazać, że różnią się przede wszystkim pochodzeniem (Brit – Czechy, N&D – Włochy/Farmina, Bozita – Szwecja), zawartością zbóż (N&D zazwyczaj bezzbożowa lub z minimalną ich ilością) oraz formą (Bozita oferuje charakterystyczną formę w tubie).', source: 'extra' },
      ],
      pytania: [
        { text: 'Jaki gatunek, rasa i wielkość ma zwierzę?', source: 'extra' },
        { text: 'Czy klient szuka karmy bezzbożowej (N&D) czy klasycznej z dobrym stosunkiem jakości do ceny (Brit Premium)?', source: 'extra' },
        { text: 'Czy w domu są inne zwierzęta (np. gryzonie, ptaki), dla których można zaproponować FIT+FUN?', source: 'extra' },
      ],
      bledy: [
        { text: 'Traktowanie wszystkich karm "premium" jako identycznych – różnią się składem, źródłem białka, zawartością zbóż i przeznaczeniem (np. wsparcie stawów vs. karma podstawowa).', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Brit – Czechy, szeroka oferta dla psów i kotów (Premium, Care, Mono Protein).', source: 'training' },
        { text: 'N&D/Farmina – Włochy, bezzbożowa/niskozbożowa, wysoka zawartość mięsa/ryby.', source: 'training' },
        { text: 'Bozita – Szwecja, znana z karm mokrych w tubie.', source: 'training' },
        { text: 'FIT+FUN – wielogatunkowa: psy, koty, gryzonie, ptaki.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Dokładne receptury, warianty smakowe, gramatury i aktualne promocje tych marek warto zweryfikować na opakowaniach lub w aktualnym katalogu.', source: 'extra' },
      ],
    },
  },
  {
    id: 'dr-sidel-kosmetyki-pielegnacyjne',
    title: 'Dr Sidel – kosmetyki i pielęgnacja weterynaryjna',
    category: 'Pielęgnacja i higiena',
    tags: ['psy', 'koty', 'pielęgnacja', 'kosmetyki', 'szampon', 'skóra', 'sierść', 'dr sidel'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Do mycia i pielęgnacji zwierząt należy stosować wyłącznie kosmetyki przeznaczone dla zwierząt – kosmetyki dla ludzi mają inne pH i mogą podrażniać skórę psa lub kota.' },
      ],
      najwazniejsze: [
        { text: 'Dr Sidel to marka kosmetyków pielęgnacyjnych/groomingowych dla psów i kotów, tworzona z uwzględnieniem podejścia dermatologicznego/weterynaryjnego.', source: 'training' },
        { text: 'Oferta obejmuje m.in. szampony, odżywki oraz pianki/spraye do pielęgnacji skóry i sierści, w tym produkty dedykowane konkretnym problemom (np. nadmierne wypadanie sierści, suchość skóry, swędzenie, nieprzyjemny zapach).', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Kosmetyki o profilu dermatologicznym mają pH zbliżone do skóry zwierzęcia – mniejsze ryzyko podrażnień niż przy stosowaniu kosmetyków dla ludzi.', source: 'extra' },
        { text: 'Przy stałych problemach skórnych (przewlekły świąd, łupież, zmiany skórne) produkty pielęgnacyjne mogą wspomagać, ale nie zastępują diagnozy i leczenia u weterynarza.', source: 'extra' },
        { text: 'Częstotliwość kąpieli warto dopasować do typu sierści i wskazań na etykiecie – zbyt częste mycie nawet dobrym szamponem może wysuszać skórę.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Gdy klient pyta, czy może użyć swojego szamponu do mycia psa lub kota, warto wyjaśnić, że kosmetyki dla ludzi mają inne pH niż skóra zwierzęcia i mogą prowadzić do podrażnień lub przesuszenia – lepiej wybrać produkt przeznaczony dla zwierząt, dopasowany do typu sierści.', source: 'extra' },
      ],
      pytania: [
        { text: 'Jaki typ sierści/skóry ma zwierzę (sucha, tłusta, wrażliwa, długa, krótka)?', source: 'extra' },
        { text: 'Czy występują objawy takie jak swędzenie, łupież, nieprzyjemny zapach lub nadmierne wypadanie sierści?', source: 'extra' },
        { text: 'Jak często zwierzę jest kąpane i jakich kosmetyków używano do tej pory?', source: 'extra' },
      ],
      bledy: [
        { text: 'Używanie kosmetyków przeznaczonych dla ludzi do mycia psów lub kotów.', source: 'extra' },
        { text: 'Zbyt częste kąpanie zwierzęcia, nawet dedykowanym szamponem, co może prowadzić do przesuszenia skóry.', source: 'extra' },
        { text: 'Ignorowanie przewlekłych problemów skórnych i próba ich rozwiązania wyłącznie kosmetykami, bez wizyty u weterynarza.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Dr Sidel = linia pielęgnacyjna o podejściu dermatologicznym/weterynaryjnym – dobra propozycja przy problemach skórnych i przy budowaniu rutyny groomingowej.', source: 'training' },
        { text: 'Zawsze kosmetyki dla zwierząt, nigdy dla ludzi.', source: 'extra' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Dokładne nazwy i przeznaczenie konkretnych produktów z linii Dr Sidel warto zweryfikować na opakowaniach lub w aktualnym katalogu.', source: 'extra' },
      ],
    },
  },
  {
    id: 'akcesoria-marki-more-witbar-gamedog-waudog-fiboo-amiplay',
    title: 'Marki akcesoriów – MORE, Witbar, Game Dog, Wau Dog, Fiboo, Amiplay',
    category: 'Marki i asortyment',
    tags: ['marki', 'akcesoria', 'zabawki', 'legowiska', 'szelki', 'suplementy', 'eko'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'MORE – marka mebli i wyposażenia wnętrz dla psów, np. stylowe legowiska i domki dopasowane estetycznie do wnętrz domowych.', source: 'training' },
        { text: 'Witbar – marka naturalnych przysmaków/gryzaków dla psów, oparta na surowcach naturalnych (np. produkty na bazie skóry, żył, uszu).', source: 'training' },
        { text: 'Game Dog – marka suplementów dla psów aktywnych/sportowych; linie m.in. IsoDog (suplement izotoniczny/elektrolitowy) i Flexit (suplement wspierający stawy).', source: 'training' },
        { text: 'Wau Dog – marka akcesoriów, znana m.in. z materiału biothane (wodoodporny, łatwy do czyszczenia) używanego w szelkach, obrożach i prowadnikach.', source: 'training' },
        { text: 'Fiboo – marka ekologicznych zabawek dla psów i kotów, wykonanych z materiałów z recyklingu (np. z butelek PET).', source: 'training' },
        { text: 'Amiplay – polska marka zabawek i akcesoriów dla psów i kotów, z szeroką, kolorową ofertą w przystępnych cenach.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Game Dog IsoDog – suplement elektrolitowy polecany przy dużym wysiłku lub wysokich temperaturach, wspomaga nawodnienie i regenerację psa.', source: 'extra' },
        { text: 'Game Dog Flexit – suplement wspierający stawy, polecany psom aktywnym, starszym lub rasom predysponowanym do problemów stawowych.', source: 'extra' },
        { text: 'Wau Dog (biothane) – materiał odporny na wodę i błoto, łatwy w czyszczeniu – dobra propozycja dla psów aktywnych lub pracujących w terenie.', source: 'extra' },
        { text: 'Fiboo – argument ekologiczny (zabawki z recyklingu) może być istotny dla klientów zwracających uwagę na środowisko.', source: 'extra' },
        { text: 'Amiplay – dobra opcja, gdy klient szuka szerokiego wyboru akcesoriów/zabawek w przystępnej cenie.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Gdy klient szuka legowiska dopasowanego do wystroju wnętrza, można zaproponować markę MORE; gdy szuka naturalnych przysmaków – Witbar; gdy pies jest sportowy i potrzebuje wsparcia nawodnienia lub stawów – Game Dog (IsoDog, Flexit); gdy klientowi zależy na łatwych w czyszczeniu akcesoriach do aktywności w terenie – Wau Dog (biothane); gdy ważny jest aspekt ekologiczny – Fiboo; a przy szukaniu szerokiego wyboru w przystępnej cenie – Amiplay.', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy klient szuka mebli/legowisk dopasowanych do wnętrza domu (MORE)?', source: 'extra' },
        { text: 'Czy pies jest aktywny sportowo lub startuje w zawodach (Game Dog)?', source: 'extra' },
        { text: 'Czy klientowi zależy na materiałach łatwych w czyszczeniu (Wau Dog biothane) lub na rozwiązaniach ekologicznych (Fiboo)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Polecanie suplementów Game Dog (Flexit, IsoDog) bez ustalenia, czy są faktycznie potrzebne – to suplementy celowane, a nie produkty "dla każdego psa".', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'MORE = meble/legowiska. Witbar = naturalne przysmaki/gryzaki. Game Dog = suplementy (IsoDog – elektrolity, Flexit – stawy). Wau Dog = akcesoria biothane. Fiboo = zabawki eko z recyklingu. Amiplay = szeroka oferta zabawek/akcesoriów w przystępnej cenie.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Dokładny skład suplementów Game Dog oraz aktualny zakres rozmiarowy akcesoriów Wau Dog i Amiplay warto weryfikować na bieżąco na opakowaniach/w katalogu.', source: 'extra' },
      ],
    },
  },
  {
    id: 'szkolenie-psa-podstawy',
    title: 'Szkolenie psa w praktyce – podstawy dla doradcy',
    category: 'Psy',
    tags: ['psy', 'szkolenie', 'behawior', 'szczeniak', 'akcesoria szkoleniowe'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Podstawowe zasady skutecznego szkolenia psa: konsekwencja, krótkie sesje (kilka–kilkanaście minut) i pozytywne wzmocnienie (przysmaki, zabawa, pochwała).', source: 'training' },
        { text: 'Najważniejsze podstawowe komendy: siad, zostań/czekaj, do nogi, leż, przywołanie.', source: 'training' },
        { text: 'Akcesoria pomocne w szkoleniu: smakowite, małe przysmaki treningowe (łatwe do szybkiego podania), klikery, długie linki/prowadniki do pracy na przywołanie, szelki/obroże dopasowane do nauki chodzenia przy nodze.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Szczenięta najlepiej uczą się poprzez krótkie, częste powtórki – długie sesje są mniej efektywne i mogą być męczące.', source: 'extra' },
        { text: 'Socjalizacja (kontakt z innymi psami, ludźmi, różnymi sytuacjami i otoczeniem) jest kluczowa we wczesnym okresie życia szczeniaka.', source: 'extra' },
        { text: 'Kary fizyczne i krzyk są nieskuteczne i mogą szkodzić relacji właściciel–pies – warto promować metody oparte na pozytywnym wzmocnieniu.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Gdy klient pyta, jak zacząć szkolenie szczeniaka, można podsumować: krótkie, regularne sesje (kilka minut, kilka razy dziennie), nagradzanie przysmakiem za każde poprawne zachowanie, konsekwentne używanie tych samych komend oraz duża dawka socjalizacji w pierwszych miesiącach życia.', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy pies jest szczeniakiem, czy dorosłym psem zaczynającym naukę?', source: 'extra' },
        { text: 'Jakie konkretne zachowania klient chce poprawić lub wyuczyć?', source: 'extra' },
        { text: 'Czy klient korzystał już z jakichś akcesoriów lub metod szkoleniowych?', source: 'extra' },
      ],
      bledy: [
        { text: 'Stosowanie zbyt długich sesji treningowych, zwłaszcza ze szczeniakami.', source: 'extra' },
        { text: 'Niekonsekwencja w komendach – różne słowa używane do tego samego zachowania.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Krótkie sesje, pozytywne wzmocnienie, konsekwencja.', source: 'training' },
        { text: 'Podstawowe komendy: siad, zostań, do nogi, leż, przywołanie.', source: 'training' },
        { text: 'Socjalizacja szczeniaka to kluczowy element wczesnego szkolenia.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Przy poważniejszych problemach behawioralnych (agresja, lęk separacyjny) warto polecić konsultację z behawiorystą lub trenerem psów – nie tylko produkty.', source: 'extra' },
      ],
    },
  },
  {
    id: 'potrzeby-psow-dobor-produktow',
    title: 'Potrzeby psów – jak dobrać idealne produkty',
    category: 'Psy',
    tags: ['psy', 'potrzeby', 'dobór produktów', 'segmentacja', 'doradztwo'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Kluczowe kategorie potrzeb psa do uwzględnienia przy doborze produktów: żywienie (wiek, rozmiar, aktywność, ew. alergie), pielęgnacja (typ sierści), zdrowie i profilaktyka (pasożyty, stawy, zęby), aktywność i zabawa (zabawki, aktywizacja węchowa), komfort i odpoczynek (legowisko dopasowane do rozmiaru i preferencji), bezpieczeństwo i szkolenie (szelki/obroże, akcesoria treningowe).', source: 'training' },
        { text: 'Dobór produktów powinien uwzględniać wiek psa (szczeniak/dorosły/senior), rozmiar i rasę, poziom aktywności, ewentualne problemy zdrowotne oraz środowisko życia (mieszkanie vs dom z ogrodem).', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Rasy aktywne/sportowe (np. border collie, husky) mają wyższe potrzeby energetyczne i większą potrzebę aktywizacji – warto rozważyć karmę o wyższej kaloryczności oraz zabawki węchowe/interaktywne.', source: 'extra' },
        { text: 'Psy seniorzy częściej potrzebują wsparcia stawów (suplementy), karmy lżej strawnej oraz miękkich, ortopedycznych legowisk.', source: 'extra' },
        { text: 'Rasy z predyspozycją do problemów skórnych/alergii – warto rozważyć karmy o ograniczonej liczbie składników (np. linia Country Selection marki Real Nature).', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Gdy klient nie wie, od czego zacząć dobór produktów dla nowego psa, warto przejść przez sześć obszarów potrzeb: żywienie, pielęgnacja, zdrowie i profilaktyka, aktywność i zabawa, komfort i odpoczynek, bezpieczeństwo i szkolenie – i dopytać, które z nich są dla psa najważniejsze na danym etapie życia.', source: 'extra' },
      ],
      pytania: [
        { text: 'Jaki wiek, rasa/rozmiar i poziom aktywności ma pies?', source: 'extra' },
        { text: 'Czy są jakieś zdiagnozowane problemy zdrowotne?', source: 'extra' },
        { text: 'W jakich warunkach mieszka pies (mieszkanie, dom, ogród)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Dobór produktów wyłącznie na podstawie ceny, bez uwzględnienia realnych potrzeb zwierzęcia.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: '6 kategorii potrzeb psa: żywienie, pielęgnacja, zdrowie/profilaktyka, aktywność/zabawa, komfort/odpoczynek, bezpieczeństwo/szkolenie.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Im więcej pytań o styl życia zwierzaka, tym lepiej dopasowana oferta – to fundament profesjonalnej rozmowy doradczej.', source: 'extra' },
      ],
    },
  },
  {
    id: 'nowy-pupil-w-domu-checklist',
    title: 'Nowy pupil w domu – checklist dla nowych właścicieli',
    category: 'Inne',
    tags: ['nowy pupil', 'checklist', 'pierwszy zakup', 'szczeniak', 'kociak', 'pakiet startowy'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Podstawowy zestaw dla nowego pupila: miski na jedzenie i wodę, karma startowa dopasowana do wieku zwierzęcia, legowisko/kojec, transporter, obroża/szelki z prowadnikiem (psy) lub kuweta i żwirek (koty), zabawki, akcesoria do pielęgnacji (szczotka, szampon) oraz – po konsultacji z weterynarzem – pierwsza profilaktyka przeciwpasożytnicza.', source: 'training' },
        { text: 'Obsługa nowego właściciela to dobra okazja do zaproponowania pakietu startowego (cross-selling): karma + miski + legowisko + zabawka + akcesoria pielęgnacyjne.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Pierwsze dni w nowym domu są stresujące dla zwierzęcia – warto polecić spokojne, wydzielone miejsce (np. legowisko lub kojec) jako bezpieczną bazę.', source: 'extra' },
        { text: 'Najlepiej kontynuować karmę, którą zwierzę otrzymywało wcześniej (np. od hodowcy), a zmiany wprowadzać stopniowo, by uniknąć problemów żołądkowych.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Gdy klient przychodzi po zakupy dla nowego szczeniaka lub kociaka, warto przejść przez checklistę: jedzenie i miski, miejsce do spania, transport, identyfikacja/prowadzenie (obroża/szelki) lub kuweta, zabawki, pielęgnacja oraz profilaktyka zdrowotna – i zaproponować odpowiedni zestaw produktów.', source: 'extra' },
      ],
      pytania: [
        { text: 'Jaki gatunek i wiek ma zwierzę oraz skąd pochodzi (hodowca, schronisko, dom tymczasowy)?', source: 'extra' },
        { text: 'Jaką karmę zwierzę jadło dotychczas?', source: 'extra' },
        { text: 'Czy klient ma już jakiekolwiek akcesoria, czy zaczyna od zera?', source: 'extra' },
      ],
      bledy: [
        { text: 'Nagła, całkowita zmiana karmy od pierwszego dnia w nowym domu.', source: 'extra' },
        { text: 'Brak przygotowania bezpiecznego miejsca dla zwierzęcia przed przyjazdem do domu.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Pakiet startowy = karma + miski + legowisko + transporter + zabawki + pielęgnacja + (po konsultacji z weterynarzem) profilaktyka przeciwpasożytnicza.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Pierwsza wizyta nowego właściciela to świetna okazja do zbudowania długoterminowej relacji – warto wspomnieć o programie lojalnościowym i kolejnych potrzebach (karma, akcesoria, profilaktyka).', source: 'extra' },
      ],
    },
  },
  {
    id: 'kot-w-domu-jezyk-kota',
    title: 'Kot w domu – potrzeby i język kota',
    category: 'Koty',
    tags: ['koty', 'behawior', 'potrzeby kota', 'komunikacja', 'kuweta', 'drapak'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Koty komunikują się głównie mową ciała: pozycja uszu, ogona i źrenic, mruczenie, merdanie/uderzanie ogonem (zwykle oznacza pobudzenie lub niezadowolenie, w przeciwieństwie do psów) oraz ocieranie się/wałkowanie (oznaczanie zapachowe, oznaka zaufania).', source: 'training' },
        { text: 'Podstawowe potrzeby kota domowego: bezpieczne, wysoko położone miejsca odpoczynku, drapaki (naturalna potrzeba drapania – pielęgnacja pazurów i oznaczanie terytorium), odpowiednia liczba i lokalizacja kuwet, zabawa odwzorowująca polowanie (np. zabawki na wędce, interaktywne) oraz dostęp do kryjówek.', source: 'training' },
        { text: 'Koty niewychodzące (mieszkaniowe) wymagają więcej aktywizacji (zabawki, drapaki, półki, wysokie punkty obserwacyjne) niż koty wychodzące, które mają naturalną stymulację na zewnątrz.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Merdanie ogonem u kota często oznacza irytację lub pobudzenie – w przeciwieństwie do psa, u którego zwykle oznacza radość.', source: 'extra' },
        { text: 'Zasada dotycząca kuwet: liczba kuwet powinna wynosić liczba kotów plus jedna, a kuwety powinny być umieszczone w spokojnych miejscach, z dala od misek z jedzeniem.', source: 'extra' },
        { text: 'Zbyt mała liczba kuwet lub ich nieodpowiednia lokalizacja (hałas, brak prywatności, bliskość jedzenia) to częsta przyczyna "nieczystości" kota.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Gdy klient zgłasza, że kot drapie meble lub załatwia się poza kuwetą, warto zapytać o liczbę i lokalizację kuwet oraz dostęp do drapaka – często rozwiązaniem jest dodanie kuwety (zasada: liczba kotów plus jedna) lub zapewnienie atrakcyjnego drapaka w miejscu, gdzie kot już drapie.', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy kot jest wychodzący, czy mieszkaniowy (niewychodzący)?', source: 'extra' },
        { text: 'Ile kotów jest w domu i ile kuwet jest obecnie dostępnych?', source: 'extra' },
        { text: 'Czy kot ma dostęp do drapaka i wysokich miejsc odpoczynku?', source: 'extra' },
      ],
      bledy: [
        { text: 'Karanie kota za zachowania instynktowne (drapanie, polowanie na przedmioty) bez zapewnienia alternatywy, np. drapaka lub zabawek.', source: 'extra' },
        { text: 'Zbyt mała liczba lub nieodpowiednia lokalizacja kuwet.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Zasada kuwet: liczba kotów + 1.', source: 'training' },
        { text: 'Merdanie ogonem u kota zwykle nie oznacza radości.', source: 'training' },
        { text: 'Koty niewychodzące potrzebują więcej aktywizacji: drapaki, zabawki, półki.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Zrozumienie języka kota pomaga zaproponować właścicielowi produkty rozwiązujące rzeczywisty problem behawioralny (np. drapanie mebli – drapak, a nie tylko spray odstraszający).', source: 'extra' },
      ],
    },
  },
  {
    id: 'ochrona-przed-kleszczami-tarcza',
    title: 'Tarcza przeciwkleszczowa – metody ochrony i złote zasady',
    category: 'Zdrowie',
    tags: ['psy', 'koty', 'kleszcze', 'profilaktyka', 'mdr1', 'pasożyty', 'permetryna'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'red', text: 'Psy z mutacją genu MDR1 (często rasy z grupy collie i rasy pokrewne, np. owczarek szetlandzki, border collie, australian shepherd) mogą reagować bardzo silnie na niektóre leki, w tym niektóre preparaty przeciwpasożytnicze – przed zastosowaniem nowego preparatu u takich psów zalecana jest konsultacja z weterynarzem, a w razie potrzeby test genetyczny MDR1.' },
        { level: 'red', text: 'Preparaty przeciwkleszczowe na bazie permetryny (część produktów spot-on dla psów) są silnie toksyczne dla kotów. Nie stosować psich produktów z permetryną u kotów i pilnować, by kot nie miał bliskiego kontaktu z psem krótko po aplikacji takiego preparatu.' },
      ],
      najwazniejsze: [
        { text: 'Trzy główne metody ochrony przed kleszczami: chemiczna (spot-on, tabletki, obroże – substancje czynne zabijające i/lub odstraszające kleszcze), naturalna (oleje eteryczne i inne naturalne odstraszacze – działanie zwykle słabsze i krótsze, wymaga częstszego stosowania) oraz ultradźwiękowa (urządzenia emitujące dźwięki odstraszające kleszcze/pchły – skuteczność zmienna, traktowana jako metoda dodatkowa, nie podstawowa).', source: 'training' },
        { text: 'Złote zasady ochrony przed kleszczami: stosować profilaktykę przez cały sezon aktywności kleszczy (wiosna–jesień, w cieplejszych regionach często cały rok), regularnie sprawdzać sierść po powrocie z dworu, usuwać kleszcze możliwie szybko i prawidłowo (specjalny haczyk lub pęseta, bez ucisku odwłoka) oraz nie łączyć kilku preparatów chemicznych z tej samej grupy substancji bez konsultacji z weterynarzem.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Choroby przenoszone przez kleszcze u psów to m.in. babeszjoza, borelioza (choroba z Lyme), erlichioza i anaplazmoza – im szybciej kleszcz zostanie usunięty lub odstraszony, tym mniejsze ryzyko przeniesienia patogenu.', source: 'training' },
        { text: 'Metody naturalne i ultradźwiękowe mogą być dobrym uzupełnieniem dla klientów preferujących ograniczenie środków chemicznych, ale w rejonach o wysokim ryzyku kleszczowym warto rekomendować metodę chemiczną jako podstawę ochrony.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Gdy klient pyta, jaką metodę ochrony przed kleszczami wybrać, warto wyjaśnić, że metoda chemiczna (spot-on, tabletki, obroże) daje najsilniejszą i najbardziej przewidywalną ochronę, metody naturalne mogą być uzupełnieniem przy niskim ryzyku, a urządzenia ultradźwiękowe traktować jako dodatek, nie podstawę ochrony – zwłaszcza w rejonach z dużą liczbą kleszczy.', source: 'extra' },
        { text: 'Gdy klient ma psa rasy z grupy collie, warto zapytać, czy znane jest mu pojęcie mutacji MDR1, i w razie wątpliwości polecić konsultację z weterynarzem przed zastosowaniem niektórych preparatów przeciwpasożytniczych.', source: 'extra' },
      ],
      pytania: [
        { text: 'Jaka rasa psa – czy zwierzę należy do ras z grupy ryzyka mutacji MDR1 (np. collie, owczarek szetlandzki, border collie, australian shepherd)?', source: 'extra' },
        { text: 'Jaki jest tryb życia zwierzęcia – częste wyjścia do lasu, wysokiej trawy lub na działkę zwiększają ryzyko kontaktu z kleszczami?', source: 'extra' },
        { text: 'Czy w domu są też koty (istotne ze względu na toksyczność permetryny dla kotów)?', source: 'extra' },
        { text: 'Czy zwierzę ma już inny preparat przeciwpasożytniczy (ryzyko kumulacji substancji aktywnych)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Stosowanie preparatów na bazie permetryny u kotów lub w domach, gdzie koty mają bliski kontakt z psem zaraz po aplikacji.', source: 'extra' },
        { text: 'Łączenie kilku preparatów z tej samej grupy chemicznej "na zapas", bez konsultacji z weterynarzem.', source: 'extra' },
        { text: 'Stosowanie wyłącznie metod naturalnych lub ultradźwiękowych w rejonach wysokiego ryzyka kleszczowego, bez świadomości ich ograniczonej skuteczności.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: '3 metody ochrony: chemiczna (najsilniejsza), naturalna (uzupełniająca), ultradźwiękowa (dodatkowa).', source: 'training' },
        { text: 'MDR1 – ważne przy rasach z grupy collie, sprawdzić przed podaniem niektórych leków/preparatów.', source: 'training' },
        { text: 'Permetryna = toksyczna dla kotów.', source: 'training' },
        { text: 'Choroby kleszczowe: babeszjoza, borelioza, erlichioza, anaplazmoza.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'W materiałach szkoleniowych jako dodatkowe źródło informacji o ochronie przeciwkleszczowej wskazano stronę tatardog.pl – warto ją zweryfikować i ewentualnie polecać klientom zainteresowanym tematem.', source: 'training' },
      ],
    },
  },
  {
    id: 'szczeniaki-kociaki-opieka-little-friends',
    title: 'Szczeniaki i kociaki pod troskliwą opieką – aplikacja Little Friends',
    category: 'Inne',
    tags: ['szczeniak', 'kociak', 'opieka', 'aplikacja', 'little friends', 'program lojalnościowy', 'żywienie'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Maxi Zoo oferuje program/aplikację Little Friends dla opiekunów szczeniąt i kociąt – obejmuje m.in. przypomnienia związane ze szczepieniami i odrobaczaniem, porady dotyczące pielęgnacji i żywienia w pierwszych miesiącach życia oraz oferty dopasowane do wieku zwierzęcia.', source: 'training' },
        { text: 'Pierwsze miesiące życia szczeniaka/kociaka są kluczowe dla: żywienia (karmy typu junior/kitten o zwiększonej gęstości energetycznej i innym profilu składników mineralnych wspierających rozwój), socjalizacji, harmonogramu szczepień i odrobaczania (wg wskazań weterynarza) oraz budowania nawyków pielęgnacyjnych (czyszczenie uszu, obcinanie pazurków, szczotkowanie).', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Aplikacja Little Friends może być dobrym dodatkowym argumentem przy obsłudze klientów z nowym szczeniakiem lub kociakiem – wartość wykraczająca poza sam produkt.', source: 'extra' },
        { text: 'Karmy typu junior/kitten różnią się od karm dla dorosłych zwierząt wyższą gęstością energetyczną i innym profilem składników mineralnych (np. wapń/fosfor), co jest istotne dla prawidłowego rozwoju układu kostnego.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Gdy klient ma nowego szczeniaka lub kociaka, warto zapytać o wiek zwierzęcia, ustalić, czy karma jest dopasowana do etapu rozwoju (junior/kitten), oraz wspomnieć o aplikacji Little Friends jako dodatkowym wsparciu w opiece (przypomnienia, porady).', source: 'extra' },
      ],
      pytania: [
        { text: 'Ile miesięcy ma szczeniak lub kociak?', source: 'extra' },
        { text: 'Czy klient ma już ustalony z weterynarzem harmonogram szczepień i odrobaczania?', source: 'extra' },
        { text: 'Czy klient korzysta już z aplikacji lub programu lojalnościowego Maxi Zoo?', source: 'extra' },
      ],
      bledy: [
        { text: 'Podawanie karmy przeznaczonej dla dorosłych zwierząt młodym szczeniakom/kociakom – niedopasowany profil energetyczny i mineralny.', source: 'extra' },
        { text: 'Brak informacji o aplikacji Little Friends przy obsłudze klientów z nowym pupilem.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Little Friends = program/aplikacja dla opiekunów szczeniąt i kociąt (przypomnienia, porady, oferty dopasowane do wieku).', source: 'training' },
        { text: 'Karmy junior/kitten mają inny profil energetyczny i mineralny niż karmy dla dorosłych zwierząt.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Dokładny zakres funkcji aplikacji Little Friends (czy jest to osobna aplikacja, czy część programu App&Friends) warto zweryfikować na bieżąco.', source: 'extra' },
      ],
    },
  },
  {
    id: 'na-co-zwrocic-uwage-obsluga',
    title: 'Na co zwrócić uwagę podczas obsługi klienta',
    category: 'Obsługa klienta i sprzedaż',
    tags: ['obsługa klienta', 'sprzedaż', 'wskazówki', 'komunikacja'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Kluczowe elementy dobrej obsługi: aktywne słuchanie potrzeb klienta, zadawanie pytań doprecyzowujących przed zaproponowaniem produktu, dopasowanie języka i tonu do klienta, dbałość o pełną informację (skład, przeciwwskazania, dawkowanie) oraz domknięcie rozmowy propozycją dodatkowych produktów (cross-/upselling) tylko wtedy, gdy jest to faktycznie uzasadnione potrzebami klienta.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Zwracanie uwagi na sygnały od klienta (np. ograniczony budżet, pierwszy raz ze zwierzęciem danego typu, problem zdrowotny zwierzęcia) pozwala lepiej dopasować ofertę i budować zaufanie.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Dobrym wzorcem rozmowy jest: najpierw zadać pytania o sytuację i potrzeby klienta i zwierzęcia, następnie zaproponować rozwiązanie wraz z pełną informacją o produkcie (w tym ewentualnych przeciwwskazaniach), a na końcu, jeśli to uzasadnione, zaproponować produkty uzupełniające.', source: 'extra' },
      ],
      pytania: [
        { text: 'Jaki jest cel zakupu i jakie są oczekiwania klienta?', source: 'extra' },
        { text: 'Czy klient ma określony budżet, o którym warto pamiętać przy doborze produktów?', source: 'extra' },
        { text: 'Czy klient jest nowym właścicielem zwierzęcia danego typu, czy ma już doświadczenie?', source: 'extra' },
      ],
      bledy: [
        { text: 'Zbyt szybkie przejście do sprzedaży konkretnego produktu bez rozpoznania potrzeb klienta.', source: 'extra' },
        { text: 'Ignorowanie sygnałów o ograniczonym budżecie klienta i proponowanie zbyt drogich produktów.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Słuchaj, pytaj, dopasuj, informuj w pełni, proponuj dodatki tylko gdy uzasadnione.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Dobra obsługa to nie tylko sprzedaż – to budowanie zaufania, które przekłada się na powroty klienta do sklepu.', source: 'extra' },
      ],
    },
  },
  {
    id: 'marka-premiere-select-gold-medica',
    title: 'PREMIERE – żywienie dopasowane do potrzeb, linia weterynaryjna SELECT GOLD MEDICA',
    category: 'Żywienie i suplementacja',
    tags: ['psy', 'koty', 'karma sucha', 'karma mokra', 'premiere', 'select gold medica', 'dieta weterynaryjna', 'marka własna'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Karmy z linii SELECT GOLD MEDICA to diety weterynaryjne – przed podaniem pupilowi tego typu karmy konieczne jest zasięgnięcie porady specjalisty (lekarza weterynarii).' },
      ],
      najwazniejsze: [
        { text: 'PREMIERE to marka karm dla psów i kotów z hasłem "Żywienie idealnie dopasowane do potrzeb Twojego pupila" – oferta podzielona na linie odpowiadające różnym potrzebom żywieniowym.', source: 'training' },
        { text: 'Linie PREMIERE dla psów: BELT MEAT (karma sucha o wysokiej zawartości mięsa), SENSITIVE (dla psów o wrażliwym układzie pokarmowym), SOFT (karma o miękkiej konsystencji) oraz MOUSSE (karma mokra w formie musu).', source: 'training' },
        { text: 'Linie PREMIERE dla kotów obejmują analogicznie karmę suchą, karmę mokrą typu MEDIKA/SOFT MOUSSE oraz dedykowane formuły smakowe (np. ragout, pasztet).', source: 'training' },
        { text: 'Hasło "100% w misce/czarce" – produkty PREMIERE komunikowane są jako zawierające tylko składniki, jakich potrzebuje pupil, bez zbędnych dodatków.', source: 'training' },
        { text: 'SELECT GOLD MEDICA – linia karm weterynaryjnych dla kotów wspomagających leczenie, opracowana z udziałem ekspertyzy weterynaryjnej i potwierdzona badaniami. Obejmuje diety specjalistyczne: dieta w cukrzycy, dieta rekonwalescencyjna, dieta w kamicy moczowej, dieta odchudzająca, dieta w chorobach nerek, dieta wątrobowa, dieta lekkostrawna, dieta hipoalergiczna.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Karmy SELECT GOLD MEDICA to przykład diet weterynaryjnych – ich zastosowanie powinno wynikać z diagnozy/zalecenia lekarza weterynarii, a nie z samodzielnego wyboru klienta na podstawie objawów.', source: 'training' },
        { text: 'Linia PREMIERE jest pozycjonowana jako oferta "dla wszystkich pupili" – dobry punkt wyjścia dla klientów szukających karmy dopasowanej do konkretnej potrzeby (np. wrażliwy żołądek – SENSITIVE), bez konieczności sięgania po dietę weterynaryjną.', source: 'extra' },
        { text: 'Przy wprowadzaniu nowej karmy (w tym diety weterynaryjnej) zmiany należy wprowadzać stopniowo, mieszając nową karmę ze starą przez kilka–kilkanaście dni, aby uniknąć problemów trawiennych.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Gdy klient pyta o różnicę między PREMIERE a SELECT GOLD MEDICA, warto wyjaśnić, że PREMIERE to karmy "dopasowane do potrzeb" dla zdrowych zwierząt (np. wrażliwy żołądek, karma w musie, wysoka zawartość mięsa), natomiast SELECT GOLD MEDICA to diety weterynaryjne wspomagające leczenie konkretnych schorzeń, które powinny być stosowane po konsultacji z lekarzem weterynarii.', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy zwierzę jest zdrowe, czy ma zdiagnozowany problem zdrowotny wymagający diety weterynaryjnej?', source: 'extra' },
        { text: 'Jeśli klient szuka diety weterynaryjnej (np. SELECT GOLD MEDICA) – czy ma zalecenie/diagnozę od lekarza weterynarii?', source: 'extra' },
        { text: 'Jaki jest główny problem/potrzeba zwierzęcia (wrażliwy żołądek, niska aktywność, preferencja konsystencji karmy)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Sprzedanie karmy z linii SELECT GOLD MEDICA klientowi bez ustalenia, czy zwierzę ma faktyczne zalecenie weterynaryjne do takiej diety.', source: 'extra' },
        { text: 'Nagła, jednorazowa zmiana karmy na nową (w tym dietę weterynaryjną) bez okresu przejściowego.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'PREMIERE = karmy "dopasowane do potrzeb" dla zdrowych zwierząt: BELT MEAT, SENSITIVE, SOFT, MOUSSE (psy) i analogiczne linie dla kotów.', source: 'training' },
        { text: 'SELECT GOLD MEDICA = diety weterynaryjne dla kotów (cukrzyca, rekonwalescencja, kamica moczowa, odchudzanie, choroby nerek, wątroba, lekkostrawna, hipoalergiczna) – wymagają konsultacji z weterynarzem.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Dokładne nazwy poszczególnych produktów w liniach PREMIERE oraz pełną listę diet SELECT GOLD MEDICA i ich dostępność dla psów (czy tylko dla kotów) warto zweryfikować na opakowaniach/w aktualnym katalogu.', source: 'extra' },
      ],
    },
  },
  {
    id: 'select-gold-medica-przeglad-diet',
    title: 'SELECT GOLD MEDICA – przegląd diet weterynaryjnych dla psów i kotów',
    category: 'Zdrowie',
    tags: ['psy', 'koty', 'dieta weterynaryjna', 'select gold medica', 'żywienie lecznicze', 'nerki', 'cukrzyca', 'wątroba', 'stawy', 'serce', 'kamica', 'hipoalergia', 'odchudzanie', 'rekonwalescencja'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Wszystkie diety SELECT GOLD MEDICA to karmy weterynaryjne wspomagające leczenie konkretnych schorzeń – każda powinna być stosowana po diagnozie i pod nadzorem lekarza weterynarii, a nie wybierana samodzielnie przez klienta na podstawie podejrzeń.' },
        { level: 'yellow', text: 'Wiele diet (np. nerkowa, moczanowa, odchudzająca) nie powinno być podawane zwierzętom rosnącym, ciężarnym lub karmiącym – sprawdź przeciwwskazania konkretnej diety przed sprzedażą.' },
      ],
      najwazniejsze: [
        { text: 'Dieta w cukrzycy (DIABETES): reguluje poziom cukru we krwi – niska zawartość łatwo przyswajalnych węglowodanów/niski indeks glikemiczny, regulacja zawartości glukozy. Przeciwwskazania: szczenięta/kocięta w okresie wzrostu, ciąża/laktacja; przy niedowadze w cukrzycy może być potrzebna inna dieta wskazana przez weterynarza.', source: 'training' },
        { text: 'Dieta na zdrowe stawy (JOINT): wspiera zdrowie stawów – zawiera glukozaminę i chondroitynę oraz naturalne kwasy tłuszczowe omega-3 (EPA/DHA) wspomagające funkcje stawów i działanie przeciwzapalne.', source: 'training' },
        { text: 'Dieta wątrobowa (LIVER): wspiera pracę wątroby – ograniczona zawartość miedzi, wysokiej jakości łatwo przyswajalne białko. Brak przeciwwskazań.', source: 'training' },
        { text: 'Dieta w chorobach nerek (RENAL / RENAL EARLY STAGE): wspomaga pracę nerek – obniżona zawartość fosforu, kontrolowana zawartość wysokiej jakości białka. Przeciwwskazania: zwierzęta rosnące, ciężarne, karmiące.', source: 'training' },
        { text: 'Dieta w kamicy moczowej (URINARY STONE / CYSTINE): pomaga zapobiegać i rozpuszczać kamienie struwitowe, kontroluje pH moczu. Przeciwwskazania: wzrost, ciąża, laktacja.', source: 'training' },
        { text: 'Dieta odchudzająca (OBESITY): niska gęstość energetyczna, wysoka zawartość błonnika wspomagająca uczucie sytości – wsparcie redukcji masy ciała. Przeciwwskazania: zwierzęta rosnące, ciężarne, karmiące, kocięta/szczenięta.', source: 'training' },
        { text: 'Dieta odchudzająca z regulacją cukrzycy (OBESITY-DIABETES): połączenie wsparcia redukcji masy ciała z regulacją poziomu glukozy we krwi – dla zwierząt z otyłością i cukrzycą jednocześnie.', source: 'training' },
        { text: 'Dieta hipoalergiczna (HYPOALLERGENIC / SKIN / PLUS): oparta na hydrolizowanym białku o niskiej masie molekularnej, ograniczająca reakcje alergiczne i wspierająca układ odpornościowy; wariant PLUS dodatkowo wzmacnia barierę skórną naturalnymi kwasami tłuszczowymi (EPA/DHA). Brak przeciwwskazań.', source: 'training' },
        { text: 'Dieta rekonwalescencyjna (CONVALESCENCE): wysoka wartość energetyczna oraz wysoka zawartość białka i tłuszczu wspomagająca odzyskiwanie sił po zabiegach, chorobie, niedożywieniu lub hospitalizacji. Przeciwwskazania: niewydolność nerek/wątroby, hiperlipidemia, ciężkie zaburzenia trawienia. Podawać do momentu odzyskania pełnej kondycji zwierzęcia.', source: 'training' },
        { text: 'Dieta lekkostrawna (GASTROINTESTINAL): receptury o wysokiej przyswajalności i niskiej zawartości tłuszczu dla zwierząt z zaburzeniami trawienia; dostępne warianty celowane: niskotłuszczowa, niskokaloryczna, niskocukrowa oraz na zaparcia (zwiększona zawartość błonnika, łagodne źródła węglowodanów, zwiększona zawartość elektrolitów kompensujących straty przy wymiotach/biegunce). Brak przeciwwskazań.', source: 'training' },
        { text: 'Dieta w chorobach serca (HEART): niska zawartość sodu, wspiera pracę serca u zwierząt z niewydolnością krążenia.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Większość diet weterynaryjnych ma jasno określone przeciwwskazania dotyczące zwierząt młodych (w okresie wzrostu) oraz ciężarnych/karmiących – wynika to z innych potrzeb żywieniowych tych grup, niezwiązanych z leczeniem konkretnej choroby.', source: 'extra' },
        { text: 'Diety "lekkostrawne" (gastrointestinal) mają kilka wariantów celowanych pod konkretny problem (niskotłuszczowa, niskokaloryczna, niskocukrowa, na zaparcia) – wybór wariantu powinien wynikać z zaleceń weterynarza, a nie tylko z nazwy "lekkostrawna".', source: 'extra' },
        { text: 'Diety łączone (np. odchudzająca + cukrzyca) są przeznaczone dla zwierząt z więcej niż jednym schorzeniem jednocześnie – to dobry przykład, dlaczego wybór diety powinien być indywidualny i konsultowany.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Gdy klient pyta, kiedy podawać pupilowi karmę weterynaryjną, warto wyjaśnić, że tego typu karmy stanowią element wsparcia/leczenia dietetycznego przy konkretnej diagnozie postawionej przez lekarza weterynarii i powinny być stosowane pod jego nadzorem – nie są przeznaczone do samodzielnego, profilaktycznego stosowania bez wskazania.', source: 'training' },
        { text: 'Gdy klient opisuje objawy (np. "mój pies dużo pije i je, ale chudnie" albo "kot ma problemy z oddawaniem moczu"), nie należy samodzielnie diagnozować i dobierać diety MEDICA – warto polecić wizytę u weterynarza, a po diagnozie pomóc w wyborze odpowiedniej diety z linii.', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy zwierzę ma diagnozę postawioną przez lekarza weterynarii i czy weterynarz zalecił konkretny typ diety?', source: 'extra' },
        { text: 'Czy zwierzę jest w okresie wzrostu, ciąży lub laktacji (istotne ze względu na przeciwwskazania wielu diet MEDICA)?', source: 'extra' },
        { text: 'Czy zwierzę ma więcej niż jedno schorzenie (np. otyłość + cukrzyca) – wtedy może być potrzebna dieta łączona.', source: 'extra' },
      ],
      bledy: [
        { text: 'Samodzielne dopasowywanie diety MEDICA na podstawie opisu objawów przez klienta, bez diagnozy weterynaryjnej.', source: 'extra' },
        { text: 'Sprzedanie diety nerkowej/odchudzającej/moczanowej szczenięciu, kociakowi lub zwierzęciu w ciąży/laktacji – większość tych diet ma takie przeciwwskazania.', source: 'extra' },
        { text: 'Mylenie wariantów diety lekkostrawnej (niskotłuszczowa/niskokaloryczna/niskocukrowa/na zaparcia) – każdy ma inny cel.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'SELECT GOLD MEDICA = linia diet weterynaryjnych: cukrzyca, stawy, wątroba, nerki, kamica moczowa, odchudzanie (+ wariant z cukrzycą), hipoalergiczna (+ PLUS), rekonwalescencyjna, lekkostrawna (4 warianty), serce.', source: 'training' },
        { text: 'Zawsze: diagnoza i zalecenie weterynarza przed sprzedażą diety MEDICA.', source: 'training' },
        { text: 'Częste przeciwwskazanie: zwierzęta rosnące, ciężarne, karmiące – sprawdź dla konkretnej diety.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Dokładną dostępność poszczególnych diet dla psów vs. kotów oraz numery wariantów/gramatury warto zweryfikować w aktualnym katalogu SELECT GOLD MEDICA.', source: 'extra' },
      ],
    },
  },
  {
    id: 'marka-select-gold-vital-health',
    title: 'SELECT GOLD – karma codzienna z formułą Vital Health',
    category: 'Żywienie i suplementacja',
    tags: ['psy', 'koty', 'karma sucha', 'karma mokra', 'select gold', 'vital health', 'marka', 'probiotyki'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'SELECT GOLD to marka karm codziennych dla psów i kotów, oparta na formule "Vital Health", z hasłem "Miłość jest warta złota".', source: 'training' },
        { text: 'Formuła Vital Health: składniki probiotyczne wspierające zdrową florę jelitową, brak dodatku cukru i soli, brak sztucznych konserwantów, barwników i substancji aromatyzujących; receptury opracowywane przy współpracy z lekarzami weterynarii i ekspertami żywienia, produkcja w Niemczech.', source: 'training' },
        { text: 'Oferta jest podzielona wg etapu życia i indywidualnych potrzeb zwierzęcia: koncepcje żywieniowe dla najmłodszych pupili (kitten/junior), karmy dla zwierząt dorosłych (adult), dla seniorów, dla zwierząt z wrażliwym układem pokarmowym oraz dla zwierząt z nadwagą.', source: 'training' },
        { text: 'Marka oferuje też pomoc w doborze karmy w formie pytań/tabel typu "Która karma jest odpowiednia dla mojego psa/kota?" – ułatwia to dopasowanie produktu do konkretnej sytuacji życiowej zwierzęcia (wiek, ciąża/laktacja, wrażliwość pokarmowa, nadwaga).', source: 'training' },
      ],
      coWiedziec: [
        { text: 'SELECT GOLD (linia podstawowa/Vital Health) to karmy dla zdrowych zwierząt na różnych etapach życia – w przeciwieństwie do SELECT GOLD MEDICA, która to linia diet weterynaryjnych dla zwierząt chorych.', source: 'extra' },
        { text: 'Argument "produkcja w Niemczech" oraz "współpraca z lekarzami weterynarii" mogą być istotne dla klientów zwracających uwagę na jakość i pochodzenie karmy.', source: 'extra' },
        { text: 'Brak dodatku cukru/soli oraz sztucznych dodatków (konserwanty, barwniki, aromaty) to dobry argument dla klientów poszukujących "czystszego" składu w karmie codziennej, ale niewymagających diety weterynaryjnej.', source: 'extra' },
      ],
      jakWytlumaczyc: [
        { text: 'Gdy klient pyta o różnicę między SELECT GOLD a SELECT GOLD MEDICA, warto wyjaśnić, że SELECT GOLD to karma codzienna dla zdrowych zwierząt na różnych etapach życia (formuła Vital Health: probiotyki, bez cukru/soli, bez sztucznych dodatków), a SELECT GOLD MEDICA to linia diet weterynaryjnych wspomagających leczenie konkretnych schorzeń, stosowanych pod nadzorem lekarza weterynarii.', source: 'extra' },
      ],
      pytania: [
        { text: 'Jaki etap życia ma zwierzę (kitten/junior, adult, senior)?', source: 'extra' },
        { text: 'Czy zwierzę ma wrażliwy układ pokarmowy lub nadwagę?', source: 'extra' },
        { text: 'Czy zwierzę jest zdrowe (SELECT GOLD), czy ma zdiagnozowane schorzenie wymagające diety weterynaryjnej (SELECT GOLD MEDICA)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Mylenie linii SELECT GOLD (karma codzienna) z SELECT GOLD MEDICA (diety weterynaryjne) – to różne linie o różnym przeznaczeniu.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'SELECT GOLD = karma codzienna, formuła Vital Health (probiotyki, bez cukru/soli/sztucznych dodatków, produkcja w Niemczech), oferta wg etapu życia i potrzeb.', source: 'training' },
        { text: 'SELECT GOLD MEDICA = diety weterynaryjne (osobna linia, osobna notatka w bazie).', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Dokładny podział wariantów (kitten/junior/adult/senior/sensitive/light) i ich dostępność dla psów i kotów warto zweryfikować w aktualnym katalogu.', source: 'extra' },
      ],
    },
  },

  {
    id: 'cykl-zycia-pchel-i-kleszczy',
    title: 'Cykl życia pcheł i kleszczy – dlaczego zwalczanie to nie jednorazowa akcja',
    category: 'Zdrowie',
    tags: ['psy', 'koty', 'pchły', 'kleszcze', 'pasożyty', 'cykl życia', 'profilaktyka', 'środowisko'],
    updated: '2026-06-15',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Sezon na kleszcze i pchły zaczyna się, gdy temperatura otoczenia trwale przekracza ok. 7°C. Od tej temperatury kleszcze stają się aktywne, a w niskich temperaturach pchły mogą wpadać w odrętwienie zimowe. Jednak w mieszkaniach z ogrzewaniem pchły mogą pozostawać aktywne cały rok.' },
      ],
      najwazniejsze: [
        { text: 'Tylko około 5% populacji pcheł wraz z jajami żyje na żywicielu (czyli na zwierzęciu). Pozostałe ~95% rozprzestrzenia się na pchły, jaja, larwy i poczwarki, które są niewidoczne w otoczeniu żywiciela – legowiskach, drapakach, jaskiniach, dywanach, kocach, ręcznikach dla psów, wycieraczkach.', source: 'training' },
        { text: 'Dlatego zwalczanie pasożytów ma realną szansę powodzenia tylko wtedy, gdy oprócz bezpośredniego leczenia zwierzęcia i stosowania środków zapobiegawczych usunie się pchły i ich stadia rozwojowe ze środowiska, w którym zwierzę żyje.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Cykl życia pchły: jajo → larwa → kokon (poczwarka) → dorosła pchła. Z jaj wykluwają się larwy pcheł, które żyją w środowisku żywiciela (np. w szczelinach podłogi lub w dywanie). W tak zwanym stadium poczwarki larwa przędzie kokon, w którym w ciągu kilku dni wyrasta na dorosłego osobnika.', source: 'training' },
        { text: 'Po uwolnieniu się z kokonu dorosła pchła poszukuje odpowiedniego żywiciela, aby rozpocząć wysysanie krwi – i cykl rozwojowy zaczyna się od początku.', source: 'training' },
        { text: 'Już po 48 godzinach od pierwszego wyssania krwi samica pchły zaczyna składać jaja. Jaja pcheł nie przyklejają się do sierści, dlatego łatwo wypadają i wypadają w całym środowisku zwierząt domowych – stąd inwazja rozprzestrzenia się tak szybko po całym domu.', source: 'training' },
        { text: 'Cykl życia kleszcza przebiega w każdej fazie rozwoju (larwa → nimfa → kleszcz dorosły, składający jaja) – w każdej z tych faz kleszcz potrzebuje odpowiedniego żywiciela, aby przejść do kolejnego etapu rozwoju.', source: 'training' },
        { text: 'Ponieważ kleszcze mogą przenosić różne patogeny, należy sprawdzać czworonogi po każdym spacerze pod kątem obecności kleszczy. Kleszcze najbardziej lubią się przyczepiać: w uszach i wokół nich, na głowie i gardle, pomiędzy łapami, między palcami łap oraz pod ogonem.', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Dałem psu/kotu krople na pchły, ale wciąż je widzę – czy produkt nie działa?" — Doradca: "Sam preparat na zwierzęciu to tylko jeden element. Aż 95% populacji pcheł – jaja, larwy i poczwarki – żyje nie na zwierzęciu, ale w jego otoczeniu: w legowisku, na dywanie, w szczelinach podłogi. Dopóki nie wyczyścimy też środowiska, nowe pchły będą się ciągle wykluwać i przeskakiwać na zwierzę."', source: 'extra' },
        { text: 'Warto też wyjaśnić klientowi, że jaja pcheł odpadają z sierści zwierzęcia w całym domu – więc nawet jeśli zwierzę rzadko wychodzi, problem i tak może dotyczyć całego mieszkania (np. po kontakcie z innym zarażonym zwierzęciem lub przeniesieniu jaj/larw na ubraniu).', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy poza zwierzęciem zauważyli Państwo pchły/swędzenie u innych domowników?', source: 'extra' },
        { text: 'Jak długo trwa problem – czy to dopiero zauważona inwazja, czy powtarzający się problem?', source: 'extra' },
        { text: 'Czy stosowali Państwo już jakieś środki na zwierzęciu, a jeśli tak – czy sprzątali też legowiska, dywany i tekstylia?', source: 'extra' },
      ],
      bledy: [
        { text: 'Traktowanie problemu pcheł/kleszczy wyłącznie jako "problemu zwierzęcia" i ignorowanie środowiska (legowisko, dywany, samochód, ulubione miejsca odpoczynku) – to najczęstsza przyczyna nawracających inwazji.', source: 'extra' },
        { text: 'Założenie, że jednorazowe podanie preparatu rozwiąże problem od razu – cykl rozwojowy pcheł trwa, więc nowe osobniki mogą wykluwać się z jaj/poczwarek jeszcze przez jakiś czas.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Tylko ~5% pcheł żyje na zwierzęciu, ~95% (jaja, larwy, poczwarki) jest w środowisku.', source: 'training' },
        { text: 'Cykl pchły: jajo → larwa → kokon/poczwarka → dorosła pchła szukająca żywiciela.', source: 'training' },
        { text: 'Samica pchły zaczyna składać jaja już 48h po pierwszym wyssaniu krwi.', source: 'training' },
        { text: 'Kleszcze lubią: uszy, głowę i gardło, między łapami i palcami łap, pod ogonem.', source: 'training' },
        { text: 'Sezon kleszczy/pcheł zaczyna się od ok. 7°C, ale w ogrzewanych domach pchły mogą być aktywne cały rok.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Skuteczne zwalczanie pasożytów = leczenie zwierzęcia + profilaktyka + odkażenie środowiska. Pominięcie jednego z tych elementów to najczęstsza przyczyna nawrotów – warto przy sprzedaży preparatu na pchły/kleszcze zawsze wspomnieć o sprzątaniu otoczenia.', source: 'extra' },
      ],
    },
  },

  {
    id: '3-kroki-zwalczania-pchel-i-kleszczy',
    title: '3 kroki przeciw pchłom i kleszczom – jak dobrać produkty',
    category: 'Zdrowie',
    tags: ['psy', 'koty', 'pchły', 'kleszcze', 'pasożyty', 'obroża', 'spot-on', 'spray', 'szampon', 'puder', 'biocydy', 'środowisko'],
    updated: '2026-06-15',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Podczas pracy z substancjami niebezpiecznymi (w tym wieloma preparatami przeciw pchłom i kleszczom) należy przestrzegać wskazówek dotyczących bezpieczeństwa i zagrożeń oraz symboli na etykiecie. Produkt należy stosować zgodnie z instrukcją użycia. Wiele produktów to biocydy – zawsze przed użyciem przeczytaj informacje na etykiecie.' },
        { level: 'yellow', text: 'W przypadku podejrzenia inwazji pasożytów zwierzę powinno najpierw zostać pokazane weterynarzowi – ważne jest ustalenie zakresu inwazji i jej leczenia, a niektóre produkty z handlu (bez recepty) różnią się skutecznością od produktów weterynaryjnych. Należy też wykluczyć choroby współistniejące.' },
      ],
      najwazniejsze: [
        { text: 'Skuteczne zwalczanie pcheł i kleszczy opiera się na 3 krokach: 1) leczenie inwazji – natychmiastowe zwalczenie pasożytów bezpośrednio na zwierzęciu, 2) środki zapobiegawcze – ochrona preparatem o długotrwałym działaniu, 3) środowisko zwierzęcia bez pasożytów – odkażenie legowisk, tekstyliów i otoczenia.', source: 'training' },
        { text: 'Krok 1 (leczenie inwazji): miejscowe zwalczenie pcheł można zrealizować za pomocą produktu przeciw kleszczom i pchłom, szamponu przeciw pchłom lub sprayu przeciw pchłom. Kleszcze usuwamy pęsetą, specjalną kartą lub haczykiem do kleszczy – chwytając możliwie blisko skóry/głowy kleszcza i wyciągając prosto, bez ściskania odwłoka. Uwaga: nie zapomnij też odrobaczyć zwierzęcia – pchły mogą być nosicielami tasiemców.', source: 'training' },
        { text: 'Krok 2 (środki zapobiegawcze): ochrona preparatem o długotrwałym działaniu – obroża przeciw pchłom/kleszczom lub krople Spot On. Wśród produktów zapobiegawczych warto rozróżniać: produkty zabijające pasożyty, repelenty (odstraszające, profilaktyczne – uwaga, repelenty często są biocydami) oraz produkty pielęgnacyjne bez insektycydów.', source: 'training' },
        { text: 'Krok 3 (środowisko bez pasożytów): w przypadku inwazji pcheł należy codziennie prać w wysokiej temperaturze odzież i tekstylia zwierzęcia, dokładnie odkurzać dywany i meble tapicerowane oraz zmywać podłogi – pamiętając też o ulubionych miejscach zwierzęcia i o samochodzie. Do odkażenia środowiska służą: spraye do otoczenia/przeciw pasożytom oraz generatory mgły, które docierają też do trudno dostępnych miejsc (uwaga: często to biocydy!).', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Spray do otoczenia / spray przeciw pchłom (kontaktowy): dostępne w handlu pojemniki ze sprayem, którym można spryskać konkretne miejsca (np. legowisko, tapicerkę). Zalety: szybkie zabijanie pasożytów, duży wybór różnych produktów. Wady: możliwa odporność pasożytów na substancję, zagrożenia dla zdrowia i reakcje alergiczne, ograniczona skuteczność w wysokiej temperaturze (powyżej 25°C działanie może być krótsze). UWAGA: niebezpieczne dla innych zwierząt domowych i osób w otoczeniu – pomieszczenie po spryskaniu należy wywietrzyć.', source: 'training' },
        { text: 'Generator mgły: urządzenie wytwarzające mgłę środka przeciw pchłom, która umieszcza substancję czynną nawet w trudno dostępnych zakamarkach mieszkania. Zalety: prosty w użyciu, efekt może działać nawet do 6 miesięcy w danym pomieszczeniu, dociera też do innych insektów. Wady: możliwa odporność pasożytów na substancję, szkodliwy dla zdrowia – podczas i krótko po użyciu należy opuścić pomieszczenie, możliwe reakcje alergiczne, ograniczona skuteczność w temperaturze powyżej 25°C. UWAGA: niebezpieczne dla innych zwierząt domowych i osób w otoczeniu.', source: 'training' },
        { text: 'Obroża przeciw pchłom i/lub kleszczom: Zalety – łatwa obsługa, długotrwała ochrona (często kilka miesięcy), cicha (w odróżnieniu od sprayu, który u niektórych zwierząt wywołuje strach), może zapobiegać inwazji, dostępna jako biocyd lub bez związków chemicznych, zwierzę wychodzące z domu nie wygląda na "bezpańskie". Wady – nie zwalcza ostro trwającej inwazji (to produkt głównie zapobiegawczy), skuteczność bywa krytykowana, możliwe skutki uboczne (np. podrażnienia skóry), u kotów wychodzących istnieje ryzyko zaczepienia obroży o przedmioty podczas wspinania.', source: 'training' },
        { text: 'Krople Spot On: roztwór nakrapia się pipetą najczęściej w okolicy karku/szyi, bezpośrednio na skórę – ilość należy dostosować do masy ciała zwierzęcia. Zalety – działają przeciw kleszczom i pchłom, niewidoczna ochrona, łatwa aplikacja, długotrwałe działanie (zwykle kilka tygodni), część preparatów znieczęca także inne insekty. Wady – to środek chemiczny, może być toksyczny przy nieprawidłowym użyciu, zwierzę nie powinno wchodzić do wody przez 3–7 dni od aplikacji, możliwe działania uboczne, częściowo krytykowana skuteczność.', source: 'training' },
        { text: 'Spray przeciw pchłom i/lub kleszczom (na zwierzęciu): sierść należy rozchylić, spryskać pod włos i dobrze nawilżyć, a następnie dokładnie wetrzeć w sierść. Zalety – natychmiastowa ochrona, dobra alternatywa dla obroży przeciw pchłom, można stosować na całej powierzchni ciała, dobry do zabiegów punktowych i odstraszania. Wady – środek może zostać wchłonięty przez skórę podczas pielęgnacji sierści i może wywoływać działania uboczne.', source: 'training' },
        { text: 'Szampon przeciw pchłom: Zalety – natychmiastowo zabija pchły i ich jaja, łatwa obsługa, dostępny szeroko, środek czyszczący, pielęgnacja i zwalczanie pasożytów w jednym kąpaniu. Wady – jest przede wszystkim odpowiedni dla zwierząt, które i tak trzeba kąpać (dlatego najczęściej dla psów), brak długotrwałego działania – po wyschnięciu sierści nie chroni przed nową inwazją.', source: 'training' },
        { text: 'Puder przeciw kleszczom i/lub pchłom: Zalety – bezgłośne dozowanie, bezwonny, działa natychmiast, możliwość dokładnego odmierzania dawki. Wady – pył może powodować problemy z oddychaniem, najlepiej stosować na zewnątrz, w miejscach osłoniętych od wiatru; bardziej odpowiedni dla psów (koty mogą spożyć puder podczas pielęgnacji); zazwyczaj traktowany bardziej jako alternatywa dla innych produktów, jeśli te nie osiągnęły pożądanego efektu.', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Co kupić, żeby raz na zawsze pozbyć się pcheł?" — Doradca: "Najlepsze efekty daje połączenie 3 kroków: najpierw szybko zwalczamy pchły na zwierzęciu (np. spray lub szampon przeciw pchłom), potem zabezpieczamy zwierzę przed nowymi pasożytami na dłużej (obroża albo krople Spot On), a na koniec odkażamy otoczenie – legowisko, dywany, samochód – sprayem do otoczenia albo generatorem mgły. Pominięcie ostatniego kroku to najczęstsza przyczyna, że pchły wracają."', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy to pierwsza inwazja, czy problem nawraca (wtedy warto bardziej zwrócić uwagę na krok 3 – środowisko)?', source: 'extra' },
        { text: 'Czy w domu są inne zwierzęta lub małe dzieci (istotne przy wyborze sprayu/generatora mgły ze względu na bezpieczeństwo)?', source: 'extra' },
        { text: 'Czy zwierzę jest często kąpane (szampon przeciw pchłom może być wtedy dobrym dodatkowym rozwiązaniem)?', source: 'extra' },
        { text: 'Czy zwierzę przebywa głównie w domu, czy często wychodzi na zewnątrz (wpływa na wybór obroży vs. spot-on oraz na ryzyko kleszczowe)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Sprzedaż tylko jednego produktu (np. tylko obroży) przy aktywnej inwazji – obroża to środek zapobiegawczy (krok 2), nie leczy bieżącej inwazji (krok 1).', source: 'extra' },
        { text: 'Brak informacji o kroku 3 (środowisko) – klient stosuje preparat na zwierzęciu, ale pchły wracają, bo jaja/larwy/poczwarki pozostają w legowisku i tekstyliach.', source: 'extra' },
        { text: 'Stosowanie sprayu do otoczenia lub generatora mgły bez wywietrzenia pomieszczenia lub w obecności innych zwierząt/osób – ryzyko podrażnień i zatruć.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: '3 kroki: 1) leczenie inwazji na zwierzęciu, 2) środki zapobiegawcze (obroża/spot-on), 3) odkażenie środowiska (pranie, odkurzanie, spray do otoczenia/generator mgły).', source: 'training' },
        { text: 'Wiele produktów przeciw pchłom/kleszczom to biocydy – stosować zgodnie z etykietą, ostrożnie wobec innych zwierząt i osób.', source: 'training' },
        { text: 'Obroża i spot-on = profilaktyka długoterminowa; szampon, spray na zwierzę i puder = szybkie zwalczenie bieżącej inwazji.', source: 'extra' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Przy sprzedaży preparatu przeciw pchłom/kleszczom warto zaproponować klientowi komplet: 1 produkt na bieżącą inwazję (krok 1), 1 produkt zapobiegawczy (krok 2) i przypomnieć o sprzątaniu środowiska (krok 3) – to realna szansa na cross-selling i jednocześnie najlepsza rada dla klienta.', source: 'extra' },
      ],
    },
  },

  {
    id: 'miski-dla-psow-i-kotow',
    title: 'Miski dla psów i kotów – wielkość, ilość i materiał',
    category: 'Żywienie i suplementacja',
    tags: ['psy', 'koty', 'miski', 'akcesoria', 'materiał', 'obsługa klienta'],
    updated: '2026-06-15',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Każdy pies i każdy kot powinien mieć przynajmniej jedną własną miskę na karmę i jedną własną miskę na wodę. W przypadku karmienia mieszanego (karma mokra i sucha), które jest częściej stosowane u kotów, zwierzę powinno mieć nawet trzecią miskę.', source: 'training' },
        { text: 'Dobór miski zależy od trzech czynników: wielkości (dopasowanej do zwierzęcia), ilości (ile misek potrzebuje zwierzę) i materiału (kwestia gustu i praktyczności).', source: 'training' },
      ],
      coWiedziec: [
        { text: 'U psów wielkość miski zależy przede wszystkim od wielkości, wagi i rasy psa – te czynniki determinują nie tylko ilość karmy, ale też ile miejsca potrzeba w misce, by pysk psa mógł się w niej swobodnie i dostatecznie szeroko otwierać. U ras z długimi uszami (np. cocker spaniel) uszy mogą wpadać do miski – istnieją specjalne miski zaprojektowane, by temu zapobiegać.', source: 'training' },
        { text: 'Jako orientacyjną miarę wielkości miski dla psa przyjmuje się ok. czterokrotną objętość karmy podawanej na jeden posiłek.', source: 'training' },
        { text: 'U kotów wybór miski zależy podobnie od wielkości i wagi, a w niewielkim stopniu od rasy. Wiele kotów woli płaskie, szerokie naczynia, które zapewniają łatwy dostęp do karmy – jeśli kot musi cały czas dotykać wąsami wysokich brzegów miski, może to mu przeszkadzać. Dlatego miski dla kotów powinny być raczej szerokie i niezbyt głębokie.', source: 'training' },
        { text: 'Ogólna zasada: każde zwierzę chętniej je z trochę większej miski niż ze zbyt małej – dotyczy to zarówno karmy, jak i wody. Miska na wodę powinna być zawsze pełna, więc nawet dla małych zwierząt nie warto kupować wyjątkowo małej miski na wodę.', source: 'training' },
        { text: 'Orientacyjnie: miski o pojemności większej niż ok. 200 ml przewidziane są zazwyczaj dla psów, mniejsze nadają się dla kotów i mniejszych psów. U kotów warto dodatkowo zwrócić uwagę na głębokość miski (patrz wyżej).', source: 'training' },
        { text: 'Materiał miski – tworzywo sztuczne: lekkie i poręczne, często z gumowym pierścieniem zapobiegającym przesuwaniu, tanie, dobre do domu, czasem w ramce melaminowej lub jako miska podwójna, przydatne w podróży.', source: 'training' },
        { text: 'Materiał miski – stal nierdzewna: bardzo higieniczna, można myć w zmywarce, łatwa do czyszczenia, duża trwałość; podobnie jak plastikowe – czasem w ramce melaminowej lub jako miska podwójna, przydatna w podróży.', source: 'training' },
        { text: 'Materiał miski – ceramika: dobrze nadaje się do mycia w zmywarce, często dostępna w różnych wzorach, najczęściej ciężka i wyposażona w antystoper na spodzie dla lepszej przyczepności.', source: 'training' },
        { text: 'Materiał miski – silikon: szczególnie lekki, niektóre modele można złożyć/zwinąć (np. linia Dogs Creek), bardzo przydatny w podróży; do tego warto polecić bidon/butelkę do picia, której wieczko może służyć jako miska/podstawka dla psa.', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Jaką miskę wybrać dla mojego psa/kota?" — Doradca: "Wielkość miski dopasowujemy do wielkości zwierzęcia i porcji – orientacyjnie miska powinna mieć ok. 4 razy więcej miejsca niż jedna porcja karmy. Dla kotów lepsze są płytsze i szersze miski, żeby wąsy nie dotykały brzegów. Materiał to już kwestia wygody – stal nierdzewna i ceramika są najbardziej higieniczne i nadają się do zmywarki, plastik i silikon są lekkie i dobre w podróży."', source: 'extra' },
      ],
      pytania: [
        { text: 'Jaka rasa, wielkość i waga zwierzęcia (oraz czy ma długie uszy)?', source: 'extra' },
        { text: 'Czy zwierzę jest karmione mieszanie (karma mokra + sucha) – wtedy warto rozważyć trzecią miskę?', source: 'extra' },
        { text: 'Czy miska będzie używana w domu, czy też w podróży/na zewnątrz (wpływa na wybór materiału – silikon, plastik składany)?', source: 'extra' },
        { text: 'Jakie są preferencje co do mycia (zmywarka) i estetyki (wzory ceramiczne, kolory)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Sprzedaż jednej, zbyt małej miski uniwersalnej "na wszystko" – zwierzę powinno mieć osobną miskę na karmę i osobną na wodę (a przy karmieniu mieszanym czasem trzecią).', source: 'extra' },
        { text: 'Polecenie głębokiej, wąskiej miski kotu, który ma problem z "wąsowym stresem" przy jedzeniu – lepsza jest miska płytka i szeroka.', source: 'extra' },
        { text: 'Nieuwzględnienie ras z długimi uszami przy doborze miski dla psa – warto zaproponować miskę z wysoką krawędzią / wąskim otworem.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Minimum: 1 miska na karmę + 1 miska na wodę dla każdego zwierzęcia; przy karmieniu mieszanym nawet 3 miski.', source: 'training' },
        { text: 'Wielkość miski dla psa ≈ 4x porcja karmy; miska na wodę zawsze powinna być pełna.', source: 'training' },
        { text: 'Koty preferują miski płytkie i szerokie (wąsy).', source: 'training' },
        { text: 'Materiały: plastik (lekki, tani), stal nierdzewna (higieniczna, do zmywarki), ceramika (estetyczna, antystoper), silikon (lekki, składany, do podróży).', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Przy sprzedaży karmy warto dopytać, czy klient ma odpowiednio dopasowane miski – to częsty, łatwy temat do cross-sellingu (np. miska z wysoką krawędzią dla psa z długimi uszami, miska antystresowa dla kota).', source: 'extra' },
      ],
    },
  },

  {
    id: 'akcesoria-do-jedzenia-i-picia',
    title: 'Akcesoria do jedzenia i picia – specjalne miski, fontanny i pojemniki na karmę',
    category: 'Żywienie i suplementacja',
    tags: ['psy', 'koty', 'miski', 'akcesoria', 'fontanna', 'pojemnik na karmę', 'obsługa klienta'],
    updated: '2026-06-15',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Podwyższona miska ("bufet") nie jest zalecana dla każdego psa – u zwierząt predysponowanych do skrętu żołądka (np. duże rasy o głębokiej klatce piersiowej) jedzenie z podwyższonej pozycji może zwiększać ryzyko tej groźnej choroby. W razie wątpliwości warto skonsultować wybór z weterynarzem.' },
      ],
      najwazniejsze: [
        { text: 'Poza standardowymi miskami na rynku dostępne są akcesoria rozwiązujące konkretne problemy: miski dla psów z długimi uszami, podwyższone "bufety", miski zapobiegające zbyt szybkiemu jedzeniu (tzw. antystresowe/lapcowaniu), miski przeciw chlapaniu, podkładki pod miski, hermetyczne pojemniki na karmę oraz fontanny do pojenia.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Miska dla psów z długimi uszami: ma bardzo wysoko umieszczoną krawędź/wąski otwór, dzięki czemu długie uszy (np. u cocker spaniela) nie wpadają do miski podczas jedzenia.', source: 'training' },
        { text: 'Bufet dla psa (podwyższona miska): podwyższona pozycja podczas jedzenia bywa polecana dla dużych psów, ponieważ ułatwia transport karmy do żołądka i może być korzystna przy niektórych problemach zdrowotnych (np. związanych z przełykiem). Z drugiej strony, dla większości psów jedzenie z podłogi jest naturalne i nie powoduje problemów – a podwyższona pozycja może u niektórych ras zwiększać ryzyko skrętu żołądka, dlatego nie jest to rozwiązanie "dla każdego".', source: 'training' },
        { text: 'Miska zapobiegająca zbyt szybkiemu jedzeniu ("antystresowa"/utrudniająca łapczywe jedzenie): ma specjalne wypustki/labirynt w misce, które zmuszają zwierzę do jedzenia wolniej, zamiast jednorazowo łapczywie pochłaniać całą porcję. Dostępna w różnych wersjach i materiałach, np. ceramicznych.', source: 'training' },
        { text: 'Miska zapobiegająca chlapaniu: zaprojektowana specjalnie do podróżowania ze zwierzętami – zmniejsza ryzyko wylewania, rozlewania i chlapania wody nawet o 90%. Kluczową rolę odgrywa umieszczona wewnątrz ruchoma płytka, która amortyzuje wstrząsy (hamowanie, zakręty, uderzenie miską o podłoże). Cztery zapięcia na rzep na spodzie miski zapewniają stabilne mocowanie na prawie każdej powierzchni, a samą miskę łatwo rozłożyć do umycia i z powrotem złożyć.', source: 'training' },
        { text: 'Podkładki pod miski: ułatwiają czyszczenie miejsca karmienia, ponieważ zatrzymują rozbryzgi wody i okruchy karmy, które normalnie zostawałyby na podłodze wokół misek.', source: 'training' },
        { text: 'Pojemnik na karmę: umożliwia hermetyczne zamknięcie suchej karmy, dzięki czemu zapobiega utracie jej wartości odżywczych i jakości (np. przez kontakt z powietrzem, wilgocią czy zapachami). Dostępne są pojemniki o różnych kształtach i wielkościach, dopasowane do różnych opakowań karmy.', source: 'training' },
        { text: 'Fontanna do pojenia: zachęca zwierzęta (zwłaszcza koty) do picia większej ilości wody, dzięki utrzymywaniu jej świeżości i ciągłemu ruchowi. Wbudowany filtr oczyszcza wodę z włosów i zanieczyszczeń – filtr należy wymieniać co kilka tygodni, a samą wodę uzupełniać/zmieniać najlepiej codziennie, żeby np. sierść nie uszkodziła pompy. Różne strumienie/poziomy wody pozwalają dopasować fontannę do preferencji konkretnego zwierzęcia.', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Mój kot pije za mało wody" — Doradca: "Koty często chętniej piją wodę, która się rusza i jest świeża – fontanna do pojenia z filtrem może realnie zwiększyć ilość wypijanej wody, co jest ważne dla profilaktyki chorób układu moczowego. Warto tylko pamiętać o regularnej wymianie filtra i wody."', source: 'extra' },
        { text: 'Klient: "Mój pies zjada całą miskę w kilka sekund" — Doradca: "To dobry moment, żeby zaproponować miskę spowalniającą jedzenie – z wypustkami utrudniającymi szybkie pochłanianie porcji. Pomaga to też zmniejszyć ryzyko przejedzenia i wzdęć."', source: 'extra' },
        { text: 'Klient: "Często podróżuję z psem/kotem i woda się wylewa" — Doradca: "Polecam miskę zapobiegającą chlapaniu – ma ruchomą płytkę amortyzującą wstrząsy i mocowanie na rzep, więc nawet podczas jazdy czy hamowania woda zostaje w misce."', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy zwierzę ma tendencję do zbyt szybkiego jedzenia / wymiotowania po posiłku?', source: 'extra' },
        { text: 'Czy zwierzę pije zbyt mało wody (zwłaszcza koty)?', source: 'extra' },
        { text: 'Czy klient często podróżuje ze zwierzęciem (przyda się miska przeciw chlapaniu)?', source: 'extra' },
        { text: 'Czy karma jest przechowywana w oryginalnym opakowaniu, czy klient chciałby pojemnik hermetyczny do jej przechowywania?', source: 'extra' },
        { text: 'Czy pies jest rasą predysponowaną do skrętu żołądka (jeśli klient pyta o "bufet"/podwyższoną miskę)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Polecanie podwyższonej miski ("bufetu") każdemu dużemu psu bez wzmianki o ryzyku skrętu żołądka u ras predysponowanych.', source: 'extra' },
        { text: 'Brak wzmianki o konieczności regularnej wymiany filtra i wody w fontannie do pojenia – bez tego fontanna może wręcz pogorszyć jakość wody.', source: 'extra' },
        { text: 'Sprzedaż miski przeciw chlapaniu jako rozwiązania na "łapczywe jedzenie" – to inny produkt (miska spowalniająca jedzenie) o innym przeznaczeniu.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Miska z wysoką krawędzią – dla psów z długimi uszami (np. cocker spaniel).', source: 'training' },
        { text: 'Bufet (podwyższona miska) – dla niektórych dużych psów, ale ryzyko skrętu żołądka u ras predysponowanych.', source: 'training' },
        { text: 'Miska spowalniająca jedzenie – wypustki/labirynt, zwalnia tempo jedzenia.', source: 'training' },
        { text: 'Miska przeciw chlapaniu – ruchoma płytka, redukcja rozlewania nawet o 90%, mocowanie na rzep, do podróży.', source: 'training' },
        { text: 'Pojemnik na karmę – hermetyczne zamknięcie, chroni wartość odżywczą i jakość karmy.', source: 'training' },
        { text: 'Fontanna do pojenia – zachęca do picia (zwłaszcza koty), filtr wymieniany co kilka tygodni, woda zmieniana najlepiej codziennie.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Te akcesoria to dobre tematy do cross-sellingu przy zakupie karmy lub miski podstawowej – warto dopytać o konkretne problemy klienta (zbyt szybkie jedzenie, mało picia, podróże, przechowywanie karmy), zamiast proponować wszystko na raz.', source: 'extra' },
      ],
    },
  },

  {
    id: 'zabawki-dla-kotow',
    title: 'Zabawki dla kotów – dlaczego są ważne i jak je dobrać',
    category: 'Koty',
    tags: ['koty', 'zabawki', 'aktywność', 'kocimiętka', 'waleriana', 'matatabi', 'obsługa klienta'],
    updated: '2026-06-15',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Koty, podobnie jak dzieci, muszą być zajęte w wystarczającym stopniu. Kot z natury bardzo lubi się bawić i tę cechę charakteru należy odpowiednio uwzględniać. Szczególnie młode kocięta lubią poszaleć na łonie natury, ale chcą mieć także w domu odpowiednie zabawki.', source: 'training' },
        { text: '5 głównych argumentów przemawiających za zakupem zabawek dla kotów: trening mózgu, ruch, relaks, wzmacnianie więzi (z opiekunem) oraz zwalczanie stresu.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Odgłosy trzasków, szelestu lub piszczenia inspirują koty i rozwijają ich zdolności motoryczne. Znudzony kot ma natomiast tendencję do zrywania tapet, drapania mebli i niszczenia innych przedmiotów – to częsty sygnał, że zwierzęciu brakuje stymulacji.', source: 'training' },
        { text: 'Wystarczająca ilość ruchu jest szczególnie ważna dla zdrowia kociąt – odpowiednie do tego celu są przede wszystkim piłki i podobne zabawki do aportowania/podawania.', source: 'training' },
        { text: 'Dla kotów zasadnicze znaczenie mają też odpowiednie zajęcia umysłowe. Dzięki odpowiednim akcesoriom można wspierać zdolności poznawcze zwierzęcia, a poprzez wspólną zabawę umacniać więź między człowiekiem a kotem.', source: 'training' },
        { text: 'Dobór zabawki wg wieku i charakteru: dla młodych i żywotnych kotów najlepsze są przede wszystkim piłki, myszki i wędki dla kotów. Powściągliwość starszych kotów i spokojniejszych ras można przezwyciężyć za pomocą artykułów stymulujących, takich jak kocimiętka lub waleriana. Zabawki rozwijające inteligencję nadają się zasadniczo do wszystkich ras kotów i grup wiekowych.', source: 'training' },
        { text: 'To, która zabawka jest najbardziej odpowiednia dla kota, zależy od różnych czynników – znaczenie mają wiek, stan zdrowia, kondycja, a także rasa. Rasy żywotne, takie jak koty syjamskie czy europejskie krótkowłose, są szczególnie ciekawe, aktywne i pełne temperamentu, dlatego ważna jest dla nich intensywna zabawa, a zabawka powinna być do tego dostosowana.', source: 'training' },
        { text: 'Nawet starsze koty potrzebują regularnej aktywności – ich ruchy stają się spokojniejsze i mniej dynamiczne niż u kociąt, ale ze względów zdrowotnych nadal ważna jest odpowiednia ilość ruchu. Kilka minut "treningu" wystarczy, bo liczy się jakość, nie czas. Koty mniej chętne do zabawy można zachęcić np. przekąską dla kotów lub zabawką z kocimiętką.', source: 'training' },
        { text: 'Zabawki z kocimiętką, walerianą lub matatabi (rośliny zawierające olejki eteryczne, na które reaguje wiele – choć nie wszystkie – koty) sprzyjają zainteresowaniu zabawą lub przytulaniem i są dobrym rozwiązaniem zarówno dla aktywnych kotów, jak i dla bardziej spokojnych "pieszczochów". Aby kot nie znudził się zbyt szybko taką zabawką, warto podawać ją do zabawy tylko kilka razy w tygodniu.', source: 'training' },
        { text: 'Nagrody po zabawie: po dłuższej grze odpowiednia nagroda w postaci ulubionej przekąski lub odmierzonej porcji suchej karmy może połączyć zabawkę z pozytywnym bodźcem. Sprytne kocięta szybko zauważają, że gonią za zabawką bez nagrody, i mogą stracić zainteresowanie – smakołyk w misce po zabawie sprawia, że kot jest zadowolony i zabawa może trwać dalej.', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Mój kot drapie meble i tapety – co robić?" — Doradca: "To często oznacza, że kotu brakuje stymulacji. Warto wprowadzić regularną, krótką zabawę – wystarczy kilka minut dziennie – z zabawką do polowania (np. wędka, myszka) i ewentualnie dodać zabawkę z kocimiętką lub walerianą dla urozmaicenia."', source: 'extra' },
        { text: 'Klient: "Mój starszy kot już się nie bawi" — Doradca: "To normalne, że starsze koty są spokojniejsze, ale nadal warto je zachęcać do krótkiej, kilkuminutowej aktywności – np. zabawką z kocimiętką albo wędką – bo to wspiera ich zdrowie i kondycję."', source: 'extra' },
      ],
      pytania: [
        { text: 'Jaki jest wiek i temperament kota – kociak/młody i żywotny, czy starszy i spokojniejszy?', source: 'extra' },
        { text: 'Czy kot ma dostęp do ogrodu/zewnętrza, czy żyje wyłącznie w mieszkaniu (wpływa na zapotrzebowanie na ruch i stymulację)?', source: 'extra' },
        { text: 'Czy kot reaguje na kocimiętkę/walerianę/matatabi (nie każdy kot reaguje tak samo)?', source: 'extra' },
        { text: 'Czy zauważają Państwo u kota objawy znudzenia (drapanie mebli, zrywanie tapet)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Sprzedaż jednej zabawki "na zawsze" bez rotacji – koty (podobnie jak np. zabawki z kocimiętką) szybko się nudzą tym samym przedmiotem, warto rotować zabawki i ograniczać dostęp do tych z roślinami stymulującymi.', source: 'extra' },
        { text: 'Ignorowanie potrzeb aktywności starszych kotów – mniejsza aktywność nie znaczy brak potrzeby ruchu.', source: 'extra' },
        { text: 'Zapominanie o nagrodzie/przysmaku po zabawie – bez pozytywnego wzmocnienia kot może szybciej stracić zainteresowanie zabawkami do polowania.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: '5 argumentów za zabawkami dla kota: trening mózgu, ruch, relaks, wzmacnianie więzi, zwalczanie stresu.', source: 'training' },
        { text: 'Młode/żywotne koty → piłki, myszki, wędki. Starsze/spokojne → kocimiętka, waleriana, matatabi. Zabawki na inteligencję → dla wszystkich.', source: 'training' },
        { text: 'Zabawki z roślinami stymulującymi (kocimiętka, waleriana, matatabi) – podawać tylko kilka razy w tygodniu, by kot się nie znudził.', source: 'training' },
        { text: 'Nagroda (przekąska/karma) po zabawie wzmacnia pozytywne skojarzenie z zabawką.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Znudzenie kota = częsta przyczyna "problemów z zachowaniem" (drapanie, zrywanie tapet) – warto to wykorzystać jako argument przy proponowaniu zabawek, nie tylko jako "dodatek", ale jako rozwiązanie konkretnego problemu klienta.', source: 'extra' },
      ],
    },
  },

  {
    id: 'zabawki-dla-psow-kategorie',
    title: 'Zabawki dla psów – 6 kategorii i system sygnalizacji POS',
    category: 'Psy',
    tags: ['psy', 'zabawki', 'aportowanie', 'inteligencja', 'żucie', 'lizanie', 'POS', 'obsługa klienta'],
    updated: '2026-06-15',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Pasty/maty do lizania bywają bogate w tłuszcz i energię – mimo że psy je uwielbiają, powinno się je podawać oszczędnie i w małych ilościach. Smakołyki i przysmaki podawane regularnie należy uwzględnić w ogólnej dawce pokarmowej zwierzęcia, aby nie przekroczyć dziennego zapotrzebowania na energię – w razie wątpliwości pomoże dietetyk weterynaryjny.' },
      ],
      najwazniejsze: [
        { text: 'Asortyment zabawek dla psów dzieli się na 6 głównych kategorii, które razem odpowiadają na potrzeby wszystkich psów: Rzucanie, Inteligencja, Żucie i szarpanie, Motywacja (piszczące), Przytulność, Lizanie.', source: 'training' },
        { text: 'System sygnalizacji POS (oznaczenia na opakowaniach zabawek) pokazuje od razu dwie informacje: dla jakiego rozmiaru psa (XS–XL) i dla jakiej intensywności żucia (delikatnie / energicznie / bardzo energicznie) zabawka jest odpowiednia.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Rzucanie: zabawki do aportowania – przeznaczone do rzucania i przynoszenia przez psa, dostępne w różnej kolorystyce i z różnych materiałów, dopasowane do warunków atmosferycznych. Odpowiednie dla zwinnych psów, które potrzebują się wybiegać. Przykłady: piłka dla psów, frisbee, linka (dummy), wyrzutnia piłek.', source: 'training' },
        { text: 'Inteligencja: zabawki rozwijające inteligencję obejmują wszystko, co zapewnia ćwiczenie zdolności umysłowych zwierzęcia – np. wypełnione przysmakami lub karmą, stanowią ekscytujące wyzwanie dla każdego psa. Zabawki te można łączyć z przysmakami/karmą, co dodatkowo wydłuża zabawę i angażuje psa.', source: 'training' },
        { text: 'Żucie i szarpanie: kategoria szczególnie odpowiednia dla psów o silnym instynkcie żucia. Żucie wspomaga pielęgnację zębów i pomaga zaspokoić naturalną potrzebę żucia – np. sznurki do aportu z naturalnego kauczuku, zabawki do żucia z kości lub przysmaki ze skóry wołowej. Przy wyborze warto zwrócić uwagę, jak intensywnie i jak długo dany pies żuje.', source: 'training' },
        { text: 'Motywacja (zabawki piszczące): odpowiednie zarówno dla dorosłych psów, jak i młodych psów i szczeniąt. Kategoria szczególnie polecana dla psów o niskiej motywacji, które niechętnie akceptują inne zabawki – wbudowane efekty dźwiękowe aktywują się, gdy pies gryzie zabawkę, co zachęca go do dłuższej zabawy.', source: 'training' },
        { text: 'Przytulność: kategoria odpowiednia dla psów, które lubią się przytulać, nosić "zdobycz" przy sobie i delikatnie ją żuć – np. rozmaite pluszaki.', source: 'training' },
        { text: 'Lizanie: lizanie wywołuje u psów uczucie szczęścia za sprawą endorfin. Realizuje się to np. za pomocą pasty lub maty do lizania, z której pies musi wydobyć smakołyk za pomocą języka. Ze względu na wysoką zawartość tłuszczu i energii w wielu pastach, należy podawać je oszczędnie i uwzględniać w dziennej dawce pokarmowej psa.', source: 'training' },
        { text: 'System sygnalizacji POS – rozmiary psów: XS (np. chihuahua), S (np. maltańczyk), M (np. border collie), L (np. duże psy rasy golden retriever, labrador), XL (np. berneński pies pasterski, bokser). Intensywność żucia: psy, które żują delikatnie / energicznie / bardzo energicznie – im intensywniej pies żuje, tym bardziej wytrzymała powinna być zabawka.', source: 'training' },
        { text: 'To, jak długo i czym lubi się bawić pies, zawsze zależy od indywidualnych preferencji danej rasy lub skłonności konkretnego psa. Niektóre psy najbardziej lubią przez cały dzień szaleć na zewnątrz, innym więcej radości sprawia tropienie i "główkowanie" (zabawki na inteligencję/węch).', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Mój pies rozgryza każdą zabawkę w kilka minut" — Doradca: "Warto sprawdzić oznaczenie POS na opakowaniu – pokazuje ono, dla jakiej intensywności żucia (delikatnie/energicznie/bardzo energicznie) i wielkości psa (XS–XL) dana zabawka jest przeznaczona. Dla psów żujących bardzo energicznie polecam kategorię \'Żucie i szarpanie\' z bardziej wytrzymałych materiałów."', source: 'extra' },
        { text: 'Klient: "Mój pies się nudzi w domu" — Doradca: "Dobrym rozwiązaniem są zabawki z kategorii \'Inteligencja\', np. wypełnione przysmakami – angażują psa umysłowo na dłużej niż zwykła zabawka do rzucania."', source: 'extra' },
      ],
      pytania: [
        { text: 'Jaki rozmiar i rasa psa (pomaga dopasować rozmiar zabawki wg systemu POS XS–XL)?', source: 'extra' },
        { text: 'Jak intensywnie pies żuje – delikatnie, energicznie czy bardzo energicznie?', source: 'extra' },
        { text: 'Czego najbardziej potrzebuje pies – ruchu na zewnątrz (Rzucanie), stymulacji umysłowej (Inteligencja), zaspokojenia instynktu żucia (Żucie i szarpanie), czy po prostu chce się przytulać (Przytulność)?', source: 'extra' },
        { text: 'Czy pies jest niezbyt zmotywowany do zabawy – wtedy warto rozważyć zabawki piszczące jako zachętę?', source: 'extra' },
      ],
      bledy: [
        { text: 'Sprzedaż zabawki przeznaczonej dla psów żujących delikatnie psu, który żuje bardzo energicznie – zabawka szybko zostanie zniszczona, a fragmenty mogą stanowić zagrożenie (ryzyko zadławienia/połknięcia).', source: 'extra' },
        { text: 'Brak uwzględnienia dziennej dawki kalorii z past/mat do lizania i przysmaków używanych w zabawkach na inteligencję – przy regularnym stosowaniu mogą znacząco zwiększać dzienne spożycie energii.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: '6 kategorii zabawek dla psów: Rzucanie, Inteligencja, Żucie i szarpanie, Motywacja (piszczące), Przytulność, Lizanie.', source: 'training' },
        { text: 'System POS na opakowaniu = rozmiar psa (XS–XL) + intensywność żucia (delikatnie/energicznie/bardzo energicznie).', source: 'training' },
        { text: 'Pasty do lizania i przysmaki z zabawek na inteligencję = kalorie, które trzeba uwzględnić w diecie psa.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Oznaczenia POS na zabawkach to praktyczne narzędzie sprzedażowe – pokazując klientowi, jak je odczytać, ułatwiamy mu samodzielny, bezpieczny wybór i budujemy zaufanie do doradcy.', source: 'extra' },
      ],
    },
  },

  {
    id: 'aktywnosc-i-potrzeby-ruchowe-zwierzat',
    title: 'Aktywność, zabawa i potrzeby ruchowe psów – ile ruchu naprawdę potrzebują',
    category: 'Psy',
    tags: ['psy', 'aktywność', 'zabawki', 'inteligencja', 'labirynt na karmę', 'zachowanie', 'obsługa klienta'],
    updated: '2026-06-15',
    sections: {
      ostrzezenia: [],
      najwazniejsze: [
        { text: 'Dzięki odpowiednim zabawkom psy klientów pozostają w dobrej formie. Psy potrzebujące dużo ruchu i ćwiczeń są szczególnie zadowolone z zabawek przeznaczonych do zabawy na zewnątrz – zwłaszcza gdy pies przebywa w mieszkaniu bez ogrodu, dłuższe spacery przeplatane zabawą stają się codzienną atrakcją. Odpowiednia ilość ruchu nie tylko sprawia psu radość, ale sprzyja zdrowiu i znacznie zmniejsza ryzyko otyłości i chorób z nią związanych.', source: 'training' },
        { text: 'Psy potrzebują przede wszystkim wyzwań, które pobudzają ich ciekawość i kreatywność. Do tego celu nadaje się zabawka rozwijająca inteligencję, nagradzająca psa smakołykiem za prawidłowe "rozwiązanie" – przykładem jest labirynt na karmę, z którego pies musi wydobyć jedzenie, np. poprzez szukanie i manipulację elementami.', source: 'training' },
      ],
      coWiedziec: [
        { text: '"Kto nie jest aktywny, ten się starzeje" – dotyczy to też psów. Młode psy chętnie dokazują i gonią za piłkami, a ruchy starszych psów stają się spokojniejsze i mniej dynamiczne. Mimo to, ze względów zdrowotnych, odpowiednia ilość ruchu jest ważna także dla starszych psów – warto zachęcać je do aktywności za pomocą odpowiednio dostosowanych zabawek.', source: 'training' },
        { text: 'Wielu właścicieli chce zapewnić psu jak najwięcej zajęć, aby się "nie nudził" – jednak nie powinniśmy przenosić naszych ludzkich potrzeb na psa. Psy śpią nawet 18 godzin na dobę (z kilkudniowymi przerwami / w kilku fazach) i dlatego stale potrzebują też fazy odpoczynku, w której mogą się zregenerować. Psy nie znają "nudy" jako ludzkiego odczucia.', source: 'training' },
        { text: 'Jeśli potrzeby psa – odpowiednia ilość ruchu na świeżym powietrzu, kontakt z innymi przedstawicielami gatunku oraz wystarczające urozmaicenie – nie są spełnione, zwierzę zwykle szuka "zajęć zastępczych", np. gryzie wszystko w domu, oddaje kał/mocz w nieodpowiednich miejscach itp. Wniosek: ważne jest zapewnienie psu możliwości zaspokajania jego naturalnych potrzeb, ale również wystarczającej ilości czasu i spokoju na sen i odpoczynek – przerwy na odpoczynek są równie ważną częścią potrzeb zwierzęcia jak aktywność.', source: 'training' },
        { text: '5 obszarów, które dobrze dobrane zabawki dla psów powinny wspierać: ruch i zdrowie, trening (umysłowy), pielęgnacja zębów i zaspokojenie instynktu gryzienia, wzmacnianie więzi (z opiekunem), relaks.', source: 'training' },
        { text: 'Prosty przykład normy aktywności (zależnej od rasy, wieku, poziomu sprawności fizycznej i indywidualnych potrzeb psa): ok. 2 godziny dziennie wysokiej aktywności fizycznej (np. jazda na rowerze, pływanie, zajęcia z agility) w połączeniu z odpowiednią ilością aktywności umysłowej (tropienie, zabawy w szukanie itp.), rozłożone na kilka sesji w ciągu dnia z przerwami pomiędzy nimi.', source: 'training' },
        { text: 'Aktywność umysłową można łączyć z aktywnością fizyczną (np. w sportach z psem) albo wykonywać niezależnie od wysiłku fizycznego – wtedy pies musi skoncentrować się umysłowo na swoim zadaniu (np. labirynt na karmę, zabawki na inteligencję). Wiele zależy od wcześniejszego treningu i przyzwyczajeń psa – zawsze warto zaczynać od małych kroków.', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Mój pies w domu gryzie meble i wszystko niszczy" — Doradca: "To często sygnał, że psu brakuje ruchu, kontaktu z innymi psami lub urozmaicenia w ciągu dnia – takie zachowania to \'zajęcia zastępcze\'. Warto zwiększyć liczbę spacerów/zabaw na zewnątrz i wprowadzić zabawki na inteligencję, np. labirynt na karmę, żeby zaspokoić potrzebę eksploracji w bezpieczny sposób."', source: 'extra' },
        { text: 'Klient: "Czuję się winny, że pies tyle śpi, gdy jestem w pracy" — Doradca: "To zupełnie normalne – psy śpią nawet do 18 godzin na dobę i potrzebują tego czasu na regenerację. Ważniejsze jest to, żeby czas, gdy pies jest aktywny, był dobrze wykorzystany – nawet krótki, intensywny spacer lub zabawa z labiryntem na karmę mogą wystarczyć."', source: 'extra' },
      ],
      pytania: [
        { text: 'Jaka rasa, wiek i poziom sprawności fizycznej psa – jakie jest jego orientacyjne dzienne zapotrzebowanie na ruch?', source: 'extra' },
        { text: 'Czy pies ma dostęp do ogrodu, czy mieszka w mieszkaniu i potrzebuje więcej zorganizowanych spacerów/zabaw?', source: 'extra' },
        { text: 'Czy zauważają Państwo u psa "zajęcia zastępcze" – nadmierne gryzienie, niszczenie przedmiotów, oddawanie kału/moczu w domu?', source: 'extra' },
        { text: 'Czy pies ma już zabawki na inteligencję (np. labirynt na karmę) – jeśli nie, to dobry temat do zaproponowania?', source: 'extra' },
      ],
      bledy: [
        { text: 'Traktowanie "zachowań zastępczych" (gryzienie, niszczenie) jako "złego charakteru" psa, bez zauważenia, że to sygnał niezaspokojonych potrzeb ruchowych/umysłowych.', source: 'extra' },
        { text: 'Przesadne dokładanie psu zajęć przez cały dzień, "żeby się nie nudził" – psy potrzebują też dużo odpoczynku (do 18h snu), nadmierna stymulacja może być przeciążająca.', source: 'extra' },
        { text: 'Ignorowanie potrzeb ruchowych starszych psów – mniejsza intensywność nie znaczy brak potrzeby ruchu i zabawy.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Niezaspokojone potrzeby (ruch, kontakt z innymi psami, urozmaicenie) → "zajęcia zastępcze" (gryzienie, niszczenie, nieczystość w domu).', source: 'training' },
        { text: 'Psy śpią nawet do 18h/dobę – odpoczynek to też ważna potrzeba, nie tylko aktywność.', source: 'training' },
        { text: 'Orientacyjna norma: ok. 2h dziennie aktywności fizycznej + aktywność umysłowa (np. labirynt na karmę, tropienie), rozłożone na kilka sesji z przerwami.', source: 'training' },
        { text: '5 obszarów wspieranych przez dobre zabawki: ruch i zdrowie, trening, pielęgnacja zębów/instynkt gryzienia, wzmacnianie więzi, relaks.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Zachowania problemowe psa (gryzienie, niszczenie, nieczystość) to częsty punkt wejścia do rozmowy o zabawkach na inteligencję i większej ilości ruchu – warto to łączyć przy obsłudze klienta, nie traktować jako odrębnych tematów.', source: 'extra' },
      ],
    },
  },

  {
    id: 'dieta-i-zywienie-krolikow',
    title: 'Dieta królika – 70% siano, 30% reszta, i czego KATEGORYCZNIE nie dawać',
    category: 'Gryzonie i ptaki',
    tags: ['króliki', 'gryzonie', 'dieta', 'siano', 'żywienie', 'warzywa', 'owoce', 'zioła'],
    updated: '2026-06-15',
    sections: {
      ostrzezenia: [
        { level: 'red', text: 'KATEGORYCZNE NIE dla niezdrowego żywienia królików! Mieszanki karmowe (kolorowe granulki) zawierają barwniki, sól, sztuczne dodatki i produkty szkodliwe dla królików: zboża, wyroby piekarnicze – w ich składzie nie ma składników bogatych we włóknik, których królik potrzebuje. Kolby, dropsy i inne "przysmaki" ze sklepów to przede wszystkim zboża, kolorowe dodatki, produkty piekarnicze i mleczarskie oraz słodkie lepiki – niczego z tego królik jeść nie powinien.' },
      ],
      najwazniejsze: [
        { text: 'Dieta królika powinna składać się w ok. 70% z siana i traw – to absolutna podstawa żywienia, zapewniająca niezbędne włókno i ścieranie stale rosnących zębów.', source: 'training' },
        { text: 'Pozostałe ok. 30% diety to: warzywa (podawane codziennie), owoce (tylko jako przysmak, 2–3 razy w tygodniu), gałązki (do gryzienia i ścierania zębów) oraz zielone i suszone zioła.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Siano i trawy (70% diety): powinny być dostępne non-stop, w nieograniczonej ilości. Siano jest kluczowe dla prawidłowej pracy przewodu pokarmowego królika i dla ścierania zębów, które rosną przez całe życie.', source: 'training' },
        { text: 'Warzywa: podawane codziennie – np. marchew, pietruszka, seler naciowy, brokuły, szpinak (w małych ilościach), papryka, koper, sałata (nie lodowa). Niektóre warzywa mogą być podawane w dużych ilościach (np. siano traw), inne z umiarem.', source: 'extra' },
        { text: 'Owoce: traktowane jako przysmak, 2–3 razy w tygodniu w małych porcjach – np. jabłko, gruszka, truskawki, maliny, jagody. Ze względu na zawartość cukru nie powinny stanowić dużej części diety.', source: 'training' },
        { text: 'Gałązki: jabłoń, grusza, leszczyna, wierzba – do gryzienia, wspomagają ścieranie zębów i zapewniają rozrywkę.', source: 'extra' },
        { text: 'Zielone i suszone zioła: np. koper, bazylia, mięta, rumianek, mniszek lekarski (mlecz), pokrzywa (suszona), babka lancetowata – mogą być podawane codziennie jako urozmaicenie diety i naturalne wsparcie zdrowia.', source: 'extra' },
        { text: 'CZEGO NIE DAWAĆ: mieszanek karmowych "kolorowych" (granulki z barwnikami, zbożami, cukrem, solą), kolb zbożowych, dropsów, chrupek, chleba/bułek/ciastek, produktów mleczarskich, czekolady, cebuli, czosnku, ziemniaków, fasoli. Wszystkie te produkty mogą powodować problemy trawienne, otyłość lub poważne choroby u królika.', source: 'training' },
        { text: 'Więcej informacji o żywieniu królików: www.kroliki.net (polecane w materiałach szkoleniowych).', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Kupuję karmę z kolorowymi granulkami, bo królik je zjada" — Doradca: "To zrozumiałe, ale niestety takie mieszanki zawierają głównie zboża, cukier, barwniki i sól – składniki, które królik nie powinien jeść. Podstawą diety królika jest siano (70%) i świeże warzywa (codziennie). Zamiast kolorowych granulek polecam dobrą karmę ziołową/sianową bez zbóż."', source: 'extra' },
        { text: 'Klient: "Królik kocha kolby i dropsy ze sklepu" — Doradca: "Kolby, dropsy i podobne \'przysmaki\' to głównie zboża, produkty piekarnicze i mleczarskie z kolorowymi dodatkami – niestety dla królika to jak fast food. Lepszym przysmakiem jest kawałek jabłka, marchewki lub suszone zioła."', source: 'extra' },
      ],
      pytania: [
        { text: 'Czym obecnie jest karmiony królik – czy ma stały dostęp do siana?', source: 'extra' },
        { text: 'Czy królik dostaje kolorowe mieszanki, kolby lub dropsy (jeśli tak – warto zaproponować stopniową zmianę diety)?', source: 'extra' },
        { text: 'Czy królik dostaje codziennie świeże warzywa i ma dostęp do gałązek do gryzienia?', source: 'extra' },
      ],
      bledy: [
        { text: 'Sprzedaż kolorowych mieszanek karmowych jako "pełnowartościowej karmy dla królika" – to produkt szkodliwy, nie powinien stanowić podstawy żywienia.', source: 'training' },
        { text: 'Polecanie kolb zbożowych i dropsów jako "przysmaków" – to odpowiedniki słodyczy i fast foodu dla królika, mogą powodować otyłość, problemy z zębami i trawienne.', source: 'training' },
        { text: 'Brak pytania o siano – jeśli klient kupuje tylko suchą karmę, warto dopytać, czy królik ma stały dostęp do siana (to 70% diety!).', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: 'Dieta królika: 70% siano i trawy (non-stop), 30% warzywa (codziennie) + owoce (2–3x/tydzień jako przysmak) + gałązki + zioła.', source: 'training' },
        { text: 'KATEGORYCZNE NIE: kolorowe mieszanki karmowe, kolby, dropsy, zboża, chleb, produkty mleczarskie, słodkie lepiki.', source: 'training' },
        { text: 'Strona www.kroliki.net – dodatkowe źródło wiedzy o żywieniu królików.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Temat "czego nie dawać królikowi" to silny argument sprzedażowy przy zamianie kolorowych mieszanek na karmę sianową/ziołową – klient doceni edukację, a sklep zwiększy sprzedaż lepszych produktów.', source: 'extra' },
      ],
    },
  },

  {
    id: 'kociak-niezbednik-i-pierwsze-kroki',
    title: 'Niezbędnik dla kociaka – co kupić, jak przygotować dom i zadbać o zdrowie',
    category: 'Koty',
    tags: ['koty', 'kociaki', 'checklist', 'niezbędnik', 'pierwsze kroki', 'szczepienia', 'bezpieczeństwo', 'kuweta', 'obsługa klienta'],
    updated: '2026-06-15',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Szczepienia ochronne kociaka powinny być rozpoczęte już od ok. 8. tygodnia życia (tzw. "program startowy"). Klient powinien skonsultować się z weterynarzem w sprawie zalecanego schematu szczepień – jest to kluczowe zwłaszcza w pierwszych miesiącach życia kociaka.' },
      ],
      najwazniejsze: [
        { text: 'Na kilka dni przed przybyciem kociaka do domu należy przygotować wszystko, co będzie potrzebne: legowisko, miski na jedzenie i wodę, kuwetę z żwirkiem i kilka zabawek. To też idealna okazja do zakupów w Maxi Zoo – klient kupuje cały zestaw startowy naraz.', source: 'training' },
        { text: 'Checklist "Niezbędnik dla kociaka" obejmuje 6 kategorii: Jedzenie i picie, Higiena i pielęgnacja, Odpoczynek i sen, Zabawa i trening, Bezpieczeństwo i podróże, Drapanie.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Jedzenie i picie: karma odpowiednia dla kociąt (kitten), miska na karmę, miska na wodę, przysmaki dla kociąt.', source: 'training' },
        { text: 'Higiena i pielęgnacja: szczotka/grzebień do sierści, środki na pchły i kleszcze (odpowiednie dla kociąt!), produkty do pielęgnacji uszu, nożyczki do pazurków, kuweta, łopatka do kuwety, żwirek.', source: 'training' },
        { text: 'Odpoczynek i sen: legowisko, koc, domek/kryjówka (kocięta potrzebują spokojnego miejsca, gdzie mogą się schować i czuć bezpiecznie).', source: 'training' },
        { text: 'Zabawa i trening: hamak na kaloryfer/parapet, wędka dla kota, zabawki interaktywne, tunel, drapak (kocięta uczą się drapania od małego – lepiej, żeby drapały drapak niż meble).', source: 'training' },
        { text: 'Bezpieczeństwo i podróże: obroża/szelki, smycz, kojec/transporter, siatka ochronna na okno lub balkon (kluczowe – kocięta są ciekawskie i mogą wypaść!), zabawki do transportera.', source: 'training' },
        { text: 'Drapanie: wieża do drapania, mata do drapania, drapak-słupek – kocięta muszą mieć miejsce do drapania od pierwszego dnia, żeby nie przyzwyczaiły się do drapania mebli.', source: 'training' },
        { text: '6 porad na dobry początek kociaka w nowym domu: 1) Pozwól kociakowi poznać nowe otoczenie we własnym tempie – nie zmuszaj go do eksploracji. 2) Wyznacz mu spokojne, ciche miejsce na start (np. jeden pokój). 3) Nie zmuszaj do kontaktu – niech kociak sam podejdzie, gdy będzie gotowy. 4) Zadbaj o prawidłowe żywienie karmą kitten. 5) Regularnie czyść kuwetę (kocięta mogą odmówić korzystania z brudnej kuwety). 6) Zabezpiecz dom – okna, balkony, kable, rośliny trujące, drobne przedmioty do połknięcia.', source: 'training' },
        { text: 'Optymalne "miejsce ustronne" (kuweta): kuwetę umieść w spokojnym, łatwo dostępnym miejscu, z dala od misek na jedzenie i wodę. Koty nie lubią załatwiać się w pobliżu miejsca, gdzie jedzą. Kuweta powinna być wystarczająco duża i czyściona regularnie – minimum raz dziennie usuwanie zbrylonych odchodów.', source: 'training' },
        { text: 'Zdrowie kociaka: szczepionki pomagają chronić kocięta przed wieloma groźnymi chorobami – program szczepień podstawowych ("program startowy") można rozpocząć już od ok. 8. tygodnia życia. Warto też zaplanować regularne wizyty kontrolne u weterynarza w pierwszych miesiącach oraz zadbać o odrobaczanie i profilaktykę przeciwpasożytniczą (odpowiednimi preparatami dla kociąt).', source: 'training' },
        { text: 'Bezpieczne dorastanie: zabezpiecz okna i balkony siatkami ochronnymi (kocięta są ciekawskie i mogą wypaść), usuń lub zabezpiecz rośliny trujące dla kotów (np. lilia, filodendron, aloes), schowaj kable elektryczne, drobne przedmioty do połknięcia (gumki, sznurki, spinacze) oraz środki chemiczne.', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Kupuję pierwszego kota – co będę potrzebować?" — Doradca: "Mam gotową checklistę – przejdźmy przez 6 kategorii: jedzenie (karma kitten + miski), higiena (kuweta, żwirek, szczotka, nożyczki do pazurków), odpoczynek (legowisko, koc), zabawa (wędka, piłki, tunel), bezpieczeństwo (transporter, siatki na okna/balkon) i koniecznie drapak – od pierwszego dnia."', source: 'extra' },
        { text: 'Klient: "Kociak się chowa i nie chce wyjść" — Doradca: "To zupełnie normalne w pierwszych dniach – kociak potrzebuje czasu, żeby oswoić się z nowym otoczeniem. Najlepiej zostawić go w jednym pokoju z legowiskiem, miskami, kuwetą i zabawką, i pozwolić mu wyjść, gdy sam będzie gotowy."', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy to pierwszy kot klienta (jeśli tak, warto przejść całą checklistę i zaoferować zestaw startowy)?', source: 'extra' },
        { text: 'Czy klient ma zabezpieczone okna i balkon siatkami ochronnymi?', source: 'extra' },
        { text: 'Czy kociak ma już wyznaczony termin wizyty u weterynarza / szczepień?', source: 'extra' },
        { text: 'W jakim wieku jest kociak i jaką karmą był dotychczas karmiony (ważne przy doborze karmy kitten)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Sprzedaż karmy "adult" dla kociaka – kocięta mają inne potrzeby żywieniowe niż dorosłe koty, potrzebują karmy "kitten" z wyższą zawartością białka i energii.', source: 'extra' },
        { text: 'Pomijanie siatek na okna/balkon w rozmowie z klientem – to najczęstsza przyczyna urazów i śmierci młodych kotów w mieszkaniach.', source: 'extra' },
        { text: 'Nieprzypomnienie o drapaku – kociak bez drapaka od pierwszego dnia szybko przyzwyczai się do drapania mebli i tapicerki.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: '6 kategorii niezbędnika: jedzenie i picie, higiena i pielęgnacja, odpoczynek i sen, zabawa i trening, bezpieczeństwo i podróże, drapanie.', source: 'training' },
        { text: '6 porad na start: pozwól poznać otoczenie we własnym tempie, spokojne miejsce na start, nie zmuszaj do kontaktu, karma kitten, czysta kuweta, zabezpiecz dom.', source: 'training' },
        { text: 'Kuweta z dala od misek, czyściona min. 1x/dzień.', source: 'training' },
        { text: 'Szczepienia od ok. 8. tygodnia życia – skierować klienta do weterynarza.', source: 'training' },
        { text: 'Siatki na okna/balkon = KONIECZNOŚĆ przy kociaku.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Klient kupujący pierwszego kota to najlepsza okazja do cross-sellingu w całym sklepie – checklist obejmuje produkty z kilku działów (karma, akcesoria, higiena, zabawki, bezpieczeństwo, drapaki). Warto przejść z klientem przez wszystkie 6 kategorii.', source: 'extra' },
      ],
    },
  },

  {
    id: 'szczeniak-niezbednik-i-pierwsze-kroki',
    title: 'Niezbędnik dla szczeniaka – checklist, pierwsze kroki, spacery, zdrowie i budowanie więzi',
    category: 'Psy',
    tags: ['psy', 'szczeniaki', 'checklist', 'niezbędnik', 'pierwsze kroki', 'szczepienia', 'spacery', 'więź', 'żywienie', 'obsługa klienta'],
    updated: '2026-06-15',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Koniecznie skontaktuj się z lekarzem weterynarii, jeśli u szczeniaka zauważysz: utratę łaknienia lub wzmożony apetyt, chudnięcie/częste wymioty/nagły przyrost masy ciała, brak wypróżnień lub biegunkę trwającą dłużej niż kilka dni, wyciek wydzieliny z nosa, zaczerwienione powieki lub oczy, uporczywy kaszel/odruch wymiotny, lub wzrost temperatury ciała powyżej 39,5°C.' },
      ],
      najwazniejsze: [
        { text: 'Checklist "Niezbędnik dla szczeniaka" obejmuje 6 kategorii: Jedzenie i picie (karma sucha i mokra dla szczeniąt, miski, przysmaki), Higiena i pielęgnacja (szczotka, podkładki higieniczne, nożyczki do pazurków, środki na pchły/kleszcze), Odpoczynek i sen (legowisko/domek, poduszka, koc), Zabawa i trening (zabawki interaktywne, gryzaki, akcesoria treningowe), Bezpieczeństwo (obroża, smycz, adresówka, akcesoria odblaskowe), Spacery i podróże (transporter, mata samochodowa, pas bezpieczeństwa, bariarka).', source: 'training' },
        { text: 'Trafiając do nowego domu, mały szczeniak musi stopniowo pogodzić się z separacją od swojej psiej rodziny – a jednocześnie zacząć od nowa budować więź emocjonalną z nowym opiekunem i resztą domowników. To kluczowy moment, który wymaga cierpliwości i odpowiedniego przygotowania.', source: 'training' },
      ],
      coWiedziec: [
        { text: '7 porad na dobry początek ze szczeniakiem: 1) Pozwól mu poznawać pomieszczenia nowego domu we własnym tempie – w pierwszych dniach unikaj zbyt wielu odwiedzin i zgiełku. 2) Maluch nie powinien spędzać samotnie pierwszych nocy. 3) Zapewnij przytulne legowisko – szczenię może potrzebować nawet do 18h snu/dobę. 4) Wykorzystuj czas na wspólną zabawę, żeby wzmacniać więź i pozbyć się nadmiaru energii. 5) Na początku podawaj karmę, którą szczeniak znał z poprzedniego domu. 6) Zadbaj o dobrą atmosferę przy pierwszym spotkaniu z innymi zwierzętami w domu. 7) Zabezpiecz dom: usuń trujące rośliny, schowaj środki czyszczące/lekarstwa/drobne elementy, sprawdź ogrodzenie i zabezpiecz oczka wodne.', source: 'training' },
        { text: 'Wspólne spacery: małego szczeniaka trzeba dość często wyprowadzać – z początku na krótki czas – zawsze po przebudzeniu lub po wspólnej zabawie. Planuj 4–5 spacerów dziennie. Pupil musi mieć też możliwość załatwiania się w nocy, gdy się obudzi. Od samego początku przed każdym wyjściem zakładaj szelki i smycz, żeby maluch przyzwyczajał się do rutyny.', source: 'training' },
        { text: 'Zdrowe żywienie szczeniąt: szczenięta rosną bardzo szybko – psy małych ras osiągają dorosłe rozmiary nawet w 8. miesiącu życia, a duże rasy dopiero ok. 2. roku życia. Maluchy mają zwiększone zapotrzebowanie na energię i składniki odżywcze, dlatego warto podawać im karmy specjalnie dla szczeniąt, dostosowane do docelowej wielkości psa i jego potrzeb żywieniowych w fazie wzrostu. Warto regularnie monitorować masę ciała i dostosowywać porcje.', source: 'training' },
        { text: 'Zdrowie pupila: regularne kontrole stanu zdrowia, rutynowe szczepienia i zabiegi przeciwpasożytnicze to dobre praktyki dające szansę na długie i zdrowe życie. Warto mieć jednego wybranego i zaufanego lekarza weterynaryjnego od samego początku.', source: 'training' },
        { text: 'Budowanie trwałej więzi: od pierwszego dnia pracuj nad nawiązaniem emocjonalnej więzi ze szczeniakiem. Podstawa to zdobycie jego zaufania oraz życzliwa konsekwencja w wychowaniu – ustal zasady i konsekwentnie je egzekwuj, bez stosowania jakiejkolwiek przemocy. Pracę nad więzią zacznij od wspólnych ćwiczeń i zabaw, nagradzając pupila smakołykiem lub pochwałą – w ten sposób uczysz psa koncentrować uwagę na Tobie.', source: 'training' },
        { text: '3 zasady budowania silnej więzi: 1) Spędzaj ze szczeniakiem jak najwięcej czasu – jeśli to możliwe, zaplanuj urlop na pierwsze tygodnie; na samym początku szczeniaka nie wolno zostawiać bez opieki. 2) Bądź konsekwentny i pewny siebie – pies oczekuje klarownych zasad; ani nadmierny rygor, ani zbytnia pobłażliwość nie budują zaufania. 3) Z radością i spokojem towarzysz pupilowi w odkrywaniu świata – niech każda wspólna aktywność umacnia więź między Wami.', source: 'training' },
        { text: 'Połączenie aktywności zawodowej z posiadaniem psa jest jak najbardziej możliwe, o ile uda się zorganizować odpowiednią opiekę. Nie warto jednak robić tego ani zbyt wcześnie, ani zbyt często – pierwsze tygodnie są kluczowe dla zbudowania trwałej więzi z pupilem.', source: 'training' },
      ],
      jakWytlumaczyc: [
        { text: 'Klient: "Kupuję pierwszego psa – szczeniaka. Co będę potrzebować?" — Doradca: "Mam gotową checklistę! Przejdźmy przez 6 kategorii: karma junior/puppy + miski, higiena (podkładki, szczotka, nożyczki do pazurków), legowisko i koc, zabawki i gryzaki, obroża/szelki/smycz z adresówką i odblaskami, oraz akcesoria do podróży (transporter lub mata samochodowa). Przede wszystkim pamiętaj: pierwsze dni to karmienie tym, co szczeniak już znał, cierpliwość i dużo wspólnego czasu."', source: 'extra' },
        { text: 'Klient: "Jak często mam wyprowadzać szczeniaka?" — Doradca: "Na początku 4–5 razy dziennie, na krótkie spacery – zawsze po przebudzeniu i po zabawie. W nocy też dawaj mu możliwość wyjścia, gdy się obudzi. Z czasem spacery będą dłuższe, a częstotliwość mniejsza."', source: 'extra' },
      ],
      pytania: [
        { text: 'Czy to pierwszy pies klienta (pełna checklist + porady na start)?', source: 'extra' },
        { text: 'Jaką karmą szczeniak był dotychczas karmiony w hodowli/schronisku (na początku kontynuować tę samą)?', source: 'extra' },
        { text: 'Jaka rasa i docelowy rozmiar psa (wpływa na dobór karmy junior, rozmiaru szelek/obroży, legowiska)?', source: 'extra' },
        { text: 'Czy klient ma inne zwierzęta w domu (ważne przy planowaniu pierwszego spotkania)?', source: 'extra' },
        { text: 'Czy klient planuje podróżować ze szczeniakiem samochodem (transporter, mata, pas bezpieczeństwa)?', source: 'extra' },
      ],
      bledy: [
        { text: 'Sprzedaż karmy "adult" szczeniakowi – szczenięta mają inne potrzeby żywieniowe (więcej energii, białka, składników odżywczych) i potrzebują karmy "puppy/junior" dostosowanej do ich docelowej wielkości.', source: 'extra' },
        { text: 'Pominięcie podkładek higienicznych w zestawie startowym – szczeniaki uczą się czystości i na początku potrzebują podkładek w domu.', source: 'extra' },
        { text: 'Brak pytania o bezpieczeństwo w domu – trujące rośliny, otwarte oczka wodne, drobne elementy do połknięcia to realne zagrożenia dla szczeniaka.', source: 'extra' },
        { text: 'Doradzanie zbyt długich, intensywnych spacerów na początku – młody szczeniak potrzebuje krótkich, częstych wyjść, nie jednego długiego marszu.', source: 'extra' },
      ],
      dodatkowe: [],
      powtorka: [
        { text: '6 kategorii niezbędnika: jedzenie, higiena, odpoczynek, zabawa/trening, bezpieczeństwo, spacery/podróże.', source: 'training' },
        { text: '7 porad na start: poznawanie domu we własnym tempie, nie samotne noce, legowisko i do 18h snu, wspólna zabawa, kontynuacja znanej karmy, spokojne spotkanie z innymi zwierzętami, zabezpieczenie domu.', source: 'training' },
        { text: 'Spacery: 4–5x dziennie, krótkie, po przebudzeniu i po zabawie; w nocy też umożliwić wyjście.', source: 'training' },
        { text: 'Budowanie więzi: konsekwencja bez przemocy, wspólny czas, nagrody za pożądane zachowania, nie zostawiać bez opieki w pierwszych tygodniach.', source: 'training' },
        { text: 'Objawy wymagające wizyty u weterynarza: utrata apetytu, wymioty, biegunka >kilka dni, wyciek z nosa/oczu, kaszel, temp. >39,5°C.', source: 'training' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Klient kupujący pierwszego szczeniaka to najlepsza okazja do cross-sellingu w całym sklepie – checklist obejmuje produkty z kilku działów (karma puppy/junior, miski, legowisko, zabawki/gryzaki, obroża/szelki/smycz, podkładki, transporter). Warto przejść z klientem przez wszystkie kategorie i pomóc skompletować pełny zestaw startowy.', source: 'extra' },
      ],
    },
  },
];
