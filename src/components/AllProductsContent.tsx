'use client';

import { useState, useMemo, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useStones } from '@/hooks/useStones';
import ProductCard from '@/components/ProductCard';
import Filters from '@/components/Filters';
import Pagination from '@/components/Pagination';

const COLORS = ['Yellow', 'Rose', 'White', 'Black'];
const CARATS = ['10k', '14k', '18k', '22k'];
const ITEMS_PER_PAGE = 6;

export default function AllProductsContent() {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCarat, setSelectedCarat] = useState('');
  const [selectedStone, setSelectedStone] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: allProducts = [], isLoading: productsLoading } = useProducts();
  const { data: stones = [] } = useStones();

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product: any) => {
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
  }, [allProducts, selectedColor, selectedCarat, selectedStone]);

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
      <div className="relative h-64 bg-black pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold heading-font mb-3">
              All Products
            </h1>
            <p className="text-gray-300 tracking-wide text-sm md:text-base max-w-2xl mx-auto">
              Explore our complete collection of exquisite jewelry
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
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

