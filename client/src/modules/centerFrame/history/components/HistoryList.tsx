
import '../styles/HistoryList.css'
import { RootState, set_stateModalWindow, set_catch, set_deleteIdCatch, ExtendedBigFish } from '../../../../GlobalStor';
import { useSelector, useDispatch } from 'react-redux';
import { formatUnixTime } from '../servises'
import { FaTimes } from "react-icons/fa";
import { Tournament } from '../../../../GlobalStor'
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useGetImages } from '../../tabletours/hooks/getImages'
import { HistoryRow } from './HistoryRow'


export const HistoryList: React.FC<{ data: Tournament[] }> = ({ data }) => {
    const dispatch = useDispatch();
    const catchsList = useSelector((state: RootState) => state.slice.catchsList);
    const idClickTour = useSelector((state: RootState) => state.slice.idClickTour);
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const userID = userStatus?.user?.id;
    const celevoys = useMemo(() => data.find(e => e.id === idClickTour), [data, idClickTour]);
    const created = useMemo(() => userStatus.tournament.find(e => e.id === idClickTour), [userStatus.tournament, idClickTour]);

    const canManage = useCallback(
        (item: ExtendedBigFish) => userID === item.idUser || created?.created_by === userID,
        [userID, created?.created_by]
    );

    const onDelete = useCallback((catchItem: ExtendedBigFish) => {
        if (!canManage(catchItem)) return;
        dispatch(set_stateModalWindow({ type: 'deleteForm', status: true }));
        dispatch(set_deleteIdCatch(catchItem));
    }, [dispatch, canManage]);

    const onEdit = useCallback((e: ExtendedBigFish) => {
        dispatch(set_stateModalWindow({ type: 'catchForm', status: true }));
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
        }));
    }, [dispatch]);

    const hasRows = catchsList.length > 0;

    return (
        <div className="card_list_history">
            <div className='header_tournament_table'>
                <div className="name">{celevoys?.name}</div>
            </div>

            <div className="container_table_history">
                {hasRows ? (
                    <table className='styled_table'>
                        <thead>
                            <tr className="history_header">
                                <th className="header_history_catch">Участник</th>
                                <th className="header_history_catch">Вид рыбы</th>
                                <th className="header_history_catch">Тип ловли</th>
                                <th className="header_history_catch">Вес</th>
                                <th className="header_history_catch">Время</th>
                                <th className="header_history_catch">Фото</th>
                                <th className="header_history_catch">Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                            {catchsList.map(item => (
                                <HistoryRow
                                    key={item.idCatch}               // стабильный ключ
                                    item={item}
                                    canManage={canManage(item)}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="container_load">
                        <div className="loader_global"></div>
                        <span className="span_dicription">ЗАГРУЗКА ...</span>
                    </div>
                )}
            </div>
        </div>
    );
};
