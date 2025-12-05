import Header from './components/organisms/Header';
import Sidebar from './components/organisms/Sidebar';

function App() {
  return (
    <>
      <div className="grid grid-cols-[auto_1fr] min-h-screen">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
        </div>
      </div>
    </>
  );
}

export default App;
