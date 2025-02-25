import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, set_historyWiew, updateReservours } from '../../../GlobalStor'
import '../styles/Reservoors.css'


const Reservoors = () => {
    const dataContent = useSelector((state: RootState) => state.slice.dataContent)

    const dispatch = useDispatch()
    const changeStateReservour = (index: number, e: string) => {
        dispatch(set_historyWiew('reservoors'))
        dispatch(updateReservours({ index: index, text: e }))
    }
    const rows = dataContent.reservours?.map((e, index) => <div key={index} className="reservour" onClick={() => changeStateReservour(index, e.name)}>{e.name}</div>)

    return (
        <div className="container_reservoors">
            {rows}
        </div>
    )
}

export default Reservoors