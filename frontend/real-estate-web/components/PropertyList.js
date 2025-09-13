'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPinIcon,
  EyeIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import {
  fetchProperties,
  selectFilteredProperties,
  selectPropertiesLoading,
  selectPropertiesError
} from '../store/slices/propertiesSlice';
import FilterBar from './PropertyFilterBar';

const PROPERTIES_PER_PAGE = 6;

const PropertyList = () => {
  const dispatch = useDispatch();
  const properties = useSelector(selectFilteredProperties);
  const loading = useSelector(selectPropertiesLoading);
  const error = useSelector(selectPropertiesError);

  const [filters, setFilters] = useState({
    name: '',
    address: '',
    minPrice: '',
    maxPrice: ''
  });

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PROPERTIES_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // Filter properties based on local filters
  const filteredProperties = properties.filter(property => {
    const matchesName = !filters.name ||
      property.name?.toLowerCase().includes(filters.name.toLowerCase());

    const matchesAddress = !filters.address ||
      property.addressProperty?.toLowerCase().includes(filters.address.toLowerCase());

    const matchesMinPrice = !filters.minPrice ||
      property.priceProperty >= parseFloat(filters.minPrice);

    const matchesMaxPrice = !filters.maxPrice ||
      property.priceProperty <= parseFloat(filters.maxPrice);

    return matchesName && matchesAddress && matchesMinPrice && matchesMaxPrice;
  });

  // Get visible properties
  const visibleProperties = filteredProperties.slice(0, visibleCount);
  const hasMoreProperties = visibleCount < filteredProperties.length;

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    // Reset visible count when filters change
    setVisibleCount(PROPERTIES_PER_PAGE);
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      address: '',
      minPrice: '',
      maxPrice: ''
    });
    setVisibleCount(PROPERTIES_PER_PAGE);
  };

  const loadMoreProperties = async () => {
    setLoadingMore(true);
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    setVisibleCount(prev => prev + PROPERTIES_PER_PAGE);
    setLoadingMore(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <span className="text-gray-600 dark:text-gray-300">Loading properties...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">⚠️ Error loading properties</div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
        <button
          onClick={() => dispatch(fetchProperties())}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-6 py-2 rounded-lg transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="">
      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        filteredCount={filteredProperties.length}
        totalCount={properties.length}
      />

      {/* Properties Grid */}
      <div id="properties">
        {filteredProperties.length > 0 ? (
          <>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <AnimatePresence>
                {visibleProperties.map((property, index) => (
                  <PropertyCard
                    key={property.id || property._id}
                    property={property}
                    index={index}
                    onViewDetails={() => setSelectedProperty(property)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load More Button */}
            {hasMoreProperties && (
              <motion.div
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={loadMoreProperties}
                  disabled={loadingMore}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  whileHover={{ scale: loadingMore ? 1 : 1.05 }}
                  whileTap={{ scale: loadingMore ? 1 : 0.95 }}
                  aria-label={loadingMore ? "Loading more properties" : `Load ${PROPERTIES_PER_PAGE} more properties`}
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span>Load More Properties</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-heading font-bold text-gray-800 dark:text-gray-100 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your search filters to find more properties
            </p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
};

// Simple Property Card Component
const PropertyCard = ({ property, index, onViewDetails }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 cursor-pointer transform-gpu hover:-translate-y-2 hover:scale-105 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
      onClick={onViewDetails}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onViewDetails();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${property.name} property`}
    >
      {/* Property Image */}
      <div className="relative h-48 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 overflow-hidden">
        {(property.images && property.images.length > 0) ? (
          <img
            src={property.images[0]}
            alt={`${property.name} - Main image of property located at ${property.addressProperty}`}
            className="w-full h-full object-cover transition-transform duration-200 transform-gpu group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : property.image ? (
          <img
            src={property.image}
            alt={`${property.name} - Main image of property located at ${property.addressProperty}`}
            className="w-full h-full object-cover transition-transform duration-200 transform-gpu group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-600 dark:to-neutral-700 flex items-center justify-center" style={{ display: 'none' }}>
          <span className="text-neutral-500 dark:text-neutral-300 text-sm font-semibold">No Image Available</span>
        </div>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 opacity-70 group-hover:opacity-85 transition-opacity duration-300" />

        {/* Premium Status Badge */}
        {property.propertyType && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            {property.propertyType}
          </div>
        )}

        {/* Heart/Favorite Button */}
        <motion.button
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite functionality
          }}
          aria-label={`Add ${property.name} to favorites`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>
      </div>

      {/* Card Content with Enhanced Typography */}
      <div className="p-4 space-y-3">
        {/* Header Section */}
        <div className="space-y-2">
          {/* Property Title */}
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            {property.name}
          </h3>

          {/* Address with Enhanced Icon */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/40 dark:to-secondary-900/40 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPinIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2">
              {property.addressProperty}
            </p>
          </div>
        </div>

        {/* Price Section */}
        <div className="bg-gradient-to-r from-primary-500/80 to-secondary-500/80 rounded-xl p-4 border border-primary-400/30 shadow-md backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-1">
                {property.priceProperty ? 'Sale Price' : property.rentProperty ? 'Monthly Rent' : 'Price'}
              </p>
              <p className="text-2xl font-bold text-white">
                {property.priceProperty && formatPrice(property.priceProperty)}
                {!property.priceProperty && property.rentProperty && formatPrice(property.rentProperty)}
                {!property.priceProperty && !property.rentProperty && 'On Request'}
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Property Features Grid */}
        {(property.bedrooms || property.bathrooms || property.area) && (
          <div className="grid grid-cols-3 gap-3">
            {property.bedrooms && (
              <div className="bg-white dark:bg-neutral-700/50 rounded-lg p-3 text-center border border-neutral-200/50 dark:border-neutral-600/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-colors duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/40 dark:to-primary-800/40 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{property.bedrooms}</p>
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Bed{property.bedrooms > 1 ? 's' : ''}</p>
              </div>
            )}
            {property.bathrooms && (
              <div className="bg-white dark:bg-neutral-700/50 rounded-lg p-3 text-center border border-neutral-200/50 dark:border-neutral-600/50 hover:border-secondary-300/50 dark:hover:border-secondary-600/50 transition-colors duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-secondary-100 to-secondary-200 dark:from-secondary-900/40 dark:to-secondary-800/40 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-4 h-4 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{property.bathrooms}</p>
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Bath{property.bathrooms > 1 ? 's' : ''}</p>
              </div>
            )}
            {property.area && (
              <div className="bg-white dark:bg-neutral-700/50 rounded-lg p-3 text-center border border-neutral-200/50 dark:border-neutral-600/50 hover:border-accent-300/50 dark:hover:border-accent-600/50 transition-colors duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-accent-100 to-accent-200 dark:from-accent-900/40 dark:to-accent-800/40 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{property.area}</p>
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">m²</p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Property Detail Modal Component - Simplified Basic Info
const PropertyDetailModal = ({ property, onClose }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleSeeFullDetails = () => {
    // Navigate to individual property page
    window.location.href = `/property/${property.id}`;
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
      aria-describedby="property-modal-description"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-neutral-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200/20 dark:border-neutral-700/20 mx-auto my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Header with Image Background */}
        <div className="relative h-48 sm:h-64 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600">
          {((property.images && property.images.length > 0) || property.image) && (
            <img
              src={(property.images && property.images.length > 0) ? property.images[0] : property.image}
              alt={property.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Header Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            {/* Top Row: Property Type Badge & Close Button */}
            <div className="flex justify-between items-start">
              {property.propertyType && (
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  {property.propertyType}
                </div>
              )}
              <motion.button
                onClick={onClose}
                className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close property details modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Bottom Row: Property Title & Location */}
            <div className="space-y-2">
              <h2 id="property-modal-title" className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight line-clamp-2">
                {property.name}
              </h2>
              <div className="flex items-center space-x-2 text-white/90">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center" aria-hidden="true">
                  <MapPinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <p id="property-modal-description" className="text-xs sm:text-sm font-medium line-clamp-1">{property.addressProperty}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          {/* Price Section with Enhanced Design */}
          <div className="text-center space-y-2">
            <p className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              {property.priceProperty ? 'Sale Price' : property.rentProperty ? 'Monthly Rent' : 'Price'}
            </p>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {property.priceProperty && formatPrice(property.priceProperty)}
              {!property.priceProperty && property.rentProperty && formatPrice(property.rentProperty)}
              {!property.priceProperty && !property.rentProperty && 'On Request'}
            </div>
          </div>

          {/* Enhanced Property Features */}
          {(property.bedrooms || property.bathrooms || property.area) && (
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {property.bedrooms && (
                <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700/50 dark:to-neutral-600/50 p-3 sm:p-6 rounded-2xl text-center border border-neutral-200/50 dark:border-neutral-600/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 hover:shadow-lg">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4" />
                    </svg>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">{property.bedrooms}</div>
                  <div className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Bedroom{property.bedrooms > 1 ? 's' : ''}</div>
                </div>
              )}
              {property.bathrooms && (
                <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700/50 dark:to-neutral-600/50 p-3 sm:p-6 rounded-2xl text-center border border-neutral-200/50 dark:border-neutral-600/50 hover:border-secondary-300/50 dark:hover:border-secondary-600/50 transition-all duration-300 hover:shadow-lg">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                    </svg>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">{property.bathrooms}</div>
                  <div className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Bathroom{property.bathrooms > 1 ? 's' : ''}</div>
                </div>
              )}
              {property.area && (
                <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700/50 dark:to-neutral-600/50 p-3 sm:p-6 rounded-2xl text-center border border-neutral-200/50 dark:border-neutral-600/50 hover:border-accent-300/50 dark:hover:border-accent-600/50 transition-all duration-300 hover:shadow-lg">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">{property.area}</div>
                  <div className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Square Meters</div>
                </div>
              )}
            </div>
          )}

          {/* Enhanced Description */}
          {property.description && (
            <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700/30 dark:to-neutral-600/30 p-4 sm:p-6 rounded-2xl border border-neutral-200/50 dark:border-neutral-600/50">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2 sm:mb-3">About This Property</h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-4 font-medium text-sm sm:text-base">
                {property.description}
              </p>
            </div>
          )}

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <motion.button
              onClick={handleSeeFullDetails}
              className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-2xl font-bold text-sm sm:text-base tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg hover:shadow-xl hover:shadow-primary-500/25"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View Full Details</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={onClose}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-2xl hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all duration-300 font-semibold text-sm sm:text-base"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PropertyList;
