'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const categories = [
  { id: 'fiction', name: 'Fiction' },
  { id: 'non-fiction', name: 'Non-Fiction' },
  { id: 'religious', name: 'Religious' },
  { id: 'self-help', name: 'Self-Help' },
  { id: 'kids', name: 'Kids' },
  { id: 'academic', name: 'Academic' }
]

const priceRanges = [
  { id: '0-1500', name: 'Under KES 1,500', min: 0, max: 1500 },
  { id: '1500-2000', name: 'KES 1,500 - KES 2,000', min: 1500, max: 2000 },
  { id: '2000-3000', name: 'KES 2,000 - KES 3,000', min: 2000, max: 3000 },
  { id: '3000+', name: 'Over KES 3,000', min: 3000, max: null }
]

export default function BookFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isCategoryOpen, setIsCategoryOpen] = useState(true)
  const [isPriceOpen, setIsPriceOpen] = useState(true)

  const selectedCategories = searchParams.get('categories')?.split(',') || []
  const selectedPriceRange = searchParams.get('priceRange') || ''

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (key === 'categories') {
      const currentCategories = params.get('categories')?.split(',') || []
      const newCategories = currentCategories.includes(value)
        ? currentCategories.filter(cat => cat !== value)
        : [...currentCategories, value]
      
      if (newCategories.length > 0) {
        params.set('categories', newCategories.join(','))
      } else {
        params.delete('categories')
      }
    } else if (key === 'priceRange') {
      if (value === selectedPriceRange) {
        params.delete('priceRange')
      } else {
        params.set('priceRange', value)
      }
    }
    
    router.push(`/books?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/books')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          Clear all
        </button>
      </div>

      {/* Categories Filter */}
      <div className="mb-6">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Categories
          <ChevronDownIcon
            className={`h-5 w-5 transition-transform ${
              isCategoryOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        
        {isCategoryOpen && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => updateFilters('categories', category.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Price Range
          <ChevronDownIcon
            className={`h-5 w-5 transition-transform ${
              isPriceOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        
        {isPriceOpen && (
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.id} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={selectedPriceRange === range.id}
                  onChange={() => updateFilters('priceRange', range.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {range.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Sort by</h3>
        <select
          value={searchParams.get('sort') || 'newest'}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('sort', e.target.value)
            router.push(`/books?${params.toString()}`)
          }}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="title">Title A-Z</option>
          <option value="author">Author A-Z</option>
        </select>
      </div>
    </div>
  )
}
