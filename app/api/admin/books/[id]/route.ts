import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Fetch a single book
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })

    if (!book) {
      return NextResponse.json(
        { message: 'Book not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...book,
      price: Number(book.price)
    })
  } catch (error) {
    console.error('Error fetching book:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update a book
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    const book = await prisma.book.update({
      where: { id },
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
    })
  } catch (error) {
    console.error('Error updating book:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a book
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.book.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Book deleted successfully' })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
