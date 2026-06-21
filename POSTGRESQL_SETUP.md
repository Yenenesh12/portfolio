# 🐘 PostgreSQL Setup Guide

This guide will help you set up PostgreSQL for your portfolio website.

## Quick Start Options

You have 3 options for PostgreSQL:

1. **Local PostgreSQL** (for development)
2. **Supabase** (recommended - free tier available)
3. **Neon** (serverless PostgreSQL - free tier available)

---

## Option 1: Local PostgreSQL (Development)

### Windows

1. **Download PostgreSQL**
   - Go to [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
   - Download the installer
   - Run the installer

2. **During Installation**
   - Remember the password you set for the `postgres` user
   - Default port: 5432
   - Install pgAdmin (GUI tool)

3. **Update .env.local**
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/portfolio?schema=public"
   ```

4. **Create Database**
   ```bash
   # Open Command Prompt or PowerShell
   psql -U postgres
   # Enter your password
   CREATE DATABASE portfolio;
   \q
   ```

### Mac

1. **Install with Homebrew**
   ```bash
   brew install postgresql@15
   brew services start postgresql@15
   ```

2. **Create Database**
   ```bash
   createdb portfolio
   ```

3. **Update .env.local**
   ```env
   DATABASE_URL="postgresql://postgres@localhost:5432/portfolio?schema=public"
   ```

### Linux (Ubuntu/Debian)

1. **Install PostgreSQL**
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   ```

2. **Create Database**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE portfolio;
   \q
   ```

3. **Update .env.local**
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio?schema=public"
   ```

---

## Option 2: Supabase (Recommended for Production)

Supabase provides a free PostgreSQL database with 500MB storage.

### Setup Steps

1. **Create Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for free

2. **Create New Project**
   - Click "New Project"
   - Choose organization
   - Enter project name: `portfolio`
   - Generate a strong database password (save it!)
   - Select region closest to you
   - Click "Create new project"

3. **Get Connection String**
   - Go to Project Settings → Database
   - Find "Connection string" section
   - Copy the "URI" connection string
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

4. **Update .env.local**
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
   ```
   Replace `[YOUR-PASSWORD]` with your actual password

5. **Connection Pooling (Optional but Recommended)**
   - In Supabase Dashboard → Database → Connection Pooling
   - Copy the "Transaction" mode connection string
   - Use this for better performance

---

## Option 3: Neon (Serverless PostgreSQL)

Neon provides serverless PostgreSQL with a generous free tier.

### Setup Steps

1. **Create Account**
   - Go to [neon.tech](https://neon.tech)
   - Sign up with GitHub or email

2. **Create Project**
   - Click "Create a project"
   - Enter project name: `portfolio`
   - Select region
   - Click "Create project"

3. **Get Connection String**
   - After creation, you'll see the connection string
   - It looks like: `postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require`

4. **Update .env.local**
   ```env
   DATABASE_URL="postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require"
   ```

---

## Initialize Database

After setting up PostgreSQL (any option), run these commands:

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma db push

# Seed with sample data
npm run seed
```

---

## Verify Setup

1. **Check Connection**
   ```bash
   npx prisma studio
   ```
   This opens a GUI to view your database at http://localhost:5555

2. **View Tables**
   You should see:
   - Hero
   - About
   - Skill
   - Project
   - Experience
   - Education
   - Contact

---

## Common Issues & Solutions

### Issue: "Can't reach database server"

**Solution:**
- Check if PostgreSQL is running
- Verify connection string in `.env.local`
- Check firewall settings
- For cloud providers, check IP whitelist

### Issue: "SSL connection required"

**Solution:**
Add `?sslmode=require` to your connection string:
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

### Issue: "Database does not exist"

**Solution:**
Create the database:
```bash
# Local PostgreSQL
createdb portfolio

# Or using psql
psql -U postgres
CREATE DATABASE portfolio;
\q
```

### Issue: "Authentication failed"

**Solution:**
- Check username and password in connection string
- For local PostgreSQL, reset password:
  ```bash
  psql -U postgres
  ALTER USER postgres PASSWORD 'newpassword';
  ```

---

## Database Management

### View Database with Prisma Studio

```bash
npx prisma studio
```

Opens GUI at http://localhost:5555

### Reset Database

```bash
# Warning: This deletes all data!
npx prisma db push --force-reset
npm run seed
```

### Backup Database

**Local PostgreSQL:**
```bash
pg_dump -U postgres portfolio > backup.sql
```

**Restore:**
```bash
psql -U postgres portfolio < backup.sql
```

**Supabase/Neon:**
- Use their dashboard backup features
- Or use pg_dump with connection string

### View Database Schema

```bash
npx prisma studio
# or
npx prisma db pull
```

---

## Production Deployment

### For Vercel Deployment

1. **Use Supabase or Neon** (recommended)

2. **Add Environment Variable in Vercel**
   - Go to Project Settings → Environment Variables
   - Add `DATABASE_URL` with your connection string

3. **Deploy**
   ```bash
   git push
   ```

4. **Run Migrations** (if needed)
   - Vercel automatically runs `prisma generate` during build
   - Database tables are created on first API call

### Connection Pooling

For production, use connection pooling:

**Supabase:**
- Use Transaction mode connection string
- Format: `postgresql://postgres:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true`

**Neon:**
- Connection pooling is built-in
- Use the provided pooled connection string

---

## Prisma Commands Reference

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (development)
npx prisma db push

# Create migration (production)
npx prisma migrate dev --name init

# Open Prisma Studio
npx prisma studio

# Pull schema from existing database
npx prisma db pull

# Format schema file
npx prisma format

# Validate schema
npx prisma validate
```

---

## Database Schema

Your database has these tables:

- **Hero** - Profile information
- **About** - About section content
- **Skill** - Skills with categories and proficiency
- **Project** - Portfolio projects
- **Experience** - Work experience
- **Education** - Educational background
- **Contact** - Contact form submissions

All tables have:
- `id` (primary key)
- `createdAt` (timestamp)
- `updatedAt` (timestamp, except Contact)

---

## Next Steps

1. Choose your PostgreSQL option
2. Update `.env.local` with connection string
3. Run `npx prisma db push`
4. Run `npm run seed`
5. Start development: `npm run dev`

---

## Need Help?

- **Prisma Docs:** [prisma.io/docs](https://www.prisma.io/docs)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Neon Docs:** [neon.tech/docs](https://neon.tech/docs)
- **PostgreSQL Docs:** [postgresql.org/docs](https://www.postgresql.org/docs/)

---

**Your PostgreSQL database is ready! 🎉**
