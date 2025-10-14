import { useContext } from 'react';

import { useCarContext } from '../../store/CarsContext';
import { generateCars } from '../../utils/generateHundredCars';
import { getCarsData } from '../../API/getCarsData';
import { sendCarData } from '../../API/sendCarData';
import './GeneratingBtn.css';

export const GeneratingBtn = () => {
  const { cars, setCars } = useCarContext();
  const { currentPage } = useCarContext();
  const { setCarsPerPage } = useCarContext();

  const carsGenerating = async () => {
    const lastId = cars.length > 0 ? cars[cars.length - 1].id + 1 : 1;

    // const hundredCars = generateCars(lastId);

    // try {
    //   hundredCars.forEach(async (car) => {
    //     await sendCarData(car).then((res) => {
    //       return res;
    //     });
    //   });
    // } catch (error) {
    //   console.log('We got an error, while trying to get data from DB:', error);
    // }
    // const resp = await getCarsData(currentPage, 10);
    // const carsFromDB = resp.cars;

    // setCarsPerPage?.(carsFromDB);
  };

  return (
    <div className='generate_btn'>
      <button>
        Generate Cars
      </button>
    </div>
  );
};
