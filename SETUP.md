# 🚀 Quick Setup Guide

Follow these steps to get your portfolio website up and running in minutes!

## Prerequisites

Before you begin, make sure you have:
- ✅ Node.js 18+ installed ([Download here](https://nodejs.org/))
- ✅ MongoDB installed locally OR a MongoDB Atlas account ([Get free account](https://www.mongodb.com/cloud/atlas))

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd portfolio-website
npm install
```

### 2. Configure Environment Variables

The `.env.local` file is already created. Update it with your settings:

```env
# MongoDB - Choose one option:

# Option A: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio

# Option B: MongoDB Atlas (recommended for production)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Admin Login Credentials (change these!)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Email Configuration (for contact form)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO=your-email@gmail.com
```

### 3. Start MongoDB (if using local)

**Windows:**
```bash
mongod
```

**Mac/Linux:**
```bash
sudo mongod
```

Or use MongoDB Compass to start MongoDB visually.

### 4. Seed the Database

Populate your database with sample data:

```bash
npm run seed
```

This will create:
- Hero section with profile information
- About section content
- 12 sample skills across 4 categories
- 3 sample projects
- 2 work experiences
- 2 education entries

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Open Your Portfolio

Visit [http://localhost:3000](http://localhost:3000) in your browser!

### 7. Access Admin Dashboard

1. Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Login with:
   - **Email:** `admin@example.com`
   - **Password:** `admin123`
3. Start managing your content!

## 📧 Setting Up Email (Contact Form)

### For Gmail:

1. **Enable 2-Factor Authentication**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Copy the generated password

3. **Update .env.local**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=the-app-password-you-generated
   EMAIL_TO=where-you-want-to-receive-messages@gmail.com
   ```

### For Other Email Providers:

Edit `app/api/contact/route.ts` and update the transporter configuration.

## 🎨 Customizing Your Portfolio

### Update Content

All content is managed through the admin dashboard:
- Hero Section: `/admin/hero`
- About: `/admin/about`
- Skills: `/admin/skills`
- Projects: `/admin/projects`
- Experience: `/admin/experience`
- Education: `/admin/education`

### Change Colors

Edit `tailwind.config.ts` to customize the color scheme.

### Modify Layout

Edit components in the `components/` directory.

## 🚀 Deploying to Production

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add all environment variables from `.env.local`
   - Click "Deploy"

3. **Update Environment Variables**
   - Set `NEXTAUTH_URL` to your production URL (e.g., `https://yoursite.vercel.app`)
   - Use MongoDB Atlas for production database
   - Update email settings if needed

### MongoDB Atlas Setup (for Production)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Free" tier
   - Select a region close to your users

3. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

4. **Update Vercel Environment Variables**
   - Add `MONGODB_URI` with your Atlas connection string

5. **Seed Production Database**
   - Temporarily update your local `.env.local` with production MongoDB URI
   - Run `npm run seed`
   - Change back to local URI

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error: "MongooseServerSelectionError"**
- Make sure MongoDB is running
- Check your connection string in `.env.local`
- For Atlas: Check IP whitelist and credentials

### Admin Login Not Working

- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`
- Make sure `NEXTAUTH_SECRET` is set
- Clear browser cookies and try again

### Contact Form Not Sending Emails

- Verify email credentials in `.env.local`
- For Gmail: Make sure you're using an App Password, not your regular password
- Check spam folder

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🆘 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the error messages carefully
3. Check that all environment variables are set correctly
4. Make sure MongoDB is running

## ✅ Checklist

Before going live, make sure you:
- [ ] Changed admin credentials in `.env.local`
- [ ] Updated all content through admin dashboard
- [ ] Added your own profile image
- [ ] Updated social links
- [ ] Configured email for contact form
- [ ] Tested contact form
- [ ] Tested on mobile devices
- [ ] Set up MongoDB Atlas for production
- [ ] Deployed to Vercel
- [ ] Updated `NEXTAUTH_URL` for production

---

**Congratulations! Your portfolio is ready! 🎉**
