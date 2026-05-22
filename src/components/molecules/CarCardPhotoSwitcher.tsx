import { useState } from 'react';
import type { Car } from '../organisms/CarCard';

interface Props {
  car: Car;
  styleForHeight?: string;
  styleForWidth?: string;
}

export default function CarCardPhotoSwitcher({
  car,
  styleForHeight,
  styleForWidth,
}: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const width = e.currentTarget.offsetWidth;
    const x = e.nativeEvent.offsetX;

    const segment = Math.floor((x / width) * 4);

    if (segment !== activeImage) {
      setLoaded(false);
      setActiveImage(segment);
    }
  };

  return (
    <div
      className={`relative rounded-t-lg w-full overflow-hidden cursor-pointer ${styleForHeight}`}
      onMouseMove={handleMouseMove}
    >
      <img
        key={activeImage}
        src={`https://car-auction-backend-b0ba.onrender.com${car.images[activeImage]}`}
        alt={car.model}
        onLoad={() => setLoaded(true)}
        className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-300
            ${loaded ? 'opacity-100' : 'opacity-0'}
          `}
      />

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 ${styleForWidth} rounded transition-all
                ${activeImage === i ? 'bg-yellow-400' : 'bg-gray-500'}
              `}
          ></div>
        ))}
      </div>
    </div>
  );
}
