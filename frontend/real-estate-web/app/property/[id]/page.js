'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  MapPinIcon,
  HomeIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOffice2Icon,
  WifiIcon,
  TvIcon,
  FireIcon,
  ShieldCheckIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import Navbar from '../../../components/Navbar';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchProperty(params.id);
    }
  }, [params.id]);

  // Update document head when property loads
  useEffect(() => {
    if (property) {
      document.title = `${property.name} | Luxestate Premium Properties`;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content',
          `${property.name} - ${property.description || 'Premium property'} located at ${property.addressProperty}. ${property.bedrooms ? `${property.bedrooms} bedrooms` : ''} ${property.bathrooms ? `${property.bathrooms} bathrooms` : ''}.`
        );
      }

      // Add structured data for property
      const existingScript = document.querySelector('script[data-property-ld]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-property-ld', 'true');
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": property.name,
        "description": property.description,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": property.addressProperty
        },
        "floorSize": property.area ? {
          "@type": "QuantitativeValue",
          "value": property.area,
          "unitCode": "MTK"
        } : undefined,
        "numberOfRooms": property.bedrooms,
        "numberOfBathroomsTotal": property.bathrooms,
        "yearBuilt": property.yearBuilt,
        "offers": {
          "@type": "Offer",
          "price": property.priceProperty || property.rentProperty,
          "priceCurrency": "COP"
        },
        "image": property.images || [property.image]
      });
      document.head.appendChild(script);
    }
  }, [property]);

  const fetchProperty = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`);
      if (!response.ok) {
        throw new Error('Property not found');
      }
      const data = await response.json();
      setProperty(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Function to get appropriate icon for amenity
  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();

    if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return WifiIcon;
    if (amenityLower.includes('tv') || amenityLower.includes('television')) return TvIcon;
    if (amenityLower.includes('pool') || amenityLower.includes('swimming')) return StarIcon;
    if (amenityLower.includes('parking') || amenityLower.includes('garage') || amenityLower.includes('car')) return BuildingOfficeIcon;
    if (amenityLower.includes('gym') || amenityLower.includes('fitness')) return HomeIcon;
    if (amenityLower.includes('security') || amenityLower.includes('guard')) return ShieldCheckIcon;
    if (amenityLower.includes('heating') || amenityLower.includes('fireplace')) return FireIcon;
    if (amenityLower.includes('balcony') || amenityLower.includes('terrace') || amenityLower.includes('garden')) return HomeIcon;
    if (amenityLower.includes('elevator') || amenityLower.includes('lift')) return BuildingOfficeIcon;
    if (amenityLower.includes('laundry') || amenityLower.includes('washing')) return StarIcon;
    return StarIcon; // Default icon
  };  // Function to capitalize amenity name
  const capitalizeAmenity = (amenity) => {
    return amenity
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const nextImage = () => {
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-300">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="text-red-500 dark:text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">Property Not Found</h1>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  if (!property) return null;

  const images = property.images && property.images.length > 0 ? property.images :
                 property.image ? [property.image] : [];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <Navbar />

      {/* Header */}
      <header className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-lg shadow-sm border-b border-white/20 dark:border-neutral-700/30">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <motion.button
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors self-start"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium">Back to Properties</span>
            </motion.button>
            <div className="text-left sm:text-right">
              <h1 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-gray-800 dark:text-gray-100 break-words">{property.name}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center sm:justify-end">
                <MapPinIcon className="w-4 h-4 mr-1 text-primary-500 flex-shrink-0" />
                <span className="break-words">{property.addressProperty}</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Image Slider */}
          <div className="space-y-4 order-1 lg:order-1">
            {images.length > 0 && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]}
                        alt={`${property.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </AnimatePresence>

                    {images.length > 1 && (
                      <>
                        <motion.button
                          onClick={prevImage}
                          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full hover:bg-black/70 transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                        <motion.button
                          onClick={nextImage}
                          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full hover:bg-black/70 transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>

                        {/* Image indicators */}
                        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageIndex
                                  ? 'bg-white scale-125'
                                  : 'bg-white/50 hover:bg-white/75'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Image thumbnails */}
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-1 sm:gap-2">
                      {images.slice(0, 4).map((image, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative h-16 sm:h-20 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? 'border-primary-500 shadow-md'
                              : 'border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img
                            src={image}
                            alt={`${property.name} - Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Property Information */}
          <motion.div
            className="space-y-4 sm:space-y-6 order-2 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Price */}
            <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-lg border border-white/30 dark:border-neutral-700/40">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-600 dark:text-white mb-3 break-words">
                {property.priceProperty && formatPrice(property.priceProperty)}
                {!property.priceProperty && property.rentProperty && formatPrice(property.rentProperty)}
                {!property.priceProperty && !property.rentProperty && 'Price on request'}
              </div>
              {property.propertyType && (
                <span className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-sm px-3 py-1 rounded-full font-semibold">
                  {property.propertyType}
                </span>
              )}
            </div>

            {/* Basic Details */}
            <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-lg border border-white/30 dark:border-neutral-700/40">
              <h3 className="text-lg font-heading font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Property Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {property.bedrooms && (
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50/50 dark:bg-neutral-700/30">
                    <HomeIcon className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-800 dark:text-neutral-100">{property.bedrooms}</div>
                      <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Bedrooms</div>
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50/50 dark:bg-neutral-700/30">
                    <BuildingOfficeIcon className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-800 dark:text-neutral-100">{property.bathrooms}</div>
                      <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Bathrooms</div>
                    </div>
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50/50 dark:bg-neutral-700/30">
                    <div className="w-5 h-5 text-accent-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold">m²</span>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-800 dark:text-neutral-100">{property.area}</div>
                      <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Square meters</div>
                    </div>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50/50 dark:bg-neutral-700/30">
                    <CalendarIcon className="w-5 h-5 text-accent-500 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-800 dark:text-neutral-100">{property.yearBuilt}</div>
                      <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Year built</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-lg border border-white/30 dark:border-neutral-700/40">
                <h3 className="text-lg font-heading font-semibold text-neutral-800 dark:text-neutral-100 mb-3">Description</h3>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium break-words">{property.description}</p>
              </div>
            )}

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-lg border border-white/30 dark:border-neutral-700/40">
                <h3 className="text-lg font-heading font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.amenities.map((amenity, index) => {
                    const IconComponent = getAmenityIcon(amenity);
                    return (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3 bg-neutral-100 dark:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300 text-sm px-3 py-2.5 rounded-lg font-semibold"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <IconComponent className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <span className="break-words">{capitalizeAmenity(amenity)}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Contact Information */}
            {property.owner && (property.owner.name || property.owner.email || property.owner.phone) && (
              <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-lg border border-white/30 dark:border-neutral-700/40">
                <h3 className="text-lg font-heading font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {property.owner.name && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {property.owner.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-neutral-800 dark:text-neutral-100 break-words">{property.owner.name}</div>
                        {property.owner.company && (
                          <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300 break-words">{property.owner.company}</div>
                        )}
                      </div>
                    </div>
                  )}
                  {property.owner.phone && (
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      <a
                        href={`tel:${property.owner.phone}`}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-semibold break-all"
                      >
                        {property.owner.phone}
                      </a>
                    </div>
                  )}
                  {property.owner.email && (
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                      <a
                        href={`mailto:${property.owner.email}`}
                        className="text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 transition-colors font-semibold break-all min-w-0"
                      >
                        {property.owner.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
