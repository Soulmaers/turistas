import React from 'react'
import { useState, useEffect } from 'react'

import { GiTrophy } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp, IoMdAddCircle } from "react-icons/io"
import { FaChartGantt } from "react-icons/fa6"
import { FaWater, FaBookOpen } from "react-icons/fa"

import Tournaments from './Tournamets'
import Statistics from './Statistics'
import Reservoors from './Reservoors'
import RenderHeaderLeft from './HeadersLeft'
import RenderHeaderRight from './HeadersRight'
import { WrapperNavi } from './WrapperNavi'
import HistoryLogs from './HistoryLogs'

import { useDispatch, useSelector } from 'react-redux';
import { update_modal, set_subMenu, set_historyWiew, RootState } from '../../../GlobalStor';

import '../styles/LeftFrame.css'




const LeftFrame = () => {

    return (
        <div className="Left_frame">
            <HeaderMobile />
            <WrapperNavi />

        </div >
    )
}
export const HeaderMobile = () => {

    return (
        <div className="high_header">
            <RenderHeaderLeft />
            <RenderHeaderRight />
        </div>
    )
}




export default LeftFrame