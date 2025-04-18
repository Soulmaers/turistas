


export const useGetStatusUser = () => {
    const getStatusUser = async (id: number) => {
        const params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        }
        const result = await fetch('/api/getStatusUser', params)
        return await result.json()
    }

    return { getStatusUser }
}