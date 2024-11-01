import React from 'react'
import { useState } from 'react'
import { IoMdAddCircle } from "react-icons/io";
import ModalAddTour from './ModalAddTour'
import './CenterFrame.css'

const СenterFrame = () => {
    const [defaultState, setState] = useState(false)

    const handler = () => {
        setState(true)
    }
    const closeHandler = () => {
        setState(false)
    }
    return (
        <div className='Center_frame'>
            <div className="title_tour">
                <div className="add_tour"><div className="add_tournament">Создать новый турнир</div>
                    < IoMdAddCircle className="create_btn_tour" onClick={() => handler()} /></div>

            </div>
            <div className="logo_center"></div>
            {defaultState && <ModalAddTour closeHandler={closeHandler} />}
        </div>

    )
}

export default СenterFrame