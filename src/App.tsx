import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { Header } from './components/Header/Header';
import { Garage } from './components/Garage/Garage';
import Winners from './components/Winners/Winners';
import CarProvider from './store/CarsContext';

function App() {
  return (
    <div className='App'>
      <BrowserRouter basename='/'>
        <CarProvider>
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<Garage />} />
              <Route path='/winners' element={<Winners />} />
            </Routes>
          </main>
        </CarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
