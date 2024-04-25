import React from 'react';
import './WinnerRow.css';

// @ts-ignore
import carLogo from '../../pics/icons/car.svg';

interface WinnerRowProps {
  name: string;
  time: number;
  wins: number;
  color: string;
}

export const WinnerRow: React.FC<WinnerRowProps> = ({
  name,
  time,
  wins,
  color,
}) => {
  return (
    <div className='winners_row'>
      <div className='box'>
        <img
          src={carLogo}
          alt='car'
          className='winner_car'
          style={{ borderColor: color }}
        />
      </div>
      <div className='box'>
        <span className='winner_name'>{name}</span>
      </div>
      <div className='box'>
        <span className='winner_wins'>{wins}</span>
      </div>
      <div className='box'>
        <span className='winner_time'>{time}</span>
      </div>
    </div>
  );
};
