
import '../styles/RightFrame.css'
import { textsArray, backgroundImagesIcons } from '../stor'
import { useState, useEffect } from 'react'
import DiscriptionCard from "./DiscriptionCard"
import CardIconsText from "./CardIconsText"


const BodyLow = () => {

    const [currentIndexText, setCurrentIndexText] = useState(0)
    const [currentIndexIcon, setCurrentIndexIcon] = useState(0)
    const [loadedImage, setLoadedImage] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndexText(Math.floor(Math.random() * textsArray.length));
            setCurrentIndexIcon(prevIndex => (prevIndex + 1) % backgroundImagesIcons.length);
        }, 5000); // Обновление каждую минуту

        return () => clearInterval(intervalId);
    }, [])

    return (<div className="wrapper_right_frame">
        <DiscriptionCard />
        <CardIconsText text={textsArray[currentIndexText]} iconsRef={backgroundImagesIcons[currentIndexIcon]} />
    </div>)
}


export default BodyLow