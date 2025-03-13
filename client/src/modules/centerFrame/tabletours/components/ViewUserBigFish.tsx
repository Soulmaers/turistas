import React from 'react'
import DiscriptionBigFish from './DiscriptionBigFish'
import whatRound from '../../what-round.png'
import '../styles/ViewUserBigFish.css'
import { RootState } from "../../../../GlobalStor"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const ViewUserBigFish = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [image, setImage] = useState<string | null>(null)
    const bigFish = useSelector((state: RootState) => state.slice.bigFish)


    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        // Удаляем обработчик при размонтировании
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (bigFish) {
            const imageUrl = require(`../../../../../public/images/${bigFish.urlFoto}`);
            const img = new Image();
            img.src = imageUrl;

            img.onload = () => {
                const imageURL = `url(${imageUrl})`;
                setImage(imageURL);
            };

            img.onerror = () => {
                console.error('Error loading image:', imageUrl);
                setImage(null); // Или можно задать значение по умолчанию
            };
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