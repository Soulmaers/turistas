


export const useDeleteCatch = () => {

    const delCatch = async (id: number, idUser: number) => {

        const params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id, idUser })
        }
        const res = await fetch('http://localhost:3333/api/deleteCatch', params)
        const data = await res.json()
        return data
    }

    return { delCatch }
}