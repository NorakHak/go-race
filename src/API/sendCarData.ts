import axios from '../config/axios';
import { Car } from '../interfaces/carInterface';

export const sendCarData = async (data: Car): Promise<void> => {
  try {
    const response = await axios.post('/garage', data);
    if (!response) {
      throw new Error('Something goes wrong while creating a car');
    }
    console.log('Car is on server side');
  } catch (error) {
    console.error('We have an error, Houston:', error);
  }
};
