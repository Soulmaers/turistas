

export const useDeleteTour = () => {

    const deleteTour = async (id: number, name: string) => {
        const param = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        }

        try {
            console.log('тут')
            const res = await fetch(`http://localhost:3333/api/deleteTour`, param)
            const result = await res.json()
            return `Турнир ${name} удалён.`
        }
        catch (e) {
            return 'Ошибка при удалении'
        }


    }
    return { deleteTour }
}