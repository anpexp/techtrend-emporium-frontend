import { lazy, Suspense } from 'react'
import Layout from '@/app/layout'

const HomePage = lazy(() => import('@/app/page'))

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <HomePage />
      </Suspense>
    </Layout>
  )
}

export default App
