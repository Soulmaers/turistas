import React from 'react'
import { useContext } from 'react'
import { MyContext, selectContent, selectReservours } from '../servises/contexs/contexts';
import { ContextForm } from '../servises/contexs/contextCloseForm';
import { FormCatch } from './modalCatch/components/FormCatch'
import ModalAddTour from './modalCarTour/components/ModalAddTour'
import WiewCardReservours from './reservours/components/WiewCardReservours'
import AddCarTournament from './tabletours/components/AddCarTournament'
import Modal from '../servises/components/Modal'
import './CenterFrame.css'


const СenterFrame = () => {

    const { state } = useContext(MyContext); // Получаем состояние из контекста
    const { stateModal, catchForm } = useContext(ContextForm)
    const content = selectContent(state)
    const updateReservours = selectReservours(state)
    console.log('рендер')
    console.log(content)
    console.log(state.userStatus.tournament)
    const renderComponents = () => {
        if (updateReservours.index !== null) {
            return <WiewCardReservours index={updateReservours.index} text={updateReservours.text} />
        }
        else {
            return content !== null ? <AddCarTournament data={state.userStatus.tournament} /> : <div className="logo_center"></div> //{/*<div className="logo_center"></div>*/ }
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