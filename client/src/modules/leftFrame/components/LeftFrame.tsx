import React from 'react'
import { useState, useContext } from 'react'
import { MyContext } from '../../servises/contexs/contexts';
import { ContextForm } from '../../servises/contexs/contextCloseForm';
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



const LeftFrame = () => {
    const { dispatch: dispatchForm } = useContext(ContextForm)
    const { dispatch } = useContext(MyContext)
    const [subMenu, setSubMenu] = useState<null | string>(null)
    const handleButtonClick = (selectSubMenu: string) => { //Клик открывает подменю
        setSubMenu(subMenu === selectSubMenu ? null : selectSubMenu)
    }
    const getIconsArrow = (selectSubMenu: string) => { //Меняем иконку стрелки
        return subMenu === selectSubMenu ? <IoIosArrowUp className="class_icon" /> : < IoIosArrowDown className="class_icon" />
    }

    const addCardTour = () => {  //меняем стэйт по отображению модального окна
        console.log('окно?')
        dispatchForm({ type: 'update_modal', payload: true })

    }
    const changeStateReservour = (index: number | null, e: string | null) => {
        dispatch({ type: 'update_reservours', payload: { index: index, text: e } })

    }
    const menuItems = [
        { label: 'Турниры', icon: <GiTrophy className="class_icon icon_button" />, component: <Tournaments />, key: 'tournaments' },
        { label: 'Статистика', icon: <FaChartGantt className="class_icon icon_button" />, component: <Statistics />, key: 'stata' },
        { label: 'Водоёмы', icon: <FaWater className="class_icon icon_button" />, component: <Reservoors changeStateReservour={changeStateReservour} />, key: 'reservoors' },
        { label: 'Журнал', icon: <FaBookOpen className="class_icon icon_button" />, component: <HistoryLogs />, key: 'history' }

    ]

    return (
        <div className="Left_frame">
            <RenderHeaderLeft changeStateReservour={changeStateReservour} />
            <div className="wrapper">
                <div className="wrapper_navi">
                    {menuItems.map(e =>
                        <React.Fragment key={e.key}>
                            <div className="btn" onClick={() => handleButtonClick(e.key)}>
                                {e.icon}
                                <span className="title_name">{e.label}</span>
                                {e.key === 'tournaments' && <IoMdAddCircle className="create_btn_tour" onClick={addCardTour} />}
                                {getIconsArrow(e.key)}
                            </div>
                            {e.key === subMenu && e.component}
                        </React.Fragment>
                    )}

                </div>
            </div>
        </div >
    )
}

export default LeftFrame