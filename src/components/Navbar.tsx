'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCategories } from '@/hooks/useCategories';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: categories = [], isLoading } = useCategories();

  // Always use white background with dark text
  const navbarBackground = 'rgba(255, 255, 255, 0.98)';
  const navbarTextColor = '#1f2937';

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-sm"
      style={{ 
        backgroundColor: navbarBackground, 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        color: navbarTextColor,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center"
            >
              <Image
                src="/logo.jpeg"
                alt="Stellar Bijoux Logo"
                width={160}
                height={80}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link
              href="/"
              className="hover:border-b-2 border-gold transition-all uppercase tracking-widest text-sm font-medium"
              style={{ 
                color: navbarTextColor,
                borderBottom: pathname === '/' ? '2px solid #D4AF37' : '2px solid transparent',
              }}
            >
              Home
            </Link>
            
            <div className="relative group">
              <button 
                className="hover:border-b-2 border-gold transition-all uppercase tracking-widest text-sm font-medium"
                style={{ color: navbarTextColor }}
              >
                Categories
              </button>
              {/* Dropdown menu with padding-top to bridge the gap */}
              <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
                  {categories.map((category:any) => (
                    <Link
                      key={category._id}
                      href={`/category/${category.slug}`}
                      className="block px-6 py-3 text-gray-800 hover:bg-wheat hover:text-gray-900 transition-colors border-b border-gray-100 last:border-0 tracking-wide"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="hover:border-b-2 border-gold transition-all uppercase tracking-widest text-sm font-medium"
              style={{ 
                color: navbarTextColor,
                borderBottom: pathname === '/about' ? '2px solid #D4AF37' : '2px solid transparent',
              }}
            >
              About
            </Link>
            
            <Link
              href="/contact"
              className="hover:border-b-2 border-gold transition-all uppercase tracking-widest text-sm font-medium"
              style={{ 
                color: navbarTextColor,
                borderBottom: pathname === '/contact' ? '2px solid #D4AF37' : '2px solid transparent',
              }}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: navbarTextColor }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              href="/"
              className="block px-4 py-3 text-gray-800 hover:bg-wheat rounded-md uppercase tracking-wider text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <div className="px-4 py-2 text-gray-900 font-bold uppercase tracking-wider text-xs">Categories</div>
            {categories.map((category:any) => (
              <Link
                key={category._id}
                href={`/category/${category.slug}`}
                className="block pl-8 pr-4 py-2 text-gray-700 hover:bg-wheat rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            
            <Link
              href="/about"
              className="block px-4 py-3 text-gray-800 hover:bg-wheat rounded-md uppercase tracking-wider text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <Link
              href="/contact"
              className="block px-4 py-3 text-gray-800 hover:bg-wheat rounded-md uppercase tracking-wider text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

