import axios from '../config/axios';
import { WinnerInterface } from '../interfaces/winnerInterface';

export const sendWinnerData = async (data: WinnerInterface): Promise<void> => {
  try {
    const response = await axios.post('/winners', data);
    if (!response) {
      throw new Error('Something goes wrong while winner sending');
    }
    console.log('Winner is on a server side');
  } catch (error) {
    console.error('We have an error with winner, Houston:', error);
  }
};
