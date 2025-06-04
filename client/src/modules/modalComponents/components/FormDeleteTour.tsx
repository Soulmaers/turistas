

import '../styles/FormDelCatch.css'
import { RootState, set_stateModalWindowTwo, set_stateModalWindow, set_deleteFormTour, updateStatusUser } from "../../../GlobalStor";
import { useSelector, useDispatch } from "react-redux";
import { useDeleteTour } from '../../leftFrame/hooks'
import { useEffect, useRef, useState } from 'react'






export const FormDeleteTour = () => {
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const idClickTour = useSelector((state: RootState) => state.slice.idClickTour)
    const dispatch = useDispatch()
    const { deleteTour } = useDeleteTour()
    console.log(idClickTour)
    console.log(userStatus.tournament)
    const [del, setDel] = useState(false)
    const [text, setText] = useState<string>('')

    const nameTour = userStatus.tournament.find(e => e.id === idClickTour)

    const closeModal = () => {
        console.log('отмена?')
        dispatch(set_stateModalWindowTwo({ type: 'deleteFormTour', status: false }))
    }

    const handler = async () => {
        if (!nameTour) {
            console.error("Нет турнира на удаление");
            return; // Завершаем, если nameTour не задан
        }
        const result = await deleteTour(nameTour?.id, nameTour?.name)
        setDel(true)
        setText(result)
        console.log(userStatus.tournament)
        const tournaments = userStatus.tournament.filter(e => e.id !== idClickTour)
        console.log(tournaments)
        dispatch(set_stateModalWindow({ type: 'stateModal', status: false }))
        dispatch(set_stateModalWindowTwo({ type: 'deleteFormTour', status: false }))
        dispatch(updateStatusUser({ ...userStatus, tournament: tournaments }))

        setTimeout(() => {
            setDel(false)
            closeModal()
        }, 1000)

    }
    return <div className="body_del">

        <div className="header_del">УДАЛИТЬ ТУРНИР?</div>
        <div className="center_del_tour">
            {nameTour?.name}
        </div>
        <div className="footer_del">
            <span className='btn_del_catch' onClick={handler}>ОК</span>
            <span className='btn_del_catch' onClick={closeModal}>ОТМЕНА</span></div>
    </div>
}

