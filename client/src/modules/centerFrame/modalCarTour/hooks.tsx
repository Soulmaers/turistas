import { useContext } from 'react'
import { MyContext } from '../../servises/contexs/contexts';

const useAddTour = () => {

    const { state, dispatch } = useContext(MyContext);
    const addTour = async ({ ...props }) => {

        try {
            const params = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ ...props })

            }
            const res = await fetch('http://localhost:3333/api/addTournaments', params)
            const result = await res.json()

            const updateTournaments = [...state.userStatus.tournament, result]
            dispatch({ type: 'update_status_user', payload: { ...state.userStatus, tournament: updateTournaments } })
            return `Турнир ${result.name} создан.`
        }
        catch (e) {
            console.log(e)
            return `Ошибка создания турнира`
        }

    }
    return { addTour }
}



export default useAddTour