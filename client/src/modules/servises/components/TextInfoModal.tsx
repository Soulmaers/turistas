
import React from 'react';


interface TextProp {
    text: string
}
const TextInfoModal: React.FC<TextProp> = ({ text }) => {


    return (
        <div className="text_dicription" style={{ padding: '10px', color: '#fff' }}>{text}</div>
    )
}

export default TextInfoModal