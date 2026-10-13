import type { Metadata } from 'next'

// v1 is an unlinked rollback copy. noindex so it does not compete with /.
export const metadata: Metadata = {
  title: 'Cobilion — Do a task. Sell it to the robots.',
  description:
    'The marketplace where humans record physical tasks and get paid — and robotics companies buy the demonstrations to train their AI.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: 'Cobilion',
    description: 'Do a task. Sell it to the robots.',
    url: 'https://cobilion.com/archive/v1',
    siteName: 'Cobilion',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cobilion — Do a task. Sell it to the robots.',
    description: 'The marketplace for robot training data.',
  },
}

export default function ArchiveV1Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
