import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const search = searchParams.get('q')
    const categories = searchParams.get('categories')?.split(',') || []
    const priceRange = searchParams.get('priceRange')
    const sort = searchParams.get('sort') || 'newest'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}

    // Search by title or author
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Filter by categories
    if (categories.length > 0) {
      where.category = {
        slug: { in: categories }
      }
    }

    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number)
      where.price = {}
      
      if (min !== undefined) {
        where.price.gte = min
      }
      if (max !== undefined) {
        where.price.lte = max
      }
    }

    // Build orderBy clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = { createdAt: 'desc' } // default

    switch (sort) {
      case 'oldest':
        orderBy = { createdAt: 'asc' }
        break
      case 'price-low':
        orderBy = { price: 'asc' }
        break
      case 'price-high':
        orderBy = { price: 'desc' }
        break
      case 'title':
        orderBy = { title: 'asc' }
        break
      case 'author':
        orderBy = { author: 'asc' }
        break
    }

    // Fetch books
    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: {
            select: {
              name: true,
              slug: true
            }
          }
        }
      }),
      prisma.book.count({ where })
    ])

    // Convert Prisma Decimal prices to numbers for the frontend
    const booksWithNumberPrices = books.map(book => ({
      ...book,
      price: Number(book.price)
    }))

    return NextResponse.json({
      books: booksWithNumberPrices,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
