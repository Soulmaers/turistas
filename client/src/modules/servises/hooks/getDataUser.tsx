
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateStatusUser, setIntervalId, set_tour, RootState } from '../../../GlobalStor';

interface Tournament {
    status: number | undefined | null | string,
    big_fish: number | null,
    name: string,
    created_by: number,
    dateStart: string,
    dateFinish: string,
    id: number
}
interface User {
    user: {
        contactID: '',
        name_user: 'string',
        trophys: number,
        fishs: number,
        stars: number,
        id: number,
        state_card: string | null,
        idClick_tour: number | null
    } | null,
    tournament: Tournament[] | []

}

type UserResponce = User | null





export const useGetDataUser = () => {

    const dispatch = useDispatch()
    const tour = useSelector((state: RootState) => state.slice.tour)
    const userData = useSelector((state: RootState) => state.slice.userStatus)
    const intervalId = useSelector((state: RootState) => state.slice.intervalId)
    const userDataRef = useRef(userData)

    useEffect(() => {
        userDataRef.current = userData
    }, [userData])


    const updateIntervalStatus = () => {
        if (intervalId) return;

        const interval = setInterval(() => {
            const nowData = Math.floor(Date.now() / 1000);
            const currentData = userDataRef.current;

            // Проверяем, изменился ли статус хотя бы у одного турнира
            const updated = currentData.tournament?.map(t => {
                const newStatus = nowData > Number(t.dateFinish)
                    ? 2
                    : nowData > Number(t.dateStart)
                        ? 1
                        : t.status;

                // Если статус не изменился, возвращаем тот же объект
                if (newStatus === t.status) {
                    return t;
                }

                // Если статус изменился, создаем новый объект с обновленным статусом
                return { ...t, status: newStatus };
            });

            // Проверяем, изменился ли хотя бы один турнир
            const hasChanges = updated.some((t, index) => t.status !== currentData.tournament[index].status);

            if (hasChanges) {
                // Обновляем состояние только если есть изменения
                dispatch(updateStatusUser({ ...currentData, tournament: updated }));
            }
        }, 1000);

        dispatch(setIntervalId(interval));
    };

    async function getDataUser(contactID: string | null, password: string | null, username: string | null) {
        const contactValue = contactID?.toString();
        const passValue = password?.toString();
        const params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ contactID, passValue, username })
        }
        const res = await fetch(`/api/user/check`, params);
        const data: UserResponce = await res.json()
        console.log(data)
        if (!data) return false
        dispatch(updateStatusUser(data))
        updateIntervalStatus()
        if (tour) {
            dispatch(set_tour({
                ...tour,
                users: [],
                timeTour: []
            }))
        }
        /* dispatch(controll_modal_form(false))*/
        localStorage.setItem('lastContact', contactValue || '');
        localStorage.setItem('lastPass', passValue || ''); //


        const set = ['fishs', 'reservuors', 'typeFishing', 'baits']
        localStorage.setItem('setCatch', JSON.stringify(set));
        return true
    }


    return { getDataUser }
}