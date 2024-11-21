import React from 'react'

import RenderHeaderRight from './HeadersRight'
import BodyLow from './BodyLowFrame'
import '../styles/RightFrame.css'





const RightFrame = () => {

    return (
        <div className='Right_frame'>
            <RenderHeaderRight />
            <BodyLow />
        </div>
    )
}

export default RightFrame