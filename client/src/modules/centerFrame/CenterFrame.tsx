import React from 'react'
import ModalTwoLauout from '../servises/components/ModalTwoLauout'
import { FormCatch } from './modalCatch/components/FormCatch'
import { FormDelCatch } from './history/components/FormDelCatch'
import { FormDeleteTour } from '../leftFrame/components/FormDeleteTour'
//import ModalAddTour from './modalCarTour/components/ModalAddTour'
import WiewCardReservours from './reservours/components/WiewCardReservours'
import { Fishers } from './modalCarTour/components/Fishers'
import { CardTourSetting } from './modalCarTour/components/CarTourSetting'
import { CarAddTour } from './modalCarTour/components/CarAddTour'
import { StatisticCard } from './tabletours/components/StatisticCard'
import Modal from '../servises/components/Modal'
import { HistoryList } from './history/components/HistoryList'
import { Profil } from '../leftFrame/components/Profil'
import { HomePageNoTour } from './tabletours/components/HomePageNoTour'
import { HomePageHaveTour } from './tabletours/components/HomePageHaveTour'
import './CenterFrame.css'

import { useSelector, useDispatch } from 'react-redux';
import { update_modal, set_add_tour, set_modalFishers, set_profil, add_catch, set_deleteFormTour, RootState } from '../../GlobalStor';


const СenterFrame = () => {
    const deleteForm = useSelector((state: RootState) => state.slice.deleteForm);
    const deleteFormTour = useSelector((state: RootState) => state.slice.deleteFormTour);
    const modalFishers = useSelector((state: RootState) => state.slice.modalFishers);
    const updateReservourss = useSelector((state: RootState) => state.slice.updateReservours);
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const stateModal = useSelector((state: RootState) => state.slice.stateModal);
    const catchForm = useSelector((state: RootState) => state.slice.catchForm);
    const historyWiew = useSelector((state: RootState) => state.slice.historyWiew);
    const profil = useSelector((state: RootState) => state.slice.profil);
    const addTour = useSelector((state: RootState) => state.slice.addTour);

    console.log('рендер')
    const dispatch = useDispatch()
    console.log(userStatus.tournament)
    const renderComponents = () => {
        switch (historyWiew) {
            case 'tournaments':
                return userStatus.tournament.length !== 0 ? <HomePageHaveTour data={userStatus} /> : <HomePageNoTour />//<AddCarTournament data={userStatus.tournament} />
            case 'reservoors':
                return <WiewCardReservours index={updateReservourss?.index} text={updateReservourss?.text} />
            case 'stata':
                return <StatisticCard />
            case 'history':
                return <HistoryList data={userStatus.tournament} />
        }
    }

    console.log(stateModal)
    return (
        <div className='Center_frame'>
            {renderComponents()}
            {stateModal && <Modal style={{ top: '50%' }} onClose={() => dispatch(update_modal(false))}><CardTourSetting /></Modal>}
            {addTour && <Modal style={{ top: '50%' }} onClose={() => dispatch(set_add_tour(false))}><CarAddTour /></Modal>}
            {catchForm && <Modal style={{ top: '50%' }} onClose={() => dispatch(add_catch(false))}><FormCatch /></Modal>}
            {deleteFormTour && <ModalTwoLauout style={{ top: '50%' }} onClose={() => dispatch(set_deleteFormTour(false))}><FormDeleteTour /></ModalTwoLauout>}
            {deleteForm && <Modal style={{ top: '50%' }} onClose={() => dispatch(update_modal(false))}><FormDelCatch /></Modal>}
            {profil && <Modal style={{ top: '20%' }} onClose={() => dispatch(set_profil(false))}><Profil /></Modal>}

        </div>
    )
}

export default СenterFrame


