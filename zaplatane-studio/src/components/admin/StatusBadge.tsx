const variants: Record<string, string> = {
  active:       'bg-green-50 text-green-700 border-green-200',
  inactive:     'bg-gray-50 text-gray-500 border-gray-200',
  confirmed:    'bg-green-50 text-green-700 border-green-200',
  pending:      'bg-yellow-50 text-yellow-700 border-yellow-200',
  cancelled:    'bg-red-50 text-red-700 border-red-200',
  completed:    'bg-blue-50 text-blue-700 border-blue-200',
  published:    'bg-green-50 text-green-700 border-green-200',
  draft:        'bg-yellow-50 text-yellow-700 border-yellow-200',
  bestseller:   'bg-[#FBF5E6] text-[#9A7435] border-[#C9A96E]',
  new:          'bg-[#F5E8E7] text-[#D4726A] border-[#E8A4A0]',
};

const labels: Record<string, string> = {
  active: 'Aktywny', inactive: 'Nieaktywny',
  confirmed: 'Potwierdzona', pending: 'Oczekuje',
  cancelled: 'Anulowana', completed: 'Zrealizowana',
  published: 'Opublikowany', draft: 'Szkic',
  bestseller: 'Bestseller', new: 'Nowość',
};

export default function StatusBadge({ status }: { status: string }) {
  const cls = variants[status] ?? 'bg-gray-50 text-gray-500 border-gray-200';
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${cls}`}>
      {labels[status] ?? status}
    </span>
  );
}
