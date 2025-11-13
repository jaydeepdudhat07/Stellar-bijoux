'use client';

import Link from 'next/link';
import { useCategories } from '@/hooks/useCategories';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const DEFAULT_CATEGORY_IMAGE = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80';

export default function CategoryShowcase() {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return null;
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 md:px-10 lg:px-16 xl:px-20 overflow-visible">
      <div className="max-w-7xl mx-auto overflow-visible">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold heading-font mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 tracking-wider text-sm md:text-base">
            Explore our diverse range of jewelry categories
          </p>
        </div>

        <div className="relative overflow-visible">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            navigation={{
              nextEl: '.swiper-button-next-category',
              prevEl: '.swiper-button-prev-category',
            }}
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
            className="category-swiper px-12 md:px-16"
          >
            {categories.map((category: any) => (
              <SwiperSlide key={category._id}>
                <Link 
                  href={`/category/${category.slug}`}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 block"
                >
                  <div className="relative h-80">
                    <Image
                      src={category.image || DEFAULT_CATEGORY_IMAGE}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-end justify-center pb-8">
                      <div className="text-center">
                        <h3 className="text-white text-2xl font-semibold heading-font mb-2 group-hover:text-gold transition-colors">
                          {category.name}
                        </h3>
                        <span className="text-gray-300 text-sm uppercase tracking-widest group-hover:text-white transition-colors">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Buttons - Outside the slider with gold background, centered vertically */}
          <button className="swiper-button-prev-category absolute top-[160px] -translate-y-1/2 z-10 bg-gold hover:bg-gold-dark shadow-lg rounded-full w-12 h-12 hidden lg:flex items-center justify-center transition-all duration-300 lg:-left-16 xl:-left-20 2xl:-left-24">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="swiper-button-next-category absolute top-[160px] -translate-y-1/2 z-10 bg-gold hover:bg-gold-dark shadow-lg rounded-full w-12 h-12 hidden lg:flex items-center justify-center transition-all duration-300 lg:-right-16 xl:-right-20 2xl:-right-24">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

