import { getSavingsProducts } from './repository';
import { useQuery } from '@tanstack/react-query';

const queryKeys = {
  all: ['savings-products'],
};

export const useGetSavingsProducts = () => {
  return useQuery({
    queryKey: queryKeys.all,
    queryFn: getSavingsProducts,
  });
};
