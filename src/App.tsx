import { BrowserRouter } from 'react-router-dom';

import CarProvider from './store/CarsContext';
import { Header } from './components/Header/Header';
import { Content } from './components/Content/Content';

import './App.css';

function App() {

  return (
    <div className='App'>

      <BrowserRouter basename='/'>
        <CarProvider>
          <Header />
          <Content />
        </CarProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
