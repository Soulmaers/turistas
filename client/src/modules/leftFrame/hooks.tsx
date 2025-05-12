

import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { update_modal, set_tour, RootState } from '../../GlobalStor'

//import { TourData } from '../servises/contexs/contextStateTourData'
export const useDeleteTour = () => {

    const deleteTour = async (id: number, name: string) => {
        const param = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        }

        try {
            console.log('тут')
            const res = await fetch(`/api/deleteTour`, param)
            const result = await res.json()
            return `Турнир ${name} удалён.`
        }
        catch (e) {
            return 'Ошибка при удалении'
        }


    }
    return { deleteTour }
}


export const useEditTour = () => {
    const dispatch = useDispatch()

    const tourData = useSelector((state: RootState) => state.slice.tour)
    const editFunc = async (id: number) => {
        console.log(id)
        const param = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        }
        try {
            console.log('тут')
            const res = await fetch(`/api/getContentTour`, param)
            const result = await res.json()
            //   dispatch(update_modal(true))

            if (tourData) {
                dispatch(set_tour({
                    ...tourData,
                    id: result.id,
                    nameTour: result.name,
                    dateStart: result.dateStart,
                    dateFinish: result.dateFinish,
                    users: result.users
                }
                ))
            }

            return
        }
        catch (e) {
            return 'Ошибка при удалении'
        }

    }


    return { editFunc }
}