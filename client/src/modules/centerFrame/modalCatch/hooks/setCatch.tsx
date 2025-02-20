import React from 'react'
import { Catch } from '../components/FormCatch'




export const useSetCatch = () => {
    const setCatch = async (formData: FormData) => {
        console.log(formData)
        const params = {
            method: 'POST',
            body: formData
        }
        const res = await fetch('http://localhost:3333/api/setCatch', params)
        return await res.json()
    }

    return { setCatch }
}