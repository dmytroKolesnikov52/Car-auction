import Header from './components/organisms/Header';
import Sidebar from './components/organisms/Sidebar';
import Footer from './components/organisms/Footer';
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Order from './pages/Order';
import Auction from './pages/Auction';
import CarPage from './pages/CarPage';
import Auth from './pages/Auth';
import Admin from './pages/admin/Admin';
import AdminCreate from './pages/admin/AdminCreate';
import AdminEdit from './pages/admin/AdminEdit';
import { CarsProvider } from './contexts/CarsContext';
import ScrollToTop from './components/atoms/ScrollToTop';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAdmin = localStorage.getItem('adminAuth') === 'true';

  if (!isAdmin) {
    return (
      <Navigate
        to="/auth"
        replace
      />
    );
  }

  return children;
}

function App() {
  const [openedMenu, setOpenedMenu] = useState(false);

  return (
    <CarsProvider>
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#0b0b0b]">
        <Header openedMenu={openedMenu} />

        {openedMenu && (
          <div
            className="fixed z-30 left-0 top-0 w-full h-full bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenedMenu(false)}
          />
        )}

        <Sidebar
          openedMenu={openedMenu}
          setOpenedMenu={setOpenedMenu}
        />

        <main
          className={`pt-16 transition-all duration-300 ${
            openedMenu ? 'pl-66' : 'pl-20'
          }`}
        >
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/order"
              element={<Order />}
            />
            <Route
              path="/auction"
              element={<Auction />}
            />
            <Route
              path="/car/:id"
              element={<CarPage />}
            />

            <Route
              path="/auth"
              element={<Auth />}
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/create"
              element={
                <ProtectedRoute>
                  <AdminCreate />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminEdit />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer openedMenu={openedMenu} />
      </div>
    </CarsProvider>
  );
}

export default App;
