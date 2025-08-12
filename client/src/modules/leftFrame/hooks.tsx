

import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_tour, set_tourEvent, RootState } from '../../GlobalStor'

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
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent)

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
            console.log(result)
            if (tourData) {
                dispatch(set_tour({
                    ...tourData,
                    id: result.id,
                    nameTour: result.name,
                    dateStart: result.dateStart,
                    dateFinish: result.dateFinish,
                    users: result.users,
                    timeTour: result.timing,
                    fishs: result.fishs
                }
                ))
            }
            dispatch(set_tourEvent({
                ...tourEvent,
                status: result.status,
                id: result.id,
                dopsub: result.dopsub,
                name: result.name,
                criVictory: result.criVictory,
                dateStart: result.dateStart,
                dateFinish: result.dateFinish,
                fotoAll: result.fotoAll,
                fotoLider: result.fotoLider,
                timeTour: result.timing,
                fishers: result.users,
                fishs: result.fishs,
                reservours: result.reservours,
                typeCatch: result.typeCatch,
                typeBaits: result.typeBaits,
                creater_by: result.created_by,
                link: result.link
            }))

            return
        }
        catch (e) {
            return 'Ошибка при удалении'
        }

    }


    return { editFunc }
}