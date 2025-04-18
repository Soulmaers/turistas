import React, { useEffect, useState } from 'react';

import { useGetDataContent, useResizeWindow } from './modules/servises/hooks/getDataContent'
import { useSelector } from 'react-redux';
import { RootState } from './GlobalStor';
import LeftFrame from './modules/leftFrame/components/LeftFrame'
import CenterFrame from './modules/centerFrame/CenterFrame'
import { HeaderMobile } from './modules/leftFrame/components/LeftFrame'
import { WrapperNavi } from './modules/leftFrame/components/WrapperNavi'
import Form from './modules/form/components/Form'
import Modal from './modules/servises/components/Modal'

import './App.css';

function App() {
  const { windowWidth } = useResizeWindow()

  const activForm = useSelector((state: RootState) => state.slice.activForm)
  const { getContent } = useGetDataContent()



  useEffect(() => {
    const fetchData = async () => {
      await getContent();
    };
    fetchData();
  }, [activForm])

  const isMobile = windowWidth < 440;
  return (

    <div className="App">
      {activForm && <Modal style={{ top: '50%' }}><Form /></Modal>}
      <div className="body">
        {!isMobile && <LeftFrame />}
        {isMobile && <HeaderMobile />}
        <CenterFrame />
        {isMobile && <WrapperNavi />}
      </div>
    </div>

  );
}


export default App;
