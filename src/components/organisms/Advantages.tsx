import {
  ShieldCheck,
  SearchCheck,
  Handshake,
  Globe,
  PiggyBank,
} from 'lucide-react';
import { HowItWorksItem } from '../atoms/HowItWorksItem';

export default function Advantages() {
  return (
    <section className="flex justify-center pb-16">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mt-3 text-4xl font-bold text-yellow-400">
            Наші переваги
          </h2>
          <p className="mt-2 text-md text-white">Чому клієнти обирають нас</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          <HowItWorksItem
            icon={<ShieldCheck />}
            title="Прозорі умови"
            description="Фіксовані ціни без прихованих платежів."
          />
          <HowItWorksItem
            icon={<SearchCheck />}
            title="Перевірка авто"
            description="Аналіз історії та стану перед купівлею."
          />
          <HowItWorksItem
            icon={<Handshake />}
            title="Повний супровід"
            description="Один менеджер на всіх етапах."
          />
          <HowItWorksItem
            icon={<Globe />}
            title="Досвід аукціонів"
            description="Copart, IAAI та інші майданчики."
          />
          <HowItWorksItem
            icon={<PiggyBank />}
            title="Економія бюджету"
            description="Купівля вигідніше за ринок."
          />
        </div>
      </div>
    </section>
  );
}
