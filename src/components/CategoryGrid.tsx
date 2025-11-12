'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/category/${category.slug}`}>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 text-center hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-yellow-400">
              <div className="text-4xl mb-4">💍</div>
              <h3 className="text-xl font-semibold heading-font text-gray-900 mb-2">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-sm text-gray-600">{category.description}</p>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

