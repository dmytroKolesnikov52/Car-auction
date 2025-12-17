import CarCardPhotoSwitcher from '../molecules/CarCardPhotoSwitcher';

export interface Car {
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
}

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="bg-black border border-[#1a1a1a] text-white rounded-lg w-[318px] shrink-0 transition-transform duration-300 hover:scale-101">
      <CarCardPhotoSwitcher car={car} />

      <div className="mt-4 font-medium px-3 pb-3">
        <h2 className="text-xl uppercase font-bold">
          {car.brand} <br />
          <span className="text-yellow-400">
            {car.model} <span className="text-white">{car.year}</span>
          </span>
        </h2>

        <div className="grid grid-cols-2 text-sm gap-y-2 mt-4">
          <div>
            <p className="text-gray-400">Пробіг</p>
            <p>{car.mileage.toLocaleString()} км</p>
          </div>
          <div>
            <p className="text-gray-400">Двигун</p>
            <p>
              {car.engine_type}
              {car.engine_type === 'Електро' ?
                `, ${car.engine_volume} кВт`
              : `, ${car.engine_volume} л`}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Коробка передач</p>
            <p>{car.transmission}</p>
          </div>

          <div>
            <p className="text-gray-400">Привід</p>
            <p>{car.drive_type}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl text-gray-400">Ціна</span>
          <span className="text-3xl font-bold text-yellow-400">
            {car.price.toLocaleString()} $
          </span>
        </div>

        <button className="bg-yellow-400 cursor-pointer text-black w-full mt-4 py-2 rounded hover:bg-yellow-300 transition">
          Детальніше
        </button>
      </div>
    </div>
  );
};

export default CarCard;
