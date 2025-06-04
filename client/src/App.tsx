import React, { useEffect, useState, useMemo, useCallback } from 'react';

import { useGetDataContent, useResizeWindow } from './modules/servises/hooks/getDataContent'
import { useSelector, useDispatch } from 'react-redux';
import { setFormStepWithIndex, RootState } from './GlobalStor';
import LeftFrame from './modules/leftFrame/components/LeftFrame'
import CenterFrame from './modules/centerFrame/CenterFrame'
import { HeaderMobile } from './modules/leftFrame/components/LeftFrame'
import { WrapperNavi } from './modules/leftFrame/components/WrapperNavi'
import { Preform } from './modules/form/components/PreForm';
import { EntryForm } from './modules/form/components/EntryForm'
import Modal from './modules/servises/components/Modal'
import { useGetDataUser } from './modules/servises/hooks/getDataUser'
import './App.css';



function App() {
  const dispatch = useDispatch();
  const { getDataUser } = useGetDataUser();
  const { getContent } = useGetDataContent();
  const { windowWidth } = useResizeWindow();


  const formStep = useSelector((state: RootState) => state.slice.formStep);
  const [loader, setLoader] = useState(true);

  const isMobile = windowWidth < 440;

  // Проверка lastContact
  useEffect(() => {
    const contactValue = localStorage.getItem('lastContact');
    const passValue = localStorage.getItem('lastPass');
    console.log(contactValue, passValue)
    if (contactValue) {
      dispatch(setFormStepWithIndex({ step: 'main' }));
      getDataUser(contactValue, passValue || '', null);
    } else {
      dispatch(setFormStepWithIndex({ step: 'start' }));

    }
  }, []);

  // Загрузка контента
  useEffect(() => {
    const fetchData = async () => {
      await getContent();
      setLoader(false);
    };
    fetchData();
  }, []);

  const handleArrowClick = useCallback(() => {
    dispatch(setFormStepWithIndex({ step: 'preform' }));
  }, [dispatch]);

  const handleEntryFormDone = useCallback((index: number) => {
    dispatch(setFormStepWithIndex({ step: 'entry', index }));
  }, [dispatch]);

  const handleEntryComplete = useCallback(() => {
    dispatch(setFormStepWithIndex({ step: 'main' }));
  }, [dispatch]);

  const renderStart = () => (
    <div className="start_wiew">
      <div className="icon_arrow" onClick={handleArrowClick}></div>
    </div>
  );

  // Основной контент
  const renderMain = () => (
    <>
      {!isMobile && <LeftFrame />}
      <CenterFrame />

    </>
  );

  return (
    <div className="App">
      <HeaderMobile />
      {loader ? (
        <div className="container_load">
          <div className="loader_global"></div>
          <span className="span_dicription">ЗАГРУЗКА ...</span>
        </div>
      ) : (

        <div className="body">
          {formStep.step === 'start' && renderStart()}

          {formStep.step === 'preform' && (
            <Modal style={{ top: '50%' }} onClose={() => dispatch(setFormStepWithIndex({ step: 'start' }))}>
              <Preform onDone={handleEntryFormDone} />
            </Modal>
          )}

          {formStep.step === 'entry' && formStep.index !== null && (
            <Modal style={{ top: '10%' }} onClose={() => dispatch(setFormStepWithIndex({ step: 'start' }))}>
              <EntryForm index={formStep.index} onDone={handleEntryComplete} />
            </Modal>
          )}

          {formStep.step === 'main' && renderMain()}
        </div>
      )}
      <WrapperNavi />
    </div>
  );
}

export default App;
