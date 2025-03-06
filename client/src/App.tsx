import React, { useEffect } from 'react';

import { useGetDataContent } from './modules/servises/hooks/getDataContent'
import { useSelector } from 'react-redux';
import { RootState } from './GlobalStor';
import LeftFrame from './modules/leftFrame/components/LeftFrame'
import RightFrame from './modules/righFrame/components/RightFrame'
import CenterFrame from './modules/centerFrame/CenterFrame'


import Form from './modules/form/components/Form'
import Modal from './modules/servises/components/Modal'

import './App.css';

function App() {

  const activForm = useSelector((state: RootState) => state.slice.activForm)
  const { getContent } = useGetDataContent()

  useEffect(() => {
    const fetchData = async () => {
      console.log('старт')
      await getContent();
    };
    fetchData();
  }, [activForm])


  return (

    <div className="App">
      {activForm && <Modal><Form /></Modal>}
      <div className="body">
        <LeftFrame />
        <CenterFrame />
      </div>
    </div>

  );
}

export default App;
