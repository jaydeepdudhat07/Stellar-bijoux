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
      const response = await api.get('/products', { params: filters });
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

