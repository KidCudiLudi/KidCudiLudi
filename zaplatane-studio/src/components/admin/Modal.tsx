'use client';
import { ReactNode } from 'react';

type Props = { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean };

export default function Modal({ open, onClose, title, children, wide }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className={`bg-white rounded-3xl shadow-2xl w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#F5EDE8]">
          <h3 className="font-display font-bold text-[#3D2B1F] text-lg">{title}</h3>
          <button onClick={onClose} className="text-[#8B6F5E] hover:text-[#3D2B1F] text-2xl leading-none">×</button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
