import React from 'react'
import { IoSave } from "react-icons/io5";
import './ModalAddTour.css'

interface ModalAddTourProps {
    closeHandler: () => void; // Указываем тип функции onClose
}

const ModalAddTour: React.FC<ModalAddTourProps> = ({ closeHandler }) => {


    return (
        <div className="modal_add_tour">
            <div className="header_modal_tour">Карточка турнира<span className="close" onClick={closeHandler}>x</span></div>
            <div className="body_modal_tour"></div>
            <div className="footer_modal_tour">
                <div className="messageAlarm"></div><IoSave className="start_tour" />
            </div>
        </div>
    )
}


export default ModalAddTour