import { Link } from 'react-router-dom';
import CarCardPhotoSwitcher from '../molecules/CarCardPhotoSwitcher';
import type { Car } from './CarCard';
import { useTranslation } from 'react-i18next';

type AuctionCarCardProps = {
  car: Car;
};

export default function AuctionCarCard({ car }: AuctionCarCardProps) {
  const { t } = useTranslation();
  return (
    <article className="grid overflow-hidden rounded bg-[#0b0b0b] lg:grid-cols-[190px_230px_200px_145px_200px_1fr]">
      <Link
        to={`/car/${car.id}`}
        key={car.id}
      >
        <CarCardPhotoSwitcher
          car={car}
          styleForHeight="h-full"
          styleForWidth="w-9"
        />
      </Link>

      <div className="flex flex-col justify-center px-3 py-4">
        <h3 className="text-lg font-bold">
          {car.brand} {car.model} {car.year}
        </h3>
      </div>

      <div className="space-y-4 border-l border-white/10 px-3 py-4 text-sm">
        <Info
          label={t('auctionCard.mileage')}
          value={`${car.mileage?.toLocaleString?.() || car.mileage || '—'} км`}
        />
        <Info
          label={t('auctionCard.engine')}
          value={`${car.engine_volume || '—'}L ${car.engine_type || ''}`}
        />
      </div>

      <div className="border-l border-white/10 px-3 py-4 text-sm">
        <Info
          label={t('auctionCard.damage')}
          value={car.damage}
        />
        <Info
          label={t('auctionCard.secondaryDamage')}
          value={car.secondary_damage || '—'}
        />
      </div>

      <div className="space-y-4 border-l border-white/10 px-3 py-4 text-sm">
        <Info
          label={t('auctionCard.keys')}
          value={car.keys_for_car}
        />
        <Info
          label={t('auctionCard.runsDrive')}
          value={car.runs_drive || '—'}
        />
      </div>

      <div className="flex items-center justify-between gap-4 border-l border-white/10 px-3 py-4">
        <div className="text-sm">
          <p className="text-white/70">{t('auctionCard.currentBid')}</p>
          <p className="text-lg font-bold">0 $</p>
          {!car.is_bill_started && (
            <>
              <p className="text-white/70">{t('auctionCard.buyNow')}</p>
              <p className="text-lg font-bold">{car.price} $</p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Link
            to={`/car/${car.id}`}
            key={car.id}
          >
            <button className="rounded bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300">
              {t('auctionCard.makeBid')}
            </button>
          </Link>
          {!car.is_bill_started && (
            <Link
              to={`/car/${car.id}`}
              key={car.id}
            >
              <button className="w-full bg-green-700 hover:bg-green-600 transition py-3 rounded font-bold cursor-pointer">
                {t('auctionCard.buyNow')}
              </button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
}) {
  return (
    <div>
      <p className="text-white/60">{label}</p>
      <p className="font-medium text-white">
        {value === 1 ?
          'Yes'
        : value === 0 ?
          'No'
        : value}
      </p>
    </div>
  );
}
