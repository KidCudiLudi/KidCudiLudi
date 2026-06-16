'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LogowaniePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = await login(email, password);
    if (ok) {
      router.push('/konto');
    } else {
      setError('Nieprawidłowy e-mail lub hasło.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-[#F5E8E7] flex items-center justify-center text-3xl shadow-sm">🪢</div>
            <div>
              <p className="font-display font-semibold text-[#3D2B1F] text-xl">Zaplątane Studio</p>
              <p className="text-[#C9A96E] text-xs tracking-widest uppercase">— Studio —</p>
            </div>
          </Link>
          <h1 className="font-display text-2xl font-bold text-[#3D2B1F] mt-6">Zaloguj się</h1>
          <p className="text-[#8B6F5E] text-sm mt-1">Witamy z powrotem ♥</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#F5EDE8] shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">Adres e-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj@email.com"
                className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium">Hasło</label>
                <a href="#" className="text-xs text-[#D4726A] hover:underline">Zapomniałam hasła?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-[#F5EDE8] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D4726A] hover:bg-[#C4625A] disabled:opacity-60 text-white font-medium py-3.5 rounded-full transition-all shadow-lg shadow-[#D4726A]/20 mt-2"
            >
              {isLoading ? 'Logowanie...' : 'Zaloguj się'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#F5EDE8] text-center">
            <p className="text-sm text-[#8B6F5E]">
              Nie masz jeszcze konta?{' '}
              <Link href="/rejestracja" className="text-[#D4726A] font-medium hover:underline">
                Zarejestruj się
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-[#C9A96E] mt-6">
          🐕 Sammy czuwa nad Twoim kontem
        </p>
      </div>
    </div>
  );
}
