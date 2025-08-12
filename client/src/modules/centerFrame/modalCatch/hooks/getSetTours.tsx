



export const useGetSetTours = () => {


    const getSet = async (id: number) => {

        console.log(id)
        const param = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        }
        try {
            console.log('тут')
            const res = await fetch(`/api/getContentTour`, param)
            const result = await res.json()
            //   dispatch(update_modal(true))
            return result
        } catch (e) {
            return []
        }
    }

    return { getSet }
}