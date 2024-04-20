import './Row.css';
import { Car } from '../../utils/CarInterface';
// @ts-ignore
import carLogo from '../../imgs/icons/car.svg';

interface rowProps {
  car: Car;
  selectCar: (id: string) => void;
  deleteCar: (id: string) => void;
}

export const Row: React.FC<rowProps> = ({ selectCar, deleteCar, car }) => {
  return (
    <div className='row'>
      <div className='garage_container'>
        <div className='garage_btns'>
          <button onClick={() => selectCar(car.id)} className='select_btn'>
            Select
          </button>
          <button className='a_btn'>A</button>
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
            style={{ borderColor: car.color }}
          />
        </div>
        <div className='car_name'>{car.name}</div>
      </div>
    </div>
  );
};
