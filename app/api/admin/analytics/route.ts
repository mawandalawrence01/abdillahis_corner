import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get basic counts
    const [totalBooks, totalCategories, totalOrders, totalUsers] = await Promise.all([
      prisma.book.count(),
      prisma.category.count(),
      prisma.order.count(),
      prisma.user.count()
    ])

    // Get recent orders (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })

    // Get order status distribution
    const orderStatusCounts = await prisma.order.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    })

    // Get top selling books
    const topSellingBooks = await prisma.orderItem.groupBy({
      by: ['bookId'],
      _sum: {
        quantity: true
      },
      _count: {
        bookId: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 5
    })

    // Get book details for top sellers
    const topSellingBooksWithDetails = await Promise.all(
      topSellingBooks.map(async (item) => {
        const book = await prisma.book.findUnique({
          where: { id: item.bookId },
          select: {
            id: true,
            title: true,
            author: true,
            price: true,
            image: true
          }
        })
        return {
          ...book,
          price: book ? Number(book.price) : 0,
          totalSold: item._sum.quantity || 0,
          orderCount: item._count.bookId
        }
      })
    )

    // Get monthly revenue (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyRevenue = await prisma.order.groupBy({
      by: ['createdAt'],
      _sum: {
        total: true
      },
      where: {
        createdAt: {
          gte: sixMonthsAgo
        },
        status: {
          not: 'CANCELLED'
        }
      }
    })

    // Process monthly revenue data
    const revenueByMonth = monthlyRevenue.reduce((acc, order) => {
      const month = order.createdAt.toISOString().slice(0, 7) // YYYY-MM format
      acc[month] = (acc[month] || 0) + Number(order._sum.total || 0)
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      stats: {
        totalBooks,
        totalCategories,
        totalOrders,
        totalUsers
      },
      recentOrders: recentOrders.map(order => ({
        ...order,
        total: Number(order.total)
      })),
      orderStatusCounts,
      topSellingBooks: topSellingBooksWithDetails,
      monthlyRevenue: revenueByMonth
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
