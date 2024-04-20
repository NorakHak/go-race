import React, { useState } from 'react';

import './App.css';
import { Header } from './components/Header/Header';
import { Garage } from './components/Garage/Garage';

function App() {
  const [showGarage, setShowGarage] = useState<boolean>(true);

  const showWinnersBlock = () => {
    setShowGarage(false);
  };

  const showGarageBlock = () => {
    setShowGarage(true);
  };

  return (
    <div className='App'>
      <Header
        showWinnersBlock={showWinnersBlock}
        showGarageBlock={showGarageBlock}
      />
      <main>{showGarage ? <Garage /> : <div>Winners</div>}</main>
    </div>
  );
}

export default App;
