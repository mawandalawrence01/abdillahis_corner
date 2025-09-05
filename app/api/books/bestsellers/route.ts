import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // For now, we'll get featured books as best sellers
    // In a real app, you might want to track actual sales data
    const bestSellers = await prisma.book.findMany({
      where: {
        featured: true,
        stock: {
          gt: 0 // Only show books that are in stock
        }
      },
      take: 4, // Limit to 4 books for the best sellers section
      include: {
        category: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc' // Order by newest featured books
      }
    })

    // Transform the data to match the component's expected format
    const transformedBooks = bestSellers.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      price: Number(book.price),
      image: book.image || '/api/placeholder/200/300',
      rating: 4.5, // Default rating since we don't have reviews in the schema yet
      reviews: Math.floor(Math.random() * 200) + 50, // Mock reviews count
      category: book.category
    }))

    return NextResponse.json(transformedBooks)
  } catch (error) {
    console.error('Error fetching best sellers:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
