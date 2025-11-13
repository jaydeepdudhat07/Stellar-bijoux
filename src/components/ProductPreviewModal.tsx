'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

// Prevent body scroll when modal is open
const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (isLocked) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isLocked]);
};

interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  photos: { url: string; publicId?: string }[];
  colors: string[];
  carat: string;
  description?: string;
  category?: { name: string; slug: string };
  subcategory?: { name: string; slug: string };
  stones?: Array<{ name: string } | string>;
  qa?: Array<{ question: string; answer: string }>;
}

interface ProductPreviewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductPreviewModal({ product, isOpen, onClose }: ProductPreviewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>('description');
  const [mounted, setMounted] = useState(false);

  // Ensure component only mounts on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open - MUST be called before any early returns
  useBodyScrollLock(isOpen && mounted);

  // Close on ESC key - MUST be called before any early returns
  useEffect(() => {
    if (!isOpen || !mounted || typeof window === 'undefined') return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, mounted, onClose]);

  // Early return AFTER all hooks
  if (!isOpen || !mounted || typeof window === 'undefined') return null;

  const images = product.photos && product.photos.length > 0 ? product.photos : [];
  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const stoneNames = product.stones?.map((stone) => 
    typeof stone === 'string' ? stone : stone.name
  ).join(', ') || 'N/A';

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative bg-white rounded-lg shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <IoClose className="w-6 h-6 text-gray-800" />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto">
          {/* Image Gallery - Left Side */}
          <div className="md:w-1/2 p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden mb-4 shadow-lg border border-gray-200">
              {currentImage ? (
                <Image
                  src={currentImage.url}
                  alt={product.title}
                  fill
                  className="object-contain p-2"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
              

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                  {currentImageIndex + 1} of {images.length}
                </div>
              )}
            </div>

            {/* Pagination Dots - Directly below main image */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mb-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentImageIndex === index
                        ? 'bg-gold w-8'
                        : 'bg-gray-300 hover:bg-gray-400 w-2'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all bg-white ${
                      currentImageIndex === index
                        ? 'border-gold shadow-lg scale-105'
                        : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                    }`}
                  >
                    <Image
                      src={photo.url}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details - Right Side */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col bg-white">
            <div className="mb-4">
              <span className="inline-block bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                {product.category?.name || 'Jewelry'}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold heading-font text-gray-900 mb-5 leading-tight">
              {product.title}
            </h2>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-gold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-gray-500 italic">
                *The price of this item may vary based on specifications. Please contact us for accurate pricing.
              </p>
            </div>


            {/* Product Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600 w-24 font-medium">Carat:</span>
                <span className="text-gray-900 font-semibold text-base">{product.carat}</span>
              </div>
              <div className="flex items-start gap-4 text-sm">
                <span className="text-gray-600 w-24 font-medium pt-1">Colors:</span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const colorLower = color.toLowerCase();
                    let bgColor = 'bg-gray-100';
                    let textColor = 'text-gray-800';
                    
                    if (colorLower.includes('rose') || colorLower.includes('pink')) {
                      bgColor = 'bg-rose-100';
                      textColor = 'text-rose-900';
                    } else if (colorLower.includes('yellow') || colorLower.includes('gold')) {
                      bgColor = 'bg-yellow-100';
                      textColor = 'text-yellow-900';
                    } else if (colorLower.includes('white')) {
                      bgColor = 'bg-gray-50';
                      textColor = 'text-gray-800';
                    } else if (colorLower.includes('black')) {
                      bgColor = 'bg-gray-800';
                      textColor = 'text-white';
                    }
                    
                    return (
                      <span
                        key={color}
                        className={`${bgColor} ${textColor} px-4 py-2 rounded-md text-sm font-medium border border-transparent hover:border-gray-300 transition-all cursor-default`}
                      >
                        {color}
                      </span>
                    );
                  })}
                </div>
              </div>
              {product.stones && product.stones.length > 0 && (
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600 w-24 font-medium">Stones:</span>
                  <span className="text-gray-900 font-semibold text-base">{stoneNames}</span>
                </div>
              )}
            </div>

            {/* Accordion Sections */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              {/* Description */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('description')}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-base">Description</span>
                  <span className={`transform transition-transform duration-200 text-gray-500 ${expandedSection === 'description' ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedSection === 'description' && (
                  <div className="px-5 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {product.description || 'No description available for this product.'}
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('additional')}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-base">Additional Information</span>
                  <span className={`transform transition-transform duration-200 text-gray-500 ${expandedSection === 'additional' ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedSection === 'additional' && (
                  <div className="px-5 pb-5 text-sm space-y-3 border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-600 font-medium">Category:</span>
                      <span className="text-gray-900 font-semibold">{product.category?.name || 'N/A'}</span>
                    </div>
                    {product.subcategory && (
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600 font-medium">Subcategory:</span>
                        <span className="text-gray-900 font-semibold">{product.subcategory.name}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-600 font-medium">Carat:</span>
                      <span className="text-gray-900 font-semibold">{product.carat}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-600 font-medium">Colors:</span>
                      <span className="text-gray-900 font-semibold">{product.colors.join(', ')}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Q & A Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('qa')}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-base">Q & A</span>
                  <span className={`transform transition-transform duration-200 text-gray-500 ${expandedSection === 'qa' ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedSection === 'qa' && (
                  <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                    {product.qa && product.qa.length > 0 ? (
                      <div className="space-y-5">
                        {product.qa.map((item, index) => (
                          <div key={index} className="border-b border-gray-100 last:border-b-0 pb-5 last:pb-0">
                            <div className="font-semibold text-gray-900 mb-2 text-sm">
                              Q: {item.question}
                            </div>
                            <div className="text-gray-700 text-sm leading-relaxed">
                              A: {item.answer}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600 italic">
                        No questions and answers available for this product yet.
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render modal outside the normal React tree to prevent hydration issues
  if (typeof document === 'undefined') return null;
  
  return createPortal(modalContent, document.body);
}

