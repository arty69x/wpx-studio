import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WHISPERX | STUDIO',
  description: 'Premium AI design platform, component marketplace, motion lab, builder canvas, and design system experience.',
  openGraph: {
    title: 'WHISPERX | STUDIO',
    description: 'Quiet technology for cinematic interface systems.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WHISPERX | STUDIO',
    description: 'A visual operating system for premium AI interface design.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
