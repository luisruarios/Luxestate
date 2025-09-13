'use client';

import { Suspense } from 'react';
import PropertyList from '../components/PropertyList';
import HeroBanner from '../components/HeroBanner';
import Navbar from '../components/Navbar';
import { ScrollReveal } from '../hooks/useScrollReveal';

// Simple loading component
const LoadingSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 dark:border-neutral-700/40 overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-300 dark:bg-neutral-600"></div>
        <div className="p-5 space-y-3">
          <div className="h-5 bg-gray-300 dark:bg-neutral-600 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-neutral-600 rounded w-2/3"></div>
          <div className="h-6 bg-gray-300 dark:bg-neutral-600 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 dark:bg-neutral-600 rounded"></div>
          <div className="h-10 bg-gray-300 dark:bg-neutral-600 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <Navbar />
      <HeroBanner />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-800 dark:text-neutral-100 mb-6 tracking-tight leading-tight">
            Featured Properties
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto tracking-wide">
            Discover exceptional homes in prime locations, meticulously curated for the most discerning tastes
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Suspense fallback={<LoadingSkeleton />}>
            <PropertyList />
          </Suspense>
        </ScrollReveal>
      </div>

      {/* Creator Attribution Section - Full Width */}
      <ScrollReveal delay={0.4}>
        <div id="about" className="w-full bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-t border-primary-200/50 dark:border-primary-700/50">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
                  About This Project
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                  Created by{' '}
                  <a
                    href="https://www.linkedin.com/in/luis-rua-rios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                  >
                    Luis Rua
                  </a>{' '}
                  - <span className="text-2xl">🏠</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}
