import { useDispatch } from 'react-redux'
import { set_dataContent } from '../../../GlobalStor'


export const useGetDataContent = () => {
    const dispatch = useDispatch()
    const getContent = (async () => {

        const params = {
            method: 'GET'
        }
        const result = await fetch('http://localhost:3333/api/getContent', params)
        const data = await result.json()

        dispatch(set_dataContent(data))
    })
    return { getContent }
}