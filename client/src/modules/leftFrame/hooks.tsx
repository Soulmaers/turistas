

import { useContext } from 'react'
import { ContextForm } from '../servises/contexs/contextCloseForm'
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
            const res = await fetch(`http://localhost:3333/api/deleteTour`, param)
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
    const { stateModal, dispatch } = useContext(ContextForm)

    const editFunc = async (id: number) => {
        const param = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        }
        try {
            console.log('тут')
            const res = await fetch(`http://localhost:3333/api/getContentTour`, param)
            const result = await res.json()
            dispatch({ type: 'update_modal', payload: true })
            console.log(result)
            return
        }
        catch (e) {
            return 'Ошибка при удалении'
        }

    }


    return { editFunc }
}