import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Eno README Lab — Build Beautiful READMEs',
  description:
    'A browser-based README builder and editor for open-source projects. Create professional READMEs with live preview, templates, badges, and best practices checklist.',
  keywords: [
    'README',
    'markdown',
    'open source',
    'documentation',
    'generator',
    'builder',
    'editor',
  ],
  openGraph: {
    title: 'Eno README Lab — Build Beautiful READMEs',
    description:
      'A browser-based README builder and editor for open-source projects. Create professional READMEs with live preview, templates, badges, and best practices checklist.',
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
