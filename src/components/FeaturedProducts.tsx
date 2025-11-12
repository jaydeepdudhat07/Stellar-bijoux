'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';
import Image from 'next/image';

export default function FeaturedProducts() {
  const { data: products = [], isLoading } = useProducts();
  const featuredProducts = products.slice(0, 8);

  if (isLoading) {
    return (
      <section id="featured" className="py-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto text-center">
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="py-20 px-4 md:px-14 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span 
            className="uppercase text-xs tracking-widest py-2 px-6 rounded-full bg-wheat text-gray-800 font-medium"
          >
            Featured
          </span>
          <h2 className="my-6 text-4xl md:text-5xl font-semibold heading-font">
            <span className="underline decoration-gold decoration-4 underline-offset-8">Featured</span> products of the week
          </h2>
          <div className="flex justify-between flex-wrap items-center mt-6">
            <p className="text-gray-600 text-sm tracking-wider leading-relaxed">
              Create your own style and spread your energy,<br /> the community will reward you!
            </p>
            <Link 
              href="#all-products" 
              className="text-xl underline text-gray-600 tracking-wider hover:text-gold transition-colors cursor-pointer mt-4 md:mt-0"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="featured-swiper"
          >
            {featuredProducts.map((product: any) => (
              <SwiperSlide key={product._id}>
                <Link href={`/product/${product.slug}`}>
                  <div className="product-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
                    <div className="relative h-80 bg-gray-100">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-2 text-gray-800 truncate">
                        {product.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-3 tracking-wide">
                        {product.category?.name}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-gold font-bold text-xl">
                          ₹{product.price?.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          {product.carat}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

