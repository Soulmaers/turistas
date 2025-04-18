
import { useSelector, useDispatch } from 'react-redux';
import { updateStatusUser, RootState } from '../../../GlobalStor'

const useAddTour = () => {

    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const dispatch = useDispatch()

    const addTour = async ({ ...props }) => {
        try {
            const params = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ ...props })

            }
            const res = await fetch('/api/addTournaments', params)
            const result = await res.json()
            let updateTournaments;

            if (props.idTour) {
                const updateTourIndex = userStatus.tournament.findIndex(e => e.id === props.idTour);
                updateTournaments = updateTourIndex !== -1
                    ? userStatus.tournament.map((tournament, index) =>
                        index === updateTourIndex ? { ...tournament, ...result } : tournament)
                    : [...userStatus.tournament, result];
            } else {
                updateTournaments = [...userStatus.tournament, result];
            }
            dispatch(updateStatusUser({ ...userStatus, tournament: updateTournaments }))
            //  dispatch(updateContent(result.status))
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