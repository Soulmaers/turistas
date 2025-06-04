
import './Reservours.css'

import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react'
import { RootState, set_stateModalWindowThour, set_stateModalWindowThree } from '../../../../../../GlobalStor';

import { SwapeComponent } from '../SwapeComponent'
import { FindFilter } from '../FindFilter'



const storReservours = [
    { id: 1, name: 'Финский залив (Соколинское)' },
    { id: 2, name: 'река Волхов (Ленинградская область)' },
    { id: 3, name: 'Ладожское озеро (Креницы)' },
    { id: 4, name: 'река Ловать (Новгородская область)' },
    { id: 5, name: 'река Луга (Ленинградская область)' },
    { id: 6, name: 'Дамба (Кронштадт)' },
    { id: 7, name: 'Лепсари' }
];


export const Reservours = () => {
    const dispatch = useDispatch()

    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);
    const [arrayReservours, setArrayReservours] = useState<{ id: number; name: string }[]>(storReservours)
    const [selectedReservours, setSelectedReservours] = useState<{ id: number; name: string }[]>([])


    const [reservours, setReservours] = useState({
        any: false
    });
    const toggleBait = (key: keyof typeof reservours) => {
        setReservours(prev => ({ ...prev, [key]: !prev[key] }));
    };


    const over = () => {
        dispatch(set_stateModalWindowThree({ ...stateModalWindowThree, status: false }))
    }

    const handlerDiscriotion = () => {
        console.log('ок')
    }

    const deleteFish = (id: number) => {
        setSelectedReservours(selectedReservours.filter(e => e.id !== id))
    }

    const svoyBlockStyle = reservours.any
        ? { opacity: 0.5, pointerEvents: 'none' as const }
        : undefined;

    const displayValue = reservours.any ? 'none' : undefined;

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
                <FindFilter disArray={setSelectedReservours} objs={arrayReservours} disabled={reservours.any} display={displayValue} selected={selectedReservours} />
                <SwapeComponent text={'Любой водоём'} active={reservours.any} onToggle={() => toggleBait('any')} />

            </div>
        </div>
        <div className="footer_ok" onClick={over}>OK</div>
    </div >)


}
