import { ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import type { Car } from './CarCard';
import { useTranslation } from 'react-i18next';

export function CarPagePhotoSwitcher({ car }: { car: Car }) {
  const { t } = useTranslation();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const nextImage = () => {
    if (!car) return;
    setActiveImageIndex((prev) =>
      prev === car.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    if (!car) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? car.images.length - 1 : prev - 1,
    );
  };
  return (
    <div>
      <div>
        <div className="relative bg-black">
          <img
            src={`https://car-auction-backend-b0ba.onrender.com${car.images[activeImageIndex]}`}
            alt={car.title}
            onClick={() => setIsImagePopupOpen(true)}
            className="w-full h-[320px] md:h-[520px] object-cover cursor-pointer"
          />

          {car.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 p-2 rounded-full"
              >
                <ChevronLeft size={42} />
              </button>

              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 p-2 rounded-full"
              >
                <ChevronRight size={42} />
              </button>
            </>
          )}
        </div>

        {car.images.length > 1 && (
          <div className="bg-black px-3 py-3">
            <div className="flex items-center gap-2 mb-3 text-sm">
              <span>
                {activeImageIndex + 1} / {car.images.length}
              </span>
              <span className="ml-auto text-white/80">
                {t('carPage.imageZoom')}
              </span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {car.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`shrink-0 border-2 ${
                    activeImageIndex === index ? 'border-yellow-400' : (
                      'border-transparent'
                    )
                  }`}
                >
                  <img
                    src={`https://car-auction-backend-b0ba.onrender.com${image}`}
                    alt={`${car.title} ${index + 1}`}
                    className="w-24 h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {car.description && (
          <div className="mt-4">
            {isDescriptionOpen && (
              <p className="text-white/80 mb-4 leading-relaxed">
                {car.description}
              </p>
            )}

            <button
              type="button"
              onClick={() => setIsDescriptionOpen((prev) => !prev)}
              className="w-full bg-[#050505] py-4 flex items-center justify-center gap-2 font-bold cursor-pointer"
            >
              {t('carPage.expand')}
              <ChevronDown
                size={18}
                className={`transition ${isDescriptionOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}

        {isImagePopupOpen && (
          <div
            onClick={() => setIsImagePopupOpen(false)}
            className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
          >
            <button
              type="button"
              onClick={() => setIsImagePopupOpen(false)}
              className="absolute top-5 right-5 text-white"
            >
              <X size={36} />
            </button>

            {car.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-5 text-white bg-black/40 hover:bg-black/70 p-3 rounded-full"
                >
                  <ChevronLeft size={52} />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-5 text-white bg-black/40 hover:bg-black/70 p-3 rounded-full"
                >
                  <ChevronRight size={52} />
                </button>
              </>
            )}

            <img
              src={`https://car-auction-backend-b0ba.onrender.com${car.images[activeImageIndex]}`}
              alt={car.title}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
