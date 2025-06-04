
import { useSelector, useDispatch } from 'react-redux'
import { RootState, set_stateModalWindow, set_stateBody, updateReservours } from '../../../GlobalStor'
import '../styles/Reservoors.css'


const Reservoors = () => {
    const dispatch = useDispatch()
    const stateModalWindow = useSelector((state: RootState) => state.slice.stateModalWindow);
    const dataContent = useSelector((state: RootState) => state.slice.dataContent)


    const changeStateReservour = (index: number, e: string) => {
        dispatch(set_stateModalWindow({ ...stateModalWindow, status: false }))
        dispatch(set_stateBody('reservoors'))
        dispatch(updateReservours({ index: index, text: e }))

    }
    const rows = dataContent.reservours?.map((e, index) => <div key={index} className="reservour" onClick={() => changeStateReservour(index, e.name)}>{e.name}</div>)

    return (<div className="container_reservoors">{rows}</div>)
}

export default Reservoors