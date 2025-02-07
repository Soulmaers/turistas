
import '../styles/HeadersRight.css'
import { FaTrophy, FaStar } from "react-icons/fa";
import { FaFish } from "react-icons/fa6"
import { IoSettingsSharp, IoLogOut } from "react-icons/io5"

import { useSelector, useDispatch } from 'react-redux';
import { updateContent, updateStatusUser, RootState, controll_modal_form } from '../../../GlobalStor';


const RenderHeaderRight = () => {
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const dispatch = useDispatch()

    const { name_user = "", trophys = 0, fishs = 0, stars = 0 } = userStatus.user || {};

    const onClick = () => {
        dispatch(updateContent(null))
        dispatch(controll_modal_form(true))
        dispatch(updateStatusUser({ user: null, tournament: [] }))
    }
    return (
        <div className="header_admin_container">
            <div className="wrapper_account">
                <div className="login">{name_user}</div>
                <div className="trophy_count"> <FaTrophy className="trophy_all" /> <span className="numbers">{trophys}</span></div>
                <div className="fish_count"><FaFish className="fish_icon" /><span className="numbers">{fishs}</span></div>
                <div className="fish_count"><FaStar className="star_icon" /><span className="numbers">{stars}</span></div>
                <div className="settings"><IoSettingsSharp className="settings_icon" /></div>
                <div className="out"><IoLogOut className="exit" onClick={onClick} /></div>
            </div>
        </div >

    )
}
export default RenderHeaderRight