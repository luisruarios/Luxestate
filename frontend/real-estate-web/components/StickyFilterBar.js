'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  HomeIcon,
  FunnelIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const StickyFilterBar = ({ filters, onFilterChange, onClearFilters, filteredCount, totalCount }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const count = Object.values(filters).filter(value => value && value.trim() !== '').length;
    setActiveFilters(count);
  }, [filters]);

  const handleInputChange = (field, value) => {
    onFilterChange(field, value);
  };

  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${
        isSticky ? 'fixed top-0 left-0 right-0 z-40 shadow-lg' : 'relative'
      } bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Filter Bar */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Quick Search */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={filters.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50/70 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Location Filter */}
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={filters.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="pl-10 pr-4 py-2 w-40 bg-gray-50/70 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex items-center space-x-3">
              {/* Results Count */}
              <motion.div
                className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100/70 dark:bg-gray-800/50 px-3 py-2 rounded-lg backdrop-blur-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <HomeIcon className="w-4 h-4 text-teal-500" />
                <span>
                  <span className="font-semibold text-teal-600 dark:text-teal-400">{filteredCount}</span>
                  <span className="mx-1">of</span>
                  <span className="font-semibold">{totalCount}</span>
                </span>
              </motion.div>

              {/* Advanced Filters Toggle */}
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
                  isExpanded || activeFilters > 0
                    ? 'bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-500/25'
                    : 'bg-gray-50/70 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200/50 dark:border-gray-600/30 hover:bg-gray-100/70 dark:hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilters > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  >
                    {activeFilters}
                  </motion.span>
                )}
              </motion.button>

              {/* Clear Filters */}
              <AnimatePresence>
                {activeFilters > 0 && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={onClearFilters}
                    className="flex items-center space-x-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <XMarkIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Clear</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={expandVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="overflow-hidden"
            >
              <div className="pb-4 border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Min Price */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Min Price
                    </label>
                    <CurrencyDollarIcon className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="0"
                      value={filters.minPrice || ''}
                      onChange={(e) => handleInputChange('minPrice', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50/70 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Max Price */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Price
                    </label>
                    <CurrencyDollarIcon className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="∞"
                      value={filters.maxPrice || ''}
                      onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50/70 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Property Type */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Property Type
                    </label>
                    <HomeIcon className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                    <select
                      value={filters.propertyType || ''}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50/70 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none"
                    >
                      <option value="">All Types</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="office">Office</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sort By
                    </label>
                    <FunnelIcon className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                    <select
                      value={filters.sortBy || ''}
                      onChange={(e) => handleInputChange('sortBy', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50/70 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none"
                    >
                      <option value="">Default</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                      <option value="popular">Most Popular</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StickyFilterBar;
