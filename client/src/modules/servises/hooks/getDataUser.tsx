
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateStatusUser, set_tour, RootState } from '../../../GlobalStor';

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
        if (!data) return false
        dispatch(updateStatusUser(data))
        if (tour) {
            dispatch(set_tour({
                ...tour,
                users: []
            }))
        }
        /* dispatch(controll_modal_form(false))*/
        localStorage.setItem('lastContact', contactValue || '');
        localStorage.setItem('lastPass', passValue || ''); //
        return true
    }


    return { getDataUser }
}