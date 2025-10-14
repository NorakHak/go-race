import { useContext, useState } from 'react';


import { getCarsData } from '../../API/getCarsData';
import { sendCarData } from '../../API/sendCarData';
import { carParams } from '../../interfaces/paramsInterface';
import { resetState } from '../../utils/inputsReset';
import { useCarContext } from '../../store/CarsContext';
import { randomId } from '../../utils/randomId';
import './CreateCarBlock.css';
import { CarI } from '../../interfaces/carI';

export const CreateCarBlock = () => {
  const { currentPage } = useCarContext();
  const { setCarsPerPage } = useCarContext();

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

    // const createdCar: CarI = {
    //   name,
    //   color,
    //   id,
    //   animationStart: false,
    // };

    // await sendCarData(createdCar);

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

