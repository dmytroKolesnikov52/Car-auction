import CarForm from '../../components/admin/CarForm';
import type { Car } from '../../components/organisms/CarCard';
import { useCars } from '../../contexts/CarsContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AdminCreate() {
  const { t } = useTranslation();
  const { addCar } = useCars();
  const navigate = useNavigate();

  const handleSubmit = (car: Partial<Car>) => {
    const newCar: Car = {
      id: Date.now(),
      title: car.title || '',
      price: Number(car.price) || 0,
      description: car.description || '',
      brand: car.brand || '',
      model: car.model || '',
      year: Number(car.year) || 0,
      mileage: Number(car.mileage) || 0,
      engine_type: car.engine_type || '',
      engine_volume: car.engine_volume ? Number(car.engine_volume) : null,
      battery_capacity:
        car.battery_capacity ? Number(car.battery_capacity) : null,
      transmission: car.transmission || '',
      drive_type: car.drive_type || '',
      seats: Number(car.seats) || 0,
      body_type: car.body_type || '',
      color: car.color || '',
      images: car.images || [],
      is_auction: Boolean(car.is_auction),
      damage: car.damage || null,
      secondary_damage: car.secondary_damage || null,
      keys_for_car: Boolean(car.keys_for_car),
      runs_drive: car.runs_drive || '',
      current_bill: car.current_bill ?? null,
      is_bill_started: Boolean(car.is_bill_started),
      is_sold: Boolean(car.is_sold),
    };

    addCar(newCar);
    navigate('/admin');
  };

  return (
    <section className="px-8 py-10 text-white">
      <h1 className="text-4xl font-bold mb-8">{t('admin.addCar')}</h1>

      <CarForm
        onSubmit={handleSubmit}
        buttonText={t('admin.createCar')}
      />
    </section>
  );
}

export default AdminCreate;
