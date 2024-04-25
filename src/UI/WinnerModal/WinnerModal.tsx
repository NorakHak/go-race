import './WinnerModal.css';
import { Dispatch, MouseEventHandler, SetStateAction, useEffect } from 'react';

interface modalLoadingProps {
  modalActive: boolean;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  displayWinnerTime: number;
  displayWinnerName: string;
}

export const ModalLoading: React.FC<modalLoadingProps> = ({
  modalActive,
  setModalActive,
  displayWinnerName,
  displayWinnerTime,
}) => {
  return (
    <div className='winner_modal'>
      <div className='winner_modal_content'>
        <div className='winner_modal_btn_container'>
          <button
            className='winner_modal_btn'
            onClick={() => {
              setModalActive(false);
            }}
          >
            X
          </button>
        </div>
        <div className='winner_modal_desc'>
          <p className='winner_modal_header'>Winner is</p>
          <p className='winner_modal_car'>{displayWinnerName}</p>
          <p className='winner_modal_time'>{displayWinnerTime}secs</p>
        </div>
      </div>
    </div>
  );
};
