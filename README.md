# 🎯 Dynamic Full-Stack Portfolio Website

A modern, responsive, full-stack portfolio website built with Next.js 14+ (App Router), TypeScript, Tailwind CSS, and MongoDB. Features a complete admin dashboard for dynamic content management.

## ✨ Features

### Frontend
- **Modern Tech Stack**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Smooth Animations**: Framer Motion for elegant transitions
- **Fully Responsive**: Mobile-first design that works on all devices
- **Dark Mode**: Professional dark theme with purple accents
- **SEO Optimized**: Server-side rendering for better search engine visibility
- **Performance**: Optimized images, lazy loading, and fast page loads

### Dynamic Sections
1. **Hero Section** - Name, title, tagline, profile image, resume link, social links
2. **About Section** - Professional summary, career goals, bio
3. **Skills Section** - Categorized skills with animated progress bars
4. **Projects Section** - Filterable project showcase with images and links
5. **Experience Section** - Work history with responsibilities
6. **Education Section** - Academic background
7. **Contact Section** - Working contact form with email integration

### Admin Dashboard
- **Secure Authentication**: NextAuth.js with JWT
- **Full CRUD Operations**: Add, edit, delete all content
- **User-Friendly Interface**: Clean, intuitive admin UI
- **Protected Routes**: Secure admin-only access

## 🛠 Tech Stack

### Frontend
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons

### Backend
- Next.js API Routes
- MongoDB with Mongoose
- NextAuth.js for authentication
- Nodemailer for email

## 📁 Project Structure

```
portfolio-website/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth configuration
│   │   ├── hero/         # Hero section API
│   │   ├── about/        # About section API
│   │   ├── skills/       # Skills API
│   │   ├── projects/     # Projects API
│   │   ├── experience/   # Experience API
│   │   ├── education/    # Education API
│   │   └── contact/      # Contact form API
│   ├── admin/            # Admin dashboard pages
│   │   ├── login/        # Admin login
│   │   ├── dashboard/    # Admin dashboard
│   │   ├── hero/         # Edit hero section
│   │   ├── about/        # Edit about section
│   │   ├── skills/       # Manage skills
│   │   ├── projects/     # Manage projects
│   │   ├── experience/   # Manage experience
│   │   └── education/    # Manage education
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # NextAuth provider
├── components/           # React components
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Education.tsx
│   └── Contact.tsx
├── lib/
│   ├── mongodb.ts        # MongoDB connection
│   └── auth.ts           # NextAuth configuration
├── models/               # Mongoose models
│   ├── Hero.ts
│   ├── About.ts
│   ├── Skill.ts
│   ├── Project.ts
│   ├── Experience.ts
│   ├── Education.ts
│   └── Contact.ts
├── types/
│   └── index.ts          # TypeScript types
└── .env.local            # Environment variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running locally, or MongoDB Atlas account

### Installation

1. **Navigate to the project directory**
```bash
cd portfolio-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Edit `.env.local` with your configuration:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/portfolio
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# Email Configuration (for contact form)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO=your-email@gmail.com
```

4. **Start MongoDB** (if running locally)
```bash
mongod
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Admin Access

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Login with credentials from `.env.local`:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Access the dashboard to manage all content

## 📧 Email Configuration

To enable the contact form:

1. **For Gmail:**
   - Enable 2-factor authentication
   - Generate an App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
   - Use the app password in `EMAIL_PASSWORD`

2. **For other providers:**
   - Update the transporter configuration in `app/api/contact/route.ts`

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
```typescript
theme: {
  extend: {
    colors: {
      // Add your custom colors
    }
  }
}
```

### Content
All content is managed through the admin dashboard. No code changes needed!

## 📦 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Deploy!

3. **Update environment variables**
   - Set `NEXTAUTH_URL` to your production URL
   - Use MongoDB Atlas for production database

### MongoDB Atlas Setup

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in Vercel environment variables

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎯 Features Checklist

- ✅ Dynamic content from database
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Admin dashboard with authentication
- ✅ CRUD operations for all sections
- ✅ Contact form with email integration
- ✅ Project filtering by category
- ✅ Skills with progress bars
- ✅ SEO optimized
- ✅ TypeScript for type safety
- ✅ Clean, scalable code structure
- ✅ Production-ready

## 🤝 Contributing

This is a portfolio template. Feel free to fork and customize for your own use!

## 📝 License

MIT License - feel free to use this project for your portfolio!

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- Tailwind CSS for styling utilities
- Framer Motion for animations

---

**Built with ❤️ using Next.js, TypeScript, and MongoDB**
