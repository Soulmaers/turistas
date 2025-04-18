import { useDispatch } from 'react-redux'
import { set_dataContent } from '../../../GlobalStor'
import { useState, useEffect } from 'react'

export const useGetDataContent = () => {
    const dispatch = useDispatch()
    const getContent = (async () => {

        const params = {
            method: 'GET'
        }
        const result = await fetch('/api/getContent', params)
        const data = await result.json()

        dispatch(set_dataContent(data))
    })
    return { getContent }
}


export const useResizeWindow = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setTimeout(() => setWindowWidth(window.innerWidth), 100);

        window.addEventListener('resize', handleResize);
        // Удаляем обработчик при размонтировании
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { windowWidth }
}