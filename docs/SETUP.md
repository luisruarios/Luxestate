# Setup Instructions

## Prerequisites
- .NET 8 SDK
- Docker (for MongoDB) or local MongoDB 7+
- Node 18+ and npm

## MongoDB
Run with Docker:
```bash
cd backend
docker compose up -d
```
This exposes Mongo at `mongodb://localhost:27017` and creates a named volume.

## API
```bash
cd backend/RealEstate.Api
dotnet restore
dotnet run
```
Copy the HTTP URL from the console (e.g., `http://localhost:5000/`).

## Frontend
```bash
cd frontend/real-estate-web
npm install
# edit .env.local and set NEXT_PUBLIC_API_URL to your API URL
npm run dev
```

## Seeding Sample Data
Sample data is automatically seeded when the API starts up. If the database is empty, it will create 25 sample properties with real estate images from Unsplash, complete owner profiles, amenities, and realistic pricing.

The seeded data includes:
- **25 diverse properties** (Penthouses, Villas, Lofts, Studios, Offices, etc.)
- **Multiple images per property** (3-10 high-quality images each)
- **Complete owner contact information** (Name, email, phone, company)
- **Rich amenities and descriptions**
- **Colombian real estate market pricing**

For manual seeding, you can also use the `Seed/seed.http` file or POST from Swagger.

## Frontend Features
Once the application is running, you can:

1. **Browse Properties**: View all 25 properties in a responsive grid
2. **Filter Properties**: Use the search filters for name, address, or price range
3. **Quick Preview**: Click any property card to see a modal with basic information
4. **Full Details**: Click "See Full Details" to navigate to individual property pages
5. **Image Gallery**: Navigate through property photos with an interactive slider
6. **Contact Owners**: Click phone numbers or email addresses to contact property owners directly

## CORS Configuration
The API is configured to accept requests from both `localhost:3000` and `localhost:3001` to accommodate different Next.js development server ports.

For detailed CORS configuration and troubleshooting, see [CORS-GUIDE.md](./CORS-GUIDE.md).

**Quick Setup:**
- Development: CORS automatically allows localhost connections
- Production: Set `CORS_ORIGINS` environment variable to your frontend URL
