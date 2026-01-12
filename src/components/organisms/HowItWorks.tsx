import { Search, Calculator, Gavel, Truck, Car } from 'lucide-react';
import { HowItWorksItem } from '../atoms/HowItWorksItem';

export default function HowItWorks() {
  return (
    <section className="flex justify-center py-16">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mt-3 text-4xl font-bold text-yellow-400">
            Як це працює
          </h2>
          <p className="mt-2 text-md text-white">
            Від вибору авто до отримання в Україні
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          <HowItWorksItem
            icon={<Search />}
            title="Підбір авто"
            description="Ви обираєте авто або залишаєте заявку — ми перевіряємо лот."
          />

          <HowItWorksItem
            icon={<Calculator />}
            title="Розрахунок"
            description="Прорахунок повної вартості авто під ключ."
          />

          <HowItWorksItem
            icon={<Gavel />}
            title="Аукціон"
            description="Участь в аукціоні від вашого імені."
          />

          <HowItWorksItem
            icon={<Truck />}
            title="Доставка"
            description="Логістика, розмитнення та документи."
          />

          <HowItWorksItem
            icon={<Car />}
            title="Отримання"
            description="Готове авто з документами в Україні."
          />
        </div>
      </div>
    </section>
  );
}
