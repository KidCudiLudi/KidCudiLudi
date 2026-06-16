'use client';
import Link from 'next/link';
import { useState } from 'react';

type Style = { name: string; slug: string; price: number };

export default function StyleActions({ style }: { style: Style }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex gap-3">
      <Link
        href={`/rezerwacja?styl=${style.slug}`}
        className="flex-1 bg-[#D4726A] hover:bg-[#C4625A] text-white text-center font-medium py-3.5 rounded-full transition-all shadow-lg shadow-[#D4726A]/20 hover:shadow-xl hover:-translate-y-0.5"
      >
        Umów wizytę
      </Link>
      <button
        onClick={() => setLiked(!liked)}
        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all text-xl ${
          liked ? 'bg-[#D4726A] border-[#D4726A] text-white' : 'border-[#E8D5C4] text-[#D4726A] hover:border-[#D4726A]'
        }`}
      >
        {liked ? '♥' : '♡'}
      </button>
      <button className="w-12 h-12 rounded-full border-2 border-[#E8D5C4] flex items-center justify-center text-[#8B6F5E] hover:border-[#D4726A] hover:text-[#D4726A] transition-all">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>
    </div>
  );
}
