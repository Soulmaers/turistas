
import '../styles/HistoryList.css'
import { RootState } from '../../../../GlobalStor';
import { useSelector } from 'react-redux';
import { formatUnixTime } from '../servises'
import { FaTimes } from "react-icons/fa";
import { Tournament } from '../../../form/components/Interface'


export const HistoryList: React.FC<{ data: Tournament[] }> = ({ data }) => {
    const catchsList = useSelector((state: RootState) => state.slice.catchsList);
    const idClickTour = useSelector((state: RootState) => state.slice.idClickTour)
    const celevoys = data.find(e => e.id === idClickTour)
    const rows = catchsList.map(e => {
        const time = formatUnixTime(Number(e.data))
        let imageUrl = e.urlFoto ? require(`../../../../../public/images/${e.urlFoto}`) : 'Без фото'
        return <tr className='rows_list_catch' key={e.data}>
            <td>{e.name_user}</td>
            <td>{e.name_reservour}</td>
            <td>{e.name_fish}</td>
            <td>{e.name_day}</td>
            <td>{e.name_type}</td>
            <td>{e.name_bait}</td>
            <td>{e.weight}</td>
            <td>{time}</td>
            <td className='icon_fish_foto' style={{
                backgroundImage: `url(${imageUrl})`,
            }}></td>
            <td className='delete_catch' ><FaTimes className='icon_del' /></td>
        </tr>
    })

    return <div className="card_list_history">
        <div className='header_tournament_table'>
            <div className="name">{celevoys?.name}</div>
        </div>
        <div className="container_table_history">
            <table className='styled_table'>
                <thead><tr>
                    <th>Участник</th>
                    <th>Водоём</th>
                    <th>Вид рыбы</th>
                    <th>Время суток</th>
                    <th>Тип ловли</th>
                    <th>Приманка</th>
                    <th>Вес</th>
                    <th>Время</th>
                    <th>Фото</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>

    </div>
}