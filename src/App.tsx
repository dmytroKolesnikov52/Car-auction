import Header from './components/organisms/Header';
import Sidebar from './components/organisms/Sidebar';
import { CarCards } from './components/templates/CarCards';
import Hero from './components/templates/Hero';

function App() {
  return (
    <>
      <div className="grid grid-cols-[auto_1fr] min-h-screen">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="p-6 w-[95vw]">
            <Hero />
            <CarCards />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
