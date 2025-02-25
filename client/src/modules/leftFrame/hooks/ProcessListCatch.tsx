import { RootState, set_catchsList, set_historyWiew } from "../../../GlobalStor"
import { useSelector, useDispatch } from "react-redux";


//catchs
export const useProcessList = () => {
    const catchs = useSelector((state: RootState) => state.slice.catchs);
    const dispatch = useDispatch()
    const fetchGetCatchs = async (id: number) => {
        const param = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        }
        try {
            console.log('тут')
            const res = await fetch(`http://localhost:3333/api/getCatchsList`, param)
            const data = await res.json()
            return data
        } catch (e) {
            return []
        }
    }

    const sortList = async (id: number) => {
        const data = await fetchGetCatchs(id)
        console.log(data)
        dispatch(set_catchsList(data))

    }


    return { sortList }
}