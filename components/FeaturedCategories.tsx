import Link from 'next/link'
import { 
  BookOpenIcon, 
  AcademicCapIcon, 
  HeartIcon, 
  SparklesIcon,
  UserGroupIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

const categories = [
  {
    name: 'Fiction',
    slug: 'fiction',
    description: 'Novels, short stories, and literary works',
    icon: BookOpenIcon,
    color: 'bg-blue-500',
    href: '/categories/fiction'
  },
  {
    name: 'Non-Fiction',
    slug: 'non-fiction',
    description: 'Biographies, history, and factual content',
    icon: AcademicCapIcon,
    color: 'bg-green-500',
    href: '/categories/non-fiction'
  },
  {
    name: 'Religious',
    slug: 'religious',
    description: 'Spiritual and religious texts',
    icon: HeartIcon,
    color: 'bg-purple-500',
    href: '/categories/religious'
  },
  {
    name: 'Self-Help',
    slug: 'self-help',
    description: 'Personal development and growth',
    icon: SparklesIcon,
    color: 'bg-yellow-500',
    href: '/categories/self-help'
  },
  {
    name: 'Kids',
    slug: 'kids',
    description: 'Children\'s books and young adult',
    icon: UserGroupIcon,
    color: 'bg-pink-500',
    href: '/categories/kids'
  },
  {
    name: 'Academic',
    slug: 'academic',
    description: 'Textbooks and scholarly works',
    icon: LightBulbIcon,
    color: 'bg-indigo-500',
    href: '/categories/academic'
  }
]

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect book for every interest and age group
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link
                key={category.slug}
                href={category.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
              >
                <div className="flex items-center mb-4">
                  <div className={`${category.color} p-3 rounded-lg mr-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                  {category.description}
                </p>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  )
}
