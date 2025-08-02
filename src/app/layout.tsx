import type { Metadata } from 'next'
import ThemeProvider from './components/ThemeProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Refactoring Workshop',
  description: 'Next.js refactoring workshop application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}