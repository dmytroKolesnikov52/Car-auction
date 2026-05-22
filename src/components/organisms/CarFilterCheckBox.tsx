import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';
import type { Car } from './CarCard';
import { useTranslation } from 'react-i18next';

export default function CarFilterCheckBox({
  openedFilter,
  setOpenedFilter,
  typeOfFilter,
  nameOfFilter,
  selectedValues,
  onToggle,
  cars,
}: {
  openedFilter: boolean;
  setOpenedFilter: (open: boolean) => void;
  typeOfFilter:
    | 'brand'
    | 'body_type'
    | 'engine_type'
    | 'seats'
    | 'drive_type'
    | 'transmission';
  nameOfFilter: string;
  selectedValues: string[];
  onToggle: (
    field:
      | 'brand'
      | 'body_type'
      | 'engine_type'
      | 'seats'
      | 'drive_type'
      | 'transmission',
    value: string,
  ) => void;
  cars: Car[];
}) {
  const { t } = useTranslation();
  const [brandSearch, setBrandSearch] = useState('');

  const uniqueTypes = [...new Set(cars.map((car) => car[typeOfFilter]))].filter(
    (value): value is string =>
      value !== undefined && value !== null && value !== '',
  );

  const filteredTypes = uniqueTypes.filter((type) =>
    String(type).toLowerCase().includes(brandSearch.toLowerCase()),
  );

  const isBrandFilter = nameOfFilter === t('filters.brand');

  return (
    <div className="border-b border-yellow-400 pb-6 mb-6">
      <button
        onClick={() => setOpenedFilter(!openedFilter)}
        className="w-full flex items-center justify-between font-bold text-xl transition-all duration-300 hover:text-yellow-400"
      >
        {nameOfFilter}
        <ChevronDown
          className={`transition-all duration-300 ${openedFilter ? 'rotate-180' : ''}`}
        />
      </button>

      {openedFilter && (
        <div className="mt-6">
          {isBrandFilter && (
            <div className="relative mb-6">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
                size={20}
              />
              <input
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder={t('search.placeholder')}
                className="w-full h-12 bg-black border border-white/70 rounded px-11 outline-none"
              />
            </div>
          )}

          <div className="max-h-72 overflow-y-auto pr-3 custom-scroll">
            {filteredTypes.map((type) => (
              <label
                key={String(type)}
                className="flex items-center justify-between mb-5 cursor-pointer"
              >
                <span className="flex items-center gap-3 text-lg">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(String(type))}
                    onChange={() => onToggle(typeOfFilter, String(type))}
                    className="size-5 accent-yellow-400"
                  />
                  {type}
                </span>
                {isBrandFilter && (
                  <span className="text-xs text-white/35">
                    {cars.filter((car) => car[typeOfFilter] === type).length}
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
