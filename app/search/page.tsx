import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookGrid from '@/components/BookGrid'
import BookFilters from '@/components/BookFilters'

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Search Results
              </h1>
              {query && (
                <p className="text-lg text-gray-600">
                  Results for "{query}"
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <BookFilters />
            </div>
            
            {/* Books Grid */}
            <div className="lg:w-3/4">
              <BookGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
