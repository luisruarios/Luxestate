# Quick Development Setup

## For New Developers

When you clone this repository, follow these steps to set up your local development environment:

### 1. Environment Configuration

1. **Copy environment example files:**
   ```bash
   # Root environment file
   cp .env.example .env

   # Frontend environment file
   cp frontend/real-estate-web/.env.production.example frontend/real-estate-web/.env.local
   ```

2. **Edit `.env` in the root directory:**
   ```bash
   # Update MongoDB connection string with your credentials
   MongoSettings__ConnectionString=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/?retryWrites=true&w=majority&appName=your-app

   # Keep these for local development (already set correctly)
   CORS_ORIGINS=http://localhost:3000
   FRONTEND_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. **Edit `frontend/real-estate-web/.env.local`:**
   ```bash
   # Use localhost backend for development
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

### 2. Database Setup

1. Create a [MongoDB Atlas](https://cloud.mongodb.com/) free account
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Update the `MongoSettings__ConnectionString` in your `.env` file

### 3. Start Development Servers

1. **Start Backend (from root directory):**
   ```bash
   cd backend/RealEstate.Api
   dotnet run
   ```
   Backend will be available at: http://localhost:5000

2. **Start Frontend (from root directory):**
   ```bash
   cd frontend/real-estate-web
   npm install
   npm run dev
   ```
   Frontend will be available at: http://localhost:3000

### 4. Verify Setup

Run the status check script:
```bash
node scripts/check-status.js
```

You should see both frontend and backend as "OK".

## Production Deployment

For production deployment instructions, see:
- [SETUP.md](./docs/SETUP.md) - Complete setup guide
- [CORS-GUIDE.md](./docs/CORS-GUIDE.md) - CORS configuration details

## Important Notes

- **Never commit `.env` files** - they contain sensitive credentials
- **Use localhost URLs for development** - production URLs are for deployed apps only
- **Database credentials** - Get your own MongoDB Atlas account, don't use production credentials
- **Environment separation** - Keep development and production configurations separate
