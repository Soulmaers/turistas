import React from 'react'

import '../styles/Reservoors.css'

interface ChangeProps {
    changeStateReservour: (index: number, e: string) => void
}
const Reservoors: React.FC<ChangeProps> = ({ changeStateReservour }) => {
    const reservoirs = [
        'Финский залив (Соколинское)',
        'река Волхов (Ленинградская область)',
        'Ладожское озеро (Креницы)',
        'Ладожское озеро (Шхеры)',
        'река Ловать (Новгородская область)'
    ];
    const rows = reservoirs.map((e, index) => <div key={index} className="reservour" onClick={() => changeStateReservour(index, e)}>{e}</div>)


    return (
        <div className="container_reservoors">
            {rows}
        </div>


    )
}


export default Reservoors