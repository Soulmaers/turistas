import React from 'react'
import { Catch } from '../components/FormCatch'

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { RootState, TourEvent, Property, set_validTours, set_stateModalWindowTwo } from '../../../../GlobalStor'




export const useSetCatch = () => {
    const validTours = useSelector((state: RootState) => state.slice.validTours)
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