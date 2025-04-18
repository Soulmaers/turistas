
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
        return data
    }

    return { getCatchs }
}