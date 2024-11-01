import React from 'react';
import '../styles/HeadersRight.css'
import { FaTrophy, FaStar } from "react-icons/fa";
import { FaFish } from "react-icons/fa6"
import { IoSettingsSharp, IoExitSharp, IoLogOut } from "react-icons/io5"
import { ImExit } from "react-icons/im";
import { GiExitDoor } from "react-icons/gi";

const RenderHeaderRight = () => {
    const trophyCount = 3;
    const trophies = Array.from({ length: trophyCount }, (_, index) => (
        <FaTrophy className="trophy_all" key={index} />
    ));

    return (
        <div className="header_admin_container">
            <div className="wrapper_account">
                <div className="login">Soulmaers</div>
                <div className="trophy_count"> <FaTrophy className="trophy_all" /> <span className="numbers">{trophyCount}</span></div>
                <div className="fish_count"><FaFish className="fish_icon" /><span className="numbers">100</span></div>
                <div className="fish_count"><FaStar className="star_icon" /><span className="numbers">0</span></div>
                <div className="settings"><IoSettingsSharp className="settings_icon" /></div>
                <div className="out"><IoLogOut className="exit" /></div>
            </div>
        </div >

    )
}
export default RenderHeaderRight