import React from 'react'
import CardIconsText from './CardIconsText'
import DiscriptionCard from './DiscriptionCard'
import '../styles/RightFrame.css'
import { textsArray, iconsArray } from '../stor'
import { useState, useEffect } from 'react'



const RightFrame = () => {
    const [currentIndexText, setCurrentIndexText] = useState(0)
    const [currentIndexIcon, setCurrentIndexIcon] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndexText(Math.floor(Math.random() * textsArray.length));
            setCurrentIndexIcon(prevIndex => (prevIndex + 1) % iconsArray.length);
        }, 20000); // Обновление каждую минуту

        return () => clearInterval(intervalId);
    }, [])

    return (
        <div className='Right_frame'>
            <DiscriptionCard />
            <CardIconsText text={textsArray[currentIndexText]} icon={iconsArray[currentIndexIcon]} />
        </div>
    )
}

export default RightFrame