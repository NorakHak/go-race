import { WinnerInterface } from '../interfaces/winnerInterface';
import axios from '../config/axios';

export const getSortedWinners = async (
  sort: string,
  order: string,
): Promise<WinnerInterface[]> => {
  try {
    const response = await axios.get('/winners', {
      params: {
        _sort: sort,
        _order: order,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch sorted data:', error);
    throw error;
  }
};
