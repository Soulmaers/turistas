import React from 'react'
import ViewUserBigFish from './ViewUserBigFish'
import { reglament } from '../stor'
import '../styles/AddCarTournament.css'
const AddCarTournament = () => {


    const rows = reglament.map((e, index) => <li key={e + index} className="rows_reg">{e}</li>)
    return (<div className="card_tournament">
        <div className="name">Рыболовный турнир сезон 2024<span className="status">(Завершен)</span></div>
        <div className="body_table">
            <div className="table_tournament"></div>
            <ViewUserBigFish />
        </div>
        <div className="footer_tour">
            <div className="name_reg">Регламент</div>
            {rows}</div>
    </div>)
}


export default AddCarTournament