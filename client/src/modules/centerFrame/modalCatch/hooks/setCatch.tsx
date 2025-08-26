import React from 'react'
import { Catch } from '../components/FormCatch'

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { RootState, TourEvent, Property, set_validTours, PropertyTour, set_stateModalWindowTwo } from '../../../../GlobalStor'




export const useSetCatch = () => {

    const setCatch = async (formData: FormData, validTours: PropertyTour[] | null) => {

        console.log(validTours)
        const toursId = validTours?.filter(e => e.flag === 1).map(el => el.id)
        formData.append('validTours', JSON.stringify(toursId));
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