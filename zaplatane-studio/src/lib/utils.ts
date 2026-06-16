export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export const CLUB_LEVELS = [
  { name: 'NUDE', minRenoma: 0, color: '#E8D5C4', emoji: '🤍' },
  { name: 'BLUSH', minRenoma: 200, color: '#F5C6C0', emoji: '🌸' },
  { name: 'ROSE', minRenoma: 500, color: '#D4726A', emoji: '🌹' },
  { name: 'PEARL', minRenoma: 1000, color: '#E8E4E0', emoji: '🤍' },
  { name: 'SATIN', minRenoma: 1800, color: '#C4B5A0', emoji: '✨' },
  { name: 'VELVET', minRenoma: 3000, color: '#8B5E6E', emoji: '💜' },
  { name: 'GOLDEN', minRenoma: 5000, color: '#C9A96E', emoji: '⭐' },
  { name: 'DIAMOND', minRenoma: 8000, color: '#A8D4E6', emoji: '💎' },
  { name: 'SIGNATURE', minRenoma: 12000, color: '#2D2D2D', emoji: '🖤' },
  { name: 'ELITE', minRenoma: 20000, color: '#C9A96E', emoji: '👑' },
];

export const HAIR_STYLES = [
  { id: '1', name: 'Knotless Braids', slug: 'knotless-braids', price: 400, duration: '4-6h', wearTime: '6-8 tygodni', difficulty: 'Średni', category: 'braids', isBestseller: true, isNew: false },
  { id: '2', name: 'Boho Braids', slug: 'boho-braids', price: 450, duration: '3-5h', wearTime: '4-6 tygodni', difficulty: 'Średni', category: 'braids', isBestseller: true, isNew: false },
  { id: '3', name: 'Stitch Braids', slug: 'stitch-braids', price: 380, duration: '3-4h', wearTime: '4-6 tygodni', difficulty: 'Łatwy', category: 'braids', isBestseller: false, isNew: true },
  { id: '4', name: 'Ponytail Braids', slug: 'ponytail-braids', price: 300, duration: '2-3h', wearTime: '3-4 tygodnie', difficulty: 'Łatwy', category: 'ponytails', isBestseller: false, isNew: false },
  { id: '5', name: 'Box Braids', slug: 'box-braids', price: 350, duration: '5-7h', wearTime: '6-8 tygodni', difficulty: 'Łatwy', category: 'braids', isBestseller: false, isNew: false },
  { id: '6', name: 'Cornrows', slug: 'cornrows', price: 280, duration: '2-4h', wearTime: '3-4 tygodnie', difficulty: 'Łatwy', category: 'braids', isBestseller: false, isNew: false },
  { id: '7', name: 'Goddess Braids', slug: 'goddess-braids', price: 400, duration: '4-5h', wearTime: '4-6 tygodni', difficulty: 'Trudny', category: 'braids', isBestseller: false, isNew: true },
  { id: '8', name: 'Fulani Braids', slug: 'fulani-braids', price: 420, duration: '4-6h', wearTime: '5-7 tygodni', difficulty: 'Trudny', category: 'braids', isBestseller: false, isNew: false },
];

export const PRODUCTS = [
  { id: '1', name: 'Set Premium Rose Collection', price: 249, category: 'sety', slug: 'set-premium-rose' },
  { id: '2', name: 'Ponytail Ombre Burgundy', price: 89, category: 'ponytaile', slug: 'ponytail-ombre-burgundy' },
  { id: '3', name: 'Akcesoria Premium Gold', price: 45, category: 'akcesoria', slug: 'akcesoria-premium-gold' },
  { id: '4', name: 'Ebook: Pielęgnacja Warkocza', price: 29, category: 'ebooki', slug: 'ebook-pielegacja-warkocza' },
  { id: '5', name: 'Set Wielorazowy Nude', price: 189, category: 'sety', slug: 'set-wielorazowy-nude' },
  { id: '6', name: 'Ebook: Stylizacje na każdą okazję', price: 39, category: 'ebooki', slug: 'ebook-stylizacje' },
];

export const TESTIMONIALS = [
  {
    name: 'Klaudia M.',
    rating: 5,
    text: 'Najlepsze warkocze jakie miałam! Piękne, lekko i z ogromną dbałością o detail. Wróce na pewno!',
    date: '2024-03-15',
  },
  {
    name: 'Martyna K.',
    rating: 5,
    text: 'Atmosfera, profesjonalizm i efekt końcowy na 5+! Zawsze wracam z uśmiechem na twarzy.',
    date: '2024-03-10',
  },
  {
    name: 'Natalia W.',
    rating: 5,
    text: 'Włosy trzymają się świetnie, a do tego tyle komplementów! Polecam z całego serca!',
    date: '2024-03-05',
  },
  {
    name: 'Aleksandra P.',
    rating: 5,
    text: 'Niesamowity efekt! Zaplątane Studio to miejsce, do którego zawsze wracam. Profesjonalizm na najwyższym poziomie.',
    date: '2024-02-28',
  },
];

export const BLOG_POSTS = [
  { id: '1', title: 'Jak dbać o warkocze?', slug: 'jak-dbac-o-warkocze', category: 'Pielęgnacja', excerpt: 'Poznaj najlepsze sposoby na pielęgnację warkocza, aby wyglądał pięknie jak najdłużej.', date: '2024-05-10', readTime: '5 min' },
  { id: '2', title: 'Najlepsze fryzury na lato', slug: 'najlepsze-fryzury-lato', category: 'Poradniki', excerpt: 'Lato to idealny czas na fryzury ochronne. Sprawdź, które style będą najlepsze dla Ciebie.', date: '2024-05-05', readTime: '7 min' },
  { id: '3', title: 'Historia warkoczya od A do Z', slug: 'historia-warkocza', category: 'Historia fryzur', excerpt: 'Skąd pochodzi tradycja zaplatania włosów? Poznaj fascynującą historię warkocza.', date: '2024-04-20', readTime: '10 min' },
  { id: '4', title: 'Jak wybrać idealny set wielorazowy?', slug: 'jak-wybrac-set', category: 'Poradniki', excerpt: 'Sety wielorazowe to inwestycja na lata. Dowiedz się jak wybrać najlepszy dla siebie.', date: '2024-04-15', readTime: '6 min' },
  { id: '5', title: 'O mnie i Zaplątane Studio', slug: 'o-mnie', category: 'O marce', excerpt: 'Poznaj historię powstania Zaplątane Studio i moją pasję do warkoczenia.', date: '2024-04-01', readTime: '4 min' },
  { id: '6', title: 'Nowości w sklepie — maj 2024', slug: 'nowosci-maj-2024', category: 'Nowości', excerpt: 'Co nowego pojawiło się w naszym sklepie? Sprawdź najnowsze produkty i zestawy.', date: '2024-05-01', readTime: '3 min' },
];
