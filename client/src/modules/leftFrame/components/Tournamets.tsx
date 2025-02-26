import React, { useState } from 'react'

import { useDeleteTour, useEditTour } from '../hooks'
import Modal from '../../servises/components/Modal'
import TextInfoModal from '../../servises/components/TextInfoModal'
import '../styles/Tournamets.css'
import { MdDelete } from "react-icons/md";
import { FaWrench } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';

import { updateReservours, updateStatusUser, click_tour, set_historyWiew, RootState } from '../../../GlobalStor';

const Tournaments = () => {

    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const dispatch = useDispatch();

    const [del, setDel] = useState(false)
    const [text, setText] = useState('')
    const { deleteTour } = useDeleteTour()
    const { editFunc } = useEditTour()

    const admin = (id: number, name: string, created: number) => {
        const createdBy = created === userStatus?.user?.id;
        return createdBy ? <><FaWrench className='icons_admin' style={{ right: '30px' }} onClick={() => editFunc(id)} /> <MdDelete className='icons_admin' style={{ right: '5px' }} onClick={() => deleteHandler(id, name)} /></> : null
    }

    const handlerTour = (id: number) => {
        dispatch(click_tour(id))
        dispatch(set_historyWiew('tournaments'))
    }
    const deleteHandler = async (id: number, name: string) => {
        setTimeout(() => setDel(false), 1000)
        const result = await deleteTour(id, name)
        setDel(true)
        setText(result)
        const tournaments = userStatus.tournament.filter(e => e.id !== id)
        dispatch(updateStatusUser({ ...userStatus, tournament: tournaments }))
    }
    const tournaments = userStatus.tournament
    const rows = tournaments.map(e => (<div className="tournament" key={e.id} onClick={() => handlerTour(e.id)}>{e.name}{admin(e.id, e.name, e.created_by)}</div>))
    return (
        <div className="container_tournaments">
            {del && <Modal><TextInfoModal text={text} /></Modal>}
            {rows}
        </div>
    )
}


export default Tournaments