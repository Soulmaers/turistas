import React from 'react'
import { useState } from 'react'
import FishingBans from './FishingBans'
import '../styles/WiewCardReservours.css'
import { arrayBans } from '../stor'


interface IndexProps {
    index: number,
    text: string | null
}
const WiewCardReservours: React.FC<IndexProps> = ({ index, text }) => {

    console.log('рендер')
    return (
        <React.Fragment>
            <div className="title">{text}</div>
            <div className="body_reservours">
                <img className="image_reservour" src={arrayBans[index].src} ></img>
                <FishingBans disc={arrayBans[index].bans} />
            </div>
        </React.Fragment >
    )

}


export default WiewCardReservours