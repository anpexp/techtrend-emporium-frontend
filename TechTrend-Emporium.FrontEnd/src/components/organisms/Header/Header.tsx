export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="font-bold text-xl">TechTrend</div>
          <div className="space-x-4">
            <a href="/" className="hover:text-blue-600">Home</a>
            <a href="/shop" className="hover:text-blue-600">Shop</a>
            <a href="/about" className="hover:text-blue-600">About</a>
          </div>
        </nav>
      </div>
    </header>
  )
}