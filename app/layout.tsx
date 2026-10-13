import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cobilion — Monetise your shop-floor data',
  description:
    'Robotics labs pay for first-person video of skilled work. Cobilion helps factories and facilities sell it: anonymised, encrypted and labelled.',
  openGraph: {
    title: 'Cobilion — Monetise your shop-floor data',
    description:
      'Robotics labs pay for first-person video of skilled work. Cobilion helps factories and facilities sell it: anonymised, encrypted and labelled.',
    url: 'https://cobilion.com',
    siteName: 'Cobilion',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cobilion — Monetise your shop-floor data',
    description:
      'Robotics labs pay for first-person video of skilled work. Cobilion helps factories and facilities sell it: anonymised, encrypted and labelled.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  )
}
