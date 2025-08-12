

import { IoSettingsSharp, IoLogOut, } from "react-icons/io5"
import { IoMdLogOut } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import '../styles/Profil.css'
import { useSelector, useDispatch } from 'react-redux';
import { setIntervalId, RootState } from '../../../GlobalStor';

import { resetAll } from '../../../GlobalStor';



export const Profil = () => {
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const intervalId = useSelector((state: RootState) => state.slice.intervalId);
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch(resetAll())
        localStorage.removeItem('lastContact');

        if (intervalId) {
            clearInterval(intervalId);
            dispatch(setIntervalId(null));
        }

    }

    const { name_user } = userStatus.user || {};

    return (<div className="profil">
        <div className="name_fisher">{name_user?.toUpperCase()}</div>
        <div className="wrapper_menu">
            <div className="fish_count profil_row"><FaStar className="star_icon icon_class" /><span className="text_title_row">ИЗБРАННОЕ</span></div>
            <div className="settings profil_row"><IoSettingsSharp className="settings_icon icon_class" /><span className="text_title_row">НАСТРОЙКИ</span></div>
            <div className="out profil_row" onClick={onClick}><IoMdLogOut className="exit icon_class" /><span className="text_title_row">ВЫХОД</span>
            </div></div>
    </div>)
}