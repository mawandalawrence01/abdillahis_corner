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

  // Create sample books
  const books = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A classic American novel set in the Jazz Age, following the mysterious Jay Gatsby and his obsession with the beautiful Daisy Buchanan.',
      price: 12.99,
      isbn: '9780743273565',
      pages: 180,
      publishedAt: new Date('1925-04-10'),
      stock: 50,
      featured: true,
      categorySlug: 'fiction'
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
      price: 14.99,
      isbn: '9780061120084',
      pages: 281,
      publishedAt: new Date('1960-07-11'),
      stock: 30,
      featured: true,
      categorySlug: 'fiction'
    },
    {
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian social science fiction novel about totalitarian control and surveillance.',
      price: 13.99,
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
      price: 11.99,
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
      price: 16.99,
      isbn: '9780735211292',
      pages: 320,
      publishedAt: new Date('2018-10-16'),
      stock: 35,
      featured: false,
      categorySlug: 'self-help'
    },
    {
      title: 'The Holy Quran',
      author: 'Various Translators',
      description: 'The central religious text of Islam, believed by Muslims to be a revelation from God.',
      price: 19.99,
      isbn: '9780199535958',
      pages: 604,
      publishedAt: new Date('610-01-01'),
      stock: 100,
      featured: false,
      categorySlug: 'religious'
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
          categoryId: category.id
        }
      })
    }
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  await prisma.user.upsert({
    where: { email: 'admin@abdillahiscorner.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@abdillahiscorner.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

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
