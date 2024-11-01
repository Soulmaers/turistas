import React from 'react'
import { storDefault } from '../stor'
import '../styles/DiscriptionCard.css'

const DiscriptionCard = () => {
    const lishki = storDefault.map((e, index) => <div key={index + 'd'} className="discriptions">{e}</div>)

    return (
        <div className="Discription_card">
            {lishki}
        </div>

    )
}


export default DiscriptionCard