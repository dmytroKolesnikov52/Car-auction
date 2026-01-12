import Header from './components/organisms/Header';
import Sidebar from './components/organisms/Sidebar';
import { CarCards } from './components/templates/CarCards';
import Hero from './components/templates/Hero';
import HowItWorks from './components/organisms/HowItWorks';
import Advantages from './components/organisms/Advantages';
import Footer from './components/organisms/Footer';
import { useState } from 'react';

function App() {
  const [openedMenu, setOpenedMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0b0b]">
      <Header openedMenu={openedMenu} />

      <Sidebar
        openedMenu={openedMenu}
        setOpenedMenu={setOpenedMenu}
      />

      <main
        className={`pt-16 pr-6 transition-all duration-300 ${
          openedMenu ? 'pl-66' : 'pl-26'
        }`}
      >
        <Hero />
        <CarCards />
        <HowItWorks />
        <Advantages />
      </main>
      <Footer openedMenu={openedMenu} />
    </div>
  );
}

export default App;
