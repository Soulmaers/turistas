import React from 'react'
import '../styles/HistoryLogs.css'
import { useProcessList } from '../hooks/ProcessListCatch'
import { useSelector, useDispatch } from 'react-redux';

import { set_historyWiew, click_tour, RootState } from '../../../GlobalStor';

const HistoryLogs = () => {
    const { sortList } = useProcessList()
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const dispatch = useDispatch();
    console.log(userStatus)

    const handler = (id: number) => {
        sortList(id)
        dispatch(click_tour(id))
        dispatch(set_historyWiew('history'))
    }
    const tournaments = userStatus.tournament.map(e => <div key={e.id} className="tournament" onClick={() => handler(e.id)}>{e.name}</div>)
    return (
        <div className="container_tournaments">
            {tournaments}
        </div>


    )
}


export default HistoryLogs