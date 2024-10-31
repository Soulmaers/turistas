import React from 'react'
import { useState } from 'react'
import { GiTrophy } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { FaChartGantt } from "react-icons/fa6"
import { FaWater } from "react-icons/fa"
import Tournaments from './Tournamets'
import Statistics from './Statistics'
import Reservoors from './Reservoors'
import '../styles/LeftFrame.css'



const LeftFrame = () => {


    const [activeButton, setActivButton] = useState<string | null>(null)

    const handleButtonClick = (selectSubMenu: string) => {
        setActivButton(activeButton === selectSubMenu ? null : selectSubMenu)
    }
    const getIconsArrow = (selectSubMenu: string) => {
        return activeButton === selectSubMenu ? <IoIosArrowUp className="class_icon" /> : < IoIosArrowDown className="class_icon" />
    }
    return (
        <div className="Left_frame">
            <div className="wrapper">
                <div className="btn" onClick={() => handleButtonClick('tounaments')}><GiTrophy className="class_icon icon_button" />
                    <span className="title_name">Турниры</span>{getIconsArrow('tounaments')}</div>
                {activeButton === 'tounaments' && <Tournaments />}
                <div className="btn" onClick={() => handleButtonClick('stata')}><FaChartGantt className="class_icon icon_button" />
                    <span className="title_name">Статистика</span>{getIconsArrow('stata')}</div>
                {activeButton === 'stata' && <Statistics />}
                <div className="btn" onClick={() => handleButtonClick('reservoors')}><FaWater className="class_icon icon_button" />
                    <span className="title_name">Водоёмы</span>{getIconsArrow('reservoors')}</div>
                {activeButton === 'reservoors' && <Reservoors />}
            </div>
        </div>
    )
}

export default LeftFrame