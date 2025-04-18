import React from 'react'
import { Catch } from '../components/FormCatch'




export const useSetCatch = () => {
    const setCatch = async (formData: FormData) => {
        console.log(formData)
        const params = {
            method: 'POST',
            body: formData
        }
        const res = await fetch('/api/setCatch', params)
        const mess = await res.json()
        return mess
    }

    const updateCatch = async (formData: FormData) => {
        const params = {
            method: 'POST',
            body: formData
        }
        const res = await fetch('/api/updateCatch', params)
        return await res.json()
    }

    return { setCatch, updateCatch }
}