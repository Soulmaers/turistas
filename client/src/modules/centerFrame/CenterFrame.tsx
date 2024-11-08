import React from 'react'
import { useState, useContext } from 'react'
import { MyContext } from '../../context/contexts';
import ModalAddTour from './modalCarTour/components/ModalAddTour'
import WiewCardReservours from './reservours/components/WiewCardReservours'
import AddCarTournament from './tabletours/components/AddCarTournament'
import './CenterFrame.css'

interface CenterProps {
    clickReservour: { index: number | null, elem: string | null }

}
const СenterFrame: React.FC<CenterProps> = ({ clickReservour }) => {

    const { state, stateModal } = useContext(MyContext); // Получаем состояние из контекста
    const renderComponents = () => {
        if (clickReservour.index !== null) {
            return <WiewCardReservours index={clickReservour.index} text={clickReservour.elem} />
        }
        else {
            return state && state === 1 ? <AddCarTournament /> : <div className="logo_center"></div>
        }
    }

    console.log(stateModal)
    return (
        <div className='Center_frame'>
            {renderComponents()}
            {stateModal && <ModalAddTour />}
        </div>

    )
}

export default СenterFrame