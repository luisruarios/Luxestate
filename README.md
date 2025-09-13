# Luxestate — Premium Real Estate Platform

A comprehensive luxury real estate platform featuring automated property seeding, interactive property browsing, modern responsive design, and complete accessibility compliance. Built with premium branding and production-ready deployment capabilities.

## 🚀 Quick Start

1. **Start MongoDB**: `docker compose up -d` in `/backend`
2. **Start API**: `dotnet run` in `/backend/RealEstate.Api`
3. **Start Frontend**: `npm run dev` in `/frontend/real-estate-web`
4. **Visit**: Open [http://localhost:3000](http://localhost:3000) to view **Luxestate**

## ✨ Features & Capabilities

### � **Professional Branding**
- **Luxestate Brand**: Premium, memorable brand identity
- **Professional Logo**: Custom building icon with gradient design
- **Premium Typography**: Lato font family for professional appearance
- **Orange Theme**: Modern orange accent color (#f97316) with complementary palette
- **Dark Mode Default**: Sophisticated dark theme as primary experience
- **Contact Information**: Professional contact details (contact@luxestate.com)

### �🏠 **Enhanced Property System**
- **25 Diverse Properties** automatically seeded on startup
- **Multiple Property Types**: Penthouses, Villas, Lofts, Studios, Townhouses, Offices, Beach Houses, and more
- **Rich Property Details**: Multiple images (3-10 per property), amenities with icons, descriptions
- **Flexible Pricing**: Both sale and rental prices supported with Colombian Peso formatting
- **Professional Photography**: Curated Unsplash images for realistic property showcase
- **Amenity Icons**: Professional icons for each amenity (WiFi, Pool, Gym, Parking, etc.)
- **Capitalized Amenities**: Properly formatted amenity names for professional display

### 🎨 **Modern Frontend Experience**
- **Mobile-First Design**: Responsive design optimized for all devices (320px to 4K)
- **Interactive Property Cards**: Enhanced hover effects with hardware acceleration
- **Clickable Cards**: Entire property cards are clickable for better UX
- **Advanced Filtering**: Filter by name, address, and price range with live updates
- **Quick Preview Modals**: Essential property info with focus management
- **Individual Property Pages**: Dedicated pages with comprehensive details and mobile optimization
- **Image Slider**: Navigate through multiple property photos with smooth transitions
- **Load More**: Pagination with "Load More" functionality for better performance
- **Professional Animations**: Optimized Framer Motion animations with reduced complexity

### 🖼️ **Image Gallery System**
- **Interactive Slider**: Navigation arrows, dot indicators, and thumbnail grid
- **Smooth Animations**: Framer Motion powered transitions with performance optimization
- **Responsive Images**: Optimized for all device sizes with Next.js Image component
- **Fallback Handling**: Graceful error handling for missing images
- **Mobile Gestures**: Touch-friendly navigation with proper touch targets (44px minimum)
- **Darkened Overlays**: Enhanced text readability over images
- **Hardware Acceleration**: GPU-accelerated transforms for smooth performance

### 👥 **Owner Contact Management**
- **Complete Owner Profiles**: Name, email, phone, company information
- **Clickable Contact Info**: Direct phone calls and email composition
- **Professional Display**: Enhanced contact cards with proper formatting
- **Mobile Optimization**: Touch-friendly contact buttons with proper spacing

### ♿ **Accessibility Compliance (WCAG 2.1 AA)**
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Comprehensive ARIA labels, roles, and descriptions
- **Color Contrast**: 4.5:1 ratio compliance for all text elements
- **Focus Management**: Proper focus traps in modals and logical tab order
- **Semantic HTML**: Proper heading hierarchy and landmark structure
- **Mobile Accessibility**: 44px minimum touch targets and responsive focus indicators
- **Alternative Text**: Descriptive alt text for all images with context
- **Skip Navigation**: Semantic structure for assistive technology navigation

### 🔍 **SEO Optimization**
- **Complete Meta Tags**: Title, description, keywords, author, and viewport
- **Open Graph Integration**: Facebook and social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing with large image previews
- **Structured Data**: JSON-LD schema for real estate listings and business info
- **Dynamic Sitemap**: XML sitemap generation at `/sitemap.xml`
- **Robots.txt**: SEO-friendly crawling directives at `/robots.txt`
- **Canonical URLs**: Proper URL structure for search engine optimization
- **Page-Specific SEO**: Dynamic meta tags for individual property pages


### 🔄 **Automated Data Seeding**
- **Zero Manual Setup**: Properties and owners automatically created on first run
- **Fresh Data**: Database cleared and reseeded with enhanced data on each startup
- **Colombian Market**: Realistic addresses, pricing, and contact information for Colombian real estate
- **Diverse Property Types**: Wide range of property categories and price points

### 🏢 **Property Categories**
- **Luxury Properties**: Oceanfront penthouses, modern villas with pools
- **Mid-Range Options**: Downtown lofts, beachside apartments, garden complexes
- **Affordable Housing**: Studios, shared apartments, family homes
- **Commercial Spaces**: Modern offices, business suites
- **Vacation Properties**: Beach houses, waterfront cottages
- **Unique Properties**: Eco-friendly homes, artist warehouses, historic colonial homes, retirement communities


### 🌐 **Navigation & Routing**
- **Dynamic Routes**: SEO-friendly URLs for individual properties (`/property/[id]`)
- **Back Navigation**: Intuitive navigation between property list and detail views
- **Modal Quick View**: Fast property preview without leaving main page
- **Responsive Header**: Clean navigation with property title and address
- **Breadcrumb Navigation**: Clear navigation hierarchy for better UX
- **Mobile Navigation**: Touch-friendly navigation with proper spacing

### 🚀 **Deployment & Production Ready**
- **Heroku Optimized**: Complete deployment guide and configuration
- **Environment Configuration**: Proper environment variable setup
- **Build Optimization**: Next.js standalone output and image optimization
- **Git Integration**: Comprehensive .gitignore for deployment files
- **Production Build**: Tested and verified production build process
- **Performance Optimization**: Lazy loading, code splitting, and optimized bundles

### 📱 **Mobile Experience**
- **Mobile-First Design**: Designed primarily for mobile devices
- **Touch Gestures**: Swipe navigation and touch-friendly interactions
- **Responsive Breakpoints**: Optimized for phones, tablets, and desktops
- **Fast Loading**: Optimized images and lazy loading for mobile networks
- **Offline Handling**: Graceful degradation for poor network conditions

### 🔧 **Performance Features**
- **Hardware Acceleration**: GPU-accelerated animations and transforms
- **Lazy Loading**: Components and images loaded on demand
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component with responsive loading
- **Bundle Analysis**: Optimized bundle size and performance metrics
- **Caching**: Proper caching strategies for production deployment

## 📚 **Documentation**

- **Setup Instructions**: `docs/SETUP.md`
- **Architecture Overview**: `docs/ARCHITECTURE.md`
- **API Reference**: `docs/API.md`
- **Accessibility Report**: `ACCESSIBILITY-REPORT.md` - WCAG 2.1 compliance documentation

## 🏃‍♂️ **Getting Started**

The **Luxestate** application is designed for immediate use with no manual data entry required. Simply follow the quick start steps above and you'll have a fully populated luxury real estate platform with 25 diverse properties ready for browsing.

### **Frontend Features Available:**
- **Browse Properties**: Responsive grid layout with professional property cards
- **Advanced Filtering**: Filter by name, address, or price range with live updates
- **Quick Preview**: Click any property card to see a quick preview modal with focus management
- **Full Details**: Click "View Full Details" to navigate to individual property pages
- **Image Gallery**: View property image slider with navigation controls and thumbnails
- **Contact Owners**: Direct phone and email links for property owners
- **Theme Toggle**: Switch between dark and light themes with persistence
- **Mobile Optimized**: Fully responsive design optimized for all devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Load More**: Pagination with smooth loading for better performance

### **Backend Features Available:**
- **Property API**: RESTful API with comprehensive property endpoints
- **Automated Seeding**: 25 diverse properties automatically created on startup
- **MongoDB Integration**: Robust database with proper indexing and validation
- **Swagger Documentation**: Interactive API documentation at `/swagger`
- **Data Validation**: FluentValidation for robust data integrity
- **CORS Configuration**: Properly configured for frontend integration

## 🎯 **Key Improvements & Features**

### **✅ Recent Enhancements:**
- **Professional Branding**: Rebranded to "Luxestate" with premium identity
- **WCAG 2.1 AA Compliance**: Full accessibility compliance with comprehensive testing
- **SEO Optimization**: Complete meta tags, structured data, sitemap, and robots.txt
- **Mobile Optimization**: Enhanced mobile experience with proper touch targets
- **Performance Optimization**: Hardware acceleration and optimized animations
- **Dark Theme Default**: Professional dark mode as primary experience
- **Deployment Ready**: Complete Heroku deployment configuration and guides
- **Production Build**: Tested and optimized for production deployment
- **Enhanced UX**: Clickable property cards, improved modal experience, better navigation

### **🛡️ Quality Assurance:**
- **Build Tested**: No compilation errors or warnings
- **Accessibility Tested**: WCAG 2.1 AA compliance verified
- **Mobile Tested**: Responsive design tested across devices
- **Performance Tested**: Optimized loading and smooth animations
- **SEO Tested**: Search engine optimization verified


**Live Demo URL**: ``

---

**🏆 Luxestate** - Where Premium Real Estate Meets Modern Technology
