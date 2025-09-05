import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Fetch all orders for admin
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        items: {
          include: {
            book: {
              select: {
                id: true,
                title: true,
                author: true,
                image: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Convert Prisma Decimal to numbers
    const ordersWithNumberPrices = orders.map(order => ({
      ...order,
      total: Number(order.total),
      items: order.items.map(item => ({
        ...item,
        price: Number(item.price)
      }))
    }))

    return NextResponse.json(ordersWithNumberPrices)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
