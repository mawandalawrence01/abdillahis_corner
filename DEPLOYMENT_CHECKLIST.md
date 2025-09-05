# 🚀 Vercel Deployment Checklist

## Pre-Deployment Setup

### 1. Database Setup
- [ ] Create a PostgreSQL database (Vercel Postgres, Supabase, or Railway)
- [ ] Get the database connection string
- [ ] Update `DATABASE_URL` in environment variables

### 2. Environment Variables
Set these in your Vercel project settings:

#### Required Variables
- [ ] `DATABASE_URL` - Your PostgreSQL connection string
- [ ] `NEXTAUTH_URL` - Your Vercel app URL (e.g., `https://your-app.vercel.app`)
- [ ] `NEXTAUTH_SECRET` - Use the generated secret: `8bExFsDrKE65TH1pgjx/zicDCeAvW8aFcUttgIQqoNo=`

#### Optional Variables (for Google OAuth)
- [ ] `GOOGLE_CLIENT_ID` - From Google Cloud Console
- [ ] `GOOGLE_CLIENT_SECRET` - From Google Cloud Console

### 3. Google OAuth Setup (Optional)
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create a new project or select existing
- [ ] Enable Google+ API
- [ ] Create OAuth 2.0 credentials
- [ ] Add authorized redirect URIs:
  - `https://your-app.vercel.app/api/auth/callback/google`
- [ ] Copy Client ID and Secret to Vercel environment variables

## Deployment Steps

### 1. Connect to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel
```

### 2. Set Environment Variables in Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add all required variables
4. Redeploy the project

### 3. Database Migration
After deployment, run database migrations:
```bash
# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npm run db:seed
```

## Post-Deployment Verification

### 1. Test Core Functionality
- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Book browsing works
- [ ] Search functionality works
- [ ] Shopping cart works
- [ ] Admin dashboard accessible

### 2. Test Admin Features
- [ ] Admin login works
- [ ] Book management (CRUD)
- [ ] Category management
- [ ] Order management
- [ ] User management
- [ ] Image upload works

### 3. Test Production Features
- [ ] Images load correctly
- [ ] External image URLs work
- [ ] File uploads work
- [ ] Database operations work
- [ ] Authentication persists
- [ ] Responsive design works

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables are set
   - Verify database connection
   - Check for TypeScript errors

2. **Database Connection Issues**
   - Verify `DATABASE_URL` format
   - Check database is accessible
   - Ensure database exists

3. **Authentication Issues**
   - Verify `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches your domain
   - Verify Google OAuth settings (if using)

4. **Image Upload Issues**
   - Check file permissions
   - Verify upload directory exists
   - Check file size limits

### Useful Commands

```bash
# Check Vercel deployment status
vercel ls

# View deployment logs
vercel logs

# Pull environment variables
vercel env pull .env.local

# Run database migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed database
npm run db:seed
```

## Security Checklist

- [ ] Environment variables are encrypted in Vercel
- [ ] Database credentials are secure
- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] Google OAuth credentials are properly configured
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] No sensitive data in code

## Performance Optimization

- [ ] Images are optimized
- [ ] Static pages are pre-rendered
- [ ] Database queries are efficient
- [ ] Caching is properly configured
- [ ] Bundle size is optimized

## Monitoring

- [ ] Vercel Analytics enabled
- [ ] Error tracking configured
- [ ] Database monitoring set up
- [ ] Performance monitoring active

## Backup Strategy

- [ ] Database backups configured
- [ ] Environment variables documented
- [ ] Code repository backed up
- [ ] Deployment process documented

---

## Quick Deploy Commands

```bash
# 1. Deploy to Vercel
vercel

# 2. Set environment variables in Vercel dashboard

# 3. Run database migrations
vercel env pull .env.local
npx prisma migrate deploy

# 4. Seed database (optional)
npm run db:seed

# 5. Redeploy with environment variables
vercel --prod
```

Your app should now be live at `https://your-app.vercel.app`! 🎉
