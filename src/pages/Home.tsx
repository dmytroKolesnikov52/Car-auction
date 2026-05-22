import { CarCards } from '../components/templates/CarCards';
import Hero from '../components/templates/Hero';
import HowItWorks from '../components/molecules/HowItWorks';
import Advantages from '../components/molecules/Advantages';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lastResetDate = localStorage.getItem('auction_reset_date');

    if (lastResetDate === today) return;

    fetch(
      `https://car-auction-backend-b0ba.onrender.com/api/auction/reset-daily`,
      {
        method: 'PATCH',
      },
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to reset auctions');
        }

        localStorage.setItem('auction_reset_date', today);
      })
      .catch((error) => {
        console.error('Auction daily reset error:', error);
      });
  }, []);

  return (
    <main className="w-full bg-black px-6">
      <Hero />
      <CarCards />
      <HowItWorks />
      <Advantages />
    </main>
  );
}

export default Home;
