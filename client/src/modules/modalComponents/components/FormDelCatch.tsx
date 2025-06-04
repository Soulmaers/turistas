import '../styles/FormDelCatch.css'

import { RootState, set_stateModalWindow, deleteCatch } from "../../../GlobalStor";
import { useSelector, useDispatch } from "react-redux";
import { formatUnixTime } from '../../centerFrame/history/servises'
import { useEffect, useRef, useState } from 'react'
import { useDeleteCatch } from '../../centerFrame/history/hooks/deleteCatch'
import Modal from '../../servises/components/Modal'
import TextInfoModal from '../../servises/components/TextInfoModal'


export const FormDelCatch = () => {
    const deleteIdCatch = useSelector((state: RootState) => state.slice.deleteIdCatch);
    const dispatch = useDispatch()
    const { delCatch } = useDeleteCatch()
    const [del, setDel] = useState(false)
    const [text, setText] = useState<string>('')
    console.log(deleteIdCatch)
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
        dispatch(set_stateModalWindow({ type: 'deleteForm', status: false }))
    }
    if (!deleteIdCatch) {
        return <div>Нет данных для удаления.</div>; // Или другое сообщение об ошибке
    }
    const { name_fish, name_reservour, name_type, name_day, name_bait, weight, data } = deleteIdCatch;
    const formattedTime = formatUnixTime(Number(data));
    const filteredCatch = { name_fish, name_reservour, name_type, name_day, name_bait, weight, formattedTime };
    const rows = Object.values(filteredCatch).map((e, index) => <span key={index + e}>{e}</span>);

    const handler = async () => {
        console.log(deleteIdCatch.idCatch)
        const mess = await delCatch(deleteIdCatch.idCatch, deleteIdCatch.idUser)
        console.log(mess)
        setText(mess)
        setDel(true)
        dispatch(deleteCatch(deleteIdCatch.idCatch))
        setTimeout(() => {
            setDel(false)
            closeModal()
        }, 1000)

    }
    return <div className="body_del" ref={modalka}>
        {del && <Modal style={{ top: '50%' }} onClose={() => dispatch(dispatch(set_stateModalWindow({ type: 'deleteForm', status: false })))}><TextInfoModal text={text} /></Modal>}
        <div className="header_del">Удалить улов?</div>
        <div className="center_del">
            {rows}

        </div>
        <div className="footer_del">
            <span className='btn_del_catch' onClick={() => handler()}>Ок</span>
            <span className='btn_del_catch' onClick={closeModal}>Отмена</span></div>
    </div>
}