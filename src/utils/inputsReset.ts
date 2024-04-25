import { carParams } from '../interfaces/paramsInterface';

export const resetState = (
  setState: React.Dispatch<React.SetStateAction<carParams>>,
) => {
  setState({
    name: '',
    color: '#000000',
  });
};
