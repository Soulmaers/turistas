


export const useGetStatusUser = () => {
    const getStatusUser = async (id: number) => {
        const params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        }
        const result = await fetch('http://localhost:3333/api/getStatusUser', params)
        return await result.json()
    }

    return { getStatusUser }
}