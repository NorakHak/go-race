import { useEffect, useState } from 'react';

import './Row.css';
import { Car } from '../../utils/CarInterface';
// @ts-ignore
import carLogo from '../../imgs/icons/car.svg';
import axios from '../../config/axios';

interface rowProps {
  car: Car;
  selectCar: (id: number) => void;
  deleteCar: (id: number) => void;
}

export const Row: React.FC<rowProps> = ({ selectCar, deleteCar, car }) => {
  const [position, setPosition] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [distance, setDistance] = useState(0);

  const startCar = async () => {
    const response = await axios.patch(`/engine?status=started&id=${car.id}`);
    setDistance(response.data.distance);
    setVelocity(response.data.velocity);
  };

  useEffect(() => {
    if (velocity !== 0 && distance !== 0) {
      const animationDuration = (distance / velocity) * 1000; // Calculate animation duration in milliseconds
      const interval = setInterval(() => {
        setPosition((prevPosition) => prevPosition + 1);
      }, animationDuration / distance);
      return () => clearInterval(interval);
    }
  }, [velocity, distance]);

  const carStyle: any = {
    position: 'absolute',
    left: `${position}px`,
    top: '50%',
    transform: 'translate(-50%, -50%)', // Center the car vertically
    width: '50px',
    height: '30px',
    backgroundColor: 'red',
  };

  return (
    <div className='row'>
      <div className='garage_container'>
        <div className='garage_btns'>
          <button onClick={() => selectCar(car.id)} className='select_btn'>
            Select
          </button>
          <button className='a_btn' onClick={startCar}>
            A
          </button>
          <button onClick={() => deleteCar(car.id)} className='remove_btn'>
            Remove
          </button>
          <button className='b_btn'>B</button>
        </div>
        <div className='car_container'>
          <img
            className='car_img'
            src={carLogo}
            alt='car'
            style={{ borderColor: car.color, ...carStyle }}
          />
        </div>
        <div className='car_name'>{car.name}</div>
      </div>
    </div>
  );
};
