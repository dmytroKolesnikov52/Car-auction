import { CarCards } from '../components/templates/CarCards';
import Hero from '../components/templates/Hero';
import HowItWorks from '../components/molecules/HowItWorks';
import Advantages from '../components/molecules/Advantages';

function Home() {
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
