import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const teko = localFont({
  src: '../../public/fonts/teko.woff2',
  variable: '--font-teko',
  display: 'swap',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Reavas — Minimalist README & Docs Studio',
  description:
    'A developer-first, minimalist README builder and documentation engine. Build production-grade READMEs with live AST preview, archetypes, and zero overhead.',
  icons: {
    icon: '/reavas.png',
  },
  keywords: [
    'Reavas',
    'README',
    'markdown',
    'open source',
    'documentation',
    'generator',
    'builder',
    'editor',
  ],
  openGraph: {
    title: 'Reavas — Minimalist README & Docs Studio',
    description:
      'A developer-first, minimalist README builder and documentation engine. Build production-grade READMEs with live AST preview, archetypes, and zero overhead.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${teko.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
