import { Search, Calculator, Gavel, Truck, Car } from 'lucide-react';
import { HowItWorksItem } from '../atoms/HowItWorksItem';
import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();
  return (
    <section className="flex justify-center py-16">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mt-3 text-4xl font-bold text-yellow-400">
            {t('howItWorks.title')}
          </h2>
          <p className="mt-2 text-md text-white">{t('howItWorks.subtitle')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          <HowItWorksItem
            icon={<Search />}
            title={t('howItWorks.selection')}
            description={t('howItWorks.selectionDescription')}
          />

          <HowItWorksItem
            icon={<Calculator />}
            title={t('howItWorks.calculation')}
            description={t('howItWorks.calculationDescription')}
          />

          <HowItWorksItem
            icon={<Gavel />}
            title={t('howItWorks.auction')}
            description={t('howItWorks.auctionDescription')}
          />

          <HowItWorksItem
            icon={<Truck />}
            title={t('howItWorks.delivery')}
            description={t('howItWorks.deliveryDescription')}
          />

          <HowItWorksItem
            icon={<Car />}
            title={t('howItWorks.receiving')}
            description={t('howItWorks.receivingDescription')}
          />
        </div>
      </div>
    </section>
  );
}
