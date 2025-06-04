import React, { useState, useEffect } from 'react'
import '../styles/HistoryLogs.css'
import { useProcessList } from '../../leftFrame/hooks/ProcessListCatch'
import { useSelector, useDispatch } from 'react-redux';
import { set_stateModalWindow, set_stateBody, click_tour, RootState } from '../../../GlobalStor';


const HistoryLogs = () => {

    const stateModalWindow = useSelector((state: RootState) => state.slice.stateModalWindow);
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const userID = userStatus?.user?.id
    const { sortList } = useProcessList(userID)
    const dispatch = useDispatch();

    const checkInternetConnection = () => {
        console.log(navigator)
        console.log(navigator.onLine)
        if (!navigator.onLine) {
            alert("Слабый интернет или проверьте соединение");
            return false; // Нет подключения
        }
        return true; // Подключение есть
    };

    const handler = (id: number, creater: number) => {
        if (!checkInternetConnection()) {
            return; // Прекращаем выполнение, если нет соединения
        }
        sortList(id, creater)
        dispatch(click_tour(id))
        dispatch(set_stateModalWindow({ ...stateModalWindow, status: false }))
        dispatch(set_stateBody('history'))

    }
    const tournaments = userStatus.tournament.map(e => <div key={e.id} className="tournament" onClick={() => handler(e.id, e.created_by)}>{e.name}</div>)
    return (<div className="container_history">{tournaments}</div>)




}


export default HistoryLogs