import React from 'react';
import { useState } from 'react'

import LeftFrame from './modules/leftFrame/components/LeftFrame'
import RightFrame from './modules/righFrame/components/RightFrame'
import CenterFrame from './modules/centerFrame/CenterFrame'
import Footer from './modules/centerFrame/Footer'

import Form from './modules/form/components/Form'
import './App.css';

function App() {
  const [haveTour, setHaveTour] = useState(0) //стэйт
  const [defaultStateModal, setState] = useState(false) //стэйт открывает модальное окно создания турнира
  const [clickReservour, setClickReservour] = useState<{ index: number | null; elem: string | null }>({ index: null, elem: null });
  const changeStateReservour = (index: number | null, e: string | null) => {
    setClickReservour({ index: index, elem: e })
  }

  const handler = () => {
    console.log('хэндлер')
    setState(true)
  }

  const closeHandler = () => {
    setState(false)
  }


  return (
    <div className="App">
      {haveTour === 0 && <Form updateHaveTour={setHaveTour} />}
      {defaultStateModal && <div className="popup_backgroud"></div>}
      <div className="Body">
        <LeftFrame onClickAddTour={handler} changeStateReservour={changeStateReservour} />
        <CenterFrame defaultStateModal={defaultStateModal} haveTour={haveTour} closeHandler={closeHandler} clickReservour={clickReservour} />
        <RightFrame />
      </div>
      <Footer />
    </div>
  );
}

export default App;
