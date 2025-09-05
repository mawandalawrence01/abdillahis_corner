'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { StarIcon } from '@heroicons/react/24/solid'

interface Book {
  id: string
  title: string
  author: string
  price: number
  image?: string
  category: {
    name: string
  }
}

interface BookGridProps {
  categorySlug?: string
}

export default function BookGrid({ categorySlug }: BookGridProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const { dispatch } = useCart()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams(searchParams.toString())
        
        // If we're on a category page, add the category filter
        if (categorySlug) {
          params.set('categories', categorySlug)
        }
        
        const response = await fetch(`/api/books?${params.toString()}`)
        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }
        
        const data = await response.json()
        setBooks(data.books)
      } catch (err) {
        setError('Failed to load books')
        console.error('Error fetching books:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [searchParams, categorySlug])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="aspect-[2/3] bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No books found matching your criteria.</p>
        <Link
          href="/books"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          View All Books
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing {books.length} book{books.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <Link href={`/books/${book.id}`}>
              <div className="aspect-[2/3] relative">
                <Image
                  src={book.image || '/api/placeholder/200/300'}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{book.author}</p>
                <p className="text-xs text-indigo-600 mb-2">{book.category.name}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-indigo-600">
                    ${book.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      dispatch({
                        type: 'ADD_ITEM',
                        payload: {
                          id: book.id,
                          title: book.title,
                          author: book.author,
                          price: book.price,
                          image: book.image
                        }
                      })
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
