import { SlidersHorizontal } from 'lucide-react';
import CarFilterCheckBox from '../organisms/CarFilterCheckBox';
import CarFilterRange from '../organisms/CarFilterRange';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Car } from '../organisms/CarCard';
import { useTranslation } from 'react-i18next';

export type RangeFilter = {
  from: string;
  to: string;
};

export interface CarFiltersState {
  brand: string[];
  body_type: string[];
  engine_type: string[];
  seats: string[];
  drive_type: string[];
  transmission: string[];
  year: RangeFilter;
  price: RangeFilter;
  mileage: RangeFilter;
  engine_volume: RangeFilter;
  battery_capacity: RangeFilter;
}

export function CarFilters({
  filters,
  setFilters,
  cars,
}: {
  filters: CarFiltersState;
  setFilters: Dispatch<SetStateAction<CarFiltersState>>;
  cars: Car[];
}) {
  const { t } = useTranslation();
  const toggleCheckboxFilter = (
    field: keyof Pick<
      CarFiltersState,
      | 'brand'
      | 'body_type'
      | 'engine_type'
      | 'seats'
      | 'drive_type'
      | 'transmission'
    >,
    value: string,
  ) => {
    setFilters((prev) => {
      const list = prev[field] as string[];
      const next =
        list.includes(value) ?
          list.filter((item) => item !== value)
        : [...list, value];

      return {
        ...prev,
        [field]: next,
      } as CarFiltersState;
    });
  };

  const setRangeFilter = (
    field: keyof Pick<
      CarFiltersState,
      'year' | 'price' | 'mileage' | 'engine_volume' | 'battery_capacity'
    >,
    from: string,
    to: string,
  ) => {
    setFilters(
      (prev) =>
        ({
          ...prev,
          [field]: { from, to },
        }) as CarFiltersState,
    );
  };

  const [openedBrand, setOpenedBrand] = useState(true);
  const [openedBodyType, setOpenedBodyType] = useState(false);
  const [openedYear, setOpenedYear] = useState(false);
  const [openedPrice, setOpenedPrice] = useState(false);
  const [openedMileage, setOpenedMileage] = useState(false);
  const [openedEngineType, setOpenedEngineType] = useState(false);
  const [openedEngineVolume, setOpenedEngineVolume] = useState(false);
  const [openedBatteryCapacity, setOpenedBatteryCapacity] = useState(false);
  const [openedSeats, setOpenedSeats] = useState(false);
  const [openedDriveType, setOpenedDriveType] = useState(false);
  const [openedTransmission, setOpenedTransmission] = useState(false);

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between border-b border-white/15 pb-6 mb-6">
        <h2 className="text-yellow-400 font-bold text-xl">
          {t('filters.title')}
        </h2>
        <SlidersHorizontal
          size={18}
          className="text-yellow-400"
        />
      </div>

      <CarFilterCheckBox
        openedFilter={openedBrand}
        setOpenedFilter={setOpenedBrand}
        typeOfFilter="brand"
        nameOfFilter={t('filters.brand')}
        selectedValues={filters.brand}
        onToggle={toggleCheckboxFilter}
        cars={cars}
      />

      <CarFilterCheckBox
        openedFilter={openedBodyType}
        setOpenedFilter={setOpenedBodyType}
        typeOfFilter="body_type"
        nameOfFilter={t('filters.bodyType')}
        selectedValues={filters.body_type}
        onToggle={toggleCheckboxFilter}
        cars={cars}
      />

      <CarFilterRange
        openedFilter={openedYear}
        setOpenedFilter={setOpenedYear}
        typeOfFilter="year"
        nameOfFilter={t('filters.year')}
        onChange={(from, to) => setRangeFilter('year', from, to)}
        cars={cars}
      />

      <CarFilterRange
        openedFilter={openedPrice}
        setOpenedFilter={setOpenedPrice}
        typeOfFilter="price"
        nameOfFilter={t('filters.price')}
        onChange={(from, to) => setRangeFilter('price', from, to)}
        cars={cars}
      />

      <CarFilterRange
        openedFilter={openedMileage}
        setOpenedFilter={setOpenedMileage}
        typeOfFilter="mileage"
        nameOfFilter={t('filters.mileage')}
        onChange={(from, to) => setRangeFilter('mileage', from, to)}
        cars={cars}
      />

      <CarFilterCheckBox
        openedFilter={openedEngineType}
        setOpenedFilter={setOpenedEngineType}
        typeOfFilter="engine_type"
        nameOfFilter={t('filters.engineType')}
        selectedValues={filters.engine_type}
        onToggle={toggleCheckboxFilter}
        cars={cars}
      />

      <CarFilterRange
        openedFilter={openedEngineVolume}
        setOpenedFilter={setOpenedEngineVolume}
        typeOfFilter="engine_volume"
        nameOfFilter={t('filters.engineVolume')}
        onChange={(from, to) => setRangeFilter('engine_volume', from, to)}
        cars={cars}
      />

      <CarFilterRange
        openedFilter={openedBatteryCapacity}
        setOpenedFilter={setOpenedBatteryCapacity}
        typeOfFilter="battery_capacity"
        nameOfFilter={t('filters.batteryCapacity')}
        onChange={(from, to) => setRangeFilter('battery_capacity', from, to)}
        cars={cars}
      />

      <CarFilterCheckBox
        openedFilter={openedSeats}
        setOpenedFilter={setOpenedSeats}
        typeOfFilter="seats"
        nameOfFilter={t('filters.seats')}
        selectedValues={filters.seats}
        onToggle={toggleCheckboxFilter}
        cars={cars}
      />

      <CarFilterCheckBox
        openedFilter={openedDriveType}
        setOpenedFilter={setOpenedDriveType}
        typeOfFilter="drive_type"
        nameOfFilter={t('filters.driveType')}
        selectedValues={filters.drive_type}
        onToggle={toggleCheckboxFilter}
        cars={cars}
      />

      <CarFilterCheckBox
        openedFilter={openedTransmission}
        setOpenedFilter={setOpenedTransmission}
        typeOfFilter="transmission"
        nameOfFilter={t('filters.transmission')}
        selectedValues={filters.transmission}
        onToggle={toggleCheckboxFilter}
        cars={cars}
      />
    </aside>
  );
}
