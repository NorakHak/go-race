import axios from '../config/axios';
import { CarI } from '../interfaces/carI';

export const getCarsData = async (
  page: number,
  limit: number,
): Promise<{ cars: CarI[]; totalCount: number }> => {
  const response = await axios.get(`/garage?_page=${page}&_limit=${limit}`);

  if (!response) {
    throw new Error('Something goes wrong');
  }

  const totalCount: number = response.headers['x-total-count'];
  return {
    cars: response.data,
    totalCount: totalCount,
  };
};
