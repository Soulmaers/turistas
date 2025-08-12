
import '../styles/TimeTour.css'
import { CalendarTimeTour } from './CalendarTimeTour'
import { IntervalsList } from './IntervalsList';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_tourEvent, set_intervals, set_stateModalWindowThour, set_stateModalWindowThree } from '../../../../../../../GlobalStor';


interface Interval {
    start: number;
    end: number;
    startDateTime: string;
    endDateTime: string;
}


export const TimeTour = () => {

    const [mess, set_mess] = useState<string>('')
    const dispatch = useDispatch()
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);
    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);
    const intervals = useSelector((state: RootState) => state.slice.intervals);

    const formatDateTime = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };


    useEffect(() => {
        if (tourEvent.timeTour.length === 0) return;
        const newIntervals = tourEvent.timeTour.map(e => ({
            start: e.start,
            end: e.finish,
            startDateTime: formatDateTime(new Date(e.start * 1000)),
            endDateTime: formatDateTime(new Date(e.finish * 1000)),
        }));
        dispatch(set_intervals(newIntervals));
    }, []);



    const over = () => {
        dispatch(set_tourEvent({ ...tourEvent, timeTour: intervals.map(e => ({ start: e.start, finish: e.end })) }))
        dispatch(set_stateModalWindowThree({ ...stateModalWindowThree, status: false }))
        dispatch(set_intervals([]));
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