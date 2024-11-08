import React from 'react'
import { useState, useContext } from 'react'
import { MyContext } from '../../../context/contexts';
import { GiTrophy } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp, IoMdAddCircle } from "react-icons/io"
import { FaChartGantt } from "react-icons/fa6"
import { FaWater, FaBookOpen } from "react-icons/fa"

import Tournaments from './Tournamets'
import Statistics from './Statistics'
import Reservoors from './Reservoors'
import RenderHeaderLeft from './HeadersLeft'
import HistoryLogs from './HistoryLogs'

import '../styles/LeftFrame.css'

interface HadlerProps {
    changeStateReservour: (index: number | null, e: string | null) => void
}

const LeftFrame: React.FC<HadlerProps> = ({ changeStateReservour }) => {

    const { setStateModal } = useContext(MyContext)
    const [activeButton, setActivButton] = useState<string | null>(null)

    const handleButtonClick = (selectSubMenu: string) => {
        setActivButton(activeButton === selectSubMenu ? null : selectSubMenu)
    }
    const getIconsArrow = (selectSubMenu: string) => {
        return activeButton === selectSubMenu ? <IoIosArrowUp className="class_icon" /> : < IoIosArrowDown className="class_icon" />
    }

    const addCardTour = () => {  //меняем стэйт по отображению модального окна
        setStateModal(true)
    }
    return (
        <div className="Left_frame">
            <RenderHeaderLeft changeStateReservour={changeStateReservour} />
            <div className="wrapper">
                <div className="wrapper_navi">
                    <div className="btn" onClick={() => handleButtonClick('tounaments')}><GiTrophy className="class_icon icon_button" />
                        <span className="title_name">Турниры</span>
                        < IoMdAddCircle className="create_btn_tour" onClick={addCardTour} />{getIconsArrow('tounaments')}</div>
                    {activeButton === 'tounaments' && <Tournaments />}
                    <div className="btn" onClick={() => handleButtonClick('stata')}><FaChartGantt className="class_icon icon_button" />
                        <span className="title_name">Статистика</span>{getIconsArrow('stata')}</div>
                    {activeButton === 'stata' && <Statistics />}
                    <div className="btn" onClick={() => handleButtonClick('reservoors')}><FaWater className="class_icon icon_button" />
                        <span className="title_name">Водоёмы</span>{getIconsArrow('reservoors')}</div>
                    {activeButton === 'reservoors' && <Reservoors changeStateReservour={changeStateReservour} />}
                    <div className="btn" onClick={() => handleButtonClick('history')}><FaBookOpen className="class_icon icon_button" />
                        <span className="title_name">Журнал</span>{getIconsArrow('history')}</div>
                    {activeButton === 'history' && <HistoryLogs />}

                </div>
            </div>
        </div >
    )
}

export default LeftFrame