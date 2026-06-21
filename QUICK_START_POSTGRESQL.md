# 🚀 Quick Start with PostgreSQL

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
cd portfolio-website
npm install
```

### 2. Set Up PostgreSQL

**Option A: Supabase (Recommended - Free & Easy)**
1. Go to [supabase.com](https://supabase.com) → Sign up
2. Create new project → Copy connection string
3. Update `.env.local`:
```env
DATABASE_URL="your-supabase-connection-string"
```

**Option B: Local PostgreSQL**
```bash
# Install PostgreSQL, then:
createdb portfolio
```

See [POSTGRESQL_SETUP.md](./POSTGRESQL_SETUP.md) for detailed instructions.

### 3. Initialize & Seed Database
```bash
npm run seed
```

This creates tables and adds sample data.

### 4. Start Development
```bash
npm run dev
```

### 5. Access Your Portfolio
- **Website:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/login
  - Email: admin@example.com
  - Password: admin123

## ✅ Done!

Now customize your content through the admin dashboard.

---

**Tech Stack:** Next.js 14+ • TypeScript • PostgreSQL • Prisma • Tailwind CSS
