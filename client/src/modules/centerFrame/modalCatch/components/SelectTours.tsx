import '../styles/SelectTours.css'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetSetTours } from '../hooks/getSetTours'
import { RootState, TourEvent, PropertyTour, Property, set_validTours, set_stateModalWindowTwo } from '../../../../GlobalStor'


export interface Catch {
    idCatch: null | number
    fishs: string | number;
    reservuors: string | number;
    typeFishing: string | number;
    baits: string | number;
    timeDay: string | number;
    weight: string;
    comment: string;
    idTour: number | null;
    idUser: number | undefined;
    urlFoto: string | null;
    image: File | null
}

export const SelectTours = ({ catchFish }: { catchFish: Catch }) => {
    const dispatch = useDispatch()
    const { getSet } = useGetSetTours()
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);
    const tournaments = useSelector((state: RootState) => state.slice.userStatus.tournament)
    const [toursActiveSet, setToursActiveSet] = useState<TourEvent[]>([tourEvent])

    useEffect(() => {
        const fetchSets = async () => {
            const activeIDs = tournaments.filter(e => e.status === 1).map(el => el.id);
            const sets = await Promise.all(activeIDs.map(id => getSet(id)));
            console.log(sets)
            setToursActiveSet(sets);
        };

        fetchSets();
    }, [])


    useEffect(() => {
        console.log(catchFish)

        const nothingSelected =
            Number(catchFish.fishs) === 0 ||
            Number(catchFish.reservuors) === 0 ||
            Number(catchFish.typeFishing) === 0 ||
            Number(catchFish.baits) === 0;

        let celevoys: PropertyTour[];

        console.log(nothingSelected)
        console.log(toursActiveSet)
        if (nothingSelected) {
            celevoys = toursActiveSet.flatMap(el => {
                console.log(el.id, tourEvent.id)
                if (el.id !== null && tourEvent.id) {
                    return el.id === tourEvent.id ? [{ id: el.id, name: el.name, flag: 1 }] :
                        [{ id: el.id, name: el.name, flag: 2 }];
                }
                else {
                    return []
                }
            })
        }
        else {
            celevoys = toursActiveSet.flatMap(el => {
                if (Number(catchFish.fishs) !== 0 && Number(catchFish.reservuors) !== 0 && Number(catchFish.typeFishing) !== 0 && Number(catchFish.baits) !== 0) {
                    const fish = el.fishs.length === 0 || el.fishs.some(e => e.id === Number(catchFish.fishs));
                    const reservuors = el.reservours.length === 0 || el.reservours.some(e => e.id === Number(catchFish.reservuors));
                    const typeFishing = el.typeCatch.length === 0 || el.typeCatch.some(e => e.id === Number(catchFish.typeFishing));
                    const baits = el.typeBaits.length === 0 || el.typeBaits.some(e => e.id === Number(catchFish.baits));
                    if (fish && reservuors && typeFishing && baits && el.id !== null) {
                        return [{ id: el.id, name: el.name, flag: 1 }];
                    } else {
                        return el.id ? [{ id: el.id, name: el.name, flag: 2 }] : [];
                    }
                }
                else {
                    return []
                }
            })
        }


        console.log(celevoys)
        dispatch(set_validTours(celevoys));
    }, [toursActiveSet, catchFish])

    const handler = () => {

        dispatch(set_stateModalWindowTwo({ type: 'cardSelected', status: true }))

    }
    return <div className="container_select_tours">
        <span className="tochkis"></span>
        <div className="btn_select_tour" onClick={handler}>ВЫБРАТЬ ТУРНИР ДЛЯ УЛОВА</div>
    </div>
}