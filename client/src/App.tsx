import React from 'react';
import { useState } from 'react'
import { LeftFrame, CenterFrame, RightFrame, Footer } from './modules/centerFrame/index'
import './App.css';

function App() {

  const [defaultStateModal, setState] = useState(false)
  const [clickReservour, setClickReservour] = useState<{ index: number | null; elem: string | null }>({ index: null, elem: null });
  const changeStateReservour = (index: number, e: string) => {
    setClickReservour({ index: index, elem: e })
  }

  const handler = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    setState(true)
  }
  const closeHandler = () => {
    setState(false)
  }
  return (
    <div className="App">
      <div className="Body">
        <LeftFrame handlerAddTour={handler} changeStateReservour={changeStateReservour} />
        <CenterFrame defaultStateModal={defaultStateModal} closeHandler={closeHandler} clickReservour={clickReservour} />
        <RightFrame />
      </div>
      <Footer />
    </div>
  );
}

export default App;
