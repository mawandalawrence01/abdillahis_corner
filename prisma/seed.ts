import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'fiction' },
      update: {},
      create: {
        name: 'Fiction',
        slug: 'fiction',
        description: 'Novels, short stories, and literary works'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'non-fiction' },
      update: {},
      create: {
        name: 'Non-Fiction',
        slug: 'non-fiction',
        description: 'Biographies, history, and factual content'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'religious' },
      update: {},
      create: {
        name: 'Religious',
        slug: 'religious',
        description: 'Spiritual and religious texts'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'self-help' },
      update: {},
      create: {
        name: 'Self-Help',
        slug: 'self-help',
        description: 'Personal development and growth'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'kids' },
      update: {},
      create: {
        name: 'Kids',
        slug: 'kids',
        description: 'Children\'s books and young adult'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'academic' },
      update: {},
      create: {
        name: 'Academic',
        slug: 'academic',
        description: 'Textbooks and scholarly works'
      }
    })
  ])

  // Create sample books (prices in Kenyan Shillings - KES)
  const books = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A classic American novel set in the Jazz Age, following the mysterious Jay Gatsby and his obsession with the beautiful Daisy Buchanan.',
      price: 1690, // KES
      isbn: '9780743273565',
      pages: 180,
      publishedAt: new Date('1925-04-10'),
      stock: 50,
      featured: true,
      categorySlug: 'fiction',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop'
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
      price: 1950, // KES
      isbn: '9780061120084',
      pages: 281,
      publishedAt: new Date('1960-07-11'),
      stock: 30,
      featured: true,
      categorySlug: 'fiction',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop'
    },
    {
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian social science fiction novel about totalitarian control and surveillance.',
      price: 1820, // KES
      isbn: '9780451524935',
      pages: 328,
      publishedAt: new Date('1949-06-08'),
      stock: 25,
      featured: true,
      categorySlug: 'fiction'
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      description: 'A romantic novel that critiques the British landed gentry of the early 19th century.',
      price: 1560, // KES
      isbn: '9780141439518',
      pages: 432,
      publishedAt: new Date('1813-01-28'),
      stock: 40,
      featured: true,
      categorySlug: 'fiction'
    },
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'An easy and proven way to build good habits and break bad ones.',
      price: 2210, // KES
      isbn: '9780735211292',
      pages: 320,
      publishedAt: new Date('2018-10-16'),
      stock: 35,
      featured: false,
      categorySlug: 'self-help',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop'
    },
    {
      title: 'The Holy Quran',
      author: 'Various Translators',
      description: 'The central religious text of Islam, believed by Muslims to be a revelation from God.',
      price: 2600, // KES
      isbn: '9780199535958',
      pages: 604,
      publishedAt: new Date('610-01-01'),
      stock: 100,
      featured: false,
      categorySlug: 'religious'
    },
    {
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      description: 'A personal development and self-improvement book that focuses on the power of belief and persistence.',
      price: 1950, // KES
      isbn: '9781585424337',
      pages: 320,
      publishedAt: new Date('1937-01-01'),
      stock: 45,
      featured: true,
      categorySlug: 'self-help'
    },
    {
      title: 'The Bible',
      author: 'Various Authors',
      description: 'The holy book of Christianity, containing the Old and New Testaments.',
      price: 2600, // KES
      isbn: '9780199535959',
      pages: 1200,
      publishedAt: new Date('100-01-01'),
      stock: 80,
      featured: false,
      categorySlug: 'religious'
    },
    {
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      description: 'The first book in the Harry Potter series, following a young wizard\'s journey.',
      price: 2210, // KES
      isbn: '9780747532699',
      pages: 223,
      publishedAt: new Date('1997-06-26'),
      stock: 60,
      featured: true,
      categorySlug: 'kids',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop'
    },
    {
      title: 'Introduction to Computer Science',
      author: 'Dr. John Smith',
      description: 'A comprehensive textbook covering fundamental concepts in computer science.',
      price: 3900, // KES
      isbn: '9780123456789',
      pages: 500,
      publishedAt: new Date('2020-01-15'),
      stock: 25,
      featured: false,
      categorySlug: 'academic'
    }
  ]

  for (const bookData of books) {
    const category = categories.find(cat => cat.slug === bookData.categorySlug)
    if (category) {
      await prisma.book.upsert({
        where: { isbn: bookData.isbn },
        update: {},
        create: {
          title: bookData.title,
          author: bookData.author,
          description: bookData.description,
          price: bookData.price,
          isbn: bookData.isbn,
          pages: bookData.pages,
          publishedAt: bookData.publishedAt,
          stock: bookData.stock,
          featured: bookData.featured,
          categoryId: category.id,
          image: (bookData as any).image || null
        }
      })
    }
  }

  // Create users
  const users = await Promise.all([
    // Admin user
    prisma.user.upsert({
      where: { email: 'admin@abdillahiscorner.com' },
      update: {},
      create: {
        name: 'Admin User',
        email: 'admin@abdillahiscorner.com',
        password: await bcrypt.hash('admin123', 12),
        role: 'ADMIN'
      }
    }),
    // Customer users
    prisma.user.upsert({
      where: { email: 'john.doe@example.com' },
      update: {},
      create: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 12),
        role: 'CUSTOMER'
      }
    }),
    prisma.user.upsert({
      where: { email: 'jane.smith@example.com' },
      update: {},
      create: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('password123', 12),
        role: 'CUSTOMER'
      }
    }),
    prisma.user.upsert({
      where: { email: 'mike.wilson@example.com' },
      update: {},
      create: {
        name: 'Mike Wilson',
        email: 'mike.wilson@example.com',
        password: await bcrypt.hash('password123', 12),
        role: 'CUSTOMER'
      }
    }),
    prisma.user.upsert({
      where: { email: 'sarah.johnson@example.com' },
      update: {},
      create: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        password: await bcrypt.hash('password123', 12),
        role: 'CUSTOMER'
      }
    }),
    prisma.user.upsert({
      where: { email: 'david.brown@example.com' },
      update: {},
      create: {
        name: 'David Brown',
        email: 'david.brown@example.com',
        password: await bcrypt.hash('password123', 12),
        role: 'CUSTOMER'
      }
    })
  ])

  // Get all created books for order creation
  const allBooks = await prisma.book.findMany()

  // Create sample orders
  const orders = [
    {
      userId: users[1].id, // John Doe
      total: 1690 + 1950, // The Great Gatsby + To Kill a Mockingbird
      status: 'DELIVERED',
      paymentId: 'pay_123456789',
      items: [
        { bookId: allBooks[0].id, quantity: 1, price: 1690 }, // The Great Gatsby
        { bookId: allBooks[1].id, quantity: 1, price: 1950 }  // To Kill a Mockingbird
      ],
      createdAt: new Date('2024-01-15')
    },
    {
      userId: users[2].id, // Jane Smith
      total: 2210 + 2600, // Atomic Habits + The Holy Quran
      status: 'SHIPPED',
      paymentId: 'pay_987654321',
      items: [
        { bookId: allBooks[4].id, quantity: 1, price: 2210 }, // Atomic Habits
        { bookId: allBooks[5].id, quantity: 1, price: 2600 }  // The Holy Quran
      ],
      createdAt: new Date('2024-01-20')
    },
    {
      userId: users[3].id, // Mike Wilson
      total: 1820, // 1984
      status: 'PROCESSING',
      paymentId: 'pay_456789123',
      items: [
        { bookId: allBooks[2].id, quantity: 1, price: 1820 }  // 1984
      ],
      createdAt: new Date('2024-01-25')
    },
    {
      userId: users[4].id, // Sarah Johnson
      total: 1560 + 2210 + 1950, // Pride and Prejudice + Harry Potter + Think and Grow Rich
      status: 'PENDING',
      paymentId: 'pay_789123456',
      items: [
        { bookId: allBooks[3].id, quantity: 1, price: 1560 }, // Pride and Prejudice
        { bookId: allBooks[8].id, quantity: 1, price: 2210 }, // Harry Potter
        { bookId: allBooks[6].id, quantity: 1, price: 1950 }  // Think and Grow Rich
      ],
      createdAt: new Date('2024-01-28')
    },
    {
      userId: users[1].id, // John Doe (second order)
      total: 2600, // The Bible
      status: 'DELIVERED',
      paymentId: 'pay_321654987',
      items: [
        { bookId: allBooks[7].id, quantity: 1, price: 2600 }  // The Bible
      ],
      createdAt: new Date('2024-02-01')
    },
    {
      userId: users[5].id, // David Brown
      total: 3900, // Introduction to Computer Science
      status: 'CANCELLED',
      paymentId: 'pay_654987321',
      items: [
        { bookId: allBooks[9].id, quantity: 1, price: 3900 }  // Introduction to Computer Science
      ],
      createdAt: new Date('2024-02-05')
    },
    {
      userId: users[2].id, // Jane Smith (second order)
      total: 1950 + 1820, // Think and Grow Rich + 1984
      status: 'SHIPPED',
      paymentId: 'pay_147258369',
      items: [
        { bookId: allBooks[6].id, quantity: 1, price: 1950 }, // Think and Grow Rich
        { bookId: allBooks[2].id, quantity: 1, price: 1820 }  // 1984
      ],
      createdAt: new Date('2024-02-10')
    }
  ]

  // Create orders and order items
  for (const orderData of orders) {
    const order = await prisma.order.create({
      data: {
        userId: orderData.userId,
        total: orderData.total,
        status: orderData.status as any,
        paymentId: orderData.paymentId,
        createdAt: orderData.createdAt
      }
    })

    // Create order items
    for (const itemData of orderData.items) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          bookId: itemData.bookId,
          quantity: itemData.quantity,
          price: itemData.price
        }
      })
    }
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
