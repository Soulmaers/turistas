import React from 'react'

import '../styles/Statistics.css'

const Statistics = () => {

    const sotTour = [
        'Рыболовный турнир сезон 2024',
        'Рыболовный турнир сезон 2023',
        'Рыболовный турнир сезон 2022',
        'Рыболовный турнир сезон 2021'
    ]

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


    const rowsTour = sotTour.map((e, index) => <div key={index} className="checkbox_item rows_list object_list">
        <input className="object_checks" type="checkbox" id={e + index} />
        <label className="label_check" htmlFor={e + index}>{e}</label>
    </div>)

    const rowsUser = sotUser.map((e, index) => <div key={index} className="checkbox_item rows_list object_list">
        <input className="object_checks" type="checkbox" id={e + index} />
        <label className="label_check" htmlFor={e + index}>{e}</label>
    </div>)

    const rowsReservours = reservoirs.map((e, index) => <div key={index} className="checkbox_item rows_list object_list">
        <input className="object_checks" type="checkbox" id={e + index} />
        <label className="label_check" htmlFor={e + index}>{e}</label>
    </div>)


    return (
        <div className="container_statistics">
            <div className="stat_name">Турниры</div>
            {rowsTour}
            <div className="stat_name">Участники</div>
            {rowsUser}
            <div className="stat_name">Водоёмы</div>
            {rowsReservours}

        </div>


    )
}


export default Statistics