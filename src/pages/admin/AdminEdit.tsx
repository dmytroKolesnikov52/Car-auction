import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../../contexts/CarsContext';
import CarForm from '../../components/admin/CarForm';
import type { Car } from '../../components/organisms/CarCard';
import { useTranslation } from 'react-i18next';

function AdminEdit() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { cars, updateCar } = useCars();
  const navigate = useNavigate();

  const car = cars.find((item: Car) => String(item.id) === String(id));

  if (!car) {
    return (
      <section className="px-8 py-10 text-white">
        <h1 className="text-3xl font-bold">{t('admin.carNotFound')}</h1>
      </section>
    );
  }

  const handleSubmit = (updatedCar: Partial<Car>) => {
    updateCar(car.id, updatedCar);
    navigate('/admin');
  };

  return (
    <section className="px-8 py-10 text-white">
      <h1 className="text-4xl font-bold mb-8">{t('admin.editCar')}</h1>

      <CarForm
        initialData={car}
        onSubmit={handleSubmit}
        buttonText={t('admin.saveChanges')}
      />
    </section>
  );
}

export default AdminEdit;
