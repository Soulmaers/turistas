import React from 'react'
import '../styles/UIRenderIconText.css'


interface RenderIconTextProps {
    text: string;
    iconsRef: string

}
const RenderIconText: React.FC<RenderIconTextProps> = ({ text, iconsRef }) => {


    return (
        <div className="Card_widget">
            <div className="Description_text">{text}</div>
            <div className="icon" style={{ backgroundImage: `url(${iconsRef})` }}></div>
        </div >
    )
}


export default RenderIconText