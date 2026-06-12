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
];
