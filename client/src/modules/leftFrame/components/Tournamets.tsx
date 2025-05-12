import React, { useState, useEffect } from 'react'
import { useResizeWindow } from '../../servises/hooks/getDataContent'
import { useDeleteTour, useEditTour } from '../hooks'
import Modal from '../../servises/components/Modal'
import TextInfoModal from '../../servises/components/TextInfoModal'
import '../styles/Tournamets.css'
import { MdDelete } from "react-icons/md";
import { FaWrench } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { set_subMenu, set_statusTour, set_stateBody, set_deleteFormTour, click_tour, set_historyWiew, RootState } from '../../../GlobalStor';

const Tournaments = () => {
    const { windowWidth } = useResizeWindow()
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);

    const dispatch = useDispatch();

    const [del, setDel] = useState(false)
    const [text, setText] = useState('')


    const tournaments = userStatus.tournament
    console.log(tournaments)
    const nowTours = tournaments.filter(e => e.status === 1)
    const futureTours = tournaments.filter(e => e.status === 0)
    const oldTours = tournaments.filter(e => e.status === 2)


    const arrayTours = [{ st: 1, title: 'АКТИВНЫЕ СОБЫТИЯ', tours: nowTours, no: nowTours.length !== 0 ? true : false, clas: nowTours.length !== 0 ? 'tournament active' : 'tournament' },
    { st: 0, title: 'БУДУЩИЕ СОБЫТИЯ', tours: futureTours, no: futureTours.length !== 0 ? true : false, clas: futureTours.length !== 0 ? 'tournament active' : 'tournament' },
    { st: 2, title: 'ЗАВЕРШЕННЫЕ СОБЫТИЯ', tours: oldTours, no: oldTours.length !== 0 ? true : false, clas: oldTours.length !== 0 ? 'tournament active' : 'tournament' },
    { st: 3, title: 'ВСЕ СОБЫТИЯ', tours: tournaments, no: tournaments.length !== 0 ? true : false, clas: tournaments.length !== 0 ? 'tournament active' : 'tournament' }]



    const handler = (st: number, no: boolean) => {
        if (no) {
            if (st === 3) {
                dispatch(set_stateBody('haveTours'))
            }
            else {
                dispatch(set_stateBody('typeToursList'))
            }

            dispatch(set_statusTour(st))
            dispatch(set_subMenu(null))
        }

    }
    const rows = arrayTours.map((e, index) => (<div className={e.clas} key={index} onClick={() => handler(e.st, e.no)}>{e.title}</div>))
    console.log(rows)
    return (
        windowWidth < 440 ?
            <Modal style={{ top: '50%' }} onClose={() => dispatch(set_subMenu(null))}><div className="container_tournaments">
                {del && <Modal style={{ top: '50%' }} onClose={() => dispatch(set_subMenu(null))}><TextInfoModal text={text} /> </Modal>}
                {rows}
            </div></Modal> :
            <div className="container_tournaments">
                {del && <Modal style={{ top: '50%' }} onClose={() => dispatch(set_subMenu(null))}><TextInfoModal text={text} /> </Modal>}
                {rows}
            </div>
    )
}


export default Tournaments