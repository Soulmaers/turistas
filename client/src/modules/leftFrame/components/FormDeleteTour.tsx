

import '../../centerFrame/history/styles/FormDelCatch.css'
import { RootState, set_deleteFormTour, updateStatusUser } from "../../../GlobalStor";
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
    const modalka = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalka.current && !modalka.current.contains(event.target as Node)) {
                closeModal();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    const closeModal = () => {
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
        dispatch(updateStatusUser({ ...userStatus, tournament: tournaments }))
        // if (tournaments.length === 0) dispatch(updateContent(null))

        setTimeout(() => {
            setDel(false)
            closeModal()
        }, 1000)

    }
    return <div className="body_del" ref={modalka}>
        {del && <Modal style={{ top: '50%' }}><TextInfoModal text={text} /></Modal>}
        <div className="header_del">Удалить турнир?</div>
        <div className="center_del_tour">
            {nameTour?.name}
        </div>
        <div className="footer_del">
            <span className='btn_del_catch' onClick={() => handler()}>Ок</span>
            <span className='btn_del_catch' onClick={closeModal}>Отмена</span></div>
    </div>
}