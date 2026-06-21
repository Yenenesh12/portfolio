# 🏗️ Project Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Next.js Frontend (React)                 │  │
│  │  • Hero • About • Skills • Projects • Experience     │  │
│  │  • Education • Contact • Admin Dashboard             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  API Routes                           │  │
│  │  /api/hero  /api/about  /api/skills  /api/projects  │  │
│  │  /api/experience  /api/education  /api/contact      │  │
│  │  /api/auth/[...nextauth]                            │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Authentication Layer                     │  │
│  │  NextAuth.js • JWT Tokens • Session Management      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   MongoDB                             │  │
│  │  Collections: heroes, abouts, skills, projects,     │  │
│  │  experiences, educations, contacts                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
portfolio-website/
│
├── app/                          # Next.js App Router
│   ├── api/                      # Backend API Routes
│   │   ├── auth/[...nextauth]/   # Authentication
│   │   ├── hero/                 # Hero CRUD
│   │   ├── about/                # About CRUD
│   │   ├── skills/               # Skills CRUD
│   │   ├── projects/             # Projects CRUD
│   │   ├── experience/           # Experience CRUD
│   │   ├── education/            # Education CRUD
│   │   └── contact/              # Contact form + Email
│   │
│   ├── admin/                    # Admin Dashboard
│   │   ├── login/                # Admin login page
│   │   ├── dashboard/            # Dashboard home
│   │   ├── hero/                 # Edit hero
│   │   ├── about/                # Edit about
│   │   ├── skills/               # Manage skills
│   │   ├── projects/             # Manage projects
│   │   ├── experience/           # Manage experience
│   │   └── education/            # Manage education
│   │
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── providers.tsx             # NextAuth provider
│   └── globals.css               # Global styles
│
├── components/                   # React Components
│   ├── Hero.tsx                  # Hero section
│   ├── About.tsx                 # About section
│   ├── Skills.tsx                # Skills section
│   ├── Projects.tsx              # Projects section
│   ├── Experience.tsx            # Experience section
│   ├── Education.tsx             # Education section
│   └── Contact.tsx               # Contact form
│
├── models/                       # Mongoose Models
│   ├── Hero.ts                   # Hero schema
│   ├── About.ts                  # About schema
│   ├── Skill.ts                  # Skill schema
│   ├── Project.ts                # Project schema
│   ├── Experience.ts             # Experience schema
│   ├── Education.ts              # Education schema
│   └── Contact.ts                # Contact schema
│
├── lib/                          # Utilities
│   ├── mongodb.ts                # MongoDB connection
│   └── auth.ts                   # NextAuth config
│
├── types/                        # TypeScript Types
│   ├── index.ts                  # Main types
│   └── next-auth.d.ts            # NextAuth types
│
├── scripts/                      # Utility Scripts
│   └── seed.ts                   # Database seeding
│
├── public/                       # Static Assets
│   └── placeholder.jpg           # Placeholder image
│
├── .env.local                    # Environment variables
├── .env.example                  # Example env file
├── .gitignore                    # Git ignore rules
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
│
└── Documentation/
    ├── README.md                 # Main documentation
    ├── START_HERE.md             # Quick start
    ├── SETUP.md                  # Setup guide
    ├── DEPLOYMENT.md             # Deployment guide
    ├── FEATURES.md               # Features list
    ├── ARCHITECTURE.md           # This file
    ├── FINAL_CHECKLIST.md        # Final checklist
    └── PROJECT_SUMMARY.md        # Project summary
```

## Data Flow

### 1. Public Portfolio View
```
User → Browser → Next.js Page → API Route → MongoDB → Response
                     ↓
              Components render with data
```

### 2. Admin Dashboard
```
Admin → Login → NextAuth → JWT Token → Protected Routes
                                ↓
                         Admin Dashboard
                                ↓
                    CRUD Operations → API Routes → MongoDB
```

### 3. Contact Form
```
User → Contact Form → API Route → Save to MongoDB
                                 ↓
                            Nodemailer → Email
```

## Component Architecture

```
app/page.tsx (Home)
│
├── Hero Component
│   └── Fetches: /api/hero
│
├── About Component
│   └── Fetches: /api/about
│
├── Skills Component
│   └── Fetches: /api/skills
│
├── Projects Component
│   ├── Fetches: /api/projects
│   └── Features: Filtering, Categories
│
├── Experience Component
│   └── Fetches: /api/experience
│
├── Education Component
│   └── Fetches: /api/education
│
└── Contact Component
    └── Posts to: /api/contact
```

## API Architecture

### RESTful Endpoints

```
GET    /api/hero          - Get hero data
POST   /api/hero          - Update hero data

GET    /api/about         - Get about data
POST   /api/about         - Update about data

GET    /api/skills        - Get all skills
POST   /api/skills        - Create skill
PUT    /api/skills        - Update skill
DELETE /api/skills?id=x   - Delete skill

GET    /api/projects      - Get all projects
GET    /api/projects?category=x - Filter by category
POST   /api/projects      - Create project
PUT    /api/projects      - Update project
DELETE /api/projects?id=x - Delete project

GET    /api/experience    - Get all experiences
POST   /api/experience    - Create experience
PUT    /api/experience    - Update experience
DELETE /api/experience?id=x - Delete experience

GET    /api/education     - Get all education
POST   /api/education     - Create education
PUT    /api/education     - Update education
DELETE /api/education?id=x - Delete education

POST   /api/contact       - Submit contact form

POST   /api/auth/signin   - Admin login
POST   /api/auth/signout  - Admin logout
GET    /api/auth/session  - Get session
```

## Database Schema

### Collections

```javascript
// heroes
{
  fullName: String,
  professionalTitle: String,
  tagline: String,
  profileImage: String,
  resumeLink: String,
  socialLinks: {
    github: String,
    linkedin: String,
    email: String
  }
}

// abouts
{
  summary: String,
  careerGoals: String,
  bio: String
}

// skills
{
  name: String,
  category: Enum['Frontend', 'Backend', 'Machine Learning', 'Tools'],
  proficiency: Number (0-100)
}

// projects
{
  title: String,
  description: String,
  technologies: [String],
  image: String,
  githubLink: String,
  liveLink: String,
  featured: Boolean,
  category: String,
  createdAt: Date,
  updatedAt: Date
}

// experiences
{
  role: String,
  company: String,
  duration: String,
  description: String,
  responsibilities: [String]
}

// educations
{
  institution: String,
  degree: String,
  year: String,
  description: String
}

// contacts
{
  name: String,
  email: String,
  message: String,
  createdAt: Date
}
```

## Authentication Flow

```
1. Admin visits /admin/login
2. Enters credentials
3. NextAuth validates against env variables
4. JWT token generated
5. Session stored
6. Redirect to /admin/dashboard
7. Protected routes check session
8. If valid → Allow access
9. If invalid → Redirect to login
```

## Technology Stack Details

### Frontend Layer
- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animations
- **React Icons**: Icon library

### Backend Layer
- **Next.js API Routes**: Serverless functions
- **Mongoose**: MongoDB ODM
- **NextAuth.js**: Authentication
- **Nodemailer**: Email sending
- **JWT**: Token-based auth

### Database Layer
- **MongoDB**: NoSQL database
- **Mongoose Schemas**: Data validation
- **Connection Pooling**: Performance

### Deployment Layer
- **Vercel**: Hosting platform
- **MongoDB Atlas**: Cloud database
- **Environment Variables**: Configuration
- **HTTPS**: Automatic SSL

## Security Architecture

```
┌─────────────────────────────────────┐
│     Security Measures               │
├─────────────────────────────────────┤
│ • Environment Variables             │
│ • JWT Authentication                │
│ • Protected Routes                  │
│ • Input Validation                  │
│ • XSS Prevention (React)            │
│ • CSRF Protection (NextAuth)        │
│ • HTTPS (Vercel)                    │
│ • MongoDB Connection Security       │
│ • Rate Limiting (can be added)      │
└─────────────────────────────────────┘
```

## Performance Optimizations

1. **Server-Side Rendering**: Fast initial load
2. **Image Optimization**: Next.js Image component
3. **Code Splitting**: Automatic by Next.js
4. **Lazy Loading**: Images and components
5. **Caching**: API responses
6. **Database Indexing**: Fast queries
7. **Connection Pooling**: Efficient DB connections
8. **Minification**: Production builds

## Scalability Considerations

- **Serverless Architecture**: Auto-scaling
- **Database Indexing**: Performance at scale
- **CDN**: Static assets (Vercel)
- **Caching Strategy**: Reduce DB calls
- **API Rate Limiting**: Prevent abuse
- **Load Balancing**: Automatic (Vercel)

---

This architecture provides a solid foundation for a production-ready portfolio website with room for future enhancements.
