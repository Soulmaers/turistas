import React, { useContext, useState } from 'react'
import { MyContext } from '../../servises/contexs/contexts'
import { ContextActiv } from '../../servises/contexs/contextActivId';
import { useDeleteTour, useEditTour } from '../hooks'
import Modal from '../../servises/components/Modal'
import TextInfoModal from '../../servises/components/TextInfoModal'
import '../styles/Tournamets.css'
import { MdDelete } from "react-icons/md";
import { FaWrench } from "react-icons/fa";

const Tournaments = () => {
    const [del, setDel] = useState(false)
    const [text, setText] = useState('')
    const { state, dispatch } = useContext(MyContext)
    const { dispatch: dispatchClickTour } = useContext(ContextActiv)
    const { deleteTour } = useDeleteTour()
    const { editFunc } = useEditTour()

    const admin = (id: number, name: string, created: number) => {
        const createdBy = created === state.userStatus?.user?.id;
        return createdBy ? <><FaWrench className='icons_admin' style={{ right: '30px' }} onClick={() => editFunc(id)} /> <MdDelete className='icons_admin' style={{ right: '5px' }} onClick={() => deleteHandler(id, name)} /></> : null
    }

    const handlerTour = (id: number) => {
        dispatchClickTour({ type: 'click_tour', payload: id })
        dispatch({ type: 'update_reservours', payload: { index: null, text: null } })
    }
    const deleteHandler = async (id: number, name: string) => {
        setTimeout(() => setDel(false), 1000)
        const result = await deleteTour(id, name)
        setDel(true)
        setText(result)
        const tournaments = state.userStatus.tournament.filter(e => e.id !== id)
        dispatch({ type: 'update_status_user', payload: { ...state.userStatus, tournament: tournaments } })
    }
    const tournaments = state.userStatus.tournament
     const rows = tournaments.map(e => (<div className="tournament" key={e.id} onClick={() => handlerTour(e.id)}>{e.name}{admin(e.id, e.name, e.created_by)}</div>))
    return (
        <div className="container_tournaments">
            {del && <Modal><TextInfoModal text={text} /></Modal>}
            {rows}
        </div>
    )
}


export default Tournaments