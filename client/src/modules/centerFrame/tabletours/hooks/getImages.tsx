


export const useGetImages = () => {

    const getImage = async (nameImage: string) => {

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nameImage })
        }
        const res = await fetch('/api/uploades', params)
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        return imageObjectURL
    }


    return { getImage }
}