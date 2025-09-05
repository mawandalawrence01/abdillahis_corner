'use client'

import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'

export default function CartSummary() {
  const { state, dispatch } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    if (state.items.length === 0) return
    router.push('/checkout')
  }

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      dispatch({ type: 'CLEAR_CART' })
    }
  }

  if (state.items.length === 0) {
    return null
  }

  const shipping = state.total > 5000 ? 0 : 500 // Free shipping over KES 5,000, otherwise KES 500
  const tax = state.total * 0.08 // 8% tax
  const finalTotal = state.total + shipping + tax

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Subtotal ({state.itemCount} items)</span>
          <span>KES {state.total.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? 'Free' : `KES ${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>KES {tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>KES {finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        <button
          onClick={handleCheckout}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Proceed to Checkout
        </button>
        
        <button
          onClick={handleClearCart}
          className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Clear Cart
        </button>
      </div>
      
      {state.total < 5000 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            Add KES {(5000 - state.total).toFixed(2)} more for free shipping!
          </p>
        </div>
      )}
    </div>
  )
}
