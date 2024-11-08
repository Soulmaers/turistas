import React from 'react';
import { useState, useContext } from 'react'


import LeftFrame from './modules/leftFrame/components/LeftFrame'
import RightFrame from './modules/righFrame/components/RightFrame'
import CenterFrame from './modules/centerFrame/CenterFrame'
import Footer from './modules/centerFrame/Footer'
import { MyContext } from './context/contexts';

import Form from './modules/form/components/Form'
import './App.css';

function App() {
  const { state, stateModal } = useContext(MyContext)
  const [clickReservour, setClickReservour] = useState<{ index: number | null; elem: string | null }>({ index: null, elem: null });
  const changeStateReservour = (index: number | null, e: string | null) => {
    setClickReservour({ index: index, elem: e })
  }

  return (
    <div className="App">
      {!state && <Form />}
      {stateModal && <div className="popup_backgroud"></div>}
      <div className="Body">
        <LeftFrame changeStateReservour={changeStateReservour} />
        <CenterFrame clickReservour={clickReservour} />
        <RightFrame />
      </div>
      <Footer />
    </div>
  );
}

export default App;
