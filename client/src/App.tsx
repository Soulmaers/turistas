import React, { useEffect, useState } from 'react';

import { useGetDataContent } from './modules/servises/hooks/getDataContent'
import { useSelector } from 'react-redux';
import { RootState } from './GlobalStor';
import LeftFrame from './modules/leftFrame/components/LeftFrame'
import RightFrame from './modules/righFrame/components/RightFrame'
import CenterFrame from './modules/centerFrame/CenterFrame'
import { HeaderMobile } from './modules/leftFrame/components/LeftFrame'
import { WrapperNavi } from './modules/leftFrame/components/WrapperNavi'
import Form from './modules/form/components/Form'
import Modal from './modules/servises/components/Modal'

import './App.css';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const activForm = useSelector((state: RootState) => state.slice.activForm)
  const { getContent } = useGetDataContent()

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    // Удаляем обработчик при размонтировании
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log('старт')
      await getContent();
    };
    fetchData();
  }, [activForm])

  const isMobile = windowWidth < 400;
  return (

    <div className="App">
      {activForm && <Modal><Form /></Modal>}
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
