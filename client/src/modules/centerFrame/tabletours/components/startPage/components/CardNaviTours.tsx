import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set_tourEvent, set_stateCardTour, set_stateModalWindow, RootState } from '../../../../../../GlobalStor';
import { ElementNavi } from './ElementNavi';
import { Tournament } from '../../../../../../GlobalStor';

export const CardNaviToursComponent = () => {
    const dispatch = useDispatch();
    const [activeType, setActiveType] = useState<number | null>(null);

    const tournaments = useSelector((state: RootState) => state.slice.userStatus?.tournament || []);
    console.log(tournaments)
    const groupedTours: Record<number, Tournament[]> = {
        1: tournaments.filter(e => e.status === 1), // АКТИВНЫЕ
        0: tournaments.filter(e => e.status === 0), // ЗАПЛАНИРОВАННЫЕ
        2: tournaments.filter(e => e.status === 2), // ЗАВЕРШЁННЫЕ
    };

    const tourLabels: Record<number, string> = {
        1: 'АКТИВНЫЕ',
        0: 'ЗАПЛАНИРОВАННЫЕ',
        2: 'ЗАВЕРШЁННЫЕ'
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
        dispatch(set_tourEvent({
            status: null,
            id: null,
            name: '',
            criVictory: { id: 1, name: 'Вес максимальный' },
            dopsub: null,
            fotoAll: false,
            fotoLider: false,
            timeTour: [],
            fishers: [],
            fishs: [],
            reservours: [],
            typeCatch: [],
            typeBaits: [],
            creater_by: null,
            dateStart: '',
            dateFinish: '',
            link: null
        }))
        dispatch(set_stateCardTour({
            fish: false,
            reservours: false,
            typeCatch: false,
            typeBaits: false
        }))
        dispatch(set_stateModalWindow({ type: 'add_tour', status: true }))
    };

    return (
        <div className="card_tours">
            <div className="title_card_count">
                ТУРНИРЫ
                <span className="icon_add_content" onClick={handleAddTour}></span>
            </div>

            {[1, 0, 2].map((status, index) => (
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

export const CardNaviTours = React.memo(CardNaviToursComponent);