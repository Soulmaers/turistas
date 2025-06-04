
import '../styles/TimeTour.css'
import { CalendarTimeTour } from './CalendarTimeTour'
import { IntervalsList } from './IntervalsList';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_stateModalWindowThour, set_stateModalWindowThree } from '../../../../../../../GlobalStor';


export const TimeTour = () => {


    const [mess, set_mess] = useState<string>('')
    const dispatch = useDispatch()
    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);
    const intervals = useSelector((state: RootState) => state.slice.intervals);
    const over = () => {
        dispatch(set_stateModalWindowThree({ ...stateModalWindowThree, status: false }))
    }

    const handlerDiscriotion = () => {
        dispatch(set_stateModalWindowThour({ type: 'discription_time', status: true }))
    }

    const handler = () => {
        if (intervals.length === 0) {
            set_mess('Нет созданных интервалов')
            return
        }
        dispatch(set_stateModalWindowThour({ type: 'info_chart', status: true }))
    }
    return (<div className="modal_timetour">
        <div className="title_tour header_modal_add_tour">ДАТА/ВРЕМЯ<span className="icon_question time_question" onClick={handlerDiscriotion}></span></div>
        <div className="discription_time">Здесь Вы можете задать дату, а также временные интервалы проведения турнира</div>
        <CalendarTimeTour message={set_mess} />
        <IntervalsList intervals={intervals} />
        <div className="messageAlarm">{mess}</div>
        <div className="footer_timetour">
            <div className="time_tick" onClick={handler}>ВРЕМЕННАЯ ШКАЛА</div>
            <div className="ok" onClick={over}>ОК</div>
        </div>
    </div>)
}