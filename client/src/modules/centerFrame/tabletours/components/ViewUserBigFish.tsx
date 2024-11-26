import React from 'react'
import DiscriptionBigFish from './DiscriptionBigFish'
import l from '../../../righFrame/assets/l.webp'
import whatRound from '../../what-round.png'
import '../styles/ViewUserBigFish.css'


interface BigFishData {
    bigFish: {} | null
}
const ViewUserBigFish: React.FC<BigFishData> = ({ bigFish }) => {

    const back = { backgroundImage: `url(${whatRound})` };
    return (
        <div className="wins_card">
            <div className="icon" style={back}></div>
            {bigFish && <DiscriptionBigFish />}
        </div>
    )
}


export default ViewUserBigFish