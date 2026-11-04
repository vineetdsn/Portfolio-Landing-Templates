import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vineet — Digital Craftsman',
  description: 'Vineet is a frontend developer in Indore, India, crafting thoughtful, high-performance digital experiences.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
