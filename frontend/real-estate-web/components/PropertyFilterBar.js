'use client';

import { motion } from 'framer-motion';
import {
  MapPinIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const PropertyFilterBar = ({ filters, onFilterChange, onClearFilters, filteredCount, totalCount }) => {
  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-lg border border-white/30 dark:border-neutral-700/40 rounded-2xl shadow-lg p-8 mb-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-display font-semibold text-neutral-800 dark:text-neutral-100">
              Find Your Perfect Property
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1 font-medium">
              Showing {filteredCount} of {totalCount} properties
            </p>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
            >
              <XMarkIcon className="w-4 h-4" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Property Name Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 tracking-wide">
              Property Name
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by property name..."
                value={filters.name}
                onChange={(e) => onFilterChange('name', e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-50/50 dark:bg-neutral-700/30 border border-neutral-200/50 dark:border-neutral-600/30 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all duration-300 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 font-medium"
              />
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 tracking-wide">
              Location
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by address..."
                value={filters.address}
                onChange={(e) => onFilterChange('address', e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-50/50 dark:bg-neutral-700/30 border border-neutral-200/50 dark:border-neutral-600/30 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all duration-300 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 font-medium"
              />
            </div>
          </div>

          {/* Min Price Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 tracking-wide">
              Min Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm font-semibold">$</span>
              <input
                type="number"
                placeholder="Minimum price..."
                value={filters.minPrice}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-neutral-50/50 dark:bg-neutral-700/30 border border-neutral-200/50 dark:border-neutral-600/30 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all duration-300 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 font-medium"
              />
            </div>
          </div>

          {/* Max Price Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 tracking-wide">
              Max Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm font-semibold">$</span>
              <input
                type="number"
                placeholder="Maximum price..."
                value={filters.maxPrice}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-neutral-50/50 dark:bg-neutral-700/30 border border-neutral-200/50 dark:border-neutral-600/30 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all duration-300 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 pt-6 border-t border-neutral-200/50 dark:border-neutral-600/30"
          >
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mr-2">Active filters:</span>
              {filters.name && (
                <span className="inline-flex items-center space-x-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-sm px-3 py-1 rounded-full font-semibold">
                  <span>Name: {filters.name}</span>
                  <button
                    onClick={() => onFilterChange('name', '')}
                    className="ml-1 hover:text-primary-600 dark:hover:text-primary-200"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.address && (
                <span className="inline-flex items-center space-x-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-300 text-sm px-3 py-1 rounded-full font-semibold">
                  <span>Location: {filters.address}</span>
                  <button
                    onClick={() => onFilterChange('address', '')}
                    className="ml-1 hover:text-secondary-600 dark:hover:text-secondary-200"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.minPrice && (
                <span className="inline-flex items-center space-x-1 bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-300 text-sm px-3 py-1 rounded-full font-semibold">
                  <span>Min: ${parseInt(filters.minPrice).toLocaleString()}</span>
                  <button
                    onClick={() => onFilterChange('minPrice', '')}
                    className="ml-1 hover:text-accent-600 dark:hover:text-accent-200"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.maxPrice && (
                <span className="inline-flex items-center space-x-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-300 text-sm px-3 py-1 rounded-full font-semibold">
                  <span>Max: ${parseInt(filters.maxPrice).toLocaleString()}</span>
                  <button
                    onClick={() => onFilterChange('maxPrice', '')}
                    className="ml-1 hover:text-neutral-600 dark:hover:text-neutral-200"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyFilterBar;
