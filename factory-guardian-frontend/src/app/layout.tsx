import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FactoryGuardian - Industrial Safety Dashboard',
  description: 'Real-time industrial safety monitoring dashboard with multilingual support',
  keywords: ['industrial safety', 'monitoring', 'dashboard', 'factory', 'sensors'],
  authors: [{ name: 'FactoryGuardian Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'FactoryGuardian - Industrial Safety Dashboard',
    description: 'Real-time industrial safety monitoring dashboard',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}
