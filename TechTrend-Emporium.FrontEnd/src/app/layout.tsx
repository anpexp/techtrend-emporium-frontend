import { lazy, Suspense } from 'react'
import type { ReactNode } from 'react'

const Header = lazy(() => import('@organisms/Header/Header'))
const Footer = lazy(() => import('@organisms/Footer/Footer'))

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
        <Header />
      </Suspense>
      <main className="flex-1">
        {children}
      </main>
      <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  )
}