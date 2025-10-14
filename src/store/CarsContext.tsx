import React, {
  createContext,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from 'react';

import { inRaceCarInterface } from '../interfaces/inRaceCarInterface';
import { CarI } from '../interfaces/carI';
import { generateCars } from '../utils/generateHundredCars';
interface CarContextValue {

  carsData: CarI[];

  cars: CarI[];
  setCars: (cars: CarI[]) => void;
  carsPerPage: CarI[];
  setCarsPerPage: (cars: CarI[]) => void;
  cancelAnimations: boolean;
  setCancelAnimations: (value: boolean) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  selectedCarId: number | null;
  setSelectedCarId: (value: number | null) => void;
  raceCarsArr: inRaceCarInterface[];
  setRaceCarsArr: Dispatch<SetStateAction<inRaceCarInterface[]>>;
  modalActive: boolean;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  winsCount: number;
  setWinsCount: Dispatch<SetStateAction<number>>;
}

const CarContext = createContext<CarContextValue | undefined>(undefined);

export const useCarContext = () => {
  const context = useContext(CarContext);

  if (context === undefined) {
    throw new Error('useCarContext must be used within CarProvider');
  }

  return context;
};

const CarProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const [carsData, setCarsData] = useState<CarI[]>([])

  const [cars, setCars] = useState<CarI[]>([]);
  const [carsPerPage, setCarsPerPage] = useState<CarI[]>([]);
  const [cancelAnimations, setCancelAnimations] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [raceCarsArr, setRaceCarsArr] = useState<inRaceCarInterface[]>([]);
  const [modalActive, setModalActive] = useState(false);
  const [winsCount, setWinsCount] = useState(0);

  useEffect(() => {

    function fetchCars() {
      const cars = generateCars(10);

      setCars(cars)
    }

    fetchCars();

  }, []);

  const value: CarContextValue = {
    carsData,
    cars,
    setCars,
    carsPerPage,
    setCarsPerPage,
    cancelAnimations,
    setCancelAnimations,
    currentPage,
    setCurrentPage,
    selectedCarId,
    setSelectedCarId,
    raceCarsArr,
    setRaceCarsArr,
    modalActive,
    setModalActive,
    winsCount,
    setWinsCount,
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};

export default CarProvider;

// export const CarContext = createContext<{
//   cars: Car[];
//   setCars: ((cars: Car[]) => void) | null;
//   carsPerPage: Car[];
//   setCarsPerPage: ((cars: Car[]) => void) | null;
//   cancelAnimations: boolean;
//   setCancelAnimations: (value: boolean) => void;
//   currentPage: number;
//   setCurrentPage: Dispatch<SetStateAction<number>>;
//   selectedCarId: number | null;
//   setSelectedCarId: (value: number | null) => void;
//   raceCarsArr: inRaceCarInterface[];
//   setRaceCarsArr: Dispatch<SetStateAction<inRaceCarInterface[]>>;
//   modalActive: boolean;
//   setModalActive: Dispatch<SetStateAction<boolean>>;
//   winsCount: number;
//   setWinsCount: Dispatch<SetStateAction<number>>;
// }>({
//   cars: [],
//   setCars: null,
//   cancelAnimations: true,
//   currentPage: 1,
//   setCancelAnimations: () => {},
//   setCurrentPage: () => {},
//   carsPerPage: [],
//   setCarsPerPage: null,
//   selectedCarId: null,
//   setSelectedCarId: () => {},
//   raceCarsArr: [],
//   setRaceCarsArr: () => {},
//   modalActive: false,
//   setModalActive: () => {},
//   winsCount: 0,
//   setWinsCount: () => {},
// });

// const CarProvider: React.FC<PropsWithChildren> = ({ children }) => {
//   const [cars, setCars] = useState<Car[]>([]);
//   const [cancelAnimations, setCancelAnimations] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [carsPerPage, setCarsPerPage] = useState<Car[]>([]);
//   const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
//   const [raceCarsArr, setRaceCarsArr] = useState<inRaceCarInterface[]>([]);
//   const [modalActive, setModalActive] = useState(false);
//   const [winsCount, setWinsCount] = useState(0);

//   return (
//     <CarContext.Provider
//       value={{
//         cars,
//         setCars,
//         cancelAnimations,
//         setCancelAnimations,
//         currentPage,
//         setCurrentPage,
//         carsPerPage,
//         setCarsPerPage,
//         selectedCarId,
//         setSelectedCarId,
//         raceCarsArr,
//         setRaceCarsArr,
//         modalActive,
//         setModalActive,
//         winsCount,
//         setWinsCount,
//       }}
//     >
//       {children}
//     </CarContext.Provider>
//   );
// };

// export default CarProvider;
