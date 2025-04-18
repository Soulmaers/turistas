import { useSelector, useDispatch } from 'react-redux'
import { RootState, set_catchs, set_bigfish } from '../../../../GlobalStor'
import React, { useEffect } from 'react'
import { useGetCatchs } from '../hooks/getCatchs'
import '../styles/TableTournaments.css'


interface TableTournamentProps {
    idTour: number; // Или другой подходящий тип, например, number
}

const TableTournament: React.FC<TableTournamentProps> = ({ idTour }) => {
    const { getCatchs } = useGetCatchs()
    const catchs = useSelector((state: RootState) => state.slice.catchs)
    const actionCatch = useSelector((state: RootState) => state.slice.actionCatch)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            console.log(idTour)
            const data = await getCatchs(idTour);
            console.log(data)
            dispatch(set_catchs((data.data)))
            dispatch(set_bigfish(data.bigFish))
        };
        fetchData();
    }, [idTour, actionCatch])

    const rows = catchs.map(e => {
        return <tr key={e.name_user}>
            <td>{e.name_user}</td>
            <td>{e['Лещ']}</td>
            <td>{e['Щука']}</td>
            <td>{e['Судак']}</td>
            <td>{e['Окунь']}</td>
            <td>{e['Форель']}</td>
            <td>{e['Другое']}</td>
            <td>{e['Всего']}</td>
        </tr>
    })

    return (
        <div className="container_table">
            <table className='styled_table'>
                <thead><tr>
                    <th>Участики</th>
                    <th>Лещ</th>
                    <th>Щука</th>
                    <th>Судак</th>
                    <th>Окунь</th>
                    <th>Форель</th>
                    <th>Другое</th>
                    <th>Всего</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    )
}

export default TableTournament