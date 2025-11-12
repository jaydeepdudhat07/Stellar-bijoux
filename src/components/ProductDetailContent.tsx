'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';
import { useSettings } from '@/hooks/useSettings';
import { getWhatsAppLink } from '@/utils/whatsapp';

interface ProductDetailContentProps {
  slug: string;
}

export default function ProductDetailContent({ slug }: ProductDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { data: products = [], isLoading } = useProducts();
  const { data: settings } = useSettings();
  const whatsappNumber = settings?.whatsapp;
  
  const product = useMemo(
    () => products.find((p: any) => p.slug === slug),
    [products, slug]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const productImages = product.images || product.photos || [];

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600 tracking-wide" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-gold transition-colors cursor-pointer"
                >
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              {product.category?.slug ? (
                <>
                  <li>
                    <Link 
                      href={`/category/${product.category.slug}`}
                      className="hover:text-gold transition-colors cursor-pointer"
                    >
                      {product.category.name}
                    </Link>
                  </li>
                  <li className="text-gray-400">/</li>
                </>
              ) : product.category?.name ? (
                <>
                  <li>
                    <span className="hover:text-gold transition-colors cursor-pointer">
                      {product.category.name}
                    </span>
                  </li>
                  <li className="text-gray-400">/</li>
                </>
              ) : null}
              <li>
                <span className="font-semibold text-gray-900" aria-current="page">
                  {product.title}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images Section */}
          <div>
            <div className="relative aspect-square bg-gray-50 rounded-sm overflow-hidden mb-6 shadow-lg">
              {productImages.length > 0 ? (
                <Image
                  src={typeof productImages[selectedImage] === 'string' ? productImages[selectedImage] : productImages[selectedImage]?.url}
                  alt={product.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xl">
                  No Image Available
                </div>
              )}
            </div>

            {productImages.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {productImages.map((photo: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-gray-50 rounded-sm overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-gold shadow-md scale-105' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={typeof photo === 'string' ? photo : photo?.url}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold heading-font text-gray-900 mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200">
              <span className="text-5xl font-bold text-gold">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              <span className="bg-wheat text-gray-900 px-5 py-2 rounded-sm font-bold uppercase tracking-wider text-sm">
                {product.carat}
              </span>
            </div>

            {/* Category & Subcategory */}
            <div className="mb-8 space-y-2">
              <p className="text-gray-700 tracking-wide">
                <span className="font-semibold uppercase text-sm text-gray-500">Category:</span>{' '}
                <span className="text-gray-900 font-medium">{product.category?.name}</span>
              </p>
              {product.subcategory && (
                <p className="text-gray-700 tracking-wide">
                  <span className="font-semibold uppercase text-sm text-gray-500">Subcategory:</span>{' '}
                  <span className="text-gray-900 font-medium">{product.subcategory?.name}</span>
                </p>
              )}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Available Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color: string) => (
                    <span
                      key={color}
                      className="bg-white border-2 border-gray-200 text-gray-800 px-5 py-2 rounded-sm font-medium hover:border-gold transition-colors"
                    >
                      {color} Gold
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stones */}
            {product.stones && product.stones.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">
                  {product.stones.length === 1 ? 'Stone' : 'Stones'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.stones.map((stone: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 px-5 py-3 rounded-sm">
                      <span className="text-gray-800 font-medium">{stone.name || stone}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="mb-10">
                <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Description</h3>
                <p className="text-gray-700 leading-relaxed tracking-wide">{product.description}</p>
              </div>
            )}

            {/* CTA Button */}
            <a
              href={getWhatsAppLink(product.title, whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-5 rounded-sm transition-all shadow-lg hover:shadow-xl uppercase tracking-widest text-sm"
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contact on WhatsApp
            </a>

            <p className="text-sm text-gray-500 text-center mt-5 tracking-wide">
              Click to discuss pricing, customization, and delivery options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
