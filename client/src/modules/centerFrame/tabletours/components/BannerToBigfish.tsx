import { useSelector, useDispatch } from 'react-redux'
import { RootState, set_stateBody, set_catchs, set_bigfish } from '../../../../GlobalStor'
import React, { useEffect } from 'react'
import '../styles/BannerToBigfish.css'

export const BannerToBigfish = () => {
    const bigFish = useSelector((state: RootState) => state.slice.bigFish)

    const dispatch = useDispatch()
    useEffect(() => {

    }, [bigFish])

    // console.log(bigFish)

    const handler = () => {
        if (bigFish) dispatch(set_stateBody('bigFish'))
    }
    const fisher = bigFish ? bigFish.name_user : 'МИСТЕР Х'
    const face = bigFish ? { backgroundImage: `url(${require(`../assets/${bigFish.foto_user}`)})` } : {};

    return (<div className="banner_big" onClick={handler}>
        <div className="foto_fisher_bigfish" style={face}></div>
        <div className='title_bigfish'>
            <span>ЛИДЕР ТУРНИРА:</span>
            <span>{fisher}</span>
        </div>
    </div>)
}