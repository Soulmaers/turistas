
import '../styles/InfoChart.css'

import { useSelector, useDispatch } from 'react-redux';
import { set_stateModalWindowThour, RootState } from '../../../../../../../GlobalStor';






export const InfoChart = () => {
    const dispatch = useDispatch()

    const intervals = useSelector((state: RootState) => state.slice.intervals);

    const getMinMaxTime = () => {
        const allTimes = intervals.flatMap(interval => [interval.start, interval.end]);
        return {
            min: Math.min(...allTimes),
            max: Math.max(...allTimes),
        };
    };

    const { min, max } = getMinMaxTime();
    const totalDuration = max - min;

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    };
    const formatTime = (timestampSec: number) => {
        const date = new Date(timestampSec * 1000);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    const times = intervals.map((interval, index) => {
        const startPercentage = ((interval.start - min) / totalDuration) * 100; // Процент от начала
        const endPercentage = ((interval.end - min) / totalDuration) * 100; // Процент от конца
        const width = endPercentage - startPercentage; // Ширина интервала в процентах
        console.log(interval)

        return (

            <div className="interval_to_chart"
                key={index}
                style={{
                    position: 'absolute',
                    left: `${startPercentage}%`,
                    width: `${width}%`,
                    top: 0,
                    height: '100%',
                    backgroundColor: 'orange',
                    opacity: 0.7,
                }}
            > <span className="high_label_start">{formatDate(interval.start)}</span>
                <span className="low_label_start">{formatTime(interval.start)}</span>
                <span className="high_label_end">{formatDate(interval.end)}</span>
                <span className="low_label_end">{formatTime(interval.end)}</span></div>
        );
    })

    const back = () => {
        dispatch(set_stateModalWindowThour({ type: 'info_chart', status: false }))
    }
    return (<div className="modal_info_chart">

        <div className="title_tour header_modal_add_tour">ВРЕМЕННАЯ ШКАЛА</div>
        <div className="text_chart">Отображение интервалов турнира в графическом виде</div>
        <div className="chart">
            <div className="wrap_all_time">{times}</div>
        </div>
        <div className="legend">
            <div className="title_leg">Легенда:</div>
            <div className="row_content"><div className="cube orange"></div><div className="">Время турнира</div></div>
            <div className="row_content"><div className="cube gray"></div><div className="">Пауза</div></div>
        </div>
        <div className="footer_ok" onClick={back}>OK</div>
    </div>)
}