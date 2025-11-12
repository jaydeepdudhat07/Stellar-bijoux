'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  photos: { url: string }[];
  colors: string[];
  carat: string;
}

export default function ProductCard({ product }: { product: Product }) {

  return (
    <Link href={`/product/${product.slug}`} className="h-full block">
      <motion.div
        whileHover={{ y: -8 }}
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-shadow hover:shadow-xl h-full flex flex-col"
      >
        <div className="relative h-64 bg-gray-100 flex-shrink-0">
          {product.photos && product.photos.length > 0 ? (
            <Image
              src={product.photos[0].url}
              alt={product.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold heading-font text-gray-900 mb-2 line-clamp-1">
            {product.title}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-yellow-600">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {product.carat}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-auto">
            {product.colors.map((color) => (
              <span
                key={color}
                className="text-xs bg-yellow-50 text-yellow-800 px-2 py-1 rounded"
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

