# 🚀 Deployment Guide

Complete guide for deploying your portfolio to production.

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Tested the application locally
- [ ] Updated all content through admin dashboard
- [ ] Changed default admin credentials
- [ ] Set up MongoDB Atlas account
- [ ] Configured email settings
- [ ] Tested contact form
- [ ] Optimized images
- [ ] Tested on multiple devices

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest and fastest way to deploy Next.js applications.

### Step 1: Prepare Your Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Portfolio website"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

### Step 2: Set Up MongoDB Atlas

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a New Cluster**
   - Click "Build a Database"
   - Select "M0 Free" tier
   - Choose a cloud provider and region (closest to your target audience)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and strong password
   - Set role to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your database user password
   - Add database name: `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`

### Step 3: Deploy to Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up or log in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   
   Click "Environment Variables" and add:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   
   NEXTAUTH_SECRET=generate-a-random-secret-here
   NEXTAUTH_URL=https://your-domain.vercel.app
   
   ADMIN_EMAIL=your-admin@email.com
   ADMIN_PASSWORD=your-secure-password
   
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_TO=where-to-receive@gmail.com
   ```

   **Important Notes:**
   - Generate a secure `NEXTAUTH_SECRET`: Run `openssl rand -base64 32` in terminal
   - `NEXTAUTH_URL` will be provided after first deployment (you can update it later)
   - Use strong passwords for production

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (usually 2-3 minutes)
   - You'll get a URL like `https://your-project.vercel.app`

5. **Update NEXTAUTH_URL**
   - Go to Project Settings → Environment Variables
   - Update `NEXTAUTH_URL` with your actual Vercel URL
   - Redeploy the project

### Step 4: Seed Production Database

```bash
# Update your local .env.local with production MongoDB URI temporarily
MONGODB_URI=your-production-mongodb-uri

# Run seed script
npm run seed

# Change .env.local back to local MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio
```

### Step 5: Test Your Deployment

1. Visit your Vercel URL
2. Check all sections load correctly
3. Test admin login at `/admin/login`
4. Test contact form
5. Test on mobile devices

## Option 2: Deploy to Netlify

### Step 1: Prepare for Netlify

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 2: Deploy

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Add environment variables (same as Vercel)
5. Click "Deploy site"

## Option 3: Deploy to Your Own Server

### Requirements
- Ubuntu/Debian server
- Node.js 18+
- MongoDB
- Nginx
- PM2

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### Step 2: Deploy Application

```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/yourusername/your-repo.git portfolio
cd portfolio

# Install dependencies
sudo npm install

# Create .env.local
sudo nano .env.local
# Add your environment variables

# Build application
sudo npm run build

# Start with PM2
sudo pm2 start npm --name "portfolio" -- start
sudo pm2 startup
sudo pm2 save
```

### Step 3: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Add:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 4: Set Up SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Post-Deployment

### 1. Custom Domain (Vercel)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable

### 2. Monitor Your Application

**Vercel:**
- Built-in analytics in dashboard
- Real-time logs
- Performance metrics

**Self-hosted:**
```bash
# View logs
pm2 logs portfolio

# Monitor
pm2 monit

# Restart
pm2 restart portfolio
```

### 3. Set Up Backups

**MongoDB Atlas:**
- Automatic backups included in free tier
- Configure backup schedule in Atlas dashboard

**Self-hosted:**
```bash
# Create backup script
sudo nano /usr/local/bin/backup-mongodb.sh
```

Add:
```bash
#!/bin/bash
mongodump --out /backups/mongodb/$(date +%Y%m%d)
find /backups/mongodb -type d -mtime +7 -exec rm -rf {} +
```

```bash
sudo chmod +x /usr/local/bin/backup-mongodb.sh

# Add to crontab (daily at 2 AM)
sudo crontab -e
0 2 * * * /usr/local/bin/backup-mongodb.sh
```

## Continuous Deployment

### Vercel (Automatic)
- Automatically deploys on every push to main branch
- Preview deployments for pull requests

### Manual Deployment
```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Restart
pm2 restart portfolio
```

## Troubleshooting

### Build Fails on Vercel

1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Test build locally: `npm run build`
4. Check Node.js version compatibility

### Database Connection Issues

1. Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
2. Check connection string format
3. Verify database user credentials
4. Test connection locally with production URI

### Admin Login Not Working

1. Verify `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your domain
3. Clear browser cookies
4. Check admin credentials in environment variables

### Contact Form Not Sending

1. Verify email credentials
2. Check Gmail App Password is correct
3. Test email configuration locally
4. Check Vercel function logs

## Performance Optimization

### 1. Image Optimization

- Use Next.js Image component (already implemented)
- Compress images before uploading
- Use WebP format when possible

### 2. Caching

Add to `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### 3. Database Indexing

Add indexes to frequently queried fields in MongoDB.

## Security Best Practices

1. **Never commit .env files**
   - Already in .gitignore
   - Use environment variables in production

2. **Use strong passwords**
   - Change default admin credentials
   - Use password manager

3. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

4. **Enable HTTPS**
   - Automatic on Vercel
   - Use Let's Encrypt for self-hosted

5. **Rate limiting**
   - Consider adding rate limiting to API routes
   - Use Vercel's built-in DDoS protection

## Monitoring and Analytics

### Add Google Analytics

1. Get tracking ID from Google Analytics
2. Add to `app/layout.tsx`:

```typescript
import Script from 'next/script';

// In layout component
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review MongoDB Atlas logs
3. Test locally with production environment variables
4. Check browser console for errors

---

**Your portfolio is now live! 🎉**

Remember to:
- Update content regularly
- Monitor performance
- Keep dependencies updated
- Backup your database
- Check analytics
