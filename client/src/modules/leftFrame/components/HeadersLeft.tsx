import React from 'react';
import '../styles/HeadersLeft.css'
import logo from '../assets/log.png';
import logo_maxi from '../../../assets/logo_maxi.webp'
import logo_mini from '../../../assets/logo_mini.webp'

import { useSelector, useDispatch } from 'react-redux';
import { goBackState, RootState } from '../../../GlobalStor';

const RenderHeaderLeft = () => {

    const dispatch = useDispatch()
    const statebody = useSelector((state: RootState) => state.slice.stateBody)



    const handler = () => {
        dispatch(goBackState());
        // dispatch(set_subMenu(null))
    }

    const view = () => {
        if (statebody === 'startwindow') return <img src={logo_maxi} alt="Логотип Туристас" className="logo_maxi" />
        return <div className="container_logo" onClick={handler}>
        </div>
    }
    return (
        <div className="Header_container">
            {view()}
        </div>

    )
}
export default RenderHeaderLeft