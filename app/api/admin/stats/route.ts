import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [totalBooks, totalCategories, totalOrders, totalUsers] = await Promise.all([
      prisma.book.count(),
      prisma.category.count(),
      prisma.order.count(), // Assuming you have an Order model
      prisma.user.count()   // Assuming you have a User model
    ])

    return NextResponse.json({
      totalBooks,
      totalCategories,
      totalOrders,
      totalUsers
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
