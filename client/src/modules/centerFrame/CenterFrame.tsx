import React from 'react'
import { useState } from 'react'

import ModalAddTour from './ModalAddTour'
import WiewCardReservours from './reservours/components/WiewCardReservours'
import './CenterFrame.css'

interface CenterProps {
    defaultStateModal: boolean;
    closeHandler: () => void
    clickReservour: { index: number | null, elem: string | null }

}
const СenterFrame: React.FC<CenterProps> = ({ defaultStateModal, closeHandler, clickReservour }) => {

    const renderComponents = () => {
        if (clickReservour.index !== null) {
            return <WiewCardReservours index={clickReservour.index} text={clickReservour.elem} />
        }
        else {
            return <div className="logo_center"></div>
        }
    }


    return (
        <div className='Center_frame'>
            {renderComponents()}
            {defaultStateModal && <ModalAddTour closeHandler={closeHandler} />}
        </div>

    )
}

export default СenterFrame