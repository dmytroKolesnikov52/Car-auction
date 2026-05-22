import { useEffect, useMemo, useRef, useState } from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import CarCard from '../components/organisms/CarCard';
import { useCarsWithOutAuction } from '../contexts/CarsContext';
import {
  CarFilters,
  type CarFiltersState,
} from '../components/templates/CarFilters';
import { Pagination } from '../components/organisms/Pagination';
import { initialFilters } from '../Types';
import { PerPageSelect } from '../components/molecules/PerPageSelect';
import { SearchElement } from '../components/molecules/Search';
import { useTranslation } from 'react-i18next';

export default function OrderCarsPage() {
  const { t } = useTranslation();
  const cars = useCarsWithOutAuction();
  const [perPage, setPerPage] = useState('2');
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const [visibleCountPagination, setVisibleCountPagination] = useState(2);
  const [filters, setFilters] = useState<CarFiltersState>(initialFilters);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const checkboxFields: Array<
        keyof Pick<
          CarFiltersState,
          | 'brand'
          | 'body_type'
          | 'engine_type'
          | 'seats'
          | 'drive_type'
          | 'transmission'
        >
      > = [
        'brand',
        'body_type',
        'engine_type',
        'seats',
        'drive_type',
        'transmission',
      ];

      for (const field of checkboxFields) {
        const selected = filters[field] as string[];
        if (selected.length > 0 && !selected.includes(String(car[field])))
          return false;
      }

      const rangeFields: Array<
        keyof Pick<
          CarFiltersState,
          'year' | 'price' | 'mileage' | 'engine_volume' | 'battery_capacity'
        >
      > = ['year', 'price', 'mileage', 'engine_volume', 'battery_capacity'];

      for (const field of rangeFields) {
        const range = filters[field];
        const value = car[field] as number | null | undefined;
        if (
          range.from !== '' &&
          (value === null ||
            value === undefined ||
            Number(value) < Number(range.from))
        )
          return false;
        if (
          range.to !== '' &&
          (value === null ||
            value === undefined ||
            Number(value) > Number(range.to))
        )
          return false;
      }

      return true;
    });
  }, [cars, filters]);

  const visibleCars = useMemo(() => {
    return filteredCars.slice(startIndex, startIndex + visibleCount);
  }, [filteredCars, startIndex, visibleCount]);

  return (
    <main>
      <div className="min-h-screen w-full bg-black text-white px-16 py-5">
        <div className="flex items-center gap-3 text-sm mb-8 text-white/80">
          <Link to="/">
            <Home size={15} />
          </Link>
          <span>›</span>
          <span>{t('hero.orderButton')}</span>
        </div>

        <h1 className="text-5xl font-bold mb-10">{t('order.carForOrder')}</h1>

        <div className="grid grid-cols-[320px_1fr] gap-10">
          <CarFilters
            filters={filters}
            setFilters={setFilters}
            cars={cars}
          />

          <main>
            <div className="border border-white/20 rounded h-14 flex items-center justify-between px-3 mb-8">
              <PerPageSelect
                perPage={perPage}
                setPerPage={setPerPage}
                setVisibleCount={setVisibleCount}
                setVisibleCountPagination={setVisibleCountPagination}
                setStartIndex={setStartIndex}
              />

              <Pagination
                filteredCars={filteredCars}
                visibleCountPagination={visibleCountPagination}
                startIndex={startIndex}
                setStartIndex={setStartIndex}
              />
            </div>

            <SearchElement
              searchRef={searchRef}
              isSearchOpen={isSearchOpen}
              setIsSearchOpen={setIsSearchOpen}
              filters={filters}
              setFilters={setFilters}
              setStartIndex={setStartIndex}
              cars={cars}
            />

            <div className="grid grid-cols-4 gap-5">
              {visibleCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setVisibleCount((prev) => prev + Number(perPage));
                setVisibleCountPagination((prev) => prev + Number(perPage));
                setStartIndex(0);
              }}
              className={`${filteredCars.length <= visibleCount ? 'text-white/40' : 'cursor-pointer border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition'} block mx-auto mt-6 border rounded px-8 py-3 font-bold`}
            >
              {t('auction.showMore')}
            </button>

            <div className="border border-white/20 rounded h-14 flex items-center justify-center mt-4">
              <Pagination
                filteredCars={filteredCars}
                visibleCountPagination={visibleCountPagination}
                startIndex={startIndex}
                setStartIndex={setStartIndex}
              />
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
