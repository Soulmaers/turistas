import React from 'react';
import '../styles/HeadersLeft.css'
import logo from '../assets/log.png';



const RenderHeaderLeft = () => {
    return (
        <div className="Header_container">
            <div className="container_logo"><img src={logo} alt="Логотип Туристас" className="logo" /></div>
        </div>

    )
}
export default RenderHeaderLeft