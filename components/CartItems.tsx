'use client'

import { useCart } from '@/contexts/CartContext'
import { TrashIcon } from '@heroicons/react/24/outline'
import BookImage from './BookImage'
import Link from 'next/link'

export default function CartItems() {
  const { state, dispatch } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some books to get started!</p>
        <Link
          href="/books"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Browse Books
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Cart Items ({state.itemCount})
      </h2>
      
      <div className="space-y-4">
        {state.items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
            {/* Book Image */}
            <div className="flex-shrink-0">
              <div className="w-16 h-24 relative bg-gray-100 rounded">
                <BookImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="rounded"
                />
              </div>
            </div>
            
            {/* Book Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.author}</p>
              <p className="text-lg font-semibold text-indigo-600">
                KES {item.price.toFixed(2)}
              </p>
            </div>
            
            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => dispatch({
                  type: 'UPDATE_QUANTITY',
                  payload: { id: item.id, quantity: item.quantity - 1 }
                })}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => dispatch({
                  type: 'UPDATE_QUANTITY',
                  payload: { id: item.id, quantity: item.quantity + 1 }
                })}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
            
            {/* Remove Button */}
            <button
              onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
