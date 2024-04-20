import './Garage.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import axios from '../../config/axios';
import { Row } from '../Row/Row';
import { getCarsData } from '../../utils/getCarsData';
import { generateHundredCars } from '../../utils/generateHundredCars';
import { sendDataToServer } from '../../utils/sendDataToServer';
import { Car } from '../../utils/CarInterface';

export const Garage: React.FC = () => {
  const resetState = (
    setState: React.Dispatch<React.SetStateAction<Params>>,
  ) => {
    setState({
      name: '',
      color: '#000000',
    });
  };

  // generating 4 test cars from server

  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCarsData();
        setCars(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // genereting 100 cars

  const carsGenerating = async () => {
    const hundredCars = generateHundredCars();

    try {
      hundredCars.forEach(async (car) => {
        await sendDataToServer(car).then((res) => {
          return res;
        });
      });
    } catch (error) {
      console.log('We got an error, while trying to get data from DB:', error);
    }
    const carsFromDB = await getCarsData();

    setCars(carsFromDB);
  };

  //creating a car

  interface Params {
    [key: string]: string;
  }

  const [createParams, setCreateParams] = useState<Params>({
    name: '',
    color: '#000000',
  });

  const handleCreateCarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    changingParam: string,
  ) => {
    const value = e.target.value;
    setCreateParams((prevParams) => ({
      ...prevParams,
      [changingParam]: value,
    }));
  };

  const createCar = async (
    e: React.MouseEvent<HTMLButtonElement>,
    name: string,
    color: string,
  ) => {
    e.preventDefault();

    const createdCar: Car = {
      name,
      color,
      id: uuidv4(),
    };

    await sendDataToServer(createdCar);

    const carsFromDB = await getCarsData();

    setCars(carsFromDB);

    resetState(setCreateParams);
  };

  //updating car

  const [updateParams, setUpdateParams] = useState<Params>({
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

  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  const selectCar = (id: string): void => {
    const selectedCar = cars.find((car) => {
      return car.id === id;
    });

    if (selectedCar) {
      setSelectedCarId(selectedCar.id);
    }
  };

  const updateCar = async (id: string | null) => {
    try {
      const updatedCarData = {
        name: updateParams.name,
        color: updateParams.color,
      };

      const response = await axios.put(`/garage/${id}`, updatedCarData);
      console.log(response);
      if (!response) {
        throw new Error('Something goes wrong with car updating');
      }
      console.log('Car updated');
    } catch (error) {
      console.error('We have an error, Houston:', error);
    }

    const carsFromDB = await getCarsData();

    setCars(carsFromDB);

    resetState(setUpdateParams);
    setSelectedCarId(null);
  };

  //deleting car

  const deleteCar = async (id: string) => {
    try {
      const response = await axios.delete(`/garage/${id}`);

      if (!response) {
        throw new Error('Something goes wrong with car deleting');
      }
      console.log('Car deleted');
    } catch (error) {
      console.error('We have an error, Houston:', error);
    }

    const carsFromDB = await getCarsData();

    setCars(carsFromDB);
  };

  return (
    <div className='race_part'>
      <div className='main_btns_container'>
        <div className='race_btns'>
          <button>Race</button>
          <button>Reset</button>
        </div>
        <div className='create_update_btns'>
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
                createCar(e, createParams.name, createParams.color)
              }
            >
              Create
            </button>
          </div>
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
        </div>
        <div className='generate_btn'>
          <button onClick={carsGenerating}>Generate Cars</button>
        </div>
      </div>
      <div className='rows_container'>
        <div className='start'>
          <p className='start_text'>START</p>
        </div>
        <div className='finish'>
          <p className='finish_text'>FINISH</p>
        </div>
        {cars.map((car) => {
          return (
            <Row
              deleteCar={deleteCar}
              selectCar={selectCar}
              key={car.id}
              car={car}
            />
          );
        })}
      </div>
    </div>
  );
};
