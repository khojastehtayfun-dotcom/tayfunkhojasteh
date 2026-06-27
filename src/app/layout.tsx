import type { Metadata } from 'next'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import LoadingScreen from '@/components/LoadingScreen'

export const metadata: Metadata = {
  title: 'Tayfun Khojasteh',
  description: 'Entrepreneur · Brands · Ventures',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <LoadingScreen />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}