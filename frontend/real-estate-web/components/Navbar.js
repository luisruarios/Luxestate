'use client';

import { motion } from 'framer-motion';
import { BuildingOffice2Icon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const router = useRouter();

  return (
    <motion.nav
      className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg border-b border-neutral-200/50 dark:border-neutral-700/30 sticky top-0 z-40"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.button
            className="flex items-center space-x-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 rounded-lg p-2"
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label="Luxestate homepage"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-sm flex items-center justify-center" aria-hidden="true">
              <BuildingOffice2Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-medium text-neutral-800 dark:text-neutral-100">
                Luxestate
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 -mt-1 tracking-wide">
                Premium Properties
              </p>
            </div>
          </motion.button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a
              href="#properties"
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 rounded p-2"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Properties
            </motion.a>
            <motion.a
              href="#about"
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 rounded p-2"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              About
            </motion.a>
          </div>

          {/* Contact Info & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400">
                <PhoneIcon className="w-4 h-4" />
                <span className="font-medium">+57 300 123 4567</span>
              </div>
              <div className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400">
                <EnvelopeIcon className="w-4 h-4" />
                <span className="font-medium">contact@luxestate.com</span>
              </div>
            </div>
            <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-600 hidden lg:block"></div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};export default Navbar;
