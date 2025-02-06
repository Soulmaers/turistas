import React, { useContext, useRef } from 'react'
import ViewUserBigFish from './ViewUserBigFish'
import TimeDisplay from './TimeDisplay'
import TableTournament from './TableToutnaments'
import { AddCatch } from './AddCatch'
import { ContextActiv } from '../../../servises/contexs/contextActivId'
import { reglament } from '../stor'
import '../styles/AddCarTournament.css'

import { Tournament } from '../../../form/components/Interface'


const AddCarTournament: React.FC<{ data: Tournament[] }> = ({ data }) => {

    const { idClickTour } = useContext(ContextActiv)

    const celevoys = data.find(e => e.id === idClickTour)
    const celevoy = celevoys ? celevoys : data[data.length - 1]
    const { name, dateStart, dateFinish, status, big_fish } = celevoy

    const rows = reglament.map((e, index) => <li key={e + index} className="rows_reg">{e}</li>)
    return (<div className="card_tournament">
        <div className='header_tournament_table'>
            <div className="name">{name}<TimeDisplay status={Number(status)} dateStart={dateStart} dateFinish={dateFinish} /></div>
            {Number(status) === 1 && <AddCatch />}</div>
        <div className="body_table">
            <div className="table_tournament">
                {status ? <TableTournament /> : <div className='questions'></div>}
            </div>
            <ViewUserBigFish bigFish={big_fish} />
        </div>
        <div className="footer_tour">
            <div className="name_reg">Регламент</div>
            {rows}</div>
    </div>)
}


export default AddCarTournament