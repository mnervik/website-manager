import { Inter } from 'next/font/google'
import { Suspense } from 'react'

import { Toaster } from 'react-hot-toast'

import AuthStatus from '@components/auth-status'

import '../styles/globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.variable}>
        <Toaster />

        <Suspense fallback='Loading...'>
          <AuthStatus />
        </Suspense>

        {children}
      </body>
    </html>
  )
}
