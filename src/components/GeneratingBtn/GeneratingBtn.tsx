import { useContext } from 'react';

import { CarContext } from '../../store/CarsContext';
import { generateHundredCars } from '../../utils/generateHundredCars';
import { getCarsData } from '../../API/getCarsData';
import { sendCarData } from '../../API/sendCarData';
import './GeneratingBtn.css';

export const GeneratingBtn = () => {
  const { cars, setCars } = useContext(CarContext);
  const { currentPage } = useContext(CarContext);
  const { setCarsPerPage } = useContext(CarContext);
  const carsGenerating = async () => {
    const lastId = cars.length > 0 ? cars[cars.length - 1].id + 1 : 1;

    const hundredCars = generateHundredCars(lastId);

    try {
      hundredCars.forEach(async (car) => {
        await sendCarData(car).then((res) => {
          return res;
        });
      });
    } catch (error) {
      console.log('We got an error, while trying to get data from DB:', error);
    }
    const resp = await getCarsData(currentPage, 10);
    const carsFromDB = resp.cars;

    setCarsPerPage?.(carsFromDB);
  };

  return (
    <div className='generate_btn'>
      <button onClick={carsGenerating}>Generate Cars</button>
    </div>
  );
};
