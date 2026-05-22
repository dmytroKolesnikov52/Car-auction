import { ChevronDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Car } from '../organisms/CarCard';
import type { CarFiltersState } from '../templates/CarFilters';
import { useTranslation } from 'react-i18next';

export function SearchElement({
  setFilters,
  filters,
  setStartIndex,
  searchRef,
  isSearchOpen,
  setIsSearchOpen,
  cars,
}: {
  searchRef: React.RefObject<HTMLDivElement | null>;
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFilters: React.Dispatch<React.SetStateAction<CarFiltersState>>;
  filters: CarFiltersState;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  cars: Car[];
}) {
  const [searchValue, setSearchValue] = useState('');
  const { t } = useTranslation();

  const allBrands = useMemo(() => {
    return Array.from(new Set(cars.map((car) => String(car.brand))))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [cars]);

  const searchedBrands = useMemo(() => {
    const value = searchValue.toLowerCase();

    return allBrands.filter((brand) => brand.toLowerCase().includes(value));
  }, [allBrands, searchValue]);

  return (
    <div
      ref={searchRef}
      className="relative mb-8"
    >
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80"
          size={24}
        />

        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setIsSearchOpen(true);
          }}
          onFocus={() => setIsSearchOpen(true)}
          placeholder={t('search.placeholder')}
          className="w-full h-14 bg-black border border-white/80 rounded px-14 text-xl outline-none placeholder:text-white/40"
        />

        <ChevronDown
          onClick={() => setIsSearchOpen((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          size={18}
        />
      </div>

      {isSearchOpen && (
        <div className="absolute z-50 top-[60px] left-0 w-full max-h-72 overflow-y-auto bg-black border border-white/80 rounded">
          {searchedBrands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => {
                setSearchValue(brand);
                setFilters((prev) => ({
                  ...prev,
                  brand: [brand],
                }));
                setIsSearchOpen(false);
                setStartIndex(0);
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-yellow-400 hover:text-black"
            >
              {brand}
            </button>
          ))}
        </div>
      )}

      {filters.brand.length > 0 && (
        <div className="flex items-center gap-6 mt-4">
          {filters.brand.map((brand) => (
            <div
              key={brand}
              className="flex items-center gap-2 bg-white text-black px-3 py-1 rounded-sm font-semibold"
            >
              <span>{brand}</span>

              <button
                type="button"
                onClick={() => {
                  setSearchValue('');
                  setFilters((prev) => ({
                    ...prev,
                    brand: [],
                  }));
                  setStartIndex(0);
                }}
                className="text-black cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              setSearchValue('');
              setFilters((prev) => ({
                ...prev,
                brand: [],
              }));
              setIsSearchOpen(false);
              setStartIndex(0);
            }}
            className="font-bold underline text-white cursor-pointer"
          >
            {t('search.clear')}
          </button>
        </div>
      )}
    </div>
  );
}
