import React, { useState, useEffect } from 'react'
import '../styles/HistoryLogs.css'
import { useProcessList } from '../hooks/ProcessListCatch'
import { useSelector, useDispatch } from 'react-redux';
import { useResizeWindow } from '../../servises/hooks/getDataContent'
import { set_historyWiew, click_tour, set_subMenu, RootState } from '../../../GlobalStor';
import Modal from '../../servises/components/Modal'
const HistoryLogs = () => {

    const { windowWidth } = useResizeWindow()
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const userID = userStatus?.user?.id
    const { sortList } = useProcessList(userID)
    const dispatch = useDispatch();

    const handler = (id: number, creater: number) => {
        sortList(id, creater)
        dispatch(click_tour(id))
        dispatch(set_historyWiew('history'))
        if (windowWidth < 440) dispatch(set_subMenu(null))
    }
    const tournaments = userStatus.tournament.map(e => <div key={e.id} className="tournament" onClick={() => handler(e.id, e.created_by)}>{e.name}</div>)
    return (
        windowWidth < 440 ?
            <Modal style={{ top: '50%' }} onClose={() => dispatch(set_subMenu(null))}><div className="container_history">
                {tournaments}
            </div></Modal> :
            <div className="container_history">
                {tournaments}
            </div>
    )
}


export default HistoryLogs