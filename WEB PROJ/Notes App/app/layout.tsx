import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NotesKeeper',
  description: 'Save Notes Online',
  generator: 'Abdul Muizz',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
