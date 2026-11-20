import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DJJ40343 - Material Science & Engineering',
  description: 'Dashboard Pembelajaran Kursus DJJ40343 Material Science and Engineering',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ms">
      <body>{children}</body>
    </html>
  )
}
