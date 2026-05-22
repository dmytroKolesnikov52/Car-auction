import { useState } from 'react';
import type { Car } from '../organisms/CarCard';

const emptyCar: Partial<Car> = {
  id: 0,
  title: '',
  price: 0,
  is_sold: false,
  brand: '',
  model: '',
  year: 0,
  mileage: 0,
  engine_type: '',
  engine_volume: 0,
  battery_capacity: 0,
  transmission: '',
  drive_type: '',
  seats: 0,
  body_type: '',
  color: '',
  is_auction: false,
  damage: '',
  secondary_damage: '',
  keys_for_car: false,
  runs_drive: '',
  images: [],
};

function CarForm({
  initialData = emptyCar,
  onSubmit,
  buttonText,
}: {
  initialData?: Partial<Car>;
  onSubmit: (car: Partial<Car>) => void;
  buttonText: string;
}) {
  const [form, setForm] = useState<Partial<Car>>(initialData);

  const changeField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const fields: { name: keyof Car; label: string }[] = [
    { name: 'title', label: 'Назва' },
    { name: 'price', label: 'Ціна' },
    { name: 'is_sold', label: 'Наявність' },
    { name: 'brand', label: 'Марка' },
    { name: 'model', label: 'Модель' },
    { name: 'year', label: 'Рік' },
    { name: 'mileage', label: 'Пробіг' },
    { name: 'engine_type', label: 'Двигун' },
    { name: 'engine_volume', label: 'Обсяг двигуна' },
    { name: 'battery_capacity', label: 'Ємність батареї' },
    { name: 'transmission', label: 'Коробка передач' },
    { name: 'drive_type', label: 'Привід' },
    { name: 'seats', label: 'Сидіння' },
    { name: 'color', label: 'Колір' },
    { name: 'body_type', label: 'Тип кузова' },
    { name: 'is_auction', label: 'На аукціон' },
    { name: 'damage', label: 'Пошкодження' },
    { name: 'secondary_damage', label: 'Вторинне пошкодження' },
    { name: 'keys_for_car', label: 'Ключі до машини' },
    { name: 'runs_drive', label: 'На ходу' },
    // { name: 'image', label: 'Фото URL' },
  ];

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-[#151515] border border-white/10 p-6 grid gap-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map(({ name, label }) => (
          <label
            key={name}
            className="grid gap-2"
          >
            <span className="text-gray-300">{label}</span>

            <input
              name={name}
              value={String(form[name] ?? '')}
              onChange={changeField}
              className="rounded-xl bg-[#0b0b0b] border border-white/10 px-4 py-3 text-white outline-none focus:border-orange-500"
            />
          </label>
        ))}
      </div>

      <label className="grid gap-2">
        <span className="text-gray-300">Опис</span>

        <textarea
          name="description"
          value={String(form.description || '')}
          onChange={changeField}
          rows={6}
          className="rounded-xl bg-[#0b0b0b] border border-white/10 px-4 py-3 text-white outline-none focus:border-orange-500 resize-none"
        />
      </label>

      <button
        type="submit"
        className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-400 transition"
      >
        {buttonText}
      </button>
    </form>
  );
}

export default CarForm;
