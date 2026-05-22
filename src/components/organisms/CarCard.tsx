import { Link } from 'react-router-dom';
import CarCardPhotoSwitcher from '../molecules/CarCardPhotoSwitcher';
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

function translateCarValue(
  value: string | null | undefined,
  map: Record<string, string>,
  t: (key: string) => string,
) {
  if (!value) return '';

  const key = map[value];

  return key ? t(key) : value;
}

export interface Car {
  description: string;
  id: number;
  title: string;
  price: number;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  engine_type: string;
  engine_volume?: number | null;
  battery_capacity?: number | null;
  transmission: string;
  drive_type: string;
  seats: number;
  body_type: string;
  color: string;
  images: string[];
  is_auction: boolean | number;
  damage?: string | null;
  secondary_damage?: string | null;
  keys_for_car?: boolean;
  runs_drive?: string;
  current_bill?: number | null;
  is_bill_started?: boolean | number;
  is_sold?: boolean | number;
  phone_user?: string | null;
}

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { t } = useTranslation();

  const translatedEngine = translateCarValue(car.engine_type, engineTypeMap, t);
  const translatedTransmission = translateCarValue(
    car.transmission,
    transmissionMap,
    t,
  );
  const translatedDrive = translateCarValue(car.drive_type, driveTypeMap, t);

  const isElectric = car.engine_type === 'Електро';

  return (
    <div className="bg-black border border-[#1a1a1a] text-white rounded-lg w-[320px] shrink-0 transition-transform duration-300 hover:scale-101">
      <Link
        to={`/car/${car.id}`}
        key={car.id}
      >
        <CarCardPhotoSwitcher
          car={car}
          styleForHeight="h-56"
          styleForWidth="w-16"
        />
      </Link>

      <div className="mt-4 font-medium px-3 pb-3">
        <h2 className="text-xl uppercase font-bold">
          {car.brand} <br />
          <span className="text-yellow-400">
            {car.model} <span className="text-white">{car.year}</span>
          </span>
        </h2>

        <div className="grid grid-cols-2 text-sm gap-y-2 mt-4">
          <div>
            <p className="text-gray-400">{t('carCard.mileage')}</p>
            <p>
              {car.mileage.toLocaleString()} {t('carCard.km')}
            </p>
          </div>

          <div>
            <p className="text-gray-400">{t('carCard.engine')}</p>
            <p>
              {translatedEngine}
              {isElectric ?
                `, ${car.battery_capacity} ${t('carCard.kvt')}`
              : `, ${car.engine_volume} ${t('carCard.l')}`}
            </p>
          </div>

          <div>
            <p className="text-gray-400">{t('carCard.transmission')}</p>
            <p>{translatedTransmission}</p>
          </div>

          <div>
            <p className="text-gray-400">{t('carCard.drive')}</p>
            <p>{translatedDrive}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl text-gray-400">{t('carCard.price')}</span>
          <span className="text-3xl font-bold text-yellow-400">
            {car.price.toLocaleString()} $
          </span>
        </div>

        <Link
          to={`/car/${car.id}`}
          className="block bg-yellow-400 text-center cursor-pointer text-black w-full mt-4 py-2 rounded hover:bg-yellow-300 transition"
        >
          {t('carCard.details')}
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
