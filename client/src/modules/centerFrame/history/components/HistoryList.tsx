
import '../styles/HistoryList.css'
import { RootState, set_deleteForm, add_catch, set_catch, set_deleteIdCatch, ExtendedBigFish } from '../../../../GlobalStor';
import { useSelector, useDispatch } from 'react-redux';
import { formatUnixTime } from '../servises'
import { FaTimes } from "react-icons/fa";
import { Tournament } from '../../../form/components/Interface'
import { useEffect, useState } from 'react';
import { useGetImages } from '../../tabletours/hooks/getImages'

export const HistoryList: React.FC<{ data: Tournament[] }> = ({ data }) => {
    const { getImage } = useGetImages()
    const [rows, setRows] = useState<JSX.Element[]>([]);
    const dispatch = useDispatch()
    const catchsList = useSelector((state: RootState) => state.slice.catchsList);
    const idClickTour = useSelector((state: RootState) => state.slice.idClickTour)
    const celevoys = data.find(e => e.id === idClickTour)
    console.log(catchsList)


    const handler = (catchItem: ExtendedBigFish) => {
        dispatch(set_deleteForm(true))
        dispatch(set_deleteIdCatch(catchItem))
    }

    const editHandler = (e: ExtendedBigFish) => {
        console.log(e)
        dispatch(add_catch(true))

        dispatch(set_catch({
            name_user: e.name_user,
            name_fish: e.name_fish,
            name_reservour: e.name_reservour,
            name_type: e.name_type,
            name_bait: e.name_bait,
            name_day: e.name_day,
            weight: e.weight,
            foto_user: e.foto_user,
            data: e.data,
            comment: e.comment,
            urlFoto: e.urlFoto,
            idUser: e.idUser,
            idTournament: e.idTournament,
            idCatch: e.idCatch,
            id_baits: e.id_baits,
            id_fish: e.id_fish,
            id_reservour: e.id_reservour,
            id_timeday: e.id_timeday,
            id_type: e.id_type
        }))
    }
    useEffect(() => {
        console.log('тут ведь')
        const fetchRows = async () => {
            const newRows = await Promise.all(
                catchsList.map(async e => {
                    const time = formatUnixTime(Number(e.data));
                    let imageUrl = e.urlFoto ? await getImage(e.urlFoto) : 'Без фото';
                    return (
                        <tr className='rows_list_catch' key={e.data}>
                            <td>{e.name_user}</td>
                            <td>{e.name_reservour}</td>
                            <td>{e.name_fish}</td>
                            <td>{e.name_day}</td>
                            <td>{e.name_type}</td>
                            <td>{e.name_bait}</td>
                            <td>{e.weight}</td>
                            <td className='edit' onClick={() => editHandler(e)}>{time}</td>
                            <td className='icon_fish_foto' style={{
                                backgroundImage: `url(${imageUrl})`,
                            }}></td>
                            <td className='delete_catch' onClick={() => handler(e)}><FaTimes className='icon_del' /></td>
                        </tr>
                    );
                })
            );
            setRows(newRows); // Обновляем состояние с полученными строками
        };

        fetchRows(); // Вызовем асинхронную функцию
    }, [catchsList]); // Зависимость по catchsList

    console.log(rows)
    return <div className="card_list_history">
        <div className='header_tournament_table'>
            <div className="name">{celevoys?.name}</div>
        </div>
        <div className="container_table_history">
            {rows.length !== 0 ? <table className='styled_table'>
                <thead><tr className="history_header">
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
            </table> : <div className="load">Загрузка журнала...</div>}
        </div>

    </div>
}