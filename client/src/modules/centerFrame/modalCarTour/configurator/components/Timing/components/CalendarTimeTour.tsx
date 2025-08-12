import '../styles/CalendarTimeTour.css';
import { useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TimeWheel } from './Numeric';
import { CustomInput } from './CustopInput';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_intervals } from '../../../../../../../GlobalStor';

interface Interval {
    start: number;
    end: number;
    startDateTime: string;
    endDateTime: string;
}

interface PropCalendar {
    message: (value: string) => void;
}

export const CalendarTimeTour: React.FC<PropCalendar> = ({ message }) => {
    const dispatch = useDispatch();
    const intervals = useSelector((state: RootState) => state.slice.intervals);
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [finishDate, setFinishDate] = useState<Date | null>(null);
    const [startHour, setStartHour] = useState('00');
    const [startMinute, setStartMinute] = useState('00');
    const [endHour, setEndHour] = useState('00');
    const [endMinute, setEndMinute] = useState('00');

    const [activeWheelTarget, setActiveWheelTarget] = useState<'start' | 'end' | null>(null);

    const handleOpenWheel = (target: 'start' | 'end') => {
        setActiveWheelTarget(target);
    };

    const handleCloseWheel = () => {
        setActiveWheelTarget(null);
    };

    const handleSaveTime = (hour: string, minute: string) => {
        if (activeWheelTarget === 'start') {
            setStartHour(hour);
            setStartMinute(minute);
        } else if (activeWheelTarget === 'end') {
            setEndHour(hour);
            setEndMinute(minute);
        }
        handleCloseWheel();
    };

    const formatDateTime = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    const validateTime = (hour: string, minute: string): boolean => {
        const h = parseInt(hour, 10);
        const m = parseInt(minute, 10);
        return !isNaN(h) && h >= 0 && h <= 23 && !isNaN(m) && m >= 0 && m <= 59;
    };

    const handleAddInterval = useCallback(() => {
        console.log(startDate)
        if (!startDate || !finishDate) {
            message('Выберите обе даты');
            return;
        }
        console.log(startHour, startMinute)
        if (!validateTime(startHour, startMinute) || !validateTime(endHour, endMinute)) {
            message('Введите корректное время');
            return;
        }

        const startDateTime = new Date(startDate);
        startDateTime.setHours(parseInt(startHour, 10));
        startDateTime.setMinutes(parseInt(startMinute, 10));

        const finishDateTime = new Date(finishDate);
        finishDateTime.setHours(parseInt(endHour, 10));
        finishDateTime.setMinutes(parseInt(endMinute, 10));

        if (finishDateTime <= startDateTime) {
            message('Дата и время окончания должны быть позже начала');
            return;
        }

        const isOverlapping = intervals.some(interval => {
            const existingStart = new Date(interval.start * 1000);
            const existingEnd = new Date(interval.end * 1000);
            return (
                (startDateTime >= existingStart && startDateTime < existingEnd) ||
                (finishDateTime > existingStart && finishDateTime <= existingEnd) ||
                (startDateTime <= existingStart && finishDateTime >= existingEnd)
            );
        });

        if (isOverlapping) {
            message('Новый интервал пересекается с существующими интервалами');
            return;
        }
        console.log(startDateTime)
        const newInterval: Interval = {
            start: Math.floor(startDateTime.getTime() / 1000),
            end: Math.floor(finishDateTime.getTime() / 1000),
            startDateTime: formatDateTime(startDateTime),
            endDateTime: formatDateTime(finishDateTime),
        };

        console.log(newInterval)
        dispatch(set_intervals([...intervals, newInterval]));
        setStartDate(null);
        setFinishDate(null);
        setStartHour('00');
        setStartMinute('00');
        setEndHour('00');
        setEndMinute('00');
        message('');
    }, [startDate, finishDate, startHour, startMinute, endHour, endMinute, message, dispatch, intervals]);

    return (
        <div className="container_data">
            <div className="select_date">
                <div className="title_time">СТАРТ</div>
                <DatePicker
                    className="calendar_time"
                    selected={startDate}
                    onChange={setStartDate}
                    dateFormat="dd/MM/yyyy"
                    customInput={<CustomInput />}
                />
                <div className="hours_time_display"
                    style={{
                        backgroundColor: startDate ? '#ffffff' : '#e6fce6',
                        color: startDate ? '#000' : 'lightgray',
                        zIndex: activeWheelTarget === 'start' ? 15000 : 'auto'
                    }}
                    onClick={() => startDate && handleOpenWheel('start')}>
                    <span>{startHour.padStart(2, '0')} : {startMinute.padStart(2, '0')}</span>
                </div>
                {activeWheelTarget === 'start' && startDate && (
                    <TimeWheel
                        defaultHour={startHour || '00'}
                        defaultMinute={startMinute || '00'}
                        onSave={handleSaveTime}
                        onClose={handleCloseWheel}
                    />
                )}
            </div>


            <div className="tyre">-</div>

            <div className="select_date">
                <div className="title_time">КОНЕЦ</div>
                <DatePicker
                    className="calendar_time"
                    selected={finishDate}
                    onChange={setFinishDate}
                    dateFormat="dd/MM/yyyy"
                    customInput={<CustomInput />}
                />
                <div className="hours_time_display"
                    style={{
                        backgroundColor: finishDate ? '#ffffff' : '#e6fce6',
                        color: finishDate ? '#000' : 'lightgray',
                        zIndex: activeWheelTarget === 'end' ? 15000 : 'auto'
                    }}
                    onClick={() => finishDate && handleOpenWheel('end')}>
                    <span>{endHour.padStart(2, '0')} : {endMinute.padStart(2, '0')}</span>
                </div>
                {activeWheelTarget === 'end' && finishDate && (
                    <TimeWheel
                        defaultHour={endHour || '00'}
                        defaultMinute={endMinute || '00'}
                        onSave={handleSaveTime}
                        onClose={handleCloseWheel}
                    />
                )}
            </div>
            <div className="add_interval_btn" onClick={handleAddInterval}>ДОБАВИТЬ ИНТЕРВАЛ</div>
        </div>
    );
};


/*<input type='time' />*/
