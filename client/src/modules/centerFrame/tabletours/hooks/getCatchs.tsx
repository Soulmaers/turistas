
export const useGetCatchs = () => {

    const getCatchs = async (idTour: number) => {
        const params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ idTour })
        }
        const res = await fetch('/api/getCatchs', params)
        const data = await res.json()
        console.log(data)
        return data
    }

    return { getCatchs }
}


export const useSetFinal = () => {

    const setFinal = async (idTour: number) => {
        const params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ idTour })
        }
        const res = await fetch('/api/setFinal', params)
        const data = await res.json()
        console.log(data)
        return data
    }

    return { setFinal }
}