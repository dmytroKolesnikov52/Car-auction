import { useEffect, useState } from 'react';
import Header from './components/organisms/Header';
import Sidebar from './components/organisms/Sidebar';
import CarCard, { type Car } from './components/organisms/CarCard';

function App() {
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/cars/1/full`)
      .then((res) => res.json())
      .then((data) => setCar(data));
  }, []);

  return (
    <>
      <div className="grid grid-cols-[auto_1fr] min-h-screen">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="p-6">{car && <CarCard car={car} />}</main>
        </div>
      </div>
    </>
  );
}

export default App;
