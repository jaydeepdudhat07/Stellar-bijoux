'use client';

import { useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface SimilarProductsProps {
  currentProductId: string;
  categoryId?: string;
  subcategoryId?: string;
  limit?: number;
}

export default function SimilarProducts({ 
  currentProductId, 
  categoryId, 
  subcategoryId,
  limit = 8 
}: SimilarProductsProps) {
  // Fetch products from the same category
  const { data: allProducts = [], isLoading } = useProducts(
    categoryId ? { category: categoryId } : undefined
  );

  // Filter similar products
  const similarProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];

    // Helper function to get category/subcategory ID
    const getCategoryId = (category: any) => {
      if (!category) return null;
      if (typeof category === 'string') return category;
      return category._id || category;
    };

    const getSubcategoryId = (subcategory: any) => {
      if (!subcategory) return null;
      if (typeof subcategory === 'string') return subcategory;
      return subcategory._id || subcategory;
    };

    // Filter out current product and get products from same category/subcategory
    let filtered = allProducts.filter((product: any) => {
      // Exclude current product
      if (product._id === currentProductId) return false;
      
      const productCategoryId = getCategoryId(product.category);
      const productSubcategoryId = getSubcategoryId(product.subcategory);
      
      // If subcategory exists, prioritize products with same subcategory
      if (subcategoryId && productSubcategoryId === subcategoryId) {
        return true;
      }
      
      // Otherwise, include products from same category
      if (categoryId && productCategoryId === categoryId) {
        return true;
      }
      
      return false;
    });

    // Sort: products with same subcategory first, then same category
    if (subcategoryId) {
      filtered = filtered.sort((a: any, b: any) => {
        const aSubcategoryId = getSubcategoryId(a.subcategory);
        const bSubcategoryId = getSubcategoryId(b.subcategory);
        const aHasSubcategory = aSubcategoryId === subcategoryId;
        const bHasSubcategory = bSubcategoryId === subcategoryId;
        
        if (aHasSubcategory && !bHasSubcategory) return -1;
        if (!aHasSubcategory && bHasSubcategory) return 1;
        return 0;
      });
    }

    // Limit the number of products
    return filtered.slice(0, limit);
  }, [allProducts, currentProductId, categoryId, subcategoryId, limit]);

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading similar products...</p>
        </div>
      </div>
    );
  }

  if (similarProducts.length === 0) {
    return null; // Don't show section if no similar products
  }

  return (
    <section className="py-16 bg-gray-50 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-font text-gray-900 mb-3">
            Similar Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore more products from the same collection
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
            }}
            className="similar-products-swiper"
          >
            {similarProducts.map((product: any) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

