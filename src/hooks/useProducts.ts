import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';

interface ProductFilters {
  category?: string;
  subcategory?: string;
  color?: string;
  carat?: string;
  stone?: string;
  featured?: boolean;
  search?: string;
}

export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      // Only include params if filters are provided and not empty
      if (!filters || Object.keys(filters).length === 0) {
        const response = await api.get('/products');
        return response.data;
      }
      
      // Convert filters to query params, converting boolean to string for featured
      const params: any = {};
      if (filters.category) params.category = filters.category;
      if (filters.subcategory) params.subcategory = filters.subcategory;
      if (filters.color) params.color = filters.color;
      if (filters.carat) params.carat = filters.carat;
      if (filters.stone) params.stone = filters.stone;
      if (filters.search) params.search = filters.search;
      if (filters.featured !== undefined) params.featured = filters.featured ? 'true' : 'false';
      
      const response = await api.get('/products', { params });
      return response.data;
    },
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const response = await api.get(`/products/slug/${slug}`);
      return response.data;
    },
    enabled: !!slug,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const response = await api.get('/products?featured=true');
      return response.data;
    },
  });
};

