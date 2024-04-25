import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

import './Pagination.css';
import { getCarsData } from '../../API/getCarsData';
import { CarContext } from '../../store/CarsContext';

export const Pagination = ({}) => {
  const { currentPage, setCurrentPage } = useContext(CarContext);

  const nextPage = async () => {
    const max = await countPagesNumber();
    if (currentPage < max) {
      setCurrentPage((prev: number) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev: number) => prev - 1);
    }
  };

  const limit = 10;

  const countPagesNumber = async () => {
    const data = await getCarsData(1, limit);
    const allCars = data.totalCount;
    const pagesCount = Math.ceil(allCars / limit);
    return pagesCount;
  };

  return (
    <div className='pagination_container'>
      <button onClick={prevPage} className='prev_page'>
        <FontAwesomeIcon size='2x' icon={faBackward} />
      </button>

      <span className='page_num'>{currentPage}</span>
      <button className='next_page'>
        <FontAwesomeIcon onClick={nextPage} size='2x' icon={faForward} />
      </button>
    </div>
  );
};
