import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categories');
      return response.data;
    },
  });
};

export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categories');
      return response.data.find((cat: any) => cat.slug === slug);
    },
    enabled: !!slug,
  });
};

