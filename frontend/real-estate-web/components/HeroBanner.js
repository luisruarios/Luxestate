'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // High-quality real estate hero images
  const heroImages = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Modern house exterior
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Luxury living room
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Modern apartment exterior
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Elegant home entrance
  ];

  useEffect(() => {
    // Preload first image
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = heroImages[0];

    // Auto-slide images
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <section className="relative h-[85vh] overflow-hidden bg-neutral-900">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1.02 : 1
            }}
            transition={{
              opacity: { duration: 2, ease: "easeInOut" },
              scale: { duration: 10, ease: "easeOut" }
            }}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${image})` }}
            />
          </motion.div>
        ))}

        {/* Elegant Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-neutral-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-neutral-900/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/20 to-primary-900/40" />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 h-full flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl text-left">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              <span className="inline-block text-accent-400 text-sm font-medium tracking-[0.2em] uppercase mb-4 border-l-2 border-accent-400 pl-4">
                Premium Real Estate
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white mb-8 leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
              transition={{ duration: 1.2, delay: 1.1 }}
            >
              Discover Your
              <span className="block font-display font-bold text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text">
                Perfect Space
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-neutral-200 mb-12 font-medium leading-relaxed tracking-wide max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 1.2, delay: 1.4 }}
            >
              Experience luxury living in exceptional properties designed for the discerning lifestyle.
              Your architectural masterpiece awaits.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Minimalist Image Indicators */}
      <div className="absolute bottom-8 left-8 z-20">
        <div className="flex flex-col space-y-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-8 h-0.5 transition-all duration-500 ${
                index === currentImageIndex
                  ? 'bg-gradient-to-r from-primary-400 to-accent-400'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-end text-white/60"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-light mb-3 tracking-[0.15em] uppercase">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Subtle Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-accent-400/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/3 w-1 h-1 bg-primary-400/40 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </section>
  );
};

export default HeroBanner;
