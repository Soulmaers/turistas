import React from 'react'
import '../styles/UIRenderIconText.css'


interface RenderIconTextProps {
    text: string;
    icon: string;
}
const RenderIconText: React.FC<RenderIconTextProps> = ({ text, icon }) => {


    return (
        <div className="Card_widget">
            <div className="Description_text">{text}</div>
            <div className="icon">{icon}</div>
        </div>
    )
}


export default RenderIconText