import React from 'react'
import { Catch } from '../components/FormCatch'




export const useSetCatch = () => {
    const setCatch = async (data: Catch) => {
        const params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',

            },
            body: JSON.stringify({ data })
        }
        const res = await fetch('http://localhost:3333/api/setCatch', params)
        return await res.json()
    }

    return { setCatch }
}