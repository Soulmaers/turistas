import React from 'react'

import '../styles/Statistics.css'
import { useSelector, useDispatch } from 'react-redux';

import { set_historyWiew, click_tour, RootState } from '../../../GlobalStor';


const Statistics = () => {
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const userID = userStatus?.user?.id


    const sotUser = [
        'Леха',
        'Антон',
        'Шурик',
        'Ден'
    ]

    const reservoirs = [
        'Финский залив (Соколинское)',
        'река Волхов (Ленинградская область)',
        'Ладожское озеро (Креницы)',
        'Ладожское озеро (Шхеры)',
        'река Ловать (Новгородская область)'
    ];

    console.log(userStatus.tournament)
    const tournaments = userStatus.tournament.map((e, index) => <div key={index} className="checkbox_item rows_list object_list">
        <input className="object_checks" type="checkbox" id={e.name + index} />
        <label className="label_check" htmlFor={e.name + index}>{e.name}</label>
    </div>
    )
    console.log(tournaments)

    const rowsUser = sotUser.map((e, index) => <div key={index} className="checkbox_item rows_list object_list">
        <input className="object_checks" type="checkbox" id={e + index} />
        <label className="label_check" htmlFor={e + index}>{e}</label>
    </div>)

    const rowsReservours = reservoirs.map((e, index) => <div key={index} className="checkbox_item rows_list object_list">
        <input className="object_checks" type="checkbox" id={e + index} />
        <label className="label_check" htmlFor={e + index}>{e}</label>
    </div>)


    return (<div className="container_statistics">
        <div className="stat_name">Турниры</div>
        {tournaments}
        <div className="stat_name">Участники</div>
        {rowsUser}
        <div className="stat_name">Водоёмы</div>
        {rowsReservours}
    </div>)

}


export default Statistics