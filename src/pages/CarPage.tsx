import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import CarCard, { type Car } from '../components/organisms/CarCard';
import { CarPagePhotoSwitcher } from '../components/organisms/CarPagePhotoSwitcher';
import { useCarsAllCars } from '../contexts/CarsContext';
import { useAuction } from '../hooks/useAuction';
import type { User } from '../Types';
import { useTranslation } from 'react-i18next';

const engineTypeMap: Record<string, string> = {
  Бензин: 'carValues.engine.benzin',
  Дизель: 'carValues.engine.diesel',
  Електро: 'carValues.engine.electric',
  Гібрид: 'carValues.engine.hybrid',
};

const transmissionMap: Record<string, string> = {
  Автоматична: 'carValues.transmission.automatic',
  Механіка: 'carValues.transmission.manual',
};

const driveTypeMap: Record<string, string> = {
  Передній: 'carValues.drive.front',
  Задній: 'carValues.drive.rear',
  Повний: 'carValues.drive.full',
};

const bodyTypeMap: Record<string, string> = {
  Позашляховик: 'carValues.bodyType.suv',
  Седан: 'carValues.bodyType.sedan',
};

const colorMap: Record<string, string> = {
  Сірий: 'carValues.color.gray',
  Чорний: 'carValues.color.black',
  Білий: 'carValues.color.white',
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

export default function CarPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const cars = useCarsAllCars();
  const location = useLocation();

  const [randomCars, setRandomCars] = useState<Car[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const car = cars.find((item) => String(item.id) === String(id));

  const isAuthorized = Boolean(user);
  const auction = useAuction(car, isAuthorized, user);
  const isCarSold = Boolean(car?.is_sold || auction.isSold);

  const translatedEngine = translateCarValue(
    car?.engine_type,
    engineTypeMap,
    t,
  );

  const translatedTransmission = translateCarValue(
    car?.transmission,
    transmissionMap,
    t,
  );

  const translatedDrive = translateCarValue(car?.drive_type, driveTypeMap, t);

  const translatedBodyType = translateCarValue(car?.body_type, bodyTypeMap, t);
  const translatedColor = translateCarValue(car?.color, colorMap, t);

  const isElectric = car?.engine_type === 'Електро';

  function getRandomCars(arr: Car[], count: number) {
    if (!car) return [];

    return [...arr]
      .filter((item) => item.id !== car.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }

  useEffect(() => {
    const loadUser = () => {
      fetch('http://localhost:5000/api/auth/me', {
        credentials: 'include',
      })
        .then((res) => {
          if (!res.ok) {
            setUser(null);
            return null;
          }

          return res.json();
        })
        .then((data) => {
          if (data?.user) {
            setUser(data.user);
          }
        })
        .catch(() => {
          setUser(null);
        });
    };

    loadUser();

    window.addEventListener('authChanged', loadUser);

    return () => {
      window.removeEventListener('authChanged', loadUser);
    };
  }, []);

  useEffect(() => {
    setRandomCars(getRandomCars(cars, 5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cars, id]);

  if (!cars || cars.length === 0 || !car) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="bg-black text-white px-4 md:px-8 py-6">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">
        {car.brand} {car.model} {car.year}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.75fr_0.7fr] gap-5">
        <CarPagePhotoSwitcher car={car} />

        <div className="border border-[#1f1f1f] h-fit">
          <h2 className="bg-[#201e1e] px-4 py-4 font-bold uppercase">
            {t('carPage.characteristics')}
          </h2>

          <div className="p-4 text-sm md:text-base">
            <div className="grid grid-cols-2 gap-y-2">
              <span>{t('carPage.mileage')}:</span>
              <span className="text-right">
                {car.mileage.toLocaleString()} {t('carCard.km')}
              </span>

              <span>{t('carPage.engine')}:</span>
              <span className="text-right">
                {translatedEngine}
                {isElectric ?
                  `, ${car.battery_capacity} ${t('carCard.kvt')}`
                : `, ${car.engine_volume} ${t('carCard.l')}`}
              </span>

              <span>{t('carPage.transmission')}:</span>
              <span className="text-right">{translatedTransmission}</span>

              <span>{t('carPage.drive')}:</span>
              <span className="text-right">{translatedDrive}</span>

              <span>{t('carPage.seats')}:</span>
              <span className="text-right">{car.seats}</span>

              <span>{t('carPage.bodyType')}:</span>
              <span className="text-right">{translatedBodyType}</span>

              <span>{t('carPage.color')}:</span>
              <span className="text-right">{translatedColor}</span>

              {car.damage && (
                <>
                  <span>{t('carPage.damage')}:</span>
                  <span className="text-right">{car.damage}</span>
                </>
              )}

              {car.secondary_damage && (
                <>
                  <span>{t('carPage.secondaryDamage')}:</span>
                  <span className="text-right">{car.secondary_damage}</span>
                </>
              )}

              {car.keys_for_car != null && (
                <>
                  <span>{t('carPage.hasKeys')}:</span>
                  <span className="text-right">
                    {car.keys_for_car ?
                      t('auctionCard.yes')
                    : t('auctionCard.no')}
                  </span>
                </>
              )}

              {car.runs_drive != null && (
                <>
                  <span>{t('carPage.runsDrive')}:</span>
                  <span className="text-right">{car.runs_drive}</span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={auction.resetAuction}
            className="bg-yellow-400 text-black hover:bg-yellow-300 py-3 px-3 ml-16 my-3 rounded font-bold cursor-pointer transition"
          >
            {t('carPage.reset')}
          </button>
        </div>

        <div className="space-y-5">
          <div className="border border-[#1f1f1f] h-fit">
            <h2 className="bg-[#201e1e] px-4 py-4 font-bold uppercase">
              {t('carPage.price')}
            </h2>

            <div className="p-4">
              {!auction.isAuctionActive && (
                <div className="flex justify-between items-center mb-6">
                  <span>
                    {isCarSold ?
                      t('carPage.soldFor')
                    : car.is_auction ?
                      t('carPage.buyNow')
                    : t('carPage.price')}
                  </span>

                  <span className="text-3xl font-bold text-yellow-400">
                    {Number(
                      isCarSold ? (auction.currentBid ?? 0) : (car.price ?? 0),
                    ).toLocaleString()}{' '}
                    $
                  </span>
                </div>
              )}

              {!isCarSold &&
                car.current_bill != null &&
                car.is_auction === 1 && (
                  <div className="flex justify-between items-center mb-6">
                    <span>{t('auction.currentBid')}</span>
                    <span className="text-3xl font-bold text-yellow-400">
                      {auction.currentBid} $
                    </span>
                  </div>
                )}

              {!isCarSold && auction.botMessage && (
                <div className="text-center bg-red-500/20 py-2 rounded text-red-400 font-bold">
                  {auction.botMessage}
                </div>
              )}

              {auction.winnerMessage && (
                <div className="text-center bg-green-500/20 py-2 rounded text-green-400 font-bold whitespace-pre-line">
                  {auction.winnerMessage}
                </div>
              )}

              {isCarSold ?
                <button
                  type="button"
                  disabled
                  className="w-full mt-4 bg-gray-600 text-gray-300 py-3 rounded font-bold cursor-not-allowed"
                >
                  {t('carPage.soldFor')}
                </button>
              : !isAuthorized ?
                <Link
                  to="/auth"
                  state={{ from: location.pathname }}
                  className="block w-full mt-4 text-center bg-white/10 border border-yellow-400 text-yellow-400 py-3 rounded font-bold hover:bg-yellow-400 hover:text-black transition"
                >
                  {t('auth.createAccount')}
                </Link>
              : <>
                  {!auction.isAuctionActive && (
                    <button
                      type="button"
                      onClick={auction.handleBuyNow}
                      className={`w-full mt-4 ${
                        car.is_auction ?
                          'bg-green-700 hover:bg-green-600'
                        : 'border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
                      } py-3 rounded font-bold cursor-pointer transition`}
                    >
                      {car.is_auction ?
                        t('carPage.buyNow')
                      : t('carPage.order')}
                    </button>
                  )}

                  {Boolean(car.is_auction) && (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={auction.handleMakeBid}
                        disabled={
                          auction.isBidButtonLocked ||
                          auction.bidOwner === 'user'
                        }
                        className={`w-full mt-4 py-3 rounded font-bold transition ${
                          (
                            auction.isBidButtonLocked ||
                            auction.bidOwner === 'user'
                          ) ?
                            'bg-gray-600 text-gray-300 cursor-not-allowed'
                          : 'bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer'
                        }`}
                      >
                        {auction.bidButtonText}
                      </button>

                      {auction.isAuctionActive && auction.timeLeft !== null && (
                        <div className="text-center bg-yellow-400/20 py-2 rounded text-yellow-400 font-bold text-lg">
                          {auction.timeLeft} {t('carPage.seconds')}
                        </div>
                      )}
                    </div>
                  )}
                </>
              }
            </div>
          </div>

          <div className="border border-[#1f1f1f] h-fit">
            <h2 className="bg-[#201e1e] px-4 py-4 font-bold uppercase">
              {t('carPage.askQuestion')}
            </h2>

            <form className="p-4 space-y-4">
              <input
                type="text"
                placeholder={t('carPage.namePlaceholder')}
                className="w-full h-11 bg-black border border-white rounded px-3 outline-none placeholder:text-white/60"
              />

              <div className="flex h-11 border border-white rounded overflow-hidden">
                <div className="w-14 flex items-center justify-center border-r border-white">
                  🇺🇦
                </div>

                <input
                  type="tel"
                  defaultValue="+380"
                  className="w-full bg-black px-3 outline-none"
                />
              </div>

              <button className="w-full bg-green-700 hover:bg-green-600 transition py-3 rounded font-bold cursor-pointer">
                {t('carPage.send')}
              </button>
            </form>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-3xl font-bold mb-6">
          {t('carPage.recommendedCars')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
          {randomCars.map((item) => (
            <CarCard
              key={item.id}
              car={item}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
