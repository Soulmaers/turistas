
import { useSelector, useDispatch } from 'react-redux';
import { updateStatusUser, RootState } from '../../../GlobalStor'

export const useUpdateTour = () => {

    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const dispatch = useDispatch()

    const updateTour = async ({ ...props }) => {
        console.log(props)
        try {
            const params = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ ...props })

            }
            const res = await fetch('/api/updateTour', params)
            const result = await res.json()
            console.log(result)
            let updateTournaments;

            const updateTourIndex = userStatus.tournament.findIndex(e => e.id === props.id);
            updateTournaments = updateTourIndex !== -1
                ? userStatus.tournament.map((tournament, index) =>
                    index === updateTourIndex ? { ...tournament, ...result } : tournament)
                : [...userStatus.tournament, result];

            dispatch(updateStatusUser({ ...userStatus, tournament: updateTournaments }))
            //  dispatch(updateContent(result.status))
            return `Турнир ${result.name} обновлён.`
        }
        catch (e) {
            console.log(e)
            return `Ошибка редактирования турнира`
        }

    }
    return { updateTour }
}



export const useAddTour = () => {

    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const dispatch = useDispatch()
    // const created_by = userStatus.user?.id
    const addTour = async ({ ...props }) => {
        console.log(props)
        try {
            const params = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ ...props })

            }
            const res = await fetch('/api/addTour', params)
            const result = await res.json()
            console.log(result)

            const updateTournaments = [...userStatus.tournament, result];


            dispatch(updateStatusUser({ ...userStatus, tournament: updateTournaments }))
            //  dispatch(updateContent(result.status))
            return `Турнир ${result.name} обновлён.`
        }
        catch (e) {
            console.log(e)
            return `Ошибка редактирования турнира`
        }

    }
    return { addTour }
}



