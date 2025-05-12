
import { RootState } from "../../../../GlobalStor";
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import '../styles/StatisticCard.css'


export const StatisticCard = () => {
    const staticData = useSelector((state: RootState) => state.slice.staticData);
    useEffect(() => {

    }, [staticData])

    console.log(staticData)
    const rows = staticData.map(e => {
        return <tr key={e.name_user}>
            <td>{e.name_user}</td>
            <td>{e['Лещ']}</td>
            <td>{e['Щука']}</td>
            <td>{e['Судак']}</td>
            <td>{e['Окунь']}</td>
            <td>{e['Форель']}</td>
            <td>{e['Всего']}</td>
        </tr>
    })

    return (<div className="card_tournament">
        <div className='header_tournament_table'>
            <div className="name">Статистика</div>
        </div>

        <div className="body_table">
            <div className="table_tournament table_tournament_stata">
                <div className="container_table">
                    <table className='styled_table'>
                        <thead><tr>
                            <th>Участики</th>
                            <th>Лещ</th>
                            <th>Щука</th>
                            <th>Судак</th>
                            <th>Окунь</th>
                            <th>Форель</th>
                            <th>Всего</th>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>)
}