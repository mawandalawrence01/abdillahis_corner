'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { StarIcon } from '@heroicons/react/24/solid'
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline'

interface Book {
  id: string
  title: string
  author: string
  description: string
  price: number
  image?: string
  isbn?: string
  pages?: number
  publishedAt?: Date
  stock: number
  category: {
    name: string
    slug: string
  }
}

interface BookDetailsProps {
  book: Book
}

export default function BookDetails({ book }: BookDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { dispatch } = useCart()

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      // Add the book to cart
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
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Book Image */}
        <div className="space-y-4">
          <div className="aspect-[2/3] relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={book.image || '/api/placeholder/400/600'}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <HeartIcon className="h-5 w-5" />
              <span>Add to Wishlist</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <ShareIcon className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Book Information */}
        <div className="space-y-6">
          {/* Breadcrumb */}
          <nav className="text-sm">
            <Link href="/books" className="text-indigo-600 hover:text-indigo-700">
              Books
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link 
              href={`/categories/${book.category.slug}`}
              className="text-indigo-600 hover:text-indigo-700"
            >
              {book.category.name}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{book.title}</span>
          </nav>

          {/* Title and Author */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600">by {book.author}</p>
          </div>

          {/* Rating (mock data) */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < 4 ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">4.2 (128 reviews)</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-indigo-600">
            ${Number(book.price).toFixed(2)}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            {book.stock > 0 ? (
              <>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-600 font-medium">
                  In Stock ({book.stock} available)
                </span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-red-600 font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Book Details */}
          <div className="space-y-2 text-sm text-gray-600">
            {book.isbn && (
              <p><span className="font-medium">ISBN:</span> {book.isbn}</p>
            )}
            {book.pages && (
              <p><span className="font-medium">Pages:</span> {book.pages}</p>
            )}
            {book.publishedAt && (
              <p>
                <span className="font-medium">Published:</span>{' '}
                {new Date(book.publishedAt).getFullYear()}
              </p>
            )}
            <p><span className="font-medium">Category:</span> {book.category.name}</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="font-medium text-gray-700">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={book.stock === 0}
              >
                {[...Array(Math.min(book.stock, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={book.stock === 0 || isAddingToCart}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
