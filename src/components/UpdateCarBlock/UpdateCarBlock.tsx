import axios from 'axios';
import { useContext, useState } from 'react';

import { CarContext } from '../../store/CarsContext';
import { getCarsData } from '../../API/getCarsData';
import { resetState } from '../../utils/inputsReset';
import { carParams } from '../../interfaces/paramsInterface';

export const UpdateCarBlock = () => {
  const { setCarsPerPage } = useContext(CarContext);
  const { currentPage } = useContext(CarContext);
  const { selectedCarId, setSelectedCarId } = useContext(CarContext);

  const [updateParams, setUpdateParams] = useState<carParams>({
    name: '',
    color: '#000000',
  });

  const updatedCarParams = (
    e: React.ChangeEvent<HTMLInputElement>,
    param: string,
  ) => {
    setUpdateParams((prevParams) => ({
      ...prevParams,
      [param]: e.target.value,
    }));
  };

  const updateCar = async (id: number | null) => {
    if (id) {
      try {
        const updatedCarData = {
          name: updateParams.name,
          color: updateParams.color,
        };
        console.log(updatedCarData);
        const response = await axios.put(
          `http://localhost:3000/garage/${id}`,
          updatedCarData,
        );
        console.log(response);
        if (!response) {
          throw new Error('Something goes wrong with car updating');
        }
        console.log('Car updated');
      } catch (error) {
        console.error('We have an error, Houston:', error);
      }

      const resp = await getCarsData(currentPage, 10);
      const carsFromDB = resp.cars;

      setCarsPerPage?.(carsFromDB);

      resetState(setUpdateParams);
      setSelectedCarId(null);
    }
  };

  return (
    <div className='update_container'>
      <input
        value={updateParams.name}
        type='text'
        onChange={(e) => updatedCarParams(e, 'name')}
      />
      <input
        value={updateParams.color}
        type='color'
        onChange={(e) => updatedCarParams(e, 'color')}
      />
      <button onClick={() => updateCar(selectedCarId)}>Update</button>
    </div>
  );
};
