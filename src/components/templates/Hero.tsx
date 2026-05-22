import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCarsAllCars } from '../../contexts/CarsContext';
import type { Car } from '../organisms/CarCard';
import { useTranslation } from 'react-i18next';

const engineTypeMap: Record<string, string> = {
  Бензин: 'carValues.engine.benzin',
  Дизель: 'carValues.engine.diesel',
  Електро: 'carValues.engine.electric',
  Гібрид: 'carValues.engine.hybrid',
};

function translateCarValue(
  value: string | null | undefined,
  map: Record<string, string>,
  t: (key: string) => string,
) {
  if (!value) return '';

  const key = map[value];

  return key ? t(key) : value;
}

export default function Hero() {
  const { t } = useTranslation();
  const cars = useCarsAllCars();
  const [randomCars, setRandomCars] = useState<Car[]>([]);

  function getRandomCars(arr: Car[], count: number) {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
  }

  useEffect(() => {
    setRandomCars(getRandomCars(cars, 8));
  }, [cars]);

  const translatedEngine = translateCarValue(
    randomCars[0]?.engine_type,
    engineTypeMap,
    t,
  );

  return (
    <section className="w-full">
      <div className="mx-auto max-w-8xl px-4 py-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900 shadow-2xl">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-yellow-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="relative grid gap-10 p-4 pl-10 grid-cols-2 items-center">
            <div>
              <h1 className=" text-5xl font-extrabold tracking-tight text-white">
                {t('hero.titleLine1')}
              </h1>

              <p className="mt-4 text-gray-300 text-lg">
                {t('hero.subtitle1')} <br /> {t('hero.subtitle2')}
              </p>

              <div className="mt-5 flex flex-row gap-3 items-center">
                <Link
                  to="/order"
                  className="inline-flex items-center justify-center rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black transition-all hover:bg-yellow-300 active:scale-[0.99]"
                >
                  {t('hero.orderButton')}
                </Link>

                <Link
                  to="/auction"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.99]"
                >
                  {t('hero.auctionButton')}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">
                    {t('hero.popularCars')}
                  </p>
                </div>

                <div className="mt-5 grid grid-rows-4 grid-flow-col gap-3">
                  {randomCars.map((item) => (
                    <Link
                      to={`/car/${item.id}`}
                      key={item.id}
                    >
                      <div
                        key={item.title}
                        className="group flex items-center justify-between cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all hover:bg-white/10"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-300">
                            {item.year} / {item.engine_volume} /{' '}
                            {translatedEngine}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-bold text-yellow-400">
                            {item.price} $
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
