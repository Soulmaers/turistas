
import '../styles/IntervalsList.css'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_intervals, set_stateModalWindowThour, set_stateModalWindowThree } from '../../../../../../../GlobalStor';

interface Interval {
    start: number;
    end: number;
    startDateTime: string;
    endDateTime: string;
}
interface PropIntervals {
    intervals: {
        start: number;
        end: number;
        startDateTime: string;
        endDateTime: string;
    }[];
}

export const IntervalsList: React.FC<PropIntervals> = ({ intervals }) => {

    const dispatch = useDispatch()

    const delInterval = (index: number) => {
        console.log(index)
        const updatedIntervals = intervals.filter((_, ind) => ind !== index);
        // Обновляем состояние с новым массивом
        dispatch(set_intervals(updatedIntervals))
    }
    const sortedIntervals = [...intervals].sort((a, b) => a.start - b.start);

    const row = sortedIntervals.map((e, index) => (
        <div className="row_wrap_interval" key={index}>
            <div className="title_interval">{`Интервал ${index + 1}`}</div>
            <div className="body_interval">{e.startDateTime} — {e.endDateTime}</div>
            <span className="del_interval" onClick={() => delInterval(index)}></span>
        </div>
    ));

    return (<div className="container_intervals">
        {row}
    </div>)
}




