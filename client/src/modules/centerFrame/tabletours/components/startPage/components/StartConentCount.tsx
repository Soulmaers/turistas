import '../styles/StartContentCount.css'
import { User } from '../../../../../../GlobalStor'
import { Tournament } from '../../../../../../GlobalStor'
import { CardNaviCatchs } from './CardNaviCatchs'
import { CardNaviTours } from './CardNaviTours'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../../../../GlobalStor'

interface ContentProps {
    content: User

}


export const StartContentCount: React.FC<ContentProps> = ({ content }) => {

    return (<div className="start_count">
        <CardNaviTours />
        <CardNaviCatchs data={content} />
    </div>)
}