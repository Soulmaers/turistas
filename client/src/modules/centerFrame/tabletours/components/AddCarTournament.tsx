import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, click_tour } from '../../../../GlobalStor'
import ViewUserBigFish from './ViewUserBigFish'
import TimeDisplay from './TimeDisplay'
import TableTournament from './TableToutnaments'
import { AddCatch } from './AddCatch'

import { reglament } from '../stor'
import '../styles/AddCarTournament.css'

import { Tournament } from '../../../form/components/Interface'


const AddCarTournament: React.FC<{ data: Tournament[] }> = ({ data }) => {
    const dispatch = useDispatch()

    const idClickTour = useSelector((state: RootState) => state.slice.idClickTour)
    useEffect(() => {
        if (!idClickTour) {
            dispatch(click_tour(data[data.length - 1].id))
        }
    }, [])
    const celevoys = data.find(e => e.id === idClickTour)
    const celevoy = celevoys ? celevoys : data[data.length - 1]
    const { name, dateStart, dateFinish, status } = celevoy
    const rows = reglament.map((e, index) => <li key={e + index} className="rows_reg">{e}</li>)
    return (<div className="card_tournament">
        <div className='header_tournament_table'>
            <div className="name">{name}{status !== null ? <TimeDisplay status={Number(status)} dateStart={dateStart} dateFinish={dateFinish} /> : <div className=''>Нет созданных турниров</div>}</div>
            {Number(status) === 1 && <AddCatch />}</div>
        <div className="body_table">
            <div className="table_tournament">
                {status ? <TableTournament idTour={celevoy.id} /> : <div className='questions'></div>}
            </div>
            <ViewUserBigFish />
        </div>
        <div className="footer_tour">
            <div className="name_reg">Регламент</div>
            {status ? rows : ''}</div>
    </div>)
}


export default AddCarTournament