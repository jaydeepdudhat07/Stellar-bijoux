'use client';

import { useState, useMemo, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useStones } from '@/hooks/useStones';
import { useCategories } from '@/hooks/useCategories';
import ProductCard from '@/components/ProductCard';
import Filters from '@/components/Filters';
import Pagination from '@/components/Pagination';

const COLORS = ['Yellow', 'Rose', 'White', 'Black'];
const CARATS = ['10k', '14k', '18k', '22k'];
const ITEMS_PER_PAGE = 6;

interface AllProductsContentProps {
  featured?: boolean;
}

export default function AllProductsContent({ featured = false }: AllProductsContentProps) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCarat, setSelectedCarat] = useState('');
  const [selectedStone, setSelectedStone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products - filter by featured if requested
  const { data: allProducts = [], isLoading: productsLoading } = useProducts(
    featured ? { featured: true } : undefined
  );
  const { data: stones = [] } = useStones();
  const { data: categories = [] } = useCategories();

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product: any) => {
      // Filter by category
      if (selectedCategory) {
        const productCategoryId = typeof product.category === 'string' 
          ? product.category 
          : product.category?._id;
        if (productCategoryId !== selectedCategory) return false;
      }
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
  }, [allProducts, selectedCategory, selectedColor, selectedCarat, selectedStone]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const products = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedColor, selectedCarat, selectedStone]);

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedCarat('');
    setSelectedStone('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <div className={`relative h-64 pt-20 overflow-hidden ${featured ? '' : 'bg-black'}`}>
        {featured ? (
          <>
            {/* Blurred Gold Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-dark to-gold blur-sm scale-110" />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-gold/80 via-gold/70 to-gold-dark/80" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90" />
        )}
        <div className="relative h-full flex items-center justify-center z-10">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold heading-font mb-3 drop-shadow-lg">
              {featured ? 'Featured Products' : 'All Products'}
            </h1>
            <p className={`tracking-wide text-sm md:text-base max-w-2xl mx-auto drop-shadow-md ${featured ? 'text-white/95' : 'text-gray-300'}`}>
              {featured 
                ? 'Explore our handpicked selection of exquisite jewelry'
                : 'Explore our complete collection of exquisite jewelry'}
            </p>
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
              {/* Category Filter */}
              {categories.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 text-sm">Category</h4>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((category: any) => (
                      <button
                        key={category._id}
                        onClick={() => setSelectedCategory(selectedCategory === category._id ? '' : category._id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                          selectedCategory === category._id
                            ? 'bg-gold text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
                categories={categories}
                selectedColor={selectedColor}
                selectedCarat={selectedCarat}
                selectedStone={selectedStone}
                selectedCategory={selectedCategory}
                onColorChange={setSelectedColor}
                onCaratChange={setSelectedCarat}
                onStoneChange={setSelectedStone}
                onCategoryChange={setSelectedCategory}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-8 flex justify-between items-center border-b border-gray-200 pb-4">
              <p className="text-gray-600 tracking-wide">
                <span className="font-semibold text-gray-900">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
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

