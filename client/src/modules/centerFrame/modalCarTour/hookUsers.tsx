import { setDefaultResultOrder } from "node:dns/promises"




export const useGetFishers = () => {



    const getFisher = async (contactID: string) => {

        try {
            const params = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ contactID })

            }
            const res = await fetch('/api/getFisherAddTour', params)
            const result = await res.json()
            console.log(result)
            return result || []
        }
        catch (e) {
            console.log(e)
            return null
        }

    }


    return { getFisher }
}