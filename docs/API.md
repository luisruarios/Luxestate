# API Reference

## GET /api/properties
Query params:
- `name` (string, optional) — case-insensitive contains match
- `address` (string, optional) — case-insensitive contains match for addressProperty
- `minPrice` (decimal, optional) — minimum price filter
- `maxPrice` (decimal, optional) — maximum price filter

**200 OK**
```json
[
  {
    "id": "string",
    "idOwner": "string",
    "name": "string",
    "addressProperty": "string",
    "description": "string",
    "priceProperty": 0,
    "rentProperty": 0,
    "bedrooms": 0,
    "bathrooms": 0,
    "area": 0,
    "propertyType": "string",
    "images": ["string"],
    "amenities": ["string"],
    "owner": {
      "name": "string",
      "email": "string",
      "phone": "string",
      "whatsApp": "string",
      "company": "string",
      "profileImage": "string",
      "isAgent": false,
      "isVerified": true
    },
    "yearBuilt": 0,
    "isAvailable": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "image": "string"
  }
]
```

## GET /api/properties/{id}
**200 OK** — Complete property DTO with all details
**404 Not Found** — when property doesn't exist

Returns the same structure as the array item above, with full property details including:
- Complete image gallery (`images` array)
- Full property description
- All amenities
- Complete owner contact information
- Property specifications (bedrooms, bathrooms, area, year built)

## POST /api/properties
Body (`CreatePropertyDto`):
```json
{
  "idOwner": "string",
  "name": "string",
  "addressProperty": "string",
  "description": "string",
  "priceProperty": 123.45,
  "rentProperty": 123.45,
  "bedrooms": 0,
  "bathrooms": 0,
  "area": 0,
  "propertyType": "string",
  "images": ["string"],
  "amenities": ["string"],
  "ownerName": "string",
  "ownerEmail": "string",
  "ownerPhone": "string",
  "ownerWhatsApp": "string",
  "ownerCompany": "string",
  "ownerProfileImage": "string",
  "isOwnerAgent": false,
  "isOwnerVerified": true,
  "yearBuilt": 0,
  "isAvailable": true,
  "image": "string"
}
```
**201 Created** with created DTO and `Location` header.

## Data Seeding
The API automatically seeds 25 diverse properties on startup if the database is empty. Each property includes:
- Multiple high-quality images (3-10 per property)
- Complete owner contact information
- Realistic Colombian real estate data
- Various property types and price ranges
- Rich amenities and descriptions

## CORS Configuration
The API is configured to accept requests from:
- `http://localhost:3000`
- `http://localhost:3001`

This accommodates different Next.js development server ports.
