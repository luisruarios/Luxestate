#!/bin/bash

# Real Estate Application Setup Script
# This script sets up the development environment for both frontend and backend

echo "🏠 Setting up Luxestate Real Estate Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if .NET is installed  
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET is not installed. Please install .NET 8.0+ first."
    exit 1
fi

# Function to copy environment file if it doesn't exist
copy_env_file() {
    if [ ! -f "$1" ]; then
        if [ -f "$2" ]; then
            cp "$2" "$1"
            echo "✅ Created $1 from template"
        else
            echo "❌ Template file $2 not found"
        fi
    else
        echo "ℹ️  $1 already exists"
    fi
}

# Copy environment files
echo "📝 Setting up environment files..."
copy_env_file ".env" ".env.example"
copy_env_file "frontend/real-estate-web/.env.local" "frontend/real-estate-web/.env.development"
copy_env_file "backend/RealEstate.Api/appsettings.Development.json" "backend/RealEstate.Api/appsettings.Development.json"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend/real-estate-web
if [ -f "package.json" ]; then
    npm install
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Frontend package.json not found"
    exit 1
fi
cd ../..

# Restore backend dependencies
echo "📦 Restoring backend dependencies..."
cd backend/RealEstate.Api
if [ -f "RealEstate.Api.csproj" ]; then
    dotnet restore
    echo "✅ Backend dependencies restored"
else
    echo "❌ Backend project file not found"
    exit 1
fi
cd ../..

# Install test dependencies
echo "📦 Installing test dependencies..."
cd tests/RealEstate.Tests
if [ -f "RealEstate.Tests.csproj" ]; then
    dotnet restore
    echo "✅ Test dependencies restored"
else
    echo "❌ Test project file not found"
fi
cd ../..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update MongoDB connection string in your environment files"
echo "2. Start the backend: npm run dev:backend"
echo "3. Start the frontend: npm run dev:frontend"
echo "4. Visit http://localhost:3000 to see the application"
echo ""
echo "💡 Available commands:"
echo "  npm run dev:frontend   - Start frontend development server"
echo "  npm run dev:backend    - Start backend development server"
echo "  npm run dev            - Start both frontend and backend"
echo "  npm run test:frontend  - Run frontend tests"
echo "  npm run test:backend   - Run backend tests"
echo "  npm run build:frontend - Build frontend for production"
echo "  npm run build:backend  - Build backend for production"