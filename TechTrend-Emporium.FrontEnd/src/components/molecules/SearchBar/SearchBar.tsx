interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

export default function SearchBar({ placeholder = "Search...", onSearch }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('search') as string
    onSearch?.(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        name="search"
        type="text"
        placeholder={placeholder}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
      >
        Search
      </button>
    </form>
  )
}