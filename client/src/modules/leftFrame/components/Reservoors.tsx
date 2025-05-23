
import { useSelector, useDispatch } from 'react-redux'
import { RootState, set_historyWiew, set_subMenu, updateReservours } from '../../../GlobalStor'
import { useResizeWindow } from '../../servises/hooks/getDataContent'
import Modal from '../../servises/components/Modal'
import '../styles/Reservoors.css'


const Reservoors = () => {
    const dataContent = useSelector((state: RootState) => state.slice.dataContent)
    const { windowWidth } = useResizeWindow()
    const dispatch = useDispatch()
    const changeStateReservour = (index: number, e: string) => {
        dispatch(set_historyWiew('reservoors'))
        dispatch(updateReservours({ index: index, text: e }))
        if (windowWidth < 440) dispatch(set_subMenu(null))
    }
    const rows = dataContent.reservours?.map((e, index) => <div key={index} className="reservour" onClick={() => changeStateReservour(index, e.name)}>{e.name}</div>)

    return (
        windowWidth < 440 ?
            <Modal style={{ top: '50%' }} onClose={() => dispatch(set_subMenu(null))}><div className="container_reservoors">
                {rows}
            </div></Modal> :
            <div className="container_reservoors">
                {rows}
            </div>
    )
}

export default Reservoors