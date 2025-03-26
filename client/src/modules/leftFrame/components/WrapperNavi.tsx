
import HistoryLogs from './HistoryLogs'
import React from 'react'
import { useState, useEffect } from 'react'

import { GiTrophy } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp, IoMdAddCircle } from "react-icons/io"
import { FaChartGantt } from "react-icons/fa6"
import { FaWater, FaBookOpen } from "react-icons/fa"

import Tournaments from './Tournamets'
import Statistics from './Statistics'
import Reservoors from './Reservoors'
import { useDispatch, useSelector } from 'react-redux';
import { update_modal, set_subMenu, set_historyWiew, RootState } from '../../../GlobalStor';

export const WrapperNavi = () => {
    const dispatch = useDispatch()
    const subMenu = useSelector((state: RootState) => state.slice.subMenu);

    const handleButtonClick = (selectSubMenu: string) => { //Клик открывает подменю
        dispatch(set_subMenu(subMenu === selectSubMenu ? null : selectSubMenu))
        console.log(selectSubMenu)
        if (selectSubMenu === 'stata') dispatch(set_historyWiew(selectSubMenu))
    }
    const getIconsArrow = (selectSubMenu: string) => { //Меняем иконку стрелки
        return subMenu === selectSubMenu ? <IoIosArrowUp className="class_icon" /> : < IoIosArrowDown className="class_icon" />
    }

    const addCardTour = () => {  //меняем стэйт по отображению модального окна
        console.log('окно?')
        dispatch(update_modal(true))
    }

    const menuItems = [
        { label: 'Турниры', icon: <GiTrophy className="class_icon icon_button" />, component: <Tournaments />, key: 'tournaments' },
        { label: 'Статистика', icon: <FaChartGantt className="class_icon icon_button" />, component: <Statistics />, key: 'stata' },
        { label: 'Водоёмы', icon: <FaWater className="class_icon icon_button" />, component: <Reservoors />, key: 'reservoors' },
        { label: 'Журнал', icon: <FaBookOpen className="class_icon icon_button" />, component: <HistoryLogs />, key: 'history' }

    ]

    return (
        <div className="wrapper">


            <div className="wrapper_navi">
                {menuItems.map(e =>
                    <div className="component_contents" key={e.key}>
                        {e.key === subMenu && e.component}
                        <div className="btn" onClick={() => handleButtonClick(e.key)}>
                            {e.icon}
                            <span className="title_name">{e.label}</span>
                            {e.key === 'tournaments' && <IoMdAddCircle className="create_btn_tour" onClick={addCardTour} />}
                            {getIconsArrow(e.key)}
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}