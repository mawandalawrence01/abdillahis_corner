#!/bin/bash

# Production Build Script for Abdillahi's Corner
echo "🚀 Starting production build process..."

# Check if required environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is not set"
    exit 1
fi

if [ -z "$NEXTAUTH_SECRET" ]; then
    echo "❌ NEXTAUTH_SECRET is not set"
    exit 1
fi

if [ -z "$NEXTAUTH_URL" ]; then
    echo "❌ NEXTAUTH_URL is not set"
    exit 1
fi

echo "✅ Environment variables are set"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Build the application
echo "🏗️ Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Production build completed successfully!"
    echo "🎉 Ready for deployment!"
else
    echo "❌ Build failed!"
    exit 1
fi
