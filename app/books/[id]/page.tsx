import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookDetails from '@/components/BookDetails'
import { prisma } from '@/lib/prisma'

interface BookPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params
  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      category: true
    }
  })

  if (!book) {
    notFound()
  }

  // Convert Prisma types to component-compatible types
  const bookWithCompatibleTypes = {
    ...book,
    price: Number(book.price),
    image: book.image || undefined,
    isbn: book.isbn || undefined,
    pages: book.pages || undefined,
    publishedAt: book.publishedAt || undefined
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <BookDetails book={bookWithCompatibleTypes} />
      </main>
      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: BookPageProps) {
  const { id } = await params
  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      category: true
    }
  })

  if (!book) {
    return {
      title: 'Book Not Found'
    }
  }

  return {
    title: `${book.title} by ${book.author} - Abdillahi's Corner`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: book.image ? [book.image] : []
    }
  }
}
