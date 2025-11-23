import { http, isHttpError } from 'tosslib';
import type { SavingsProductResponse } from './type';

export const getSavingsProducts = async () => {
  try {
    const response = await http.get<SavingsProductResponse>('/api/savings-products');
    return response;
  } catch (error) {
    if (isHttpError(error)) {
      console.error(error.message);
    }
    throw error;
  }
};
