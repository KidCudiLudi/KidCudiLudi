export default function RegulaminPage() {
  return (
    <div className="bg-[#FDF9F6] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#F5EDE8] shadow-sm p-8 lg:p-12">
          <h1 className="font-display text-3xl font-bold text-[#3D2B1F] mb-2">Regulamin</h1>
          <p className="text-[#8B6F5E] mb-8">Obowiązuje od: 1 stycznia 2024 · Zaplątane Studio</p>

          <div className="space-y-8 text-sm text-[#8B6F5E] leading-relaxed">

            <section>
              <h2 className="font-display text-xl font-bold text-[#3D2B1F] mb-4">§1. Postanowienia ogólne</h2>
              <p>Niniejszy Regulamin określa zasady korzystania z usług świadczonych przez Zaplątane Studio z siedzibą we Wrocławiu. Właścicielem i operatorem jest indywidualny przedsiębiorca prowadzący działalność pod nazwą Zaplątane Studio.</p>
              <p className="mt-2">Korzystanie z usług Zaplątane Studio oznacza akceptację niniejszego Regulaminu.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#3D2B1F] mb-4">§2. Rezerwacja wizyty</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Rezerwacji wizyty można dokonać poprzez formularz online dostępny na stronie internetowej, telefonicznie lub przez media społecznościowe.</li>
                <li>Rezerwacja jest ważna po wpłaceniu zadatku w wysokości <strong className="text-[#D4726A]">100 zł</strong>.</li>
                <li>Potwierdzenie rezerwacji zostaje przesłane na adres e-mail podany podczas rezerwacji.</li>
                <li>W przypadku braku płatności w ciągu 24 godzin od dokonania rezerwacji, termin zostaje automatycznie zwolniony.</li>
                <li>Klientka zobowiązana jest do przybycia na wizytę punktualnie. Spóźnienie powyżej 15 minut może skutkować skróceniem usługi lub anulowaniem wizyty bez zwrotu zadatku.</li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#3D2B1F] mb-4">§3. Zadatek — zasady i zwroty</h2>
              <div className="bg-[#FDF9F6] border border-[#E8D5C4] rounded-2xl p-5">
                <p className="font-semibold text-[#3D2B1F] mb-3">⚠️ Ważne informacje o zadatku:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li><strong className="text-[#3D2B1F]">Zadatek w wysokości 100 zł jest bezzwrotny</strong> w przypadku anulowania wizyty przez Klientkę.</li>
                  <li>Zadatek jest bezzwrotny w przypadku niestawienia się na umówioną wizytę bez wcześniejszego poinformowania.</li>
                  <li>Przełożenie wizyty jest możliwe jednorazowo, nie później niż 48 godzin przed umówionym terminem — zadatek zostaje przeniesiony na nowy termin.</li>
                  <li>W przypadku anulowania wizyty przez Zaplątane Studio z przyczyn leżących po stronie Studia, zadatek zostaje zwrócony w całości w ciągu 5 dni roboczych.</li>
                  <li>Pozostała kwota za usługę jest płatna gotówką lub kartą w dniu wizyty.</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#3D2B1F] mb-4">§4. Sklep internetowy — sprzedaż produktów</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Zamówienia są realizowane w ciągu 2–5 dni roboczych od zaksięgowania płatności.</li>
                <li>Klient ma prawo odstąpić od umowy w ciągu 14 dni od otrzymania zamówienia, zgodnie z ustawą o prawach konsumenta.</li>
                <li><strong className="text-[#3D2B1F]">Prawo odstąpienia od umowy nie przysługuje</strong> w przypadku produktów wykonanych na indywidualne zamówienie Klienta (personalizowane zestawy, własne kolory, itp.).</li>
                <li><strong className="text-[#3D2B1F]">Produkty higieniczne</strong> (akcesoria do włosów, kucyki syntetyczne, rozszerzenia włosów) <strong className="text-[#3D2B1F]">nie podlegają zwrotowi</strong> po rozpakowaniu, ze względów higienicznych, zgodnie z art. 38 pkt 5 ustawy o prawach konsumenta.</li>
                <li>Ebooki (produkty cyfrowe) nie podlegają zwrotowi po pobraniu lub otwarciu pliku.</li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#3D2B1F] mb-4">§5. Reklamacje</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Reklamacje dotyczące produktów uszkodzonych mechanicznie podczas transportu należy zgłosić w ciągu 48 godzin od otrzymania paczki, dołączając zdjęcia uszkodzeń i opakowania.</li>
                <li>Reklamacje dotyczące usług (fryzury) należy zgłosić w ciągu 7 dni od wizyty, przesyłając zdjęcia dokumentujące niezgodność z ustaleniami.</li>
                <li>Reklamacje należy składać e-mailowo na adres: zaplatane.studio@gmail.com</li>
                <li>Reklamacja zostanie rozpatrzona w ciągu 14 dni roboczych od jej złożenia.</li>
                <li>W przypadku uzasadnionej reklamacji, Zaplątane Studio zaproponuje naprawę usługi, wymianę produktu lub zwrot środków.</li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#3D2B1F] mb-4">§6. Klub Zaplątanych — zasady programu lojalnościowego</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Program lojalnościowy &ldquo;Klub Zaplątanych&rdquo; jest dostępny dla zarejestrowanych użytkowników.</li>
                <li>Punkty Renomy i Sploty nie mają wartości pieniężnej i nie mogą być wymienione na gotówkę.</li>
                <li>Zaplątane Studio zastrzega sobie prawo do modyfikacji zasad programu lojalnościowego z 30-dniowym wyprzedzeniem.</li>
                <li>Konto Klientki może zostać zawieszone w przypadku naruszenia Regulaminu — wówczas punkty zostają anulowane bez prawa do odszkodowania.</li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#3D2B1F] mb-4">§7. Polityka prywatności i RODO</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Administratorem danych osobowych jest właścicielka Zaplątane Studio, z siedzibą we Wrocławiu.</li>
                <li>Dane osobowe Klientek (imię, nazwisko, adres e-mail, numer telefonu) są przetwarzane w celu realizacji usług, obsługi zamówień oraz komunikacji marketingowej (za zgodą).</li>
                <li>Dane nie są przekazywane podmiotom trzecim, z wyjątkiem firm kurierskich (w zakresie niezbędnym do dostawy) i operatorów płatności (Stripe).</li>
                <li>Klientka ma prawo do dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania oraz przenoszenia danych.</li>
                <li>Klientka ma prawo wnieść sprzeciw wobec przetwarzania danych w celach marketingowych.</li>
                <li>Dane osobowe są przechowywane przez okres świadczenia usług i 5 lat po ich zakończeniu, na potrzeby rozliczeń podatkowych.</li>
                <li>Wszelkie pytania dotyczące danych osobowych prosimy kierować na adres: zaplatane.studio@gmail.com</li>
                <li>Klientka ma prawo wnieść skargę do Urzędu Ochrony Danych Osobowych (UODO).</li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#3D2B1F] mb-4">§8. Pliki cookies</h2>
              <p>Strona internetowa Zaplątane Studio używa plików cookies w celu prawidłowego działania serwisu, zapamiętywania preferencji użytkownika oraz analizy ruchu (Google Analytics). Korzystanie ze strony oznacza zgodę na używanie plików cookies. Można je wyłączyć w ustawieniach przeglądarki.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#3D2B1F] mb-4">§9. Postanowienia końcowe</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Zaplątane Studio zastrzega sobie prawo do zmiany Regulaminu. O zmianach Klientki będą informowane e-mailem z 14-dniowym wyprzedzeniem.</li>
                <li>W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy Kodeksu Cywilnego oraz ustawy o prawach konsumenta.</li>
                <li>Ewentualne spory będą rozstrzygane przez sąd właściwy dla siedziby Zaplątane Studio lub przez sąd właściwy dla miejsca zamieszkania Konsumenta.</li>
              </ol>
            </section>

          </div>

          <div className="mt-12 border-t border-[#F5EDE8] pt-8 flex flex-wrap gap-4 justify-between items-center">
            <p className="text-xs text-[#C9A96E]">© 2024 Zaplątane Studio · Wrocław</p>
            <div className="flex gap-4 text-xs text-[#8B6F5E]">
              <span>zaplatane.studio@gmail.com</span>
              <span>+48 123 456 789</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
