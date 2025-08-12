import React, { useState } from 'react'
import ModalTwoLauout from '../servises/components/ModalTwoLauout'
import ModalThreeLauout from '../servises/components/ModalThreeLauout'
import { FormCatch } from './modalCatch/components/FormCatch'
import { FormDelCatch } from '../modalComponents/components/FormDelCatch'
import { FormDeleteTour } from '../modalComponents/components/FormDeleteTour'
import { CardTourSetting } from './modalCarTour/components/CarTourSetting'
import { CarAddTour } from './modalCarTour/components/CarAddTour'
import Tournaments from '../modalComponents/components/Tournamets'
import Reservoors from '../modalComponents/components/Reservoors'
import HistoryLogs from '../modalComponents/components/HistoryLogs'
import Modal from '../servises/components/Modal'
import { UniversalModal } from '../servises/components/UniversalModal'
import { Profil } from '../modalComponents/components/Profil'
import { HomePageHaveTour } from './tabletours/components/HomePageHaveTour'
import { DiscriptionAnchor } from '../modalComponents/components/DiscriptionAnchor'
import { DiscriptionInfo } from '../modalComponents/components/DiscriptionInfo'
import { DiscriptionQuestions } from '../modalComponents/components/DiscriptionQuestions'
import { DiscriptionTime } from '../modalComponents/components/DiscriptionTime'
import { TimeTour } from './modalCarTour/configurator/components/Timing/components/TimeTour'
import { SubIf } from './modalCarTour/configurator/components/SubUslovia/SubIf'
import { CriterVictory } from './modalCarTour/configurator/components/CriterVictory/CriterVictory'
import { ImportData } from './modalCarTour/configurator/components/ImportData/ImportData'
import { Fishs } from './modalCarTour/configurator/components/Fishs/Fishs'
import { TypeCatch } from './modalCarTour/configurator/components/TypeCatch/TypeCatch'
import { TypeBaits } from './modalCarTour/configurator/components/TypeBaits/TypeBaits'
import { Reservours } from './modalCarTour/configurator/components/Reservours/Reservours'
import { InfoChart } from './modalCarTour/configurator/components/Timing/components/InfoChart'
import { Fishers } from '../centerFrame/modalCarTour/components/Fishers'
import { Configurator } from '../centerFrame/modalCarTour/configurator/components/Configurator'
import { SettingsStorLoad } from '../modalComponents/components/SettingsStorLoad'
import { CardTours } from './modalCatch/components/tours/components/CardTours'
import './CenterFrame.css'



import { useSelector, useDispatch } from 'react-redux';
import { set_stateModalWindow, set_stateModalWindowThree, set_stateModalWindowThour, set_activeModalLevel, set_stateModalWindowTwo, RootState } from '../../GlobalStor';



const CenterFrame = () => {
    const dispatch = useDispatch();
    const stateModalWindow = useSelector((state: RootState) => state.slice.stateModalWindow);
    const stateModalWindowTwo = useSelector((state: RootState) => state.slice.stateModalWindowTwo);
    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);
    const stateModalWindowThour = useSelector((state: RootState) => state.slice.stateModalWindowThour);
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const intervals = useSelector((state: RootState) => state.slice.intervals);

    const modalMap: {
        level: number;
        state: { type: string; status: boolean };
        close: () => void;
        components: { [key: string]: { component: JSX.Element; top: string } };
    }[] = [
            {
                level: 1,
                state: stateModalWindow,
                close: () => dispatch(set_stateModalWindow({ ...stateModalWindow, status: false })),
                components: {
                    add_tour: { component: <CarAddTour />, top: '10%' },
                    stateModal: { component: <CardTourSetting />, top: '10%' },
                    catchForm: { component: <FormCatch />, top: '10%' },
                    deleteForm: { component: <FormDelCatch />, top: '10%' },
                    profil: { component: <Profil />, top: '30%' },
                    anchor: { component: <DiscriptionAnchor />, top: '30%' },
                    disInfo: { component: <DiscriptionInfo />, top: '30%' },
                    tournaments: { component: <Tournaments />, top: '30%' },
                    reservoors: { component: <Reservoors />, top: '30%' },
                    history: { component: <HistoryLogs />, top: '30%' }
                }
            },
            {
                level: 2,
                state: stateModalWindowTwo,
                close: () => dispatch(set_stateModalWindowTwo({ ...stateModalWindowTwo, status: false })),
                components: {
                    deleteFormTour: { component: <FormDeleteTour />, top: '30%' },
                    reg: { component: <Configurator modalConfig={() => dispatch(set_stateModalWindowTwo({ ...stateModalWindowTwo, status: false }))} />, top: '10%' },
                    fishers: { component: <Fishers flag={false} />, top: '15%' },
                    setLoad: { component: <SettingsStorLoad />, top: '15%' },
                    cardSelected: { component: <CardTours />, top: '15%' }
                }
            },
            {
                level: 3,
                state: stateModalWindowThree,
                close: () => dispatch(set_stateModalWindowThree({ ...stateModalWindowThree, status: false })),
                components: {
                    time: { component: <TimeTour />, top: '10%' },
                    criter: { component: <CriterVictory />, top: '10%' },
                    dopishue: { component: <SubIf />, top: '10%' },
                    import: { component: <ImportData />, top: '10%' },
                    fish: { component: <Fishs />, top: '10%' },
                    tiresreservour: { component: <Reservours />, top: '10%' },
                    type_catch: { component: <TypeCatch />, top: '10%' },
                    type_baits: { component: <TypeBaits />, top: '10%' },
                    discription_questions: { component: <DiscriptionQuestions />, top: '15%' },
                }
            },
            {
                level: 4,
                state: stateModalWindowThour,
                close: () => dispatch(set_stateModalWindowThour({ ...stateModalWindowThour, status: false })),
                components: {
                    discription_time: { component: <DiscriptionTime />, top: '10%' },
                    info_chart: { component: <InfoChart />, top: '10%' },

                }
            },



        ];

    return (
        <div className='Center_frame'>
            <HomePageHaveTour data={userStatus} />

            {(() => {
                // Найдем максимальный level среди открытых модалок
                const openModals = modalMap.filter(({ state }) => state.status);
                const maxOpenLevel = Math.max(...openModals.map(({ level }) => level), 0);

                return modalMap.map(({ level, state, close, components }) => {
                    const modalEntry = components[state.type];
                    if (!state.status || !modalEntry) return null;

                    return (
                        <UniversalModal
                            key={`modal-level-${level}-${state.type}`}
                            level={level}
                            visible={true}
                            onClose={close}
                            onTop={level === maxOpenLevel} // ← ВАЖНО!
                            component={modalEntry.component}
                            style={{ top: modalEntry.top }}
                        />
                    );
                });
            })()}
        </div>
    );
};

export default CenterFrame;


/*      {renderTwo()}*/