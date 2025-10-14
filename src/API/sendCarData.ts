import axios from '../config/axios';
import { CarI } from '../interfaces/carI';


export const sendCarData = async (data: CarI): Promise<void> => {
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
