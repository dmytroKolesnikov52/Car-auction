import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Car } from '../components/organisms/CarCard';

interface CarsContextValue {
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  addCar: (car: Car) => void;
  updateCar: (id: number | string, updatedCar: Partial<Car>) => void;
  deleteCar: (id: number | string) => void;
}

const CarsContext = createContext<CarsContextValue | undefined>(undefined);

export function CarsProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetch('https://car-auction-backend-b0ba.onrender.com/api/cars-with-images')
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((error) => {
        console.error('Failed to load cars:', error);
      });
  }, []);

  const addCar = (car: Car) => {
    setCars((prev) => [...prev, car]);
  };

  const updateCar = (id: number | string, updatedCar: Partial<Car>) => {
    setCars((prev) =>
      prev.map((car) =>
        String(car.id) === String(id) ?
          { ...car, ...updatedCar, id: car.id }
        : car,
      ),
    );
  };

  const deleteCar = (id: number | string) => {
    setCars((prev) => prev.filter((car) => String(car.id) !== String(id)));
  };

  return (
    <CarsContext.Provider
      value={{
        cars,
        setCars,
        addCar,
        updateCar,
        deleteCar,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCars() {
  const context = useContext(CarsContext);

  if (!context) {
    throw new Error('useCars must be used within CarsProvider');
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCarsWithOutAuction(): Car[] {
  const context = useContext(CarsContext);

  return useMemo(() => {
    if (!context) {
      throw new Error('useCars must be used within CarsProvider');
    }

    return context.cars.filter((car) => !car.is_auction);
  }, [context]);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCarsWithAuction(): Car[] {
  const context = useContext(CarsContext);

  return useMemo(() => {
    if (!context) {
      throw new Error('useCars must be used within CarsProvider');
    }

    return context.cars.filter((car) => car.is_auction);
  }, [context]);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCarsAllCars(): Car[] {
  const context = useContext(CarsContext);

  if (!context) {
    throw new Error('useCars must be used within CarsProvider');
  }

  return context.cars;
}
