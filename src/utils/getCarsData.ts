import axios from '../config/axios';
import { Car } from './CarInterface';

export const getCarsData = async (): Promise<Car[]> => {
  const response = await axios.get('/garage');

  if (!response) {
    throw new Error('Something goes wrong');
  }

  return response.data;
};
