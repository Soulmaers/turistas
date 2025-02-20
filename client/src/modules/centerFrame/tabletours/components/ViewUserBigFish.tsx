import React from 'react'
import DiscriptionBigFish from './DiscriptionBigFish'
import l from '../../../righFrame/assets/l.webp'
import whatRound from '../../what-round.png'
import '../styles/ViewUserBigFish.css'
import { RootState } from "../../../../GlobalStor"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const ViewUserBigFish = () => {
    const [image, setImage] = useState<string | null>(null)
    const bigFish = useSelector((state: RootState) => state.slice.bigFish)
    const urlFoto = useSelector((state: RootState) => state.slice.urlFoto)
    console.log(bigFish)
    useEffect(() => {
        const imageURL = urlFoto ? `url(${urlFoto}` : bigFish ? `url(${require(`../../../../../public/images/${bigFish.urlFoto}`)})` : null
        setImage(imageURL)
    }, [bigFish])

    const back = !bigFish ? { backgroundImage: `url(${whatRound})` } : { backgroundImage: `url(${require(`../assets/${bigFish.foto_user}`)}` };
    const margin = !bigFish ? { marginTop: '60px' } : {}
    const iconStyles = { ...back, ...margin }
    console.log(bigFish?.urlFoto)
    return (
        <div className="wins_card">
            <div className='title_bigFish'>BIG FISH</div>
            <div className="icon" style={iconStyles}></div>
            {bigFish && <DiscriptionBigFish {...bigFish} />}
            {image && <div className="icon_foto_fish" style={{ backgroundImage: image }}></div>}
        </div>
    )
}


export default ViewUserBigFish