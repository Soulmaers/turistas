import { FaToggleOn } from 'react-icons/fa'
import { LiaToggleOnSolid } from 'react-icons/lia'
import { PiToggleLeftFill } from 'react-icons/pi'
import { FaToggleOff } from 'react-icons/fa6'
import { useState } from 'react'
import '../styles/SwapeComponent.css'



interface SwapeProps {
    text: string;
    active: boolean;
    onToggle: () => void;
}
export const SwapeComponent: React.FC<SwapeProps> = ({ text, active, onToggle }) => {
    const classes = active ? 'swipe_out in' : 'swipe_out off'

    return (<div className="wrap_swipe">
        <div className={classes} onClick={onToggle}></div>
        <div className='text_swipe'>{text}</div>
    </div>)
}