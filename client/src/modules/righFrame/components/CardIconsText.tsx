import React from 'react'
import RenderIconText from './UIRenderIconText'

import '../styles/CardIconsText.css'



interface RenderIconTextProps {
    text: string;
    icon: string;
}
const CardIconsText: React.FC<RenderIconTextProps> = ({ text, icon }) => {

    return (<div className="CardIconText">
        <RenderIconText text={text} icon={icon} />
    </div>)
}


export default CardIconsText