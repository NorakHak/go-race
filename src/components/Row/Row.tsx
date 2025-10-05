import { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import './Row.css';
import { Car } from '../../interfaces/carInterface';
// @ts-ignore
import carLogo from '../../pics/icons/car.svg';
import axios from '../../config/axios';
import { useCarContext } from '../../store/CarsContext';
import { inRaceCarInterface } from '../../interfaces/inRaceCarInterface';

interface rowProps {
  car: Car;
  raceStarted: boolean;
  raceStoped: boolean;
  selectCar: (id: number) => void;
  deleteCar: (id: number) => void;
}

export const Row: React.FC<rowProps> = ({
  selectCar,
  deleteCar,
  car,
  raceStarted,
  raceStoped,
}) => {
  
  const [rowWidth, setRowWidth] = useState('');
  const [animationStart, setAnimationStart] = useState(false);
  const [xInitial, setXInitial] = useState(0);
  const [animationTime, setAnimationTime] = useState(0);

  const { setRaceCarsArr } = useCarContext();

  const rowRef = useRef(null);

  useEffect(() => {
    const rowWidthCalc = () => {
      if (rowRef.current) {
        const element = rowRef.current;
        const computedStyle = window.getComputedStyle(element);
        const width = computedStyle.getPropertyValue('width');

        setRowWidth(width);
        setXInitial(+width.slice(0, -2) - 220);
      }
    };

    rowWidthCalc();

    const handleResize = () => {
      rowWidthCalc();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (animationStart) {
      setXInitial(+rowWidth.slice(0, -2) - 220);
    }
  }, [animationStart, rowWidth]);

  const startCarAnimation = async () => {
    const response = await axios.patch(`/engine?status=started&id=${car.id}`);

    const time = Math.round((xInitial / response.data.velocity) * 100) / 100;

    const animationTime = +time.toFixed();
    setAnimationTime(animationTime);

    const carObj = {
      carId: car.id,
      time,
      color: car.color,
      carName: car.name,
    };

    setRaceCarsArr((prev: inRaceCarInterface[]) => {
      return [...prev, carObj];
    });

    setTimeout(() => {
      setAnimationStart(true);
    }, 4000);
  };

  useEffect(() => {
    if (raceStarted) {
      startCarAnimation();
    }
  }, [raceStarted]);

  useEffect(() => {
    stopCarAnimation();
  }, [raceStoped]);

  const stopCarAnimation = () => {
    setAnimationStart(false);
  };

  return (
    <div className='row' ref={rowRef}>
      <div className='garage_container'>
        <div className='garage_btns'>
          <button onClick={() => selectCar(car.id)} className='select_btn'>
            Select
          </button>
          <button className='a_btn' onClick={startCarAnimation}>
            A
          </button>
          <button onClick={() => deleteCar(car.id)} className='remove_btn'>
            Remove
          </button>
          <button className='b_btn' onClick={stopCarAnimation}>
            B
          </button>
        </div>
        <div className='car_container'>
          <motion.img
            className='car_img'
            src={carLogo}
            alt='car'
            style={{ borderColor: car.color }}
            initial={{ x: 0 }}
            animate={{ x: animationStart ? -xInitial : 0 }}
            transition={{
              duration: animationStart ? animationTime : 0,
              ease: 'linear',
            }}
          />
        </div>
        <div className='car_name'>{car.name}</div>
      </div>
    </div>
  );
};
