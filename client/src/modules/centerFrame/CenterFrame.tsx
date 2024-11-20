import React from 'react'
import { useState, useContext } from 'react'
import { MyContext } from '../../context/contexts';
import ModalAddTour from './modalCarTour/components/ModalAddTour'
import WiewCardReservours from './reservours/components/WiewCardReservours'
import AddCarTournament from './tabletours/components/AddCarTournament'
import './CenterFrame.css'


const СenterFrame = () => {

    const { state } = useContext(MyContext); // Получаем состояние из контекста

    const renderComponents = () => {
        console.log(state)
        if (state.updateReservours.index !== null) {
            return <WiewCardReservours index={state.updateReservours.index} text={state.updateReservours.text} />
        }
        else {
            return state.content && state.content === 1 ? <AddCarTournament /> : <div className="logo_center"></div>
        }
    }

    return (
        <div className='Center_frame'>
            {renderComponents()}
            {state.stateModal && <ModalAddTour />}
        </div>

    )
}

export default СenterFrame