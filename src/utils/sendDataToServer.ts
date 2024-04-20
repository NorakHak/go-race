import axios from '../config/axios';
import { Car } from './CarInterface';

export const sendDataToServer = async (data: Car): Promise<void> => {
  try {
    const response = await axios.post('/garage', data);
    if (!response) {
      throw new Error('Something goes wrong');
    }
    console.log('Data is on server side');
  } catch (error) {
    console.error('We have an error, Houston:', error);
  }
};
