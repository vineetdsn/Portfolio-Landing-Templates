import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = { title: 'Vineet — Creative Frontend Developer', description: 'Explore Vineet’s digital workspace: interactive technology, creative tools and experiments rendered in 3D.' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html> }
