import Link from 'next/link'
import { BookOpenIcon } from '@heroicons/react/24/outline'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  _count: {
    books: number
  }
}

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No categories found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
        >
          <div className="flex items-center mb-4">
            <div className="bg-indigo-100 p-3 rounded-lg mr-4 group-hover:bg-indigo-200 transition-colors">
              <BookOpenIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">
                {category._count.books} book{category._count.books !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          {category.description && (
            <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
              {category.description}
            </p>
          )}
        </Link>
      ))}
    </div>
  )
}
