import React, { useEffect } from 'react';

import { useGetDataContent } from './modules/servises/hooks/getDataContent'
import { useSelector } from 'react-redux';
import { RootState } from './GlobalStor';
import LeftFrame from './modules/leftFrame/components/LeftFrame'
import RightFrame from './modules/righFrame/components/RightFrame'
import CenterFrame from './modules/centerFrame/CenterFrame'
import Footer from './modules/centerFrame/Footer'

import Form from './modules/form/components/Form'
import Modal from './modules/servises/components/Modal'

import './App.css';

function App() {
  const { getContent } = useGetDataContent()

  useEffect(() => {
    const fetchData = async () => {
      await getContent();
    };
    fetchData();
  }, [])
  const activForm = useSelector((state: RootState) => state.slice.activForm)

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
