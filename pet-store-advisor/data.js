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
    tags: ['psy', 'koty', 'pasożyty', 'pchły', 'kleszcze', 'wszy', 'fipronil', 'frontline', 'karta produktu', 'OTC'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Zawsze dopasuj wariant produktu (Spot-On / Combo / Spray) do gatunku (pies/kot) i sprawdź minimalny wiek/wagę na etykiecie konkretnego opakowania – różne warianty mają różne zakresy.' },
        { level: 'yellow', text: 'Po aplikacji spot-on nie kąpać zwierzęcia przez czas wskazany na etykiecie (zwykle kilka dni) – kąpiel zmniejsza skuteczność.' },
      ],
      najwazniejsze: [
        { text: 'Frontline to linia preparatów na bazie fipronilu do zwalczania pcheł, kleszczy i wszy u psów i kotów. Dostępna w wariantach: Spot-On (krople), Combo (krople + regulator rozwoju insektów), Spray.', source: 'training' },
        { text: 'Frontline Spot-On dla psa: zwalcza pchły i kleszcze ok. 5 tygodni, wszy do 63 dni. Frontline Spot-On dla kota: pchły i kleszcze do 4 tygodni, wszy do 42 dni.', source: 'training' },
        { text: 'Frontline Combo (pies/kot): substancja czynna fipronil + (S)-metopren – dodatkowo przerywa cykl rozwoju pcheł w środowisku (jaja, larwy), efekt do ok. 8 tygodni.', source: 'training' },
        { text: 'Frontline Spray (pies i kot): substancja czynna fipronil, ochrona przed pchłami i kleszczami do 60 dni. Dawkowanie ok. 3–6 ml/kg (orientacyjnie ok. 6–8 pompek na kota).', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Dawkowanie kropli dla psów podzielone jest na przedziały wagowe (orientacyjnie: 2–10 kg, 10–20 kg, 20–40 kg, 40–60 kg) – każdy przedział to inna pipeta.', source: 'training' },
        { text: 'Dawkowanie dla kotów Frontline Spot-On/Combo: zwykle jeden rozmiar pipety, od 8. tygodnia życia i min. 1 kg wagi.', source: 'training' },
        { text: 'Combo to "Spot-On plus" – dodatkowy składnik (metopren) działa na jaja i larwy pcheł w otoczeniu zwierzęcia (legowisko, dom), co realnie ogranicza nawroty inwazji.', source: 'extra' },
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
      ],
      dodatkowe: [
        { text: 'Fipronil (Frontline) to inny mechanizm działania niż permetryna (np. Advantix) – produkty na bazie fipronilu są generalnie uznawane za bezpieczniejsze przy ewentualnym kontakcie pies–kot, ale zawsze trzeba stosować wariant zarejestrowany dla danego gatunku.', source: 'extra' },
      ],
      powtorka: [
        { text: 'Frontline = fipronil (+ metopren w Combo).', source: 'training' },
        { text: 'Spot-On – krople na pchły/kleszcze/wszy. Combo – Spot-On + działanie na jaja/larwy pcheł w domu. Spray – do 60 dni ochrony, dla psów i kotów.', source: 'training' },
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
          'Substancja czynna: fipronil (działanie owadobójcze i roztoczobójcze); w Combo dodatkowo (S)-metopren',
          'Spot-On dla psa: pchły/kleszcze ok. 5 tygodni, wszy do 63 dni',
          'Spot-On dla kota: pchły i kleszcze do 4 tygodni, wszy do 42 dni',
          'Combo: dodatkowo przerywa rozwój pcheł w środowisku (jaja/larwy) do ok. 8 tygodni',
          'Spray: ochrona do 60 dni, dawkowanie ok. 3–6 ml/kg',
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
        { text: 'Advantix to preparat spot-on dla psów na bazie imidaklopridu (działanie na pchły) i permetryny (działanie na kleszcze, komary, muchy, działanie repelentne).', source: 'training' },
        { text: 'Ochrona przed pchłami i komarami ok. 4 tygodnie, przed kleszczami ok. 4 tygodnie. Dawkowanie wg przedziałów wagowych psa.', source: 'training' },
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
    tags: ['psy', 'koty', 'pasożyty', 'pchły', 'kleszcze', 'tabletki', 'frontpro', 'adtab', 'afoksolaner', 'izoksazolina', 'karta produktu'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Nie stosować u szczeniąt/kociąt poniżej minimalnego wieku i wagi z etykiety (orientacyjnie: Frontpro i AdTab Pies – poniżej 8. tyg. życia / poniżej 1,3 kg; AdTab Kot – poniżej 8. tyg. życia / poniżej 1,2 kg).' },
        { level: 'yellow', text: 'AdTab Pies i AdTab Kot mają różne substancje/dawki dostosowane do gatunku – nie zamieniać między psem a kotem.' },
      ],
      najwazniejsze: [
        { text: 'Tabletki przeciw pchłom i kleszczom działają systemowo – pasożyt musi ukłuć zwierzę, aby preparat zadziałał.', source: 'extra' },
        { text: 'Frontpro (dla psów): substancja czynna afoksolaner. Działanie: zwalcza kleszcze do 5 tygodni, pchły do 4–5 tygodni. Dawkowanie wg przedziałów wagowych (orientacyjnie: 2–4 kg, 4–10 kg, 10–25 kg, 25–50 kg).', source: 'training' },
        { text: 'AdTab Pies: substancja czynna izoksazolina. Działanie: zwalcza pchły i kleszcze do 4 tygodni. Dawkowanie wg przedziałów wagowych (orientacyjnie: 1,3–2,5 kg, 5,1–12 kg, 12–25 kg, 25–50 kg).', source: 'training' },
        { text: 'AdTab Kot: substancja czynna izoksazolina. Działanie: zwalcza pchły i kleszcze do 4 tygodni. Można podać z karmą lub bez.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Tabletki to dobre rozwiązanie dla zwierząt, które często się kąpią/pływają, nie tolerują aplikacji na skórę lub żyją z małymi dziećmi (brak substancji na sierści do "rozsmarowania").', source: 'extra' },
        { text: 'AdTab to jedna z niewielu linii tabletek dostępnych zarówno dla psów, jak i kotów – ale w wersjach gatunkowo-specyficznych (różne dawki/postaci), nie wolno ich zamieniać.', source: 'extra' },
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
        { text: 'Foresto (dla kota i psa): substancja czynna imidaklopryd + flumetryna – działanie bójcze i odstraszające. Ochrona przed pchłami i kleszczami do 8 miesięcy.', source: 'training' },
        { text: 'Kiltix (dla psa): substancja czynna propoksur + flumetryna. Ochrona przed kleszczami i pchłami do 7 miesięcy, działanie odstraszające.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Obroże to forma o najdłuższym czasie działania (7–8 miesięcy) – dobra opcja dla klientów, którzy nie chcą pamiętać o regularnych aplikacjach.', source: 'extra' },
        { text: 'Foresto jest dostępna w wersji dla psów i dla kotów (różne rozmiary/dawki) – Kiltix jest przeznaczony tylko dla psów.', source: 'training' },
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
          'Gatunek i rozmiar obroży',
          'Czy zwierzę nie ma już innego preparatu przeciwpasożytniczego z tej samej grupy substancji',
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
    tags: ['psy', 'koty', 'pasożyty', 'odrobaczanie', 'glisty', 'tasiemiec', 'drontal', 'prinpet', 'szczenięta', 'kocięta'],
    updated: '2026-06-14',
    sections: {
      ostrzezenia: [
        { level: 'yellow', text: 'Odrobaczanie (pasożyty wewnętrzne) i ochrona przed pchłami/kleszczami (pasożyty zewnętrzne) to dwie różne sprawy – klient często potrzebuje obu, ale to są inne produkty.' },
        { level: 'yellow', text: 'Zawsze sprawdzaj minimalny wiek i wagę zwierzęcia – preparaty dla szczeniąt/kociąt mają inne dawkowanie niż dla zwierząt dorosłych.' },
      ],
      najwazniejsze: [
        { text: 'Drontal dla psów: tabletki odrobaczające podawane doustnie. Można stosować od 2.–3. tygodnia życia (w zależności od wariantu produktu – sprawdź konkretne opakowanie). 2 szt. w opakowaniu, dawkowanie wg wagi.', source: 'training' },
        { text: 'Drontal dla kotów: tabletki odrobaczające, od 6. tygodnia życia i min. 1 kg wagi. Dawkowanie: 1 tabletka na 4 kg masy ciała.', source: 'training' },
        { text: 'Prinpet: preparat w formie kropli/pasty dla kociąt, bezpieczny od 6. tygodnia życia. Dobra alternatywa dla małych kociąt, które mają trudności z połknięciem tabletki. 2 szt. w opakowaniu.', source: 'training' },
        { text: 'Hipra: lek przeciwpasożytniczy dla psów w formie tabletek, 2 szt. w opakowaniu.', source: 'training' },
      ],
      coWiedziec: [
        { text: 'Standardowy schemat odrobaczania (wiedza ogólna, zawsze warto polecić konsultację z weterynarzem przy ustalaniu harmonogramu): szczenięta/kocięta odrobaca się częściej, np. co 2 tygodnie do ok. 3. miesiąca życia, później co 1–3 miesiące u młodych zwierząt, a u zdrowych dorosłych zwykle co 3 miesiące (częściej u zwierząt polujących/wychodzących).', source: 'extra' },
        { text: 'Prinpet w formie kropli/pasty jest łatwiejszy do podania małym kociętom niż tabletka – dobra propozycja, gdy klient zgłasza trudności z podaniem tabletki.', source: 'training' },
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
        { text: 'Drontal (pies) – tabletki, od 2.–3. tyg. życia, dawkowanie wg wagi.', source: 'training' },
        { text: 'Drontal (kot) – tabletki, od 6. tyg. życia i 1 kg wagi, 1 tabl./4 kg.', source: 'training' },
        { text: 'Prinpet – krople/pasta dla małych kociąt od 6. tyg. życia – łatwiejsze podanie niż tabletka.', source: 'training' },
        { text: 'Odrobaczanie ≠ ochrona przed pchłami/kleszczami – to dwa różne tematy profilaktyki.', source: 'extra' },
      ],
      kartaProduktu: null,
      zapamietaj: [
        { text: 'Odrobaczanie wewnętrzne i ochrona przed pchłami/kleszczami (zewnętrzne) to DWIE różne rzeczy – klient może potrzebować obu produktów.', source: 'extra' },
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
];
