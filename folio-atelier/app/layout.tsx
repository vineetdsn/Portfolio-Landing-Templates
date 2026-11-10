import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shoaib Hamza — Full-Stack Developer",
  description: "I build digital products that are fast, scalable and thoughtfully designed.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
