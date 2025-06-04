


export const useSaveAnchor = () => {
    const save = async (userId: number, stateBody: string | null, idClickTour: number | null) => {

        const params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ userId, stateBody, idClickTour })

        }
        const result = await fetch('api/save_anchor', params)
        const res = await result.json()
    };

    return { save };
};