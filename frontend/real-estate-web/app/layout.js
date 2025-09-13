'use client';

import { Provider } from 'react-redux';
import { store } from '../store';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from '../components/ThemeProvider';
import ThemeToggle from '../components/ThemeToggle';
import ScrollToTop from '../components/ScrollToTop';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <title>Luxestate | Premium Real Estate Properties</title>
        <meta name="description" content="Discover luxury real estate properties with Luxestate. Browse premium homes, penthouses, and exclusive properties in prime locations." />
        <meta name="keywords" content="luxury real estate, premium properties, penthouses, luxury homes, real estate, property search, luxury apartments" />
        <meta name="author" content="Luxestate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://luxestate.vercel.app/" />
        <meta property="og:title" content="Luxestate | Premium Real Estate Properties" />
        <meta property="og:description" content="Discover luxury real estate properties with Luxestate. Browse premium homes, penthouses, and exclusive properties in prime locations." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:site_name" content="Luxestate" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://luxestate.vercel.app/" />
        <meta property="twitter:title" content="Luxestate | Premium Real Estate Properties" />
        <meta property="twitter:description" content="Discover luxury real estate properties with Luxestate. Browse premium homes, penthouses, and exclusive properties in prime locations." />
        <meta property="twitter:image" content="/og-image.jpg" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="theme-color" content="#f97316" />

        <link rel="canonical" href="https://luxestate.vercel.app/" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Luxestate",
              "description": "Premium real estate properties and luxury homes",
              "url": "https://luxestate.vercel.app",
              "logo": "https://luxestate.vercel.app/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+57-300-123-4567",
                "contactType": "customer service",
                "email": "contact@luxestate.com"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "CO"
              }
            })
          }}
        />

        <link rel="canonical" href="https://luxestate.vercel.app/" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Provider store={store}>
          <ThemeProvider>
            <div className="min-h-screen">
              {children}
            </div>
            <ScrollToTop />

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#374151',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(16px)',
                },
                success: {
                  iconTheme: {
                    primary: '#14b8a6',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
