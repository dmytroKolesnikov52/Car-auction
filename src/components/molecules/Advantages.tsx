import {
  ShieldCheck,
  SearchCheck,
  Handshake,
  Globe,
  PiggyBank,
} from 'lucide-react';
import { HowItWorksItem } from '../atoms/HowItWorksItem';
import { useTranslation } from 'react-i18next';

export default function Advantages() {
  const { t } = useTranslation();
  return (
    <section className="flex justify-center pb-16">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mt-3 text-4xl font-bold text-yellow-400">
            {t('advantages.title')}
          </h2>
          <p className="mt-2 text-md text-white">{t('advantages.subtitle')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          <HowItWorksItem
            icon={<ShieldCheck />}
            title={t('advantages.transparent')}
            description={t('advantages.transparentDescription')}
          />
          <HowItWorksItem
            icon={<SearchCheck />}
            title={t('advantages.check')}
            description={t('advantages.checkDescription')}
          />
          <HowItWorksItem
            icon={<Handshake />}
            title={t('advantages.support')}
            description={t('advantages.supportDescription')}
          />
          <HowItWorksItem
            icon={<Globe />}
            title={t('advantages.auctionExperience')}
            description={t('advantages.auctionExperienceDescription')}
          />
          <HowItWorksItem
            icon={<PiggyBank />}
            title={t('advantages.savings')}
            description={t('advantages.savingsDescription')}
          />
        </div>
      </div>
    </section>
  );
}
