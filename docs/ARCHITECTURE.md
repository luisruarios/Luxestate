# Architecture

We apply a clean, layered approach inside a single API project:

- **Domain**: Core entity `Property` with enhanced owner contact information.
- **DTOs**: Wire formats `PropertyDto` & `CreatePropertyDto` with nested owner data.
- **Repository**: `IPropertyRepository` + `PropertyRepository` (MongoDB driver).
- **Service**: `IPropertyService` + `PropertyService` for business logic and mapping.
- **Controller**: `PropertiesController` exposes REST endpoints.

This keeps controllers thin, business logic testable, and persistence swappable.

## Frontend Architecture

**Next.js App Router** with modern React patterns:
- **App Router**: Dynamic routing with `/property/[id]` for individual property pages
- **Client Components**: Interactive features with `'use client'` directive
- **State Management**: Redux Toolkit for property filtering and global state
- **Styling**: Tailwind CSS with custom utilities and responsive design
- **Animations**: Framer Motion for smooth transitions and image slider
- **Component Structure**:
  - `PropertyList.js`: Main property grid with filtering
  - `PropertyCard`: Individual property preview cards
  - `PropertyDetailModal`: Quick preview modal with basic info
  - `app/property/[id]/page.js`: Full property detail page with image slider

## UI/UX Features
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Interactive Elements**: Hover effects, smooth animations, loading states
- **Image Gallery**: Advanced slider with navigation arrows, indicators, and thumbnails
- **Progressive Disclosure**: Modal for quick preview, dedicated page for full details
- **Contact Integration**: Direct phone and email links with proper `tel:` and `mailto:` protocols

## Endpoints
- `GET /api/properties?name=&address=&minPrice=&maxPrice=`
- `GET /api/properties/{id}`
- `POST /api/properties`

## Data Seeding
Enhanced automatic seeding system:
- **25 Diverse Properties**: Various types, sizes, and price ranges
- **Rich Media**: Multiple high-quality images per property (3-10 each)
- **Complete Owner Profiles**: Name, contact info, company details, profile images
- **Realistic Data**: Colombian addresses, market-appropriate pricing, professional amenities

## Validation
FluentValidation enforces basic constraints on creation with enhanced property and owner data validation.

## Testing
- Backend: NUnit tests focused on service logic (mocking repos).
- Frontend: Testing Library verifies key UI elements render.

## Performance
- **Server-side filtering** in MongoDB via indexed fields (add indexes in production: name, addressProperty, priceProperty).
- **Network optimization**: List endpoint returns minimal DTOs; detail fetched on demand.
- **Image optimization**: Proper error handling and fallbacks for missing images.
- **Client-side state**: Redux for efficient filtering without API calls.
- **Smooth animations**: Framer Motion with optimized transitions.
