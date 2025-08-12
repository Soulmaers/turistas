
import '../styles/HistoryList.css'
import { RootState, set_stateModalWindow, set_catch, set_deleteIdCatch, ExtendedBigFish } from '../../../../GlobalStor';
import { useSelector, useDispatch } from 'react-redux';
import { formatUnixTime } from '../servises'
import { FaTimes } from "react-icons/fa";
import { Tournament } from '../../../../GlobalStor'
import { useEffect, useState } from 'react';
import { useGetImages } from '../../tabletours/hooks/getImages'

export const HistoryList: React.FC<{ data: Tournament[] }> = ({ data }) => {
    const { getImage } = useGetImages()
    const [rows, setRows] = useState<JSX.Element[]>([]);
    const [admin, set_admin] = useState<boolean>(false)
    const dispatch = useDispatch()
    const catchsList = useSelector((state: RootState) => state.slice.catchsList);
    const idClickTour = useSelector((state: RootState) => state.slice.idClickTour)
    const celevoys = data.find(e => e.id === idClickTour)
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const userID = userStatus?.user?.id
    const created = userStatus.tournament.find(e => e.id === idClickTour)
    console.log(catchsList)




    const handler = (catchItem: ExtendedBigFish) => {
        console.log(userID, catchItem.idUser, created?.created_by)
        if (userID !== catchItem.idUser && userID !== created?.created_by) return
        dispatch(set_stateModalWindow({ type: 'deleteForm', status: true }))
        dispatch(set_deleteIdCatch(catchItem))
    }

    const editHandler = (e: ExtendedBigFish) => {
        console.log(e)
        dispatch(set_stateModalWindow({ type: 'catchForm', status: true }))

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
        console.log('тут ведь');
        const fetchRows = async () => {
            const newRows = await Promise.all(
                catchsList.map(async (e) => {
                    const time = formatUnixTime(Number(e.data));
                    let imageUrl = 'Без фото';

                    if (e.urlFoto) {
                        try {
                            // Получение изображения с кэшированием внутри хука
                            imageUrl = await getImage(e.urlFoto);
                        } catch (error) {
                            console.error(`Ошибка загрузки изображения ${e.urlFoto}`, error);
                        }
                    }

                    const admin = userID === e.idUser || created?.created_by === userID

                    return (
                        <tr className='rows_list_catch' key={e.data}>
                            <td className="row_history_catch">{e.name_user}</td>
                            <td className="row_history_catch">{e.name_fish}</td>
                            <td className="row_history_catch">{e.name_type}</td>
                            <td className="row_history_catch">{e.weight}</td>
                            <td className='row_history_catch edit' onClick={() => editHandler(e)}>{time}</td>
                            <td
                                className='row_history_catch icon_fish_foto'
                                style={{
                                    backgroundImage: imageUrl !== 'Без фото' ? `url(${imageUrl})` : undefined,
                                }}
                            ></td>
                            <td className='row_history_catch delete_catch' onClick={() => handler(e)}>{admin && <FaTimes className='icon_del' />}</td>
                        </tr>
                    );
                })
            );
            setRows(newRows);
        };

        fetchRows();
    }, [catchsList]);

    console.log(rows)
    return <div className="card_list_history">
        <div className='header_tournament_table'>
            <div className="name">{celevoys?.name}</div>
        </div>
        <div className="container_table_history">
            {rows.length !== 0 ? <table className='styled_table'>
                <thead><tr className="history_header">
                    <th className="header_history_catch">Участник</th>
                    <th className="header_history_catch">Вид рыбы</th>
                    <th className="header_history_catch">Тип ловли</th>
                    <th className="header_history_catch">Вес</th>
                    <th className="header_history_catch">Время</th>
                    <th className="header_history_catch">Фото</th>
                    <th className="header_history_catch">Удалить</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table> : <div className="container_load">
                <div className="loader_global"></div>
                <span className="span_dicription">ЗАГРУЗКА ...</span>
            </div>}
        </div>

    </div>
}