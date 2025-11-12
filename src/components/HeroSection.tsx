'use client';

import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <ParallaxBanner
      style={{ aspectRatio: '2 / 1', height: '100vh' }}
      className="relative"
    >
      <ParallaxBannerLayer
        image="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2070&q=80"
        speed={-20}
        style={{ 
          width: '100%', 
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      <ParallaxBannerLayer className="relative h-full">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl script-font mb-6 animate-fadeIn">
              Exquisite Gold Jewelry
            </h1>
            <p className="text-sm md:text-base tracking-widest font-light mb-10 max-w-2xl mx-auto leading-loose">
              DISCOVER OUR STUNNING COLLECTION OF HANDCRAFTED JEWELRY. 
              EACH PIECE TELLS A STORY OF ELEGANCE AND TIMELESS BEAUTY
            </p>
            <Link 
              href="#featured"
              className="elegant-button bg-white text-black px-12 py-4 text-sm tracking-widest uppercase font-medium"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </ParallaxBannerLayer>
    </ParallaxBanner>
  );
}

