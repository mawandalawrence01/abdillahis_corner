# Deployment Guide for Abdillahi's Corner

## Vercel Deployment

### Prerequisites
1. Vercel account
2. PostgreSQL database (recommended: Vercel Postgres, Supabase, or Railway)
3. Domain name (optional)

### Environment Variables

Set these environment variables in your Vercel project settings:

#### Required Variables
```
DATABASE_URL=postgresql://username:password@host:port/database
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
```

#### Optional Variables (for Google OAuth)
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Database Setup

1. **Create a PostgreSQL database** (recommended providers):
   - Vercel Postgres
   - Supabase
   - Railway
   - PlanetScale

2. **Run database migrations**:
   ```bash
   npx prisma migrate deploy
   ```

3. **Seed the database** (optional):
   ```bash
   npm run db:seed
   ```

### Deployment Steps

1. **Connect to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set environment variables** in Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add all required variables

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Post-Deployment

1. **Run database migrations**:
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

2. **Seed database** (if needed):
   ```bash
   npm run db:seed
   ```

### File Upload Configuration

The application supports both:
- **File uploads**: Images are stored in `/public/images/books/`
- **External URLs**: Any image URL can be used

For production, consider using:
- Vercel Blob Storage
- AWS S3
- Cloudinary

### Performance Optimizations

- Images are optimized using Next.js Image component
- Static pages are pre-rendered
- API routes are serverless functions
- Database queries are optimized with Prisma

### Monitoring

- Vercel Analytics (built-in)
- Error tracking with Vercel
- Database monitoring through your provider

### Security

- Environment variables are encrypted
- NextAuth.js handles authentication
- CSRF protection enabled
- SQL injection protection via Prisma

### Troubleshooting

1. **Build failures**: Check environment variables
2. **Database connection**: Verify DATABASE_URL
3. **Authentication issues**: Check NEXTAUTH_SECRET
4. **Image uploads**: Ensure proper file permissions

### Support

For issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test database connectivity
4. Review Next.js build output
