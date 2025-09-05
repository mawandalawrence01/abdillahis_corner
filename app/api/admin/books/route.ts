import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Fetch all books for admin
export async function GET() {
  try {
    const books = await prisma.book.findMany({
      include: {
        category: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Convert Prisma Decimal prices to numbers
    const booksWithNumberPrices = books.map(book => ({
      ...book,
      price: Number(book.price)
    }))

    return NextResponse.json(booksWithNumberPrices)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create a new book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      author,
      description,
      price,
      image,
      isbn,
      pages,
      publishedAt,
      stock,
      featured,
      categoryId
    } = body

    // Validate required fields
    if (!title || !author || !price || !categoryId) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        description: description || null,
        price: parseFloat(price),
        image: image || null,
        isbn: isbn || null,
        pages: pages ? parseInt(pages) : null,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        stock: stock ? parseInt(stock) : 0,
        featured: featured || false,
        categoryId
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })

    return NextResponse.json({
      ...book,
      price: Number(book.price)
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
