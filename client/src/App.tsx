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
  const { state } = useContext(MyContext)


  return (
    <div className="App">
      {!state.content && <Form />}
      {state.stateModal && <div className="popup_backgroud"></div>}
      <div className="Body">
        <LeftFrame />
        <CenterFrame />
        <RightFrame />
      </div>
      <Footer />
    </div>
  );
}

export default App;
