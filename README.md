# Abdillahi's Corner - Online Bookstore

A modern, full-featured online bookstore built with Next.js, featuring book management, user authentication, shopping cart, and order processing.

## 🚀 Features

- **Book Management**: Full CRUD operations with image upload support
- **User Authentication**: NextAuth.js with Google OAuth and credentials
- **Shopping Cart**: Persistent cart with local storage
- **Order Processing**: Complete order management system
- **Admin Dashboard**: Comprehensive admin interface
- **Search & Filters**: Advanced book filtering and search
- **Responsive Design**: Mobile-first, responsive UI
- **Currency Support**: Kenyan Shillings (KES) pricing
- **Image Support**: Both file upload and external URL support

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Icons**: Heroicons
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Vercel account (for deployment)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd abdillahis_corner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/abdillahis_corner"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📁 Project Structure

```
abdillahis_corner/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   └── ...
├── components/            # React components
├── contexts/              # React contexts
├── lib/                   # Utility libraries
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── types/                 # TypeScript type definitions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed the database
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: Customer and admin users
- **Categories**: Book categories
- **Books**: Book inventory
- **Orders**: Customer orders
- **OrderItems**: Individual items in orders
- **CartItems**: Shopping cart items

## 🔐 Authentication

The application supports multiple authentication methods:

- **Credentials**: Email/password authentication
- **Google OAuth**: Social login with Google
- **Role-based Access**: Admin and customer roles

## 🛒 Shopping Features

- **Product Catalog**: Browse books by category
- **Search**: Full-text search across titles and authors
- **Filters**: Filter by category, price range, etc.
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout**: Complete order processing
- **Order Tracking**: View order status and history

## 👨‍💼 Admin Features

- **Dashboard**: Overview of sales, orders, and inventory
- **Book Management**: Add, edit, delete books
- **Category Management**: Manage book categories
- **Order Management**: Process and track orders
- **User Management**: View and manage users
- **Analytics**: Sales and performance metrics

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean, professional design
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliant components

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | Secret for JWT signing | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |

### Image Configuration

The application supports:
- **File Uploads**: Images stored in `/public/images/books/`
- **External URLs**: Any image URL from any domain
- **Fallback**: Default book icon for missing images

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Performance

- **Static Generation**: Pre-rendered pages for better performance
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting for smaller bundles
- **Caching**: Optimized caching strategies

## 🔒 Security

- **Authentication**: Secure JWT-based authentication
- **CSRF Protection**: Built-in CSRF protection
- **SQL Injection**: Protected by Prisma ORM
- **Environment Variables**: Secure handling of secrets
- **Input Validation**: Server-side validation for all inputs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
2. Review the documentation
3. Open an issue on GitHub

## 🎯 Roadmap

- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile app
- [ ] Inventory management
- [ ] Customer reviews and ratings