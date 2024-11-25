import { useEffect, useState } from 'react'


const useAddTour = () => {
    const addTour = async ({ ...props }) => {
        const params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ ...props })

        }
        const res = await fetch('http://localhost:3333/api/addTournaments', params)
        const result = await res.json()
        console.log(result)
    }
    return { addTour }
}



export default useAddTour