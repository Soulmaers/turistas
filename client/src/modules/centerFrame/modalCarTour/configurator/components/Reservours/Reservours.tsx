
import './Reservours.css'

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react'
import { RootState, set_tourEvent, set_stateCardTour, set_stateModalWindowThree } from '../../../../../../GlobalStor';

import { SwapeComponent } from '../SwapeComponent'
import { FindFilter } from '../FindFilter'





export const Reservours = () => {
    const dispatch = useDispatch()
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);
    const dataContent = useSelector((state: RootState) => state.slice.dataContent)
    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);
    const [arrayReservours, setArrayReservours] = useState<{ id: number; name: string }[]>(dataContent?.reservours || [])
    const [selectedReservours, setSelectedReservours] = useState<{ id: number; name: string }[]>([])
    const state = useSelector((state: RootState) => state.slice.stateCardTour);
    const [anyReservours, setAnyReservours] = useState(false);



    useEffect(() => {
        console.log(tourEvent.reservours)
        setSelectedReservours(tourEvent.reservours);
        if (state.reservours) setAnyReservours(tourEvent.reservours.length === 0); // если массив пуст — значит "Любая приманка"

    }, [tourEvent.reservours]);



    console.log(tourEvent)
    const over = () => {
        if (anyReservours || selectedReservours.length !== 0) dispatch(set_stateCardTour({ ...state, reservours: true }))
        dispatch(set_tourEvent({ ...tourEvent, reservours: anyReservours ? [] : selectedReservours }))
        dispatch(set_stateModalWindowThree({ ...stateModalWindowThree, status: false }))
    }

    const handlerDiscriotion = () => {
        console.log('ок')
    }

    const deleteFish = (id: number) => {
        setSelectedReservours(selectedReservours.filter(e => e.id !== id))
    }

    const svoyBlockStyle = anyReservours
        ? { opacity: 0.5, pointerEvents: 'none' as const }
        : undefined;

    const displayValue = anyReservours ? 'none' : undefined;

    return (<div className="modal_subif">
        <div className="title_tour header_modal_add_tour">ВЫБОР ВОДОЁМА<span className="icon_question time_question" onClick={handlerDiscriotion}></span></div>
        <div className="body_card_modal">
            <div className="discription_time">Здесь Вы можете выбрать водоём для проведения турнира</div>
            <div className="criter_block" style={svoyBlockStyle}>
                {selectedReservours.length !== 0 && selectedReservours.map(e => (<div className="row_wrap_interval_fish" key={e.name}>
                    <div className="body_interval" >{e.name}</div>
                    <span className="del_interval" onClick={() => deleteFish(e.id)}></span>
                </div>))}
            </div>
            <div className="container_sort_fishs">
                <span className="span_text_info">* начните вводить название</span>
                <FindFilter disArray={setSelectedReservours} objs={arrayReservours} disabled={anyReservours} display={displayValue} selected={selectedReservours} />
                <SwapeComponent text={'Любой водоём'} active={anyReservours} onToggle={() => setAnyReservours(prev => !prev)} />

            </div>
        </div>
        <div className="footer_ok" onClick={over}>OK</div>
    </div >)


}
