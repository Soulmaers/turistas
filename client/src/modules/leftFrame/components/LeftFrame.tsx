

import RenderHeaderLeft from './HeadersLeft'
import RenderHeaderRight from './HeadersRight'
import { WrapperNavi } from './WrapperNavi'



import '../styles/LeftFrame.css'




const LeftFrame = () => {

    return (
        <div className="Left_frame">
            <HeaderMobile />
            <WrapperNavi />

        </div >
    )
}
export const HeaderMobile = () => {

    return (
        <div className="high_header">
            <RenderHeaderLeft />
            <RenderHeaderRight />
        </div>
    )
}




export default LeftFrame