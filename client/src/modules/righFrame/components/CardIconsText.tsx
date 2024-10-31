import React from 'react'
import RenderIconText from './UIRenderIconText'

import '../styles/CardIconsText.css'



interface RenderIconTextProps {
    text: string;
    iconsRef: string

}
const CardIconsText: React.FC<RenderIconTextProps> = ({ text, iconsRef }) => {

    return (<div className="CardIconText">
        <RenderIconText text={text} iconsRef={iconsRef} />
    </div>)
}


export default CardIconsText