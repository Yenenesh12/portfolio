# 🚀 START HERE - Quick Start Guide

Welcome! This guide will get your portfolio website running in 5 minutes.

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies (1 min)
```bash
cd portfolio-website
npm install
```

### Step 2: Set Up PostgreSQL (2 min)

**Option A - Use Supabase (Recommended - Free):**
1. Go to [supabase.com](https://supabase.com)
2. Create free account
3. Create new project
4. Copy connection string from Settings → Database
5. Update `.env.local` with your connection string

**Option B - Local PostgreSQL:**
```bash
# Install PostgreSQL first, then:
createdb portfolio
```

See [POSTGRESQL_SETUP.md](./POSTGRESQL_SETUP.md) for detailed instructions.

### Step 3: Configure Environment (1 min)

The `.env.local` file is already created. Update these values:

```env
# PostgreSQL Connection String
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio?schema=public"

# Or use Supabase:
# DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Change admin credentials (IMPORTANT!):
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password

# For contact form (optional for now):
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO=your-email@gmail.com
```

### Step 4: Initialize Database & Seed (1 min)
```bash
npm run seed
```

This will:
- Create all database tables
- Populate with sample data (hero, about, skills, projects, etc.)

### Step 5: Start Development Server (1 min)
```bash
npm run dev
```

## 🎉 You're Done!

### View Your Portfolio
Open [http://localhost:3000](http://localhost:3000)

### Access Admin Dashboard
1. Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Login with credentials from `.env.local`
3. Start customizing your content!

---

## 📝 What to Do Next

### 1. Update Your Content (10 minutes)

Login to admin dashboard and update:
- ✅ Hero Section: Your name, title, profile image
- ✅ About Section: Your bio and career goals
- ✅ Skills: Add/edit your actual skills
- ✅ Projects: Add your real projects
- ✅ Experience: Add your work history
- ✅ Education: Add your education

### 2. Customize Design (Optional)

Edit `tailwind.config.ts` to change colors:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### 3. Set Up Contact Form (5 minutes)

For Gmail:
1. Enable 2-Factor Authentication
2. Generate App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Update `.env.local` with app password

### 4. Deploy to Production (15 minutes)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide.

Quick deploy to Vercel:
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# Deploy on vercel.com
# Import repository
# Add environment variables
# Deploy!
```

---

## 📚 Documentation

- **[README.md](./README.md)** - Complete project overview
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[FEATURES.md](./FEATURES.md)** - All features explained

---

## 🆘 Troubleshooting

### MongoDB Connection Error
```
Error: MongooseServerSelectionError
```
**Solution:** Make sure MongoDB is running
```bash
mongod
```

### Admin Login Not Working
**Solution:** 
1. Check credentials in `.env.local`
2. Clear browser cookies
3. Restart dev server

### Port 3000 Already in Use
**Solution:**
```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Seed Script Fails
**Solution:**
1. Make sure MongoDB is running
2. Check connection string in `.env.local`
3. Try: `npm install -D ts-node`

---

## 🎯 Project Structure

```
portfolio-website/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (backend)
│   ├── admin/             # Admin dashboard pages
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Education.tsx
│   └── Contact.tsx
├── models/                # MongoDB models
├── lib/                   # Utilities
├── types/                 # TypeScript types
├── scripts/               # Utility scripts
│   └── seed.ts           # Database seeding
└── .env.local            # Environment variables
```

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

- [ ] Updated all content through admin dashboard
- [ ] Changed default admin credentials
- [ ] Added your profile image
- [ ] Updated social media links
- [ ] Tested contact form
- [ ] Tested on mobile devices
- [ ] Set up MongoDB Atlas
- [ ] Configured email settings

---

## 🔐 Security Notes

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Change default admin password** - Use a strong password
3. **Use MongoDB Atlas for production** - More secure than local
4. **Enable 2FA on accounts** - GitHub, Vercel, MongoDB Atlas
5. **Keep dependencies updated** - Run `npm audit` regularly

---

## 💡 Tips

1. **Use real images**: Replace placeholder images with your own
2. **Write compelling content**: Your portfolio is your first impression
3. **Keep it updated**: Regularly add new projects
4. **Test thoroughly**: Check on different devices and browsers
5. **Monitor performance**: Use Vercel Analytics or Google Analytics

---

## 🤝 Need Help?

1. Check the troubleshooting section above
2. Review error messages carefully
3. Check all documentation files
4. Verify environment variables are set correctly
5. Make sure MongoDB is running

---

## 🎨 Customization Ideas

- Change color scheme in `tailwind.config.ts`
- Add more sections (Blog, Testimonials, etc.)
- Customize animations in components
- Add your own fonts
- Modify layout and spacing
- Add dark/light mode toggle

---

## 📊 What's Included

✅ **Frontend:**
- Next.js 14+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Fully responsive design

✅ **Backend:**
- Next.js API Routes
- MongoDB database
- Mongoose ODM
- NextAuth.js authentication
- Email integration

✅ **Admin Dashboard:**
- Secure login
- Full CRUD operations
- Manage all content
- User-friendly interface

✅ **Features:**
- Dynamic content from database
- Contact form with email
- Project filtering
- Animated progress bars
- SEO optimized
- Production ready

---

## 🚀 Ready to Launch!

Your portfolio website is now ready. Follow the steps above to get started, and refer to the documentation for detailed information.

**Good luck with your portfolio! 🎉**

---

**Built with ❤️ using Next.js, TypeScript, and MongoDB**
