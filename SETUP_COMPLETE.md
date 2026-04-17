# Complete Setup Guide - The IMSC Commons

## 🎯 Overview

This guide will walk you through setting up The IMSC Commons Digital Library completely, including database, authentication, and deployment.

---

## Part 1: Supabase Setup (Backend Database)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up
2. Click **"New Project"**
3. Fill in project details:
   - **Name**: IMSC Commons (or your choice)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your location
4. Click **"Create new project"** and wait for setup (5-10 minutes)

### Step 2: Get Your Credentials
1. In Supabase dashboard, go to **Settings → API**
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Public Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Update `.env.local` in your project:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_NEWSAPI_KEY=your-newsapi-key
```

### Step 3: Create Database Schema
1. In Supabase, go to **SQL Editor**
2. Click **"New Query"**
3. Copy entire contents from `/supabase/database.sql`
4. Paste into SQL Editor
5. Click **"Run"** (it may take a minute)
6. Verify tables created in **Table Editor**

### Step 4: Enable Row Level Security (RLS)
1. Go to **Authentication → Policies**
2. All policies are defined in the SQL script (already created)
3. Verify they're enabled for each table

---

## Part 2: Storage Setup (PDF Uploads)

### Step 1: Create Storage Bucket
1. In Supabase, go to **Storage**
2. Click **"Create a new bucket"**
3. Name it: `resources`
4. **Uncheck** "Private bucket" (to allow downloads)
5. Click **"Create bucket"**

### Step 2: Configure CORS & Access
1. Click on `resources` bucket
2. Go to **Policies**
3. Add policy for public downloads:
   - Allowed operations: SELECT
   - Policy: `(true)` (allow all)

---

## Part 3: Authentication Setup

### Step 1: Enable Email Provider
1. In Supabase, go to **Authentication → Providers**
2. Make sure **Email Provider** is enabled
3. Check **"Confirm email"** if you want email verification

### Step 2: Configure Email Templates (Optional)
1. Go to **Authentication → Email Templates**
2. Customize welcome/confirmation emails (optional)

### Step 3: Create Auth Users (Testing)
1. Go to **Authentication → Users**
2. Click **"Invite"** to create test users, or
3. Use the app's sign-up page once running

---

## Part 4: Environment Variables

Update your `.env.local` file:

```env
# Supabase (from Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key

# NewsAPI (get free key from newsapi.org)
NEXT_PUBLIC_NEWSAPI_KEY=your-newsapi-key

# Optional: Cloudinary (for advanced image transformations)
NEXT_PUBLIC_CLOUDINARY_URL=your-cloudinary-url
```

---

## Part 5: Local Development

### Start the Dev Server
```bash
cd /workspaces/library
npm run dev
```

Visit: **http://localhost:3000**

### Testing Features
- **Home**: http://localhost:3000
- **About**: http://localhost:3000/about
- **Subject Pages**: http://localhost:3000/subject/physics?type=question_paper
- **Upload**: http://localhost:3000/upload
- **Discussions**: http://localhost:3000/discussions
- **Login**: http://localhost:3000/auth/login

---

## Part 6: NewsAPI Integration

### Step 1: Get NewsAPI Key
1. Go to [newsapi.org](https://newsapi.org)
2. Sign up for free account
3. Copy your API Key
4. Add to `.env.local`: `NEXT_PUBLIC_NEWSAPI_KEY=your-key`

### Step 2: Test News Feed
- Home page displays science news automatically
- Click category filters to see Physics, Chemistry, etc.

---

## Part 7: PWA Setup (Installation)

### Features Enabled
✅ **Offline Support** - App works without internet (with cached data)
✅ **Installable** - "Add to Home Screen" on mobile
✅ **Fast Loading** - Service worker caches static assets
✅ **App-like** - Standalone window on mobile

### Install on Mobile
1. Open app in mobile browser
2. Press **"Share"** (iOS) or **"Menu"** (Android)
3. Select **"Add to Home Screen"**
4. App installs with icon

### Test PWA Locally
1. Open DevTools → Application → Service Workers
2. Check **"Offline"** checkbox
3. Visit cached pages (home, subjects, etc.)
4. Offline pages still work with cached data

---

## Part 8: Production Deployment

### Deploy to Vercel (Recommended)

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add backend integration and PWA setup"
git push origin main
```

#### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Import Project"**
3. Select your GitHub repository
4. Configure environment variables:
   - Add all values from `.env.local`
5. Click **"Deploy"**

#### Step 3: Configure Domain (Optional)
1. In Vercel, go to **Settings → Domains**
2. Add your custom domain
3. Update DNS records (follow Vercel's instructions)

---

## Part 9: Database Backup & Maintenance

### Automatic Backups
Supabase provides automatic daily backups (7-day retention on free tier).

### Manual Backup
```bash
# Export database
pg_dump "postgresql://user:password@host/database" > backup.sql

# Restore from backup
psql "postgresql://user:password@host/database" < backup.sql
```

---

## Part 10: Monitoring & Troubleshooting

### Check Service Workers
```bash
# In DevTools Console
navigator.serviceWorker.getRegistrations()
```

### View API Logs
1. Supabase Dashboard → Logs
2. Check for any errors in real-time

### Common Issues

| Issue | Solution |
|-------|----------|
| "Invalid API key" | Check SUPABASE_URL and ANON_KEY in `.env.local` |
| "RLS policy denied" | Ensure user is authenticated or RLS policies allow access |
| "File upload fails" | Check storage bucket permissions and CORS |
| "News not loading" | Verify NewsAPI key and rate limits |

---

## Part 11: Security Checklist

- [ ] Environment variables not committed to git
- [ ] Supabase Row Level Security (RLS) enabled
- [ ] API keys rotated regularly
- [ ] Database backups configured
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] CORS policies configured
- [ ] Rate limiting configured (Supabase Pro plan)

---

## Part 12: Performance Optimization

### Enable Caching
```bash
npm run build
# Check bundle size
npm run analyze  # if you install bundle-analyzer
```

### Optimize Images
- Use WebP format where possible
- Lazy load below-the-fold images
- Use Next.js Image component

### Database Indexes
✅ All indexes created in `database.sql`:
- `idx_resources_subject`
- `idx_threads_author`
- `idx_comments_thread`
- etc.

---

## 📚 Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [NewsAPI Docs](https://newsapi.org/docs)
- [PWA Guide](https://web.dev/progressive-web-apps/)

---

## 🚀 Next Steps

1. **Database**: Set up Supabase and run SQL schema
2. **Environment**: Update `.env.local` with credentials
3. **Test Locally**: Run `npm run dev` and test features
4. **Deploy**: Push to GitHub and deploy to Vercel

---

## 💬 Support

For issues or questions:
- 📧 Email: sfiimscsubcommittee25@gmail.com
- 🐛 Report bugs on GitHub
- 💡 Suggest features in Discussions

---

**Version**: 1.0  
**Last Updated**: April 15, 2026
