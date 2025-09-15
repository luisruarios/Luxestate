# 🛠️ Local Setup Guide

This guide provides **detailed step-by-step instructions** to run the Luxestate project locally.

## 📋 Prerequisites

### Required Software
1. **Node.js 18+** - [Download](https://nodejs.org/)
2. **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download)
3. **Git** - [Download](https://git-scm.com/)
4. **Docker** (optional, for local MongoDB) - [Download](https://docker.com/)

### Database Options (Production Only)

> **Note**: MongoDB is **only required for production deployment**. The application runs locally with sample data and doesn't need a database connection for evaluation.


#### Option A: Docker MongoDB (Recommended for Local Testing)
- **Docker** - [Download](https://docker.com/)
- Run MongoDB in a container:
  ```bash
  cd backend
  docker compose up -d
  ```
- This exposes MongoDB at `mongodb://localhost:27017` and creates a named volume for data persistence



## 🚀 Step-by-Step Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/luisruarios/Luxestate.git
cd Luxestate
```

## MongoDB
Run with Docker:
```bash
cd backend
docker compose up -d
```
This exposes Mongo at `mongodb://localhost:27017` and creates a named volume.


### Step 2: Start the Backend API

1. **Navigate to backend directory:**
   ```bash
   cd backend/RealEstate.Api
   ```

2. **Restore dependencies:**
   ```bash
   dotnet restore
   ```

3. **Start the API:**
   ```bash
   dotnet run
   ```

4. **Verify backend is running:**
   - Open browser: http://localhost:5000/api/properties
   - Should return JSON array of properties (uses sample data by default)

### Step 3: Start the Frontend (New Terminal)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend/real-estate-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Verify frontend is running:**
   - Open browser: http://localhost:3000
   - Should display the Luxestate homepage


Expected output:
```
✅ Frontend: OK (http://localhost:3000)
✅ Backend API: OK (http://localhost:5000/api/properties)
```

## 🧪 Running Tests

### Backend Tests
```bash
cd tests/RealEstate.Tests
dotnet test
```

### Frontend Tests
```bash
cd frontend/real-estate-web
npm test
```

## 🔧 Available Scripts

From project root:
```bash
# Start both frontend and backend
npm run dev

# Build both projects
npm run build

# Run all tests
npm run test

# Check application status
npm run check-status
```


## 🌐 Default URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/swagger (if available)

## 🔍 What to Test

### Core Functionality
1. **Property Listing**: Browse all properties on homepage
2. **Search & Filter**: Use search bar and filter options
3. **Property Details**: Click on any property for detailed view
4. **Responsive Design**: Test on different screen sizes
5. **API Endpoints**: Direct API access at localhost:5000/api/properties

### Advanced Features
1. **Real-time Filtering**: Multiple filter combinations
2. **Image Gallery**: Navigate through property photos
3. **Contact Information**: Owner contact details display
4. **Performance**: Page load times and smooth interactions

## 🚨 Troubleshooting

### Common Issues

#### Backend won't start
- **Check .NET installation**: `dotnet --version`
- **Verify MongoDB connection**: Check connection string in .env
- **Port conflict**: Ensure port 5000 is available

#### Frontend won't start
- **Check Node.js installation**: `node --version`
- **Clear node_modules**: `rm -rf node_modules && npm install`
- **Port conflict**: Ensure port 3000 is available

#### Database connection issues
- **For Local Development**: MongoDB connection is optional - app uses sample data
- **MongoDB Atlas**: Verify username, password, and cluster URL (production only)
- **Local MongoDB**: Ensure MongoDB service is running (production only)
- **Network**: Check firewall settings for database connections (production only)

#### "Cannot connect to API" error
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Ensure `.env` file is in the root directory

### Getting Help
- Check the [Architecture Documentation](docs/ARCHITECTURE.md)
- Review [API Documentation](docs/API.md)
- Examine error logs in terminal outputs

## ✨ Additional Features to Explore

- **Advanced Search**: Combine multiple filters
- **Property Types**: Different property categories
- **Price Ranges**: Dynamic price filtering
- **Location Search**: Geographic property search
- **Owner Information**: Detailed owner profiles
- **Responsive Design**: Mobile and tablet optimization

---

> **For Reviewers**: We can **skip these steps** for local evaluation. The application works with sample data without requiring a database.


### Step 2: Configure Environment Variables (Optional for Local Development)



If you want to test with a live database (optional):

#### Option B: MongoDB Atlas
- Free cloud database - no local installation required
- Create account at [MongoDB Atlas](https://cloud.mongodb.com/)

#### Option C: Local MongoDB
- Install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- Ensure MongoDB service is running

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file in the ROOT directory:**

   For **Docker MongoDB** (recommended for local testing):
   ```bash
   MongoSettings__ConnectionString=mongodb://localhost:27017
   MongoSettings__DatabaseName=luxestate
   MongoSettings__CollectionName=Properties
   ```

   For **MongoDB Atlas**:
   ```bash
   MongoSettings__ConnectionString=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/?retryWrites=true&w=majority
   MongoSettings__DatabaseName=luxestate
   MongoSettings__CollectionName=Properties
   ```

   For **Local MongoDB**:
   ```bash
   MongoSettings__ConnectionString=mongodb://localhost:27017
   MongoSettings__DatabaseName=luxestate
   MongoSettings__CollectionName=Properties
   ```

### Step 3: Start MongoDB with Docker (Optional)

> **Skip this step** if you're using sample data or MongoDB Atlas.

If you configured MongoDB with Docker in Step 2:

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Start MongoDB container:**
   ```bash
   docker compose up -d
   ```

3. **Verify MongoDB is running:**
   ```bash
   docker ps
   ```
   You should see `luxestate-mongodb` container running.
