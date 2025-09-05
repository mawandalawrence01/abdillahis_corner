'use client'

import Link from 'next/link'
import { StarIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import BookImage from './BookImage'

interface BestSeller {
  id: string
  title: string
  author: string
  price: number
  image: string
  rating: number
  reviews: number
  category?: {
    name: string
    slug: string
  }
}

export default function BestSellers() {
  const [bestSellers, setBestSellers] = useState<BestSeller[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch('/api/books/bestsellers')
        if (!response.ok) {
          throw new Error('Failed to fetch best sellers')
        }
        const data = await response.json()
        setBestSellers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching best sellers:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBestSellers()
  }, [])
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Best Sellers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and highly-rated books
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Best Sellers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and highly-rated books
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error loading best sellers: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Best Sellers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and highly-rated books
          </p>
        </div>

        {bestSellers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No best sellers available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <Link href={`/books/${book.id}`}>
                <div className="aspect-[2/3] relative">
                  <BookImage
                    src={book.image}
                    alt={book.title}
                    fill
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(book.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {book.rating} ({book.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">
                      KES {book.price}
                    </span>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/books"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            View All Books
          </Link>
        </div>
      </div>
    </section>
  )
}
