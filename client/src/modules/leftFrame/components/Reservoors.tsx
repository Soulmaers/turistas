import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../GlobalStor'
import '../styles/Reservoors.css'

interface ChangeProps {
    changeStateReservour: (index: number, e: string) => void
}
const Reservoors: React.FC<ChangeProps> = ({ changeStateReservour }) => {
    const dataContent = useSelector((state: RootState) => state.slice.dataContent)
    const rows = dataContent.reservours?.map((e, index) => <div key={index} className="reservour" onClick={() => changeStateReservour(index, e.name)}>{e.name}</div>)

    return (
        <div className="container_reservoors">
            {rows}
        </div>
    )
}

export default Reservoors