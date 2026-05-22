import type { useMemo } from 'react';
import type { Car } from './CarCard';
import { useTranslation } from 'react-i18next';

export function Pagination({
  filteredCars,
  visibleCountPagination,
  startIndex,
  setStartIndex,
}: {
  filteredCars: ReturnType<typeof useMemo> extends Car[] ?
    ReturnType<typeof useMemo>
  : Car[];
  visibleCountPagination: number;
  startIndex: number;
  setStartIndex: (index: number) => void;
}) {
  const { t } = useTranslation();
  const currentPage = Math.floor(startIndex / visibleCountPagination) + 1;
  const totalPages = Math.ceil(filteredCars.length / visibleCountPagination);

  return (
    <div className="flex items-center border border-white/70 rounded overflow-hidden text-sm">
      <button
        className={`px-5 py-1 border-r border-white/70 ${currentPage <= 1 ? 'text-white/40' : 'text-white cursor-pointer hover:bg-yellow-400 hover:text-black duration-300 transition'}`}
        onClick={() => {
          if (currentPage <= 1) return;
          setStartIndex(0);
        }}
      >
        {t('pagination.first')}
      </button>
      <button
        className={`px-5 py-1 border-r border-white/70 ${currentPage <= 1 ? 'text-white/40' : 'text-white cursor-pointer hover:bg-yellow-400 hover:text-black duration-300 transition'}`}
        onClick={() => {
          if (currentPage <= 1) return;
          setStartIndex(startIndex - visibleCountPagination);
        }}
      >
        {t('pagination.previous')}
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            className={`px-3 py-1 border-r border-white/70 ${
              isActive ?
                'bg-yellow-400 text-black'
              : 'text-white cursor-pointer'
            } hover:bg-yellow-400 hover:text-black duration-300 transition`}
            onClick={() => {
              if (isActive) return;
              setStartIndex(index * visibleCountPagination);
            }}
          >
            {page}
          </button>
        );
      })}

      <button
        className={`px-5 py-1 border-r border-white/70 ${currentPage >= totalPages ? 'text-white/40' : 'text-white cursor-pointer hover:bg-yellow-400 hover:text-black duration-300 transition'}`}
        onClick={() => {
          if (currentPage >= totalPages) return;
          setStartIndex(startIndex + visibleCountPagination);
        }}
      >
        {t('pagination.next')}
      </button>
      <button
        className={`px-5 py-1 ${currentPage >= totalPages ? 'text-white/40' : 'text-white cursor-pointer hover:bg-yellow-400 hover:text-black duration-300 transition'}`}
        onClick={() => {
          if (currentPage >= totalPages) return;
          setStartIndex((totalPages - 1) * visibleCountPagination);
        }}
      >
        {t('pagination.last')}
      </button>
    </div>
  );
}
