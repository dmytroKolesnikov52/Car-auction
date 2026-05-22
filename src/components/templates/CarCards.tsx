import { useRef } from 'react';
import CarCard from '../organisms/CarCard';
import { useCarsWithOutAuction } from '../../contexts/CarsContext';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslation } from 'react-i18next';

export function CarCards() {
  const cars = useCarsWithOutAuction();
  const { t } = useTranslation();

  const autoplay = useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: true,
    },
    [autoplay.current],
  );

  return (
    <>
      <span className="font-bold text-3xl ml-4">
        <span className="text-yellow-500">{t('carCards.top')}</span>{' '}
        {t('carCards.sales')}
      </span>
      <div className="overflow-hidden mt-4 mx-4">
        <div
          ref={emblaRef}
          className="select-none cursor-grab active:cursor-grabbing -ml-[120px]"
        >
          <div className="flex">
            {cars.map((car) => (
              <div
                key={car.id}
                className="shrink-0 pr-4"
              >
                <CarCard car={car} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
