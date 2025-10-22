
import { useState, useEffect } from 'react'
import { statusTour } from '../stor'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, set_tourEvent, set_bigfish } from '../../../../GlobalStor'
import { useSetFinal } from '../hooks/getCatchs'

interface TimeDisplayProps {
    status: number;
    dateStart: string;
    dateFinish: string,
    name: string
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ status, dateStart, dateFinish, name }) => {
    const dispatch = useDispatch()
    const { setFinal } = useSetFinal()
    const bigFish = useSelector((state: RootState) => state.slice.bigFish)
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent)


    const calculaterTime = () => {
        const now = Math.floor(Date.now() / 1000);
        let diff = 0;

        if (status === 0) {
            diff = Number(dateStart) - now;
        } else if (status === 1) {
            diff = Number(dateFinish) - now;
        } else {
            // Для статуса 2 таймер не нужен
            return '';
        }

        if (diff < 0) diff = 0; // Не показываем отрицательное время

        const secondsInMinute = 60;
        const minutesInHour = 60;
        const hoursInDay = 24;

        const days = Math.floor(diff / (secondsInMinute * minutesInHour * hoursInDay));
        const hours = Math.floor((diff % (secondsInMinute * minutesInHour * hoursInDay)) / (secondsInMinute * minutesInHour));
        const minutes = Math.floor((diff % (secondsInMinute * minutesInHour)) / secondsInMinute);
        const seconds = Math.floor(diff % secondsInMinute);

        return `${String(days).padStart(2, '0')} д. ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    const [time, setTime] = useState<string | null>(() => calculaterTime());

    console.log(bigFish)
    useEffect(() => {
        const updateStatusAndTime = () => {
            const now = Math.floor(Date.now() / 1000);
            let newStatus = status;

            if (now >= Number(dateFinish)) {
                newStatus = 2;
                if (bigFish) setFinal(bigFish.idUser)
            } else if (now >= Number(dateStart)) {
                newStatus = 1;
            } else {
                newStatus = 0;
            }

            if (newStatus !== tourEvent.status) {
                dispatch(set_tourEvent({ ...tourEvent, status: newStatus }));
            }
            setTime(calculaterTime());
        }

        updateStatusAndTime(); // сразу при монтировании

        if (status === 0 || status === 1) {
            const intervalId = setInterval(() => {
                updateStatusAndTime();
            }, 1000);

            return () => clearInterval(intervalId);
        } else {
            setTime('');
        }
    }, [status, dateStart, dateFinish, dispatch, tourEvent, tourEvent.status]);

    return (
        <span className='status'>
            {status === 0 ? `${name}  (Старт: ${time})` : status === 1 ? `${name}  (Завершится через: ${time})` : `${name} ${statusTour[status]}`}
        </span>
    );
}


export default TimeDisplay