import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set_tour, set_stateModalWindow, RootState } from '../../../../../../GlobalStor';
import { ElementNavi } from './ElementNavi';
import { Tournament } from '../../../../../../GlobalStor';

export const CardNaviTours = () => {
    const dispatch = useDispatch();
    const [activeType, setActiveType] = useState<number | null>(null);

    const tournaments = useSelector((state: RootState) => state.slice.userStatus?.tournament || []);

    const groupedTours: Record<number, Tournament[]> = {
        1: tournaments.filter(e => e.status === 1), // АКТИВНЫЕ
        0: tournaments.filter(e => e.status === 0), // ЗАПЛАНИРОВАННЫЕ
        2: tournaments.filter(e => e.status === 2), // ЗАВЕРШЁННЫЕ
    };

    const tourLabels: Record<number, string> = {
        1: 'АКТИВНЫЕ',
        0: 'ЗАПЛАНИРОВАННЫЕ',
        2: 'ЗАВЕРШЁННЫЕ',
    };

    useEffect(() => {
        for (const status of [1, 0, 2]) {
            if (groupedTours[status]?.length) {
                setActiveType(status);
                break;
            }
        }
    }, [tournaments]);

    const handleAddTour = () => {
        dispatch(set_tour({
            id: null,
            nameTour: '',
            dateStart: '',
            dateFinish: '',
            users: []
        }))
        dispatch(set_stateModalWindow({ type: 'add_tour', status: true }))
    };

    return (
        <div className="card_tours">
            <div className="title_card_count">
                ТУРНИРЫ
                <span className="icon_add_content" onClick={handleAddTour}></span>
            </div>

            {[1, 0, 2].map(status => (
                <ElementNavi
                    key={status}
                    tours={groupedTours[status]}
                    nameType={tourLabels[status]}
                    status={status}
                    isActive={activeType === status}
                    onActivate={() => setActiveType(activeType === status ? null : status)}
                />
            ))}
        </div>
    );
};