'use client';

import Link from 'next/link';
import { useCategories } from '@/hooks/useCategories';
import Image from 'next/image';

const categoryImages: Record<string, string> = {
  'rings': 'https://ik.imagekit.io/saufrbirqu/i2.webp?updatedAt=1717236800074',
  'necklaces': 'https://ik.imagekit.io/saufrbirqu/necklace.jpg?updatedAt=1717394966117',
  'bracelets': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
  'earrings': 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  'bangles': 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
  'chains': 'https://ik.imagekit.io/saufrbirqu/chain.jpg?updatedAt=1717392770688',
  'pendants': 'https://ik.imagekit.io/saufrbirqu/pendant.jpg?updatedAt=1717153064715',
  'mangalsutra': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpb2Agov1OAxjwZdR7WmFkfk44NEc6o4wfNA&s',
};

export default function CategoryShowcase() {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return null;
  }

  return (
    <section className="py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold heading-font mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 tracking-wider text-sm md:text-base">
            Explore our diverse range of jewelry categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 8).map((category: any) => (
            <Link 
              key={category._id} 
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-80">
                <Image
                  src={categoryImages[category.slug.toLowerCase()] || categoryImages['rings']}
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
          ))}
        </div>
      </div>
    </section>
  );
}

