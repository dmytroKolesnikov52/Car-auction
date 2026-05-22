import { Link } from 'react-router-dom';
import { useCars } from '../../contexts/CarsContext';
import { useState } from 'react';
import type { Car } from '../../components/organisms/CarCard';
import { useTranslation } from 'react-i18next';

function Admin() {
  const { t } = useTranslation();
  const { cars, deleteCar } = useCars();
  const [sortBy, setSortBy] = useState<keyof Car>('name' as keyof Car);
  // const navigate = useNavigate();

  const sortedCars = [...cars].sort((a: Car, b: Car) => {
    if (sortBy === 'price') return Number(a.price) - Number(b.price);
    if (sortBy === 'year') return Number(b.year) - Number(a.year);
    if (sortBy === 'mileage') return Number(a.mileage) - Number(b.mileage);
    if (sortBy === 'is_auction')
      return Number(b.is_auction) - Number(a.is_auction);

    return String(a[sortBy] || '').localeCompare(String(b[sortBy] || ''));
  });

  const handleDelete = (id: string | number) => {
    const confirmDelete = window.confirm(t('admin.deleteConfirm'));

    if (confirmDelete) {
      deleteCar(id);
    }
  };

  // const logout = () => {
  //   localStorage.removeItem('adminAuth');
  //   navigate('/auth');
  // };

  return (
    <section className="px-8 py-10 text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">{t('admin.panel')}</h1>
          <p className="text-gray-400 mt-2">{t('admin.adminDescription')}</p>
        </div>

        {/* <button
          onClick={logout}
          className="rounded-xl border border-white/10 px-5 py-3 hover:bg-white/10 transition"
        >
          Вийти
        </button> */}
      </div>

      <div className="rounded-2xl bg-[#151515] border border-white/10 p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-3">{t('admin.addCar')}</h2>
        <p className="text-gray-400 mb-5">{t('admin.addCarDescription')}</p>

        <Link
          to="/admin/create"
          className="inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-400 transition"
        >
          {t('admin.createCar')}
        </Link>
      </div>

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">{t('admin.listTitle')}</h2>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as keyof Car)}
          className="rounded-xl bg-[#151515] border border-white/10 px-4 py-3 text-white"
        >
          <option value="name">{t('admin.name')}</option>
          <option value="brand">{t('admin.brand')}</option>
          <option value="model">{t('admin.model')}</option>
          <option value="year">{t('admin.year')}</option>
          <option value="price">{t('admin.price')}</option>
          <option value="mileage">{t('admin.mileage')}</option>
          <option value="is_auction">{t('admin.auction')}</option>
        </select>
      </div>

      <div className="grid gap-5">
        {sortedCars.map((car: Car) => (
          <div
            key={car.id}
            className="rounded-2xl bg-[#151515] border border-white/10 p-5 flex gap-5 items-center"
          >
            <img
              src={`http://localhost:5000${car.images[0]}`}
              alt={car.title}
              className="w-40 h-28 rounded-xl object-cover bg-black"
            />

            <div className="flex-1">
              <h3 className="text-xl font-semibold">{car.title}</h3>
              <p className="text-gray-400">
                {car.brand} {car.model} · {car.year}
              </p>
              <p className="text-orange-500 font-semibold mt-1">${car.price}</p>
            </div>

            <div className="flex gap-3">
              <Link
                to={`/admin/edit/${car.id}`}
                className="rounded-xl bg-white/10 px-5 py-3 hover:bg-white/20 transition"
              >
                {t('admin.edit')}
              </Link>

              <button
                onClick={() => handleDelete(car.id)}
                className="rounded-xl bg-red-600 px-5 py-3 hover:bg-red-500 transition"
              >
                {t('admin.delete')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Admin;
