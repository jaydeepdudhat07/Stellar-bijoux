'use client';

import { motion } from 'framer-motion';
import CategoryShowcase from './CategoryShowcase';
import Newsletter from './Newsletter';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="pt-20">
      {/* Hero Section - Simplified without Parallax */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2070&q=80"
            alt="Exquisite Gold Jewelry"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="text-center text-white px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl script-font mb-6">
              Exquisite Gold Jewelry
            </h1>
            <p className="text-sm md:text-base tracking-widest font-light mb-10 max-w-2xl mx-auto leading-loose">
              DISCOVER OUR STUNNING COLLECTION OF HANDCRAFTED JEWELRY. 
              EACH PIECE TELLS A STORY OF ELEGANCE AND TIMELESS BEAUTY
            </p>
            <Link 
              href="#categories"
              className="elegant-button bg-white text-black px-12 py-4 text-sm tracking-widest uppercase font-medium"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Category Showcase */}
      <div id="categories">
        <CategoryShowcase />
      </div>

      {/* Featured Products - Temporarily disabled */}
      <section className="py-20 px-4 md:px-14 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="uppercase text-xs tracking-widest py-2 px-6 rounded-full bg-wheat text-gray-800 font-medium">
            Featured
          </span>
          <h2 className="my-6 text-4xl md:text-5xl font-semibold heading-font">
            <span className="underline decoration-gold decoration-4 underline-offset-8">Featured</span> products
          </h2>
          <p className="text-gray-600 text-sm tracking-wider leading-relaxed mb-8">
            Explore our handpicked selection of exquisite jewelry
          </p>
          <Link 
            href="/products" 
            className="inline-block px-8 py-3 bg-gold text-white rounded-sm hover:bg-gold-dark transition-colors uppercase tracking-wider text-sm font-medium"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Video/Image Banner Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=2070&q=80"
            alt="Jewelry craftsmanship"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/50 to-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-4xl md:text-5xl script-font mb-4">
              Handcrafted with Love
            </h2>
            <p className="text-sm md:text-base tracking-widest font-light">
              EVERY PIECE IS METICULOUSLY CRAFTED BY SKILLED ARTISANS
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <Newsletter />

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold heading-font text-gray-900 mb-6">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-gray-600 text-lg mb-10 tracking-wide">
            Get in touch with us to discuss your jewelry needs
          </p>
          <a
            href="/contact"
            className="inline-block bg-black text-white font-semibold px-12 py-4 rounded-sm hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm"
          >
            Contact Us Now
          </a>
        </div>
      </section>
    </div>
  );
}

