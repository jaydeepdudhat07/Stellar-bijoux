'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { useStones } from '@/hooks/useStones';
import ProductCard from '@/components/ProductCard';
import Filters from '@/components/Filters';
import Pagination from '@/components/Pagination';

const DEFAULT_CATEGORY_IMAGE = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2070&q=80';

const COLORS = ['Yellow', 'Rose', 'White', 'Black'];
const CARATS = ['10k', '14k', '18k', '22k'];
const ITEMS_PER_PAGE = 6;

interface CategoryPageContentProps {
  slug: string;
}

export default function CategoryPageContent({ slug }: CategoryPageContentProps) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCarat, setSelectedCarat] = useState('');
  const [selectedStone, setSelectedStone] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: allProducts = [], isLoading: productsLoading } = useProducts();
  const { data: stones = [] } = useStones();

  const category = useMemo(
    () => categories.find((cat: any) => cat.slug === slug),
    [categories, slug]
  );

  const filteredProducts = useMemo(() => {
    if (!category) return [];
    
    return allProducts.filter((product: any) => {
      if (product.category?._id !== category._id) return false;
      // Filter by color - colors is an array
      if (selectedColor && (!product.colors || !product.colors.includes(selectedColor))) return false;
      // Filter by carat - carat is a single value
      if (selectedCarat && product.carat !== selectedCarat) return false;
      // Filter by stone - stones is an array of objects with _id (when populated) or string IDs
      if (selectedStone && (!product.stones || !product.stones.some((stone: any) => {
        const stoneId = typeof stone === 'string' ? stone : stone._id;
        return stoneId === selectedStone;
      }))) return false;
      return true;
    });
  }, [category, allProducts, selectedColor, selectedCarat, selectedStone]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const products = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedColor, selectedCarat, selectedStone]);

  const handleReset = () => {
    setSelectedColor('');
    setSelectedCarat('');
    setSelectedStone('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (categoriesLoading || productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-48 md:h-64 lg:h-80 pt-20 overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0">
          <Image
            src={category.image || DEFAULT_CATEGORY_IMAGE}
            alt={category.name}
            fill
            className="object-cover object-center scale-110 blur-sm"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        {/* Content */}
        <div className="relative h-full flex items-center justify-center z-10">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold heading-font mb-3 drop-shadow-lg">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-gray-200 tracking-wide text-sm md:text-base max-w-2xl mx-auto drop-shadow-md">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mobile/Tablet Filters - Horizontal Slider */}
        <div className="lg:hidden mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold heading-font">Filters</h3>
              <button
                onClick={handleReset}
                className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
              >
                Reset
              </button>
            </div>
            
            {/* Horizontal Filter Sliders */}
            <div className="space-y-4">
              {/* Color Filter */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Color</h4>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                        selectedColor === color
                          ? 'bg-gold text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Carat Filter */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Carat</h4>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {CARATS.map((carat) => (
                    <button
                      key={carat}
                      onClick={() => setSelectedCarat(selectedCarat === carat ? '' : carat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                        selectedCarat === carat
                          ? 'bg-gold text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {carat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stone Filter */}
              {stones.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 text-sm">Stones</h4>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {stones.map((stone: any) => (
                      <button
                        key={stone._id}
                        onClick={() => setSelectedStone(selectedStone === stone._id ? '' : stone._id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                          selectedStone === stone._id
                            ? 'bg-gold text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {stone.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Filters Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <Filters
                colors={COLORS}
                carats={CARATS}
                stones={stones}
                selectedColor={selectedColor}
                selectedCarat={selectedCarat}
                selectedStone={selectedStone}
                onColorChange={setSelectedColor}
                onCaratChange={setSelectedCarat}
                onStoneChange={setSelectedStone}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center border-b border-gray-200 pb-4">
              <p className="text-gray-600 tracking-wide">
                <span className="font-semibold text-gray-900">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            {/* Fast Filter Section - Desktop Only */}
            <div className="mb-8 hidden lg:block">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Fast Filter:</span>
                
                {/* Color Quick Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  {COLORS.map((color) => {
                    const colorLower = color.toLowerCase();
                    let bgColor = 'bg-gray-100';
                    let textColor = 'text-gray-700';
                    let borderColor = 'border-gray-300';
                    
                    if (colorLower.includes('rose') || colorLower.includes('pink')) {
                      bgColor = 'bg-rose-100';
                      textColor = 'text-rose-900';
                      borderColor = 'border-rose-300';
                    } else if (colorLower.includes('yellow') || colorLower.includes('gold')) {
                      bgColor = 'bg-yellow-100';
                      textColor = 'text-yellow-900';
                      borderColor = 'border-yellow-300';
                    } else if (colorLower.includes('white')) {
                      bgColor = 'bg-gray-50';
                      textColor = 'text-gray-800';
                      borderColor = 'border-gray-300';
                    } else if (colorLower.includes('black')) {
                      bgColor = 'bg-gray-800';
                      textColor = 'text-white';
                      borderColor = 'border-gray-700';
                    }
                    
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all border-2 flex items-center gap-2 ${
                          selectedColor === color
                            ? `${bgColor} ${textColor} ${borderColor} shadow-md`
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full ${bgColor} border ${borderColor}`}></span>
                        {color === 'Yellow' ? 'Gold' : color === 'Rose' ? 'Rose Gold' : color} {color === 'White' ? 'Color' : ''}
                      </button>
                    );
                  })}
                </div>

                {/* Remove All Button */}
                {(selectedColor || selectedCarat || selectedStone) && (
                  <button
                    onClick={handleReset}
                    className="ml-auto px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-400 bg-white transition-all flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Remove All
                  </button>
                )}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-lg">
                <div className="text-7xl mb-6">💍</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 heading-font">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6 tracking-wide">
                  Try adjusting your filters to find what you're looking for
                </p>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-gold text-white rounded-sm hover:bg-gold-dark transition-colors uppercase tracking-wider text-sm font-medium"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

