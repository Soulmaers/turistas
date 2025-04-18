import React from 'react'

import { FormCatch } from './modalCatch/components/FormCatch'
import { FormDelCatch } from './history/components/FormDelCatch'
import { FormDeleteTour } from '../leftFrame/components/FormDeleteTour'
import ModalAddTour from './modalCarTour/components/ModalAddTour'
import WiewCardReservours from './reservours/components/WiewCardReservours'
import AddCarTournament from './tabletours/components/AddCarTournament'
import { StatisticCard } from './tabletours/components/StatisticCard'
import Modal from '../servises/components/Modal'
import { HistoryList } from './history/components/HistoryList'
import { Profil } from '../leftFrame/components/Profil'
import { HomePageNoTour } from './tabletours/components/HomePageNoTour'
import { HomePageHaveTour } from './tabletours/components/HomePageHaveTour'
import './CenterFrame.css'

import { useSelector } from 'react-redux';
import { RootState } from '../../GlobalStor';


const СenterFrame = () => {
    const deleteForm = useSelector((state: RootState) => state.slice.deleteForm);
    const deleteFormTour = useSelector((state: RootState) => state.slice.deleteFormTour);
    //const content = useSelector((state: RootState) => state.slice.content);
    const updateReservourss = useSelector((state: RootState) => state.slice.updateReservours);
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const stateModal = useSelector((state: RootState) => state.slice.stateModal);
    const catchForm = useSelector((state: RootState) => state.slice.catchForm);
    const historyWiew = useSelector((state: RootState) => state.slice.historyWiew);
    const profil = useSelector((state: RootState) => state.slice.profil);

    console.log(userStatus.tournament)
    const renderComponents = () => {
        switch (historyWiew) {
            case 'tournaments':
                return userStatus.tournament.length !== 0 ? <AddCarTournament data={userStatus.tournament} /> : <HomePageNoTour />//<HomePageHaveTour data={userStatus.tournament} />
            case 'reservoors':
                return <WiewCardReservours index={updateReservourss?.index} text={updateReservourss?.text} />
            case 'stata':
                return <StatisticCard />
            case 'history':
                return <HistoryList data={userStatus.tournament} />
        }

    }

    return (
        <div className='Center_frame'>
            {renderComponents()}
            {stateModal && <Modal style={{ top: '50%' }}><ModalAddTour /></Modal>}
            {catchForm && <Modal style={{ top: '50%' }}><FormCatch /></Modal>}
            {deleteForm && <Modal style={{ top: '50%' }}><FormDelCatch /></Modal>}
            {deleteFormTour && <Modal style={{ top: '50%' }}><FormDeleteTour /></Modal>}
            {profil && <Modal style={{ top: '20%' }}><Profil /></Modal>}
        </div>

    )
}

export default СenterFrame