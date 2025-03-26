import React from 'react'
import { Catch } from '../components/FormCatch'




export const useSetCatch = () => {
    const setCatch = async (formData: FormData) => {
        const params = {
            method: 'POST',
            body: formData
        }
        const res = await fetch('http://localhost:3333/api/setCatch', params)
        const mess = await res.json()
        return mess
    }

    const updateCatch = async (data: Catch) => {
        const params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ data })
        }
        const res = await fetch('http://localhost:3333/api/updateCatch', params)
        return await res.json()
    }

    return { setCatch, updateCatch }
}