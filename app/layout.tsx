import type { Metadata } from 'next';
import './globals.css';
import './artyverse.css';

export const metadata: Metadata = {
  title: 'ARTYVERSE X — Collect the beautifully weird',
  description: 'A playful multi-vendor universe for collectible design, limited drops, verified creators, and products with personality.',
  openGraph: {
    title: 'ARTYVERSE X',
    description: 'Collect the beautifully weird.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARTYVERSE X',
    description: 'Come for the drop. Stay for the weird.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
