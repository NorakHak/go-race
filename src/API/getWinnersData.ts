import axios from '../config/axios';
import { WinnerInterface } from '../interfaces/winnerInterface';

export const getWinnersData = async (): Promise<WinnerInterface[]> => {
  const response = await axios.get('/winners');

  if (!response) {
    throw new Error('Something goes wrong');
  }

  return response.data;
};
