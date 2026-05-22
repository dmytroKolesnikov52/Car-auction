import { ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Car } from './CarCard';
import { useTranslation } from 'react-i18next';

export default function CarFilterRange({
  openedFilter,
  setOpenedFilter,
  typeOfFilter,
  nameOfFilter,
  onChange,
  cars,
}: {
  openedFilter: boolean;
  setOpenedFilter: (open: boolean) => void;
  typeOfFilter: keyof Car;
  nameOfFilter: string;
  onChange: (from: string, to: string) => void;
  cars: Car[];
}) {
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');

  const availableValues = useMemo(() => {
    return [...new Set(cars.map((car) => car[typeOfFilter]))]
      .filter((value) => value !== undefined && value !== null && value !== '')
      .map(String)
      .sort((a, b) => Number(a) - Number(b));
  }, [cars, typeOfFilter]);

  const isYearFilter = nameOfFilter === 'Рік випуску';

  const applyFilter = () => {
    if (
      filterFrom !== '' &&
      filterTo !== '' &&
      Number(filterFrom) > Number(filterTo)
    ) {
      setIsError(true);
      return;
    }

    setIsError(false);
    onChange(filterFrom, filterTo);
  };

  return (
    <div className="border-b border-yellow-400 pb-8 mb-6">
      <button
        onClick={() => setOpenedFilter(!openedFilter)}
        className="w-full flex items-center justify-between font-bold text-xl transition-all duration-300 hover:text-yellow-400"
      >
        {nameOfFilter}
        <ChevronDown
          className={`transition-all duration-300 ${
            openedFilter ? 'rotate-180' : ''
          }`}
        />
      </button>

      {openedFilter && (
        <div className="mt-6">
          <div className="flex items-center gap-3">
            {isYearFilter ?
              <select
                value={filterFrom}
                onChange={(e) => {
                  setIsError(false);
                  setFilterFrom(e.target.value);
                }}
                className="w-full h-12 bg-black border border-white rounded px-3 outline-none text-white"
              >
                <option
                  value=""
                  disabled={filterFrom !== ''}
                >
                  t('filters.from')
                </option>
                {availableValues.map((value) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </select>
            : <input
                value={filterFrom}
                onChange={(e) => {
                  setIsError(false);
                  setFilterFrom(e.target.value);
                }}
                placeholder={t('filters.from')}
                type="number"
                className="w-full h-12 bg-black border border-white rounded px-3 outline-none text-white"
              />
            }

            <span className="text-white/70">-</span>

            {isYearFilter ?
              <select
                value={filterTo}
                onChange={(e) => {
                  setIsError(false);
                  setFilterTo(e.target.value);
                }}
                className="w-full h-12 bg-black border border-white rounded px-3 outline-none text-white"
              >
                <option
                  value=""
                  disabled={filterTo !== ''}
                >
                  {t('filters.to')}
                </option>
                {availableValues.map((value) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </select>
            : <input
                value={filterTo}
                onChange={(e) => {
                  setIsError(false);
                  setFilterTo(e.target.value);
                }}
                placeholder={t('filters.to')}
                type="number"
                className="w-full h-12 bg-black border border-white rounded px-3 outline-none text-white"
              />
            }
          </div>

          <p
            className={`mt-2 bg-red-400 text-black px-7 py-2 rounded font-medium ${
              isError ? 'block' : 'hidden'
            }`}
          >
            {t('filters.errors.fromMoreThanTo')}
          </p>
          <div className="flex items-center justify-between mt-2 font-medium">
            <button
              className="bg-white/20 text-white px-7 py-2 rounded hover:bg-white/30 transition"
              onClick={() => {
                setIsError(false);
                setFilterFrom('');
                setFilterTo('');
                onChange('', '');
              }}
            >
              {t('filters.clear')}
            </button>
            <button
              onClick={applyFilter}
              className="bg-yellow-400 text-black px-7 py-2 rounded hover:bg-yellow-300 transition"
            >
              {t('filters.apply')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
