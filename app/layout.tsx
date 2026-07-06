import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WHISPERX | STUDIO",
  description: "Client-side WordPress block studio for safe HTML and CSS package prototyping.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
