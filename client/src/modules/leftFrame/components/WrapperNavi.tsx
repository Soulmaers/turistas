
import HistoryLogs from '../../modalComponents/components/HistoryLogs'
import React from 'react'
import { useState, useEffect } from 'react'

import { GiTrophy } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp, IoMdAddCircle } from "react-icons/io"
import { FaChartGantt } from "react-icons/fa6"
import { FaWater, FaBookOpen } from "react-icons/fa"

import Tournaments from '../../modalComponents/components/Tournamets'
import Statistics from './Statistics'
import Reservoors from '../../modalComponents/components/Reservoors'
import { useDispatch, useSelector } from 'react-redux';
import { set_stateBody, set_stateModalWindow, RootState } from '../../../GlobalStor';

export const WrapperNavi = () => {
    const dispatch = useDispatch()
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const handleButtonClick = (selectSubMenu: string) => { //Клик открывает подменю

        if (userStatus.tournament.length === 0) return
        dispatch(set_stateModalWindow({ type: selectSubMenu, status: true }))
        if (selectSubMenu === 'stata') dispatch(set_stateBody(selectSubMenu))
    }



    const menuItems = [
        {
            label: 'ТУРНИРЫ', icon: <GiTrophy className="class_icon icon_button" />,
            component: <Tournaments />, key: 'tournaments'
        },
        { label: 'СТАТИСТИКА', icon: <FaChartGantt className="class_icon icon_button" />, component: <Statistics />, key: 'stata' },
        { label: 'ВОДОЁМЫ', icon: <FaWater className="class_icon icon_button" />, component: <Reservoors />, key: 'reservoors' },
        { label: 'ЖУРНАЛ', icon: <FaBookOpen className="class_icon icon_button" />, component: <HistoryLogs />, key: 'history' }

    ]

    return (
        <div className="wrapper">
            <div className="wrapper_navi">
                {menuItems.map(e =>
                    <div className="component_contents" key={e.key}>
                        <div className="btn" onClick={() => handleButtonClick(e.key)}>
                            <span className="title_name">{e.label}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

