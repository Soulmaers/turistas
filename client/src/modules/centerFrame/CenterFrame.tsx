import React from 'react'
import { useState } from 'react'

import ModalAddTour from './modalCarTour/components/ModalAddTour'
import WiewCardReservours from './reservours/components/WiewCardReservours'
import AddCarTournament from './tabletours/components/AddCarTournament'
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
            return <AddCarTournament />
        }
    }


    return (
        <div className='Center_frame'>
            {renderComponents()}
            {/*<div className="logo_center"></div>*/}
            {defaultStateModal && <ModalAddTour closeHandler={closeHandler} />}
        </div>

    )
}

export default СenterFrame