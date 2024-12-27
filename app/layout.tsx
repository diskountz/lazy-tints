import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@/components/Analytics'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lazy Tints - Color Palette Generator',
  description: 'Generate beautiful color palettes instantly with Lazy Tints. Create harmonious color combinations for your next design project with our easy-to-use color palette generator.',
  keywords: 'color palette, color generator, design tools, web design, color combinations, color scheme, color harmony',
  authors: [{ name: 'Syed Asif Sultan' }],
  creator: 'Syed Asif Sultan',
  publisher: 'Lazy Tints',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.lazytints.com'),
  openGraph: {
    title: 'Lazy Tints - Color Palette Generator',
    description: 'Generate beautiful color palettes instantly with Lazy Tints',
    url: 'https://www.lazytints.com',
    siteName: 'Lazy Tints',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lazy Tints - Color Palette Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lazy Tints - Color Palette Generator',
    description: 'Generate beautiful color palettes instantly with Lazy Tints',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

