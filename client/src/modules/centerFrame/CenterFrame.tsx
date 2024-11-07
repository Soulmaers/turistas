import React from 'react'
import { useState } from 'react'

import ModalAddTour from './modalCarTour/components/ModalAddTour'
import WiewCardReservours from './reservours/components/WiewCardReservours'
import AddCarTournament from './tabletours/components/AddCarTournament'
import './CenterFrame.css'

interface CenterProps {
    defaultStateModal: boolean;
    closeHandler: () => void
    haveTour: number
    clickReservour: { index: number | null, elem: string | null }

}
const СenterFrame: React.FC<CenterProps> = ({ defaultStateModal, haveTour, closeHandler, clickReservour }) => {

    const renderComponents = () => {
        if (clickReservour.index !== null) {
            return <WiewCardReservours index={clickReservour.index} text={clickReservour.elem} />
        }
        else {
            return haveTour > 1 ? <AddCarTournament /> : <div className="logo_center"></div>
        }
    }

    console.log(defaultStateModal)
    return (
        <div className='Center_frame'>
            {renderComponents()}
            {/*<div className="logo_center"></div>*/}
            {defaultStateModal && <ModalAddTour closeHandler={closeHandler} />}
        </div>

    )
}

export default СenterFrame