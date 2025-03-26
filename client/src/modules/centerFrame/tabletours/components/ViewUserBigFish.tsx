import React from 'react'
import DiscriptionBigFish from './DiscriptionBigFish'
import whatRound from '../../what-round.png'
import '../styles/ViewUserBigFish.css'
import { RootState } from "../../../../GlobalStor"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useResizeWindow } from '../../../servises/hooks/getDataContent'
import { useGetImages } from '../hooks/getImages'

const ViewUserBigFish = () => {
    const { windowWidth } = useResizeWindow()
    const { getImage } = useGetImages()
    const [image, setImage] = useState<string | null>(null)
    const bigFish = useSelector((state: RootState) => state.slice.bigFish)

    useEffect(() => {
        if (bigFish?.urlFoto) {
            const fetchImage = async () => {
                if (bigFish?.urlFoto) {
                    console.log(bigFish);
                    try {
                        const result = await getImage(bigFish.urlFoto);
                        setImage(`url(${result})`)
                        // Здесь вы можете использовать результат, который вернули getImage
                    } catch (error) {
                        console.error('Ошибка при получении изображения:', error);
                    }
                }
            };
            fetchImage();
        }

        else {
            setImage(null)
        }
    }, [bigFish]);
    const back = !bigFish ? { backgroundImage: `url(${whatRound})` } : { backgroundImage: `url(${require(`../assets/${bigFish.foto_user}`)}` };
    const margin = !bigFish ? { marginTop: '60px' } : {}
    const iconStyles = { ...back, ...margin }



    const isMobile = windowWidth < 400;
    return (
        <div className="wins_card">
            <div className='title_bigFish'>BIG FISH</div>
            {isMobile
                ? (
                    <><div className="mobile_icon">
                        <div className="icon" style={iconStyles}></div>
                        {image && <div className="icon_foto_fish" style={{ backgroundImage: image }}></div>}
                    </div>
                        {bigFish && <DiscriptionBigFish {...bigFish} />}
                    </>
                )
                : (
                    <>
                        <div className="icon" style={iconStyles}></div>
                        {bigFish && <DiscriptionBigFish {...bigFish} />}
                        {image && <div className="icon_foto_fish" style={{ backgroundImage: image }}></div>}
                    </>
                )}

        </div>
    );
};












export default ViewUserBigFish