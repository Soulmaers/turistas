import React from 'react';
import { useState, useContext } from 'react'
import { ContextForm } from './modules/servises/contexs/contextCloseForm';

import LeftFrame from './modules/leftFrame/components/LeftFrame'
import RightFrame from './modules/righFrame/components/RightFrame'
import CenterFrame from './modules/centerFrame/CenterFrame'
import Footer from './modules/centerFrame/Footer'

import Form from './modules/form/components/Form'
import Modal from './modules/servises/components/Modal'
import './App.css';

function App() {

  const { activForm, dispatch } = useContext(ContextForm)
  console.log(activForm)
  console.log('рендер')
  return (
    <div className="App">
      {activForm && <Modal><Form /></Modal>}
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
