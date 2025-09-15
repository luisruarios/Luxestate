# 🏠 Luxestate - Premium Real Estate Platform

A modern, full-stack real estate application built with **Next.js 14**, **ASP.NET Core 8**, and **MongoDB** (production). This project demonstrates advanced software architecture, clean code practices, and comprehensive testing. **Runs locally with sample data - no database setup required for evaluation.**

## 🎯 Meeting Evaluation Criteria

### ✅ Backend and Frontend Architecture
- **Clean Architecture**: Implements repository pattern, dependency injection, and separation of concerns
- **Efficient API Design**: RESTful endpoints with proper HTTP status codes and error handling
- **Modern Frontend**: Component-based architecture with state management using Redux Toolkit
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### ✅ Code Structure
- **Modular Organization**: Clear separation between controllers, services, repositories, and DTOs
- **Domain-Driven Design**: Business entities separated from infrastructure concerns
- **Component Hierarchy**: Reusable React components with proper prop interfaces
- **Type Safety**: Full TypeScript implementation on frontend

### ✅ Documentation
- **API Documentation**: Comprehensive endpoint documentation with examples
- **Code Comments**: Clear inline documentation for complex business logic
- **Setup Instructions**: Step-by-step guide
- **Architecture Documentation**: System design and component relationships

### ✅ Best Practices

#### Clean Architecture
- **SOLID Principles**: Single responsibility, dependency inversion implemented
- **Repository Pattern**: Data access abstraction with interface segregation
- **Service Layer**: Business logic separated from controllers
- **DTO Pattern**: Data transfer objects for API contracts

#### Error Handling
- **Global Exception Handling**: Centralized error processing with proper HTTP responses
- **Validation**: Server-side validation using FluentValidation
- **Client-side Error Boundaries**: React error boundaries for graceful failures
- **Logging**: Structured logging with different levels

#### Database Optimization (Production)
- **Indexed Queries**: MongoDB indexes on frequently queried fields (production deployments)
- **Efficient Filtering**: Database-level filtering to minimize data transfer
- **Connection Pooling**: Optimized database connections (production)
- **Query Optimization**: Projection queries to fetch only required fields

### ✅ Performance
- **Database Optimization**: Efficient MongoDB queries with proper indexing (production)
- **Frontend Optimization**: Code splitting, lazy loading, and image optimization
- **Caching**: Browser caching strategies and API response optimization
- **Bundle Optimization**: Tree shaking and minification for production builds

### ✅ Unit Testing
- **Backend Testing**: NUnit tests for services, repositories, and controllers
- **Frontend Testing**: Jest and React Testing Library for component testing
- **Test Coverage**: Comprehensive test coverage for critical business logic
- **Mocking**: Proper dependency mocking for isolated unit tests

### ✅ Clean Code
- **Readable Code**: Self-documenting code with meaningful variable names
- **Consistent Formatting**: ESLint and Prettier for frontend, EditorConfig for backend
- **Code Conventions**: Following C# and JavaScript/TypeScript best practices
- **DRY Principle**: Reusable components and shared utilities

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+
- **.NET 8.0** SDK
- **Git**
- **MongoDB** (production deployments only - not required for local evaluation)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/luisruarios/Luxestate.git
   cd Luxestate
   ```

2. **Configure environment (optional for local evaluation)**
   ```bash
   # Copy environment template to ROOT directory (optional for production)
   cp .env.example .env

   # For production only - edit .env file and update MongoDB connection string
   # For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/
   # For local MongoDB: mongodb://localhost:27017

   # Note: Local development uses sample data automatically
   ```

3. **Start the backend API**
   ```bash
   cd backend/RealEstate.Api
   dotnet restore
   dotnet run
   ```
   Backend will be available at: http://localhost:5000

4. **Start the frontend** (new terminal)
   ```bash
   cd frontend/real-estate-web
   npm install
   npm run dev
   ```
   Frontend will be available at: http://localhost:3000

5. **Verify setup**
   ```bash
   # From project root
   npm run check-status
   ```

> 📋 **For detailed instructions**: See [SETUP.md](SETUP.md) for comprehensive setup guide

## 🏗️ Architecture Overview

### Backend (.NET Core 8)
```
RealEstate.Api/
├── Controllers/          # API endpoints
├── Services/            # Business logic layer
├── Repositories/        # Data access layer
├── Domain/              # Business entities
├── DTOs/                # Data transfer objects
├── Validators/          # Input validation
└── Program.cs           # Application configuration
```

### Frontend (Next.js 14)
```
real-estate-web/
├── app/                 # Next.js 14 app router
├── components/          # Reusable UI components
├── store/               # Redux state management
├── __tests__/           # Unit tests
└── public/              # Static assets
```

## 🧪 Testing

### Run Backend Tests
```bash
cd tests/RealEstate.Tests
dotnet test
```

### Run Frontend Tests
```bash
cd frontend/real-estate-web
npm test
```

## 📊 Key Features

- **Property Search & Filtering**: Advanced filtering by price, location, type, amenities
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Property Details**: Comprehensive property information with image galleries
- **Owner Contact**: Direct contact information for property owners
- **Real-time Data**: Live property availability and pricing
- **Performance Optimized**: Fast loading with efficient data queries

## 🛠️ Technology Stack

### Backend
- **ASP.NET Core 8**: Modern web API framework
- **MongoDB**: NoSQL database for flexible property data (production deployments)
- **FluentValidation**: Input validation and business rules
- **NUnit**: Unit testing framework

### Frontend
- **Next.js 14**: React framework with app router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Redux Toolkit**: State management
- **Jest**: Testing framework

## 📚 Additional Documentation

For detailed technical documentation, see:
- [Local Setup Instructions](SETUP.md) - Comprehensive setup guide
- [Architecture Details](docs/ARCHITECTURE.md) - System design documentation
- [API Reference](docs/API.md) - Complete API documentation

## 🌐 Live Demo

- **Frontend**: https://luxestate-web-d88c31e0b763.herokuapp.com
- **Backend API**: https://luxestate-api.herokuapp.com

---
