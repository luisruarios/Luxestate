@echo off
REM Real Estate Application Setup Script for Windows
REM This script sets up the development environment for both frontend and backend

echo 🏠 Setting up Luxestate Real Estate Application...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

REM Check if .NET is installed
dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ .NET is not installed. Please install .NET 8.0+ first.
    exit /b 1
)

echo 📝 Setting up environment files...

REM Copy environment files if they don't exist
if not exist ".env" (
    if exist ".env.example" (
        copy ".env.example" ".env"
        echo ✅ Created .env from template
    ) else (
        echo ❌ Template file .env.example not found
    )
) else (
    echo ℹ️  .env already exists
)

if not exist "frontend\real-estate-web\.env.local" (
    if exist "frontend\real-estate-web\.env.development" (
        copy "frontend\real-estate-web\.env.development" "frontend\real-estate-web\.env.local"
        echo ✅ Created frontend .env.local from template
    )
) else (
    echo ℹ️  frontend\.env.local already exists
)

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend\real-estate-web
if exist "package.json" (
    npm install
    if %errorlevel% equ 0 (
        echo ✅ Frontend dependencies installed
    ) else (
        echo ❌ Failed to install frontend dependencies
        exit /b 1
    )
) else (
    echo ❌ Frontend package.json not found
    exit /b 1
)
cd ..\..

REM Restore backend dependencies
echo 📦 Restoring backend dependencies...
cd backend\RealEstate.Api
if exist "RealEstate.Api.csproj" (
    dotnet restore
    if %errorlevel% equ 0 (
        echo ✅ Backend dependencies restored
    ) else (
        echo ❌ Failed to restore backend dependencies
        exit /b 1
    )
) else (
    echo ❌ Backend project file not found
    exit /b 1
)
cd ..\..

REM Install test dependencies
echo 📦 Installing test dependencies...
cd tests\RealEstate.Tests
if exist "RealEstate.Tests.csproj" (
    dotnet restore
    if %errorlevel% equ 0 (
        echo ✅ Test dependencies restored
    ) else (
        echo ❌ Failed to restore test dependencies
    )
) else (
    echo ❌ Test project file not found
)
cd ..\..

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Update MongoDB connection string in your environment files
echo 2. Start the backend: npm run dev:backend
echo 3. Start the frontend: npm run dev:frontend
echo 4. Visit http://localhost:3000 to see the application
echo.
echo 💡 Available commands:
echo   npm run dev:frontend   - Start frontend development server
echo   npm run dev:backend    - Start backend development server
echo   npm run dev            - Start both frontend and backend
echo   npm run test:frontend  - Run frontend tests
echo   npm run test:backend   - Run backend tests
echo   npm run build:frontend - Build frontend for production
echo   npm run build:backend  - Build backend for production

pause
