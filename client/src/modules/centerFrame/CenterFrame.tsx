import React from 'react'

import { FormCatch } from './modalCatch/components/FormCatch'
import ModalAddTour from './modalCarTour/components/ModalAddTour'
import WiewCardReservours from './reservours/components/WiewCardReservours'
import AddCarTournament from './tabletours/components/AddCarTournament'
import Modal from '../servises/components/Modal'
import './CenterFrame.css'

import { useSelector } from 'react-redux';
import { RootState } from '../../GlobalStor';


const СenterFrame = () => {
    const content = useSelector((state: RootState) => state.slice.content);
    const updateReservourss = useSelector((state: RootState) => state.slice.updateReservours);
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const stateModal = useSelector((state: RootState) => state.slice.stateModal);
    const catchForm = useSelector((state: RootState) => state.slice.catchForm);

    console.log(content)
    console.log(userStatus)
    console.log(stateModal)
    console.log(catchForm)
    console.log(updateReservourss)
    const renderComponents = () => {
        if (updateReservourss.index !== null) {
            return <WiewCardReservours index={updateReservourss.index} text={updateReservourss.text} />
        }
        else {
            //  console.log(content)
            return content !== null ? <AddCarTournament data={userStatus.tournament} /> : <div className="logo_center"></div>
        }
    }

    return (
        <div className='Center_frame'>
            {renderComponents()}
            {stateModal && <Modal><ModalAddTour /></Modal>}
            {catchForm && <Modal><FormCatch /></Modal>}
        </div>

    )
}

export default СenterFrame