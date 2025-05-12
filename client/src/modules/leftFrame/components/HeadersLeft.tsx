import React from 'react';
import '../styles/HeadersLeft.css'
import logo from '../assets/log.png';
import logo_maxi from '../../../assets/logo_maxi.webp'
import logo_mini from '../../../assets/logo_mini.webp'

import { useSelector, useDispatch } from 'react-redux';
import { set_stateBody, add_catch, set_historyWiew, set_add_tour, set_subMenu, set_profil, update_modal, RootState } from '../../../GlobalStor';

const RenderHeaderLeft = () => {

    const dispatch = useDispatch()
    const handler = () => {
        dispatch(update_modal(false))
        dispatch(add_catch(false))
        dispatch(set_add_tour(false))
        dispatch(set_subMenu(null))
        dispatch(set_profil(false))
        dispatch(set_stateBody('haveTours'))
        dispatch(set_historyWiew('tournaments'))
    }
    return (
        <div className="Header_container">
            <div className="container_logo" onClick={handler}>
                <img src={logo_maxi} alt="Логотип Туристас" className="logo_maxi" />

            </div>
        </div>

    )
}
export default RenderHeaderLeft