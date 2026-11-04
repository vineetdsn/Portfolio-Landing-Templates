import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mira Sol — Creative Developer",
  description: "Independent creative developer building thoughtful digital products and expressive web experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
