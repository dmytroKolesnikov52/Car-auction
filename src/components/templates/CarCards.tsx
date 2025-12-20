import { useEffect, useRef, useState } from 'react';
import type { Car } from '../organisms/CarCard';
import CarCard from '../organisms/CarCard';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export function CarCards() {
  const [cars, setCars] = useState<Car[]>([]);

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

  useEffect(() => {
    fetch(`http://localhost:5000/api/cars-with-images`)
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <>
      <span className="font-bold text-3xl">
        <span className="text-yellow-500">Топ </span>продаж
      </span>
      <div className="overflow-hidden mt-4">
        <div
          ref={emblaRef}
          className="select-none cursor-grab active:cursor-grabbing"
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
