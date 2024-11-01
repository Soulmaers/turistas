import React from 'react'
import { IoMdAddCircle } from "react-icons/io";
import './CenterFrame.css'

const centerFrame = () => {

    return (
        <div className='Center_frame'>
            <div className="title_tour">
                <div className="add_tour"><div className="add_tournament">Создать новый турнир</div>  < IoMdAddCircle className="create_btn_tour" /></div>

            </div>
            <div className="logo_center"></div>

        </div>

    )
}

export default centerFrame