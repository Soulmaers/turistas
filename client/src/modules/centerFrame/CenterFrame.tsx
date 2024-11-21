import React from 'react'
import { useContext } from 'react'
import { MyContext, selectContent, selectStateModal, selectReservours } from '../../context/contexts';
import ModalAddTour from './modalCarTour/components/ModalAddTour'
import WiewCardReservours from './reservours/components/WiewCardReservours'
import AddCarTournament from './tabletours/components/AddCarTournament'
import './CenterFrame.css'


const СenterFrame = () => {

    const { state } = useContext(MyContext); // Получаем состояние из контекста
    const content = selectContent(state)
    const stateModal = selectStateModal(state)
    const updateReservours = selectReservours(state)
    console.log('рендер')
    const renderComponents = () => {
        if (updateReservours.index !== null) {
            return <WiewCardReservours index={updateReservours.index} text={updateReservours.text} />
        }
        else {
            return content && content === 1 ? <AddCarTournament /> : <div className="logo_center"></div>
        }
    }

    return (
        <div className='Center_frame'>
            {renderComponents()}
            {stateModal && <ModalAddTour />}
        </div>

    )
}

export default СenterFrame