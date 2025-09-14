# 🚀 Luxestate Full-Stack Heroku Deployment Guide

Complete step-by-step instructions for deploying both the .NET Core backend and Next.js frontend to Heroku from a single repository.

## 📋 **Prerequisites**

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
- [Git](https://git-scm.com/) installed and configured
- Heroku account created
- MongoDB Atlas account (for production database)

## 🏗️ **Architecture Overview**

```
Luxestate Repository
├── backend/RealEstate.Api/     → Heroku App 1 (API)
├── frontend/real-estate-web/   → Heroku App 2 (Web)
└── Deployment files
```

We'll create **two separate Heroku applications**:
1. **Backend API** - .NET Core application
2. **Frontend Web** - Next.js application

---

## 🗄️ **Step 1: Setup MongoDB Atlas (Database)**

### **1.1 Create MongoDB Atlas Account**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project: "Luxestate"

### **1.2 Create Database Cluster**
1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select cloud provider and region (preferably same as Heroku)
4. Cluster name: `luxestate-cluster`
5. Click "Create"

### **1.3 Configure Database Access**
1. **Database Access** → **Add New Database User**
   - Username: `luxestate-api`
   - Password: Generate secure password (save it!)
   - Database User Privileges: `Read and write to any database`

2. **Network Access** → **Add IP Address**
   - Click "Allow Access from Anywhere" (`0.0.0.0/0`)
   - Comment: "Heroku Access"

### **1.4 Get Connection String**
1. Go to **Database** → **Connect**
2. Choose "Connect your application"
3. Driver: **C#/.NET** → Version: **2.13 or later**
4. Copy the connection string:
   ```
   mongodb+srv://luxestate-api:<password>@luxestate-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. **Save this connection string** - you'll need it later!

---

## 🛠️ **Step 2: Deploy Backend API to Heroku**

### **2.1 Create Backend Heroku App**
```bash
# Navigate to your project root
cd c:\Users\luisr\Downloads\real-estate-tech-test

# Login to Heroku
heroku login

# Create backend app
heroku create luxestate-api --region us

# Add buildpack for .NET Core
heroku buildpacks:set heroku/dotnet -a luxestate-api
```

### **2.2 Configure Backend Environment Variables**
```bash
# Set MongoDB connection string (replace with your actual connection string)
heroku config:set ConnectionStrings__DefaultConnection="mongodb+srv://luxestate-api:YOUR_PASSWORD@luxestate-cluster.xxxxx.mongodb.net/luxestate?retryWrites=true&w=majority" --app luxestate-api

# Set CORS origin (will be your frontend URL)
heroku config:set CORS_ORIGINS="https://luxestate-web.herokuapp.com" --app luxestate-api

# Set ASP.NET Core environment
heroku config:set ASPNETCORE_ENVIRONMENT=Production --app luxestate-api

# Enable detailed errors for debugging (optional)
heroku config:set ASPNETCORE_DETAILEDERRORS=true --app luxestate-api
```

**For PowerShell users, use double quotes and escape characters:**
```powershell
# Set MongoDB connection string (PowerShell version)
heroku config:set "ConnectionStrings__DefaultConnection=mongodb+srv://luxestate-api:YOUR_PASSWORD@luxestate-cluster.xxxxx.mongodb.net/luxestate?retryWrites=true&w=majority" --app luxestate-api

# Alternative: Use cmd from PowerShell
cmd /c 'heroku config:set "ConnectionStrings__DefaultConnection=mongodb+srv://luxestate-api:YOUR_PASSWORD@luxestate-cluster.xxxxx.mongodb.net/luxestate?retryWrites=true&w=majority" --app luxestate-api'
```


### **2.6 Deploy Backend**

```bash
# Deploy backend with .csproj at root (required by Heroku)
git subtree push --prefix=backend/RealEstate.Api heroku-backend main

# If this is the first time, you might need to:
heroku git:remote -a luxestate-api
git subtree push --prefix=backend/RealEstate.Api heroku main
```

**Alternative method using separate git repo:**
```bash
# Create a separate directory for backend deployment
mkdir backend-deploy
cp -r backend/* backend-deploy/
cd backend-deploy

# Initialize git and deploy
git init
git add .
git commit -m "Backend deployment"
heroku git:remote -a luxestate-api
git push heroku main
cd ..
```

---

## 🌐 **Step 3: Deploy Frontend to Heroku**

### **3.1 Create Frontend Heroku App**
```bash
# Create frontend app
heroku create luxestate-web --region us

# Add Node.js buildpack
heroku buildpacks:set heroku/nodejs -a luxestate-web
```

### **3.2 Configure Frontend Environment Variables**
```bash
# Set API URL (your backend Heroku app URL)
heroku config:set NEXT_PUBLIC_API_URL="https://luxestate-api.herokuapp.com" -a luxestate-web

# Set Node environment
heroku config:set NODE_ENV=production -a luxestate-web

# Optional: Analytics and monitoring
heroku config:set NEXT_PUBLIC_APP_ENV=production -a luxestate-web
```

### **3.3 Update Frontend Package.json**
Ensure `frontend/real-estate-web/package.json` has the correct scripts:
```json
{
  "name": "luxestate-web",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "heroku-postbuild": "npm run build"
  },
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
}
```

### **3.4 Create Frontend Procfile**
Create `frontend/real-estate-web/Procfile`:
```
web: npm start
```

### **3.5 Update Next.js Configuration**
Update `frontend/real-estate-web/next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure for Heroku deployment
  trailingSlash: false,
  poweredByHeader: false,
};

export default nextConfig;
```

### **3.6 Deploy Frontend**
```bash
# Deploy frontend using subtree
git subtree push --prefix=frontend/real-estate-web heroku-frontend main

# If this is the first time:
heroku git:remote -a luxestate-web
git subtree push --prefix=frontend/real-estate-web heroku main
```

**Alternative method:**
```bash
# Create separate directory for frontend deployment
mkdir frontend-deploy
cp -r frontend/real-estate-web/* frontend-deploy/
cd frontend-deploy

# Initialize git and deploy
git init
git add .
git commit -m "Frontend deployment"
heroku git:remote -a luxestate-web
git push heroku main
cd ..
```

---

## ⚙️ **Step 4: Configure CORS and Final Setup**

### **4.1 Update Backend CORS Configuration**
After getting your frontend URL, update the backend CORS settings:
```bash
# Update CORS to allow your frontend domain
heroku config:set CORS_ORIGINS="https://luxestate-web.herokuapp.com" -a luxestate-api

# Restart the backend app
heroku restart -a luxestate-api
```

### **4.2 Verify Backend API**
```bash
# Open backend API documentation
heroku open -a luxestate-api

# Test API endpoint
curl https://luxestate-api.herokuapp.com/api/properties
```

### **4.3 Verify Frontend**
```bash
# Open frontend application
heroku open -a luxestate-web
```

---

## 🎯 **Step 5: Custom Domains (Optional)**

### **5.1 Add Custom Domain to Backend**
```bash
# Add your API domain
heroku domains:add api.luxestate.com -a luxestate-api

# Get DNS target
heroku domains -a luxestate-api
```

### **5.2 Add Custom Domain to Frontend**
```bash
# Add your web domain
heroku domains:add www.luxestate.com -a luxestate-web
heroku domains:add luxestate.com -a luxestate-web

# Get DNS target
heroku domains -a luxestate-web
```

### **5.3 Configure DNS**
Add CNAME records in your DNS provider:
```
api.luxestate.com → YOUR-BACKEND-DNS-TARGET.herokudns.com
www.luxestate.com → YOUR-FRONTEND-DNS-TARGET.herokudns.com
luxestate.com → YOUR-FRONTEND-DNS-TARGET.herokudns.com
```

---

## 🔍 **Step 6: Monitoring and Troubleshooting**

### **6.1 View Logs**
```bash
# Backend logs
heroku logs --tail -a luxestate-api

# Frontend logs
heroku logs --tail -a luxestate-web

# View recent logs
heroku logs -n 200 -a luxestate-api
```

### **6.2 Common Issues and Solutions**

#### **Backend Issues:**
```bash
# Database connection issues
heroku config -a luxestate-api  # Check connection string

# Port binding issues
heroku logs --tail -a luxestate-api  # Check for port errors

# Memory issues
heroku ps:scale web=1:standard-1x -a luxestate-api  # Upgrade dyno
```

#### **Frontend Issues:**
```bash
# Build failures
heroku logs --tail -a luxestate-web

# API connection issues
heroku config -a luxestate-web  # Check NEXT_PUBLIC_API_URL

# Memory issues during build
heroku config:set NODE_OPTIONS="--max-old-space-size=4096" -a luxestate-web
```

### **6.3 Database Management**
```bash
# Connect to MongoDB Atlas via MongoDB Compass
# Use the connection string from Step 1.4

# Or use MongoDB shell
mongosh "mongodb+srv://luxestate-cluster.xxxxx.mongodb.net/luxestate" --username luxestate-api
```

---

## 📊 **Step 7: Performance and Scaling**

### **7.1 Scale Applications**
```bash
# Scale backend (if needed)
heroku ps:scale web=1:standard-1x -a luxestate-api

# Scale frontend (if needed)
heroku ps:scale web=1:standard-1x -a luxestate-web

# View current scaling
heroku ps -a luxestate-api
heroku ps -a luxestate-web
```

### **7.2 Add Monitoring**
```bash
# Add New Relic for monitoring (optional)
heroku addons:create newrelic:wayne -a luxestate-api
heroku addons:create newrelic:wayne -a luxestate-web

# Add Papertrail for logging
heroku addons:create papertrail:choklad -a luxestate-api
heroku addons:create papertrail:choklad -a luxestate-web
```

---

## 🎉 **DEPLOYMENT SUCCESSFUL!**

Your **Luxestate** application is now fully deployed and running on Heroku!

### **🌐 Live Application URLs:**
- **Frontend**: `https://luxestate-web-5f037f258020.herokuapp.com/`
- **Backend API**: `https://luxestate-api-9d55c3cb0537.herokuapp.com/`
- **API Documentation**: `https://luxestate-api-9d55c3cb0537.herokuapp.com/swagger`

### **✅ What Was Successfully Deployed:**
✅ **Backend API** - .NET Core with MongoDB Atlas integration
✅ **Frontend Web** - Next.js with responsive design and modern UI
✅ **Database** - MongoDB Atlas cloud database with sample data
✅ **CORS** - Properly configured cross-origin requests
✅ **SSL** - HTTPS enabled by default on Heroku
✅ **Environment Variables** - All production configurations set correctly

### **📊 Backend API Test:**
Your API is working perfectly! Test it with:
```bash
curl https://luxestate-api-9d55c3cb0537.herokuapp.com/api/properties
```

### **🔧 Key Configuration Applied:**
1. **MongoDB Connection**: URL-encoded password for special characters
2. **Environment Variables**:
   - `MongoSettings__ConnectionString` (Backend)
   - `NEXT_PUBLIC_API_URL` (Frontend)
   - `FRONTEND_URL` (Backend CORS)
3. **Correct Subtree Deployment**: `backend/RealEstate.Api` for .csproj at root

---

## ✅ **Step 8: Final Verification**

### **8.1 Test Complete Application**
1. **Visit Frontend**: `https://luxestate-web-5f037f258020.herokuapp.com/`
2. **Check API**: `https://luxestate-api-9d55c3cb0537.herokuapp.com/api/properties`
3. **Test Features**:
   - Property listing loads
   - Filtering works
   - Property details open
   - Images load correctly
   - Contact information displays

### **8.2 Application URLs**
```
Frontend: https://luxestate-web-5f037f258020.herokuapp.com
Backend API: https://luxestate-api-9d55c3cb0537.herokuapp.com
API Documentation: https://luxestate-api-9d55c3cb0537.herokuapp.com/swagger
```

---

## 🎉 **Deployment Complete!**

Your **Luxestate** application is now fully deployed on Heroku with:

✅ **Backend API** - .NET Core with MongoDB Atlas
✅ **Frontend Web** - Next.js with responsive design
✅ **Database** - MongoDB Atlas cloud database
✅ **CORS** - Properly configured cross-origin requests
✅ **SSL** - HTTPS enabled by default on Heroku
✅ **Monitoring** - Logs and performance tracking available

### **🔧 Maintenance Commands**
```bash
# Update backend
git subtree push --prefix=backend heroku-backend main

# Update frontend
git subtree push --prefix=frontend/real-estate-web heroku-frontend main

# View app status
heroku ps -a luxestate-api
heroku ps -a luxestate-web

# Restart apps
heroku restart -a luxestate-api
heroku restart -a luxestate-web
```

**🏆 Your Luxestate platform is now live and ready for users!**
