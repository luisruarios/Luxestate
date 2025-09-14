# 🏠 Luxestate - Premium Real Estate Platform

A modern, full-stack real estate application built with **Next.js 14**, **ASP.NET Core 8**, and **MongoDB**. Features responsive design, advanced property filtering, and production-ready deployment.

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+
- **.NET 8.0** SDK  
- **Git**

### Setup Instructions

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd real-estate-tech-test
   ```

2. **Run setup script**
   ```bash
   # Windows
   setup.bat
   
   # Linux/macOS  
   chmod +x setup.sh && ./setup.sh
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Docs: http://localhost:5000/swagger

## 🎯 Available Commands

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start frontend only
npm run dev:backend      # Start backend only

# Building
npm run build           # Build both applications
npm run test            # Run all tests

# Deployment
npm run deploy:frontend # Deploy frontend to Heroku
npm run deploy:backend  # Deploy backend to Heroku
```

## � Project Structure

```
real-estate-tech-test/
├── frontend/real-estate-web/    # Next.js React app
│   ├── app/                     # App Router pages
│   ├── components/              # UI components
│   ├── store/                   # Redux state
│   └── __tests__/               # Frontend tests
├── backend/RealEstate.Api/      # ASP.NET Core API
│   ├── Controllers/             # API endpoints
│   ├── Services/                # Business logic
│   ├── Repositories/            # Data access
│   └── Domain/                  # Entities
├── tests/RealEstate.Tests/      # Backend tests
└── docs/                        # Documentation
```

## 🌍 Environment Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_ENV=development
```

### Backend (appsettings.Development.json)
```json
{
  "MongoSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "luxestate",
    "CollectionName": "Properties"
  },
  "CorsOrigins": ["http://localhost:3000"]
}
```

## ✨ Key Features

- 🔍 **Advanced Property Search** with filtering
- 📱 **Responsive Design** for all devices  
- 🏗️ **Clean Architecture** with separation of concerns
- � **Type Safety** with TypeScript
- 📊 **Unit Testing** coverage
- 🌐 **PWA Support** with manifest
- 📖 **API Documentation** with Swagger
- 🚀 **Production Ready** deployment

## 🏗️ Architecture

### Backend (ASP.NET Core 8)
- Clean Architecture with Repository pattern
- MongoDB with optimized queries
- FluentValidation for input validation
- Comprehensive logging and error handling
- CORS configuration for cross-origin requests

### Frontend (Next.js 14)
- App Router for modern routing
- Redux Toolkit for state management
- Tailwind CSS for styling
- TypeScript for type safety
- PWA features for app-like experience

## � Deployment

### Current Production URLs
- **Frontend**: https://luxestate-web-d88c31e0b763.herokuapp.com
- **Backend**: https://luxestate-api-dbbf54d6d2c4.herokuapp.com

### Heroku Deployment
- Configured for automatic deployment
- Environment variables managed through Heroku
- MongoDB Atlas integration
- Build optimization for production

## 📝 Best Practices

✅ **Clean Code** principles  
✅ **SOLID** design patterns  
✅ **Error Handling** with logging  
✅ **Input Validation** client & server  
✅ **Security** headers and CORS  
✅ **Performance** optimization  
✅ **Responsive** design  
✅ **Accessibility** compliance  

## 🧪 Testing

- **Backend**: NUnit with comprehensive coverage
- **Frontend**: Jest with React Testing Library
- **Integration**: API endpoint testing
- **E2E**: Component and user flow testing

## 📚 Documentation

- [Setup Guide](docs/SETUP.md)
- [Architecture Overview](docs/ARCHITECTURE.md)  
- [API Reference](docs/API.md)

## 🆘 Support

For questions or issues:
- 📖 Check the [docs/](docs/) folder
- 🐛 Create an issue in the repository
- 📧 Contact: support@luxestate.com

---

**Luxestate** - *Discover your dream property* 🏡
