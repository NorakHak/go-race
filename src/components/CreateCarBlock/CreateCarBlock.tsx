import { useContext, useState } from 'react';

import { Car } from '../../interfaces/carInterface';
import { getCarsData } from '../../API/getCarsData';
import { sendCarData } from '../../API/sendCarData';
import { carParams } from '../../interfaces/paramsInterface';
import { resetState } from '../../utils/inputsReset';
import { CarContext } from '../../store/CarsContext';
import { randomId } from '../../utils/randomId';
import './CreateCarBlock.css';

export const CreateCarBlock = () => {
  const { currentPage } = useContext(CarContext);
  const { setCarsPerPage } = useContext(CarContext);

  const [createParams, setCreateParams] = useState<carParams>({
    name: '',
    color: '#000000',
  });

  const handleCreateCarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    changingParam: string,
  ) => {
    const value = e.target.value;

    if (value) {
      setCreateParams((prevParams) => ({
        ...prevParams,
        [changingParam]: value,
      }));
    }
  };

  const createCar = async (
    e: React.MouseEvent<HTMLButtonElement>,
    name: string,
    color: string,
    id: number,
    animationStart: boolean,
  ) => {
    e.preventDefault();

    const createdCar: Car = {
      name,
      color,
      id,
      animationStart: false,
    };

    await sendCarData(createdCar);

    const resp = await getCarsData(currentPage, 10);
    const carsFromDB = resp.cars;

    setCarsPerPage?.(carsFromDB);

    resetState(setCreateParams);
  };

  return (
    <div className='create_container'>
      <input
        value={createParams.name}
        onChange={(e) => handleCreateCarChange(e, 'name')}
        type='text'
      />
      <input
        type='color'
        value={createParams.color}
        onChange={(e) => handleCreateCarChange(e, 'color')}
      />
      <button
        onClick={(e) =>
          createParams.name &&
          createParams.color &&
          createCar(e, createParams.name, createParams.color, randomId(), false)
        }
      >
        Create
      </button>
    </div>
  );
};
function setCarsPerPage(carsFromDB: Car[]) {
  throw new Error('Function not implemented.');
}
