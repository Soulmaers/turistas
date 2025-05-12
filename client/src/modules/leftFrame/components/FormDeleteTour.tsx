

import '../../centerFrame/history/styles/FormDelCatch.css'
import { RootState, update_modal, set_deleteFormTour, updateStatusUser } from "../../../GlobalStor";
import { useSelector, useDispatch } from "react-redux";
import { useDeleteTour } from '../hooks'
import { useEffect, useRef, useState } from 'react'

import Modal from '../../servises/components/Modal'
import TextInfoModal from '../../servises/components/TextInfoModal'





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
        // dispatch(update_modal(true))
        dispatch(set_deleteFormTour(false))

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
        dispatch(update_modal(false))
        dispatch(set_deleteFormTour(false))
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

/* {del && <Modal style={{ top: '50%' }} onClose={() => setDel(false)}><TextInfoModal text={text} /></Modal>}*/