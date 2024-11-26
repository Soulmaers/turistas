import React, { useContext } from 'react'
import { MyContext } from '../../servises/contexs/contexts'
import { ContextActiv } from '../../servises/contexs/contextActivId';
import '../styles/Tournamets.css'
import { MdDelete } from "react-icons/md";
import { FaWrench } from "react-icons/fa";

const Tournaments = () => {
    const { state, dispatch } = useContext(MyContext)
    const { idClickTour, dispatch: dispatchClickTour } = useContext(ContextActiv)
    const admin = (created: number) => {
        const createdBy = created === state.userStatus?.user?.id;
        return createdBy ? <><FaWrench className='icons_admin' style={{ right: '30px' }} /> <MdDelete className='icons_admin' style={{ right: '5px' }} /></> : null
    }

    const handlerTour = (id: number) => {
        dispatchClickTour({ type: 'click_tour', payload: id })
        console.log(idClickTour)
    }
    const tournaments = state.userStatus.tournament
    const rows = tournaments.map(e => (<div className="tournament" key={e.id} onClick={() => handlerTour(e.id)}>{e.name}{admin(e.created_by)}</div>))
    return (
        <div className="container_tournaments">
            {rows}
        </div>


    )
}


export default Tournaments