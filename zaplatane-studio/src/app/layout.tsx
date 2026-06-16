import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Zaplątane Studio — Piękne warkocze, stworzone dla Ciebie',
  description: 'Profesjonalne zaplatanie włosów, warkocze ochronne, akcesoria i ebooki. Umów wizytę online.',
  keywords: ['warkocze', 'braids', 'zaplatanie włosów', 'fryzury ochronne', 'studio wrocław'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="bg-[#FDF9F6] min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
