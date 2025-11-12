import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';

export const useStones = () => {
  return useQuery({
    queryKey: ['stones'],
    queryFn: async () => {
      const response = await api.get('/stones');
      return response.data;
    },
  });
};

