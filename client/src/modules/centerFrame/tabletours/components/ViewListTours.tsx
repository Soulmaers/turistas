
import { Tournament } from '../../../form/components/Interface'
import '../styles/ViewListTour.css'



export const ViewListTours: React.FC<{ data: Tournament[], title: string }> = ({ data, title }) => {

    console.log(data)
    console.log(title)

    const rows = data.map((e, index) => {
        return <tr key={e.name}>
            <td>{index + 1}</td>
            <td>{e.name}</td>
            <td>{e.dateStart}</td>
            <td>{e.dateFinish}</td>
        </tr>
    })

    return (<div className='container_tour_table'>
        <div className='title_tour_table'>{title}</div>
        <div className='body_tour_table'>
            <table className='styled_table'>
                <thead><tr>
                    <th>№</th>
                    <th>НАЗВАНИЕ</th>
                    <th>НАЧАЛО</th>
                    <th>КОНЕЦ</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>


    </div>


    )
}