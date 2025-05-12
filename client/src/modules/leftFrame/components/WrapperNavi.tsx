
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
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const handleButtonClick = (selectSubMenu: string) => { //Клик открывает подменю

        if (userStatus.tournament.length === 0) return
        console.log('клик журнал')
        dispatch(set_subMenu(subMenu === selectSubMenu ? null : selectSubMenu))
        if (selectSubMenu === 'stata') dispatch(set_historyWiew(selectSubMenu))
    }
    const getIconsArrow = (selectSubMenu: string) => { //Меняем иконку стрелки
        return subMenu === selectSubMenu ? <IoIosArrowUp className="class_icon" /> : < IoIosArrowDown className="class_icon" />
    }


    const menuItems = [
        { label: 'ТУРНИРЫ', icon: <GiTrophy className="class_icon icon_button" />, component: <Tournaments />, key: 'tournaments' },
        { label: 'СТАТИСТИКА', icon: <FaChartGantt className="class_icon icon_button" />, component: <Statistics />, key: 'stata' },
        { label: 'ВОДОЁМЫ', icon: <FaWater className="class_icon icon_button" />, component: <Reservoors />, key: 'reservoors' },
        { label: 'ЖУРНАЛ', icon: <FaBookOpen className="class_icon icon_button" />, component: <HistoryLogs />, key: 'history' }

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
                            {getIconsArrow(e.key)}
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

/* {e.key === 'tournaments' && <IoMdAddCircle className="create_btn_tour" onClick={addCardTour} />}*/