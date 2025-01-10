import { useContext } from 'react'
import { MyContext } from '../../servises/contexs/contexts';

const useAddTour = () => {

    const { state, dispatch } = useContext(MyContext);
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
            const res = await fetch('http://localhost:3333/api/addTournaments', params)
            const result = await res.json()
            let updateTournaments;

            if (props.idTour) {
                const updateTourIndex = state.userStatus.tournament.findIndex(e => e.id === props.idTour);
                updateTournaments = updateTourIndex !== -1
                    ? state.userStatus.tournament.map((tournament, index) =>
                        index === updateTourIndex ? { ...tournament, ...result } : tournament)
                    : [...state.userStatus.tournament, result];
            } else {
                updateTournaments = [...state.userStatus.tournament, result];
            }
            dispatch({ type: 'update_status_user', payload: { ...state.userStatus, tournament: updateTournaments } })
            return !props.idTour ? `Турнир ${result.name} создан.` : `Турнир ${result.name} обновлён.`
        }
        catch (e) {
            console.log(e)
            return `Ошибка создания турнира`
        }

    }
    return { addTour }
}



export default useAddTour