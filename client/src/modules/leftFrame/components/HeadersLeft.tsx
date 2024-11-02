import React from 'react';
import '../styles/HeadersLeft.css'
import logo from '../assets/log.png';

interface ChangeProps {
    changeStateReservour: (index: number | null, e: string | null) => void
}

const RenderHeaderLeft: React.FC<ChangeProps> = ({ changeStateReservour }) => {
    return (
        <div className="Header_container">
            <div className="container_logo"><img src={logo} alt="Логотип Туристас" className="logo" onClick={() => changeStateReservour(null, null)} /></div>
        </div>

    )
}
export default RenderHeaderLeft