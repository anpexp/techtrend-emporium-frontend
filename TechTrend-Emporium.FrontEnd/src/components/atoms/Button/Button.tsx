import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-lg font-semibold transition-colors"
  const variantClasses = variant === 'primary'
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-gray-800"

  return (
    <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
      {children}
    </button>
  )
}