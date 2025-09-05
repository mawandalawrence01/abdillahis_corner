# Abdillahi's Corner - Online Bookstore

A modern, mobile-first Next.js e-commerce website for selling books online.

## Features

- **Modern UI**: Clean, minimal design optimized for mobile devices using TailwindCSS
- **Authentication**: User sign up/login with email & password, plus optional Google OAuth
- **Book Management**: Browse books by categories, search functionality, and detailed book pages
- **Shopping Cart**: Add/remove books, update quantities, and manage cart items
- **Checkout Process**: Complete order flow with shipping information
- **Admin Dashboard**: Simple panel to manage books and categories (admin users only)
- **Database**: PostgreSQL with Prisma ORM for data management
- **Responsive Design**: Mobile-first approach with responsive layouts

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with email/password and Google OAuth
- **Styling**: TailwindCSS with Heroicons
- **State Management**: React Context for cart management

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd abdillahis_corner
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/abdillahis_corner?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe (for future payment integration)
STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

4. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Default Admin Account

After seeding the database, you can log in with the admin account:
- **Email**: admin@abdillahiscorner.com
- **Password**: admin123

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── books/             # Book pages
│   ├── categories/        # Category pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   └── admin/             # Admin dashboard
├── components/            # React components
├── contexts/              # React contexts (cart management)
├── lib/                   # Utility libraries
└── types/                 # TypeScript type definitions

prisma/
├── schema.prisma          # Database schema
└── seed.ts               # Database seeding script
```

## Key Features

### Home Page
- Hero section with search functionality
- Featured book categories
- Best-selling books showcase

### Book Pages
- Book listing with filters (category, price range)
- Individual book detail pages
- Search functionality
- Add to cart functionality

### Shopping Cart
- Add/remove books
- Update quantities
- Cart persistence in localStorage
- Order summary with tax and shipping

### Authentication
- Email/password registration and login
- Google OAuth integration
- Protected routes
- User role management (Customer/Admin)

### Admin Dashboard
- Overview statistics
- Book management (planned)
- Category management (planned)
- Order management (planned)
- User management (planned)

## Database Schema

The application uses the following main entities:
- **Users**: Customer and admin accounts
- **Categories**: Book categories (Fiction, Non-Fiction, etc.)
- **Books**: Book information with pricing and inventory
- **Orders**: Customer orders and order items
- **Cart Items**: Shopping cart management

## Future Enhancements

- [ ] Stripe payment integration
- [ ] Order management system
- [ ] Book inventory management
- [ ] User profile pages
- [ ] Order history
- [ ] Email notifications
- [ ] Book reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Book recommendations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.