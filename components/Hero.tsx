'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to{' '}
            <span className="text-yellow-300">Abdillahi's Corner</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto text-indigo-100">
            Discover your next favorite book from our extensive collection of fiction, 
            non-fiction, academic, and religious texts.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for books, authors, or topics..."
                className="w-full pl-12 pr-4 py-4 text-lg text-gray-900 rounded-lg focus:ring-4 focus:ring-yellow-300 focus:outline-none"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/books')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Browse All Books
            </button>
            <button
              onClick={() => router.push('/categories')}
              className="border-2 border-white hover:bg-white hover:text-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Explore Categories
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
