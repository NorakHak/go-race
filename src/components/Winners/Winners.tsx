import React, { useEffect, useState } from 'react';

import { getSortedWinners } from '../../API/getSortedWinners';
import { getWinnersData } from '../../API/getWinnersData';
import { WinnerInterface } from '../../interfaces/winnerInterface';
import { WinnerRow } from '../WinnerRow/WinnerRow';
import './Winners.css';

const Winners = () => {
  const [winners, setWinners] = useState<WinnerInterface[]>([]);
  const [decrSort, setDecrSort] = useState(false);
  const [type, setType] = useState('ASC');

  //fetching winners from db

  useEffect(() => {
    const fetchData = async () => {
      // const winnersData = await getWinnersData();
      // setWinners(winnersData);
    };
    fetchData();
  }, []);

  //sorting

  const sortByWins = async () => {
    const sortedByWins = await getSortedWinners('wins', type);
    setWinners(sortedByWins);
  };

  const sortByTime = async () => {
    const sortedByTime = await getSortedWinners('time', type);
    setWinners(sortedByTime);
  };

  const ascOrDesc = () => {
    setDecrSort((prev) => !prev);
    if (decrSort) {
      setType('ASC');
    } else {
      setType('DESC');
    }
  };

  return (
    <div className='winners_container'>
      <div className='winners_header'>WINNERS</div>
      <div className='sort_btns'>
        <p className='sort_heading'>Sorty by</p>
        <div className='sort_btns_container'>
          <button className='sort_time' onClick={sortByTime}>
            Time
          </button>
          <button className='sort_wins' onClick={sortByWins}>
            Wins
          </button>
          <input type='checkbox' onClick={ascOrDesc} />
          <span className='checkbox_text'>Asc/Desc</span>
        </div>
      </div>
      <div className='winners_main'>
        <div className='winners_top_part'>
          <div className='box'>
            <span className='winners_car'>CAR</span>
          </div>
          <div className='box'>
            <span className='winners_name'>NAME</span>
          </div>
          <div className='box'>
            <span className='winners_wins'>WINS</span>
          </div>
          <div className='box'>
            <span className='winners_time'>BEST TIME (SECONDS)</span>
          </div>
        </div>
        {winners.map((winner) => {
          return (
            <WinnerRow
              key={winner.id}
              name={winner.name}
              wins={winner.wins}
              time={winner.time}
              color={winner.color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Winners;
