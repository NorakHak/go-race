import './Garage.css';
import { useContext, useEffect, useState } from 'react';

import axios from '../../config/axios';
import { Row } from '../Row/Row';
import { getCarsData } from '../../API/getCarsData';
import { CarContext } from '../../store/CarsContext';
import { Pagination } from '../Pagination/Pagination';
import { GeneratingBtn } from '../GeneratingBtn/GeneratingBtn';
import { CreateCarBlock } from '../CreateCarBlock/CreateCarBlock';
import { UpdateCarBlock } from '../UpdateCarBlock/UpdateCarBlock';
import { inRaceCarInterface } from '../../interfaces/inRaceCarInterface';
import { ModalLoading } from '../../UI/WinnerModal/WinnerModal';
import { sendWinnerData } from '../../API/sendWinnerData';
import { getWinnersData } from '../../API/getWinnersData';

export const Garage: React.FC = () => {
  const { raceCarsArr, setRaceCarsArr } = useContext(CarContext);
  const { currentPage } = useContext(CarContext);
  const { carsPerPage, setCarsPerPage } = useContext(CarContext);
  const { setSelectedCarId } = useContext(CarContext);
  const [minTime, setMinTime] = useState(0);
  const { modalActive, setModalActive } = useContext(CarContext);
  const [raceStarted, setRaceStarted] = useState(false);
  const [isLoadingCarsVelocity, setIsLoadingCarsVelocity] = useState(false);
  const [raceStoped, setRaceStoped] = useState(false);
  const [raceBlock, setRaceBlock] = useState(false);
  const [winnersIds, setWinnersIds] = useState<number[]>([]);
  const [displayWinnerName, setDisplayWinnerName] = useState('');
  const [displayWinnerTime, setDisplayWinnerTime] = useState(0);

  // generating cars from db, passing to useEffect current page number for pagination tracking

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getCarsData(currentPage, 10);
        const cars = resp.cars;

        setCarsPerPage?.(cars);
      } catch (error) {
        console.error('Error fetching garage data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  // fetching winners ids from server

  useEffect(() => {
    const fetchData = async () => {
      try {
        const winnersData = await getWinnersData();
        winnersData.forEach((winner) => {
          setWinnersIds((prev) => [...prev, winner.id]);
        });

        setWinnersIds((prev) =>
          prev.filter((item, index) => {
            return prev.indexOf(item) === index;
          }),
        );
      } catch {}
    };
    fetchData();
  }, []);

  // race / reset race and winner calculating

  const gettingMinTime = (arr: inRaceCarInterface[]) => {
    if (arr.length > 0) {
      const minTime = arr.reduce(
        (min, obj) => (obj.time < min ? obj.time : min),
        arr[0].time,
      );
      return minTime;
    }
    return 0;
  };

  const gettingMaxTime = (arr: inRaceCarInterface[]) => {
    if (arr.length === 0) {
      return 0;
    }

    return arr.reduce(
      (max, obj) => (obj.time > max ? obj.time : max),
      arr[0].time,
    );
  };

  const updatingWinnerStats = async (id: number, time: number) => {
    try {
      const { data: winnerFromDB } = await axios.get(`/winners/${id}`);

      const updatedData = {
        wins: winnerFromDB.wins + 1,
        time: time,
      };

      await axios.put(`/winners/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('WinnerInterface is updated');
    } catch (error) {
      console.error('Something goes wrong while updating', error);
    }
  };

  const creatingWinner = async (
    id: number,
    time: number,
    name: string,
    color: string,
  ) => {
    const winner = {
      id,
      wins: 1,
      time,
      name,
      color,
    };

    await sendWinnerData(winner);
  };

  const calculateWinner = (arr: inRaceCarInterface[], sec: number) => {
    const winnerObj = arr.find((obj) => (obj.time = sec));
    if (winnerObj !== undefined) {
      setDisplayWinnerName(winnerObj.carName);
      setDisplayWinnerTime(winnerObj.time);
      if (winnersIds.includes(winnerObj.carId)) {
        updatingWinnerStats(winnerObj.carId, sec);
      } else {
        setWinnersIds((prev) => [...prev, winnerObj.carId]);
        creatingWinner(
          winnerObj.carId,
          sec,
          winnerObj.carName,
          winnerObj.color,
        );
      }
    }
  };

  useEffect(() => {
    let timeoutToken: NodeJS.Timeout;
    setRaceStoped(false);
    if (raceCarsArr.length === carsPerPage.length && raceCarsArr.length !== 0) {
      const minTime = gettingMinTime(raceCarsArr);
      const maxTime = gettingMaxTime(raceCarsArr) + 1;

      setMinTime(minTime);

      calculateWinner(raceCarsArr, minTime);
      timeoutToken = setTimeout(() => {
        setRaceStarted(false);
        setIsLoadingCarsVelocity(false);
        setModalActive(true);
        setRaceCarsArr([]);
      }, minTime * 2000);
    }
    return () => {
      if (timeoutToken) {
        clearTimeout(timeoutToken);
      }
    };
  }, [raceCarsArr]);

  const startAllCarsAnimation = () => {
    setIsLoadingCarsVelocity(true);
    setRaceStarted(true);
    setRaceBlock(true);
  };

  const resetAllCarsAnimation = () => {
    setRaceStoped(true);
    setRaceBlock(false);
  };

  //selecting a car

  const selectCar = (id: number): void => {
    const selectedCar = carsPerPage.find((car) => {
      return car.id === id;
    });
    if (selectedCar) {
      setSelectedCarId(selectedCar.id);
    }
  };

  //deleting car

  const deleteCar = async (id: number) => {
    try {
      const response = await axios.delete(`/garage/${id}`);

      if (!response) {
        throw new Error('Something goes wrong with car deleting');
      }
      console.log('Car deleted');
    } catch (error) {
      console.error('We have an error, Houston:', error);
    }

    const resp = await getCarsData(currentPage, 10);
    const carsFromDB = resp.cars;

    setCarsPerPage?.(carsFromDB);
  };

  return (
    <>
      <div className='race_part'>
        <div className='main_btns_container'>
          <div className='race_btns'>
            <button onClick={startAllCarsAnimation} disabled={raceBlock}>
              Race
            </button>
            <button
              onClick={resetAllCarsAnimation}
              disabled={isLoadingCarsVelocity}
            >
              Reset
            </button>
          </div>
          <div className='create_update_btns'>
            <CreateCarBlock />
            <UpdateCarBlock />
          </div>
          <GeneratingBtn />
        </div>
        <div className='rows_container'>
          <div className='start'>
            <p className='start_text'>START</p>
          </div>
          <div className='finish'>
            <p className='finish_text'>FINISH</p>
          </div>
          {carsPerPage.map((car) => {
            return (
              <Row
                deleteCar={deleteCar}
                selectCar={selectCar}
                raceStarted={raceStarted}
                raceStoped={raceStoped}
                key={car.id}
                car={car}
              />
            );
          })}
        </div>
      </div>
      {<Pagination />}
      {modalActive ? (
        <ModalLoading
          modalActive={modalActive}
          setModalActive={setModalActive}
          displayWinnerName={displayWinnerName}
          displayWinnerTime={displayWinnerTime}
        />
      ) : (
        ''
      )}
    </>
  );
};
