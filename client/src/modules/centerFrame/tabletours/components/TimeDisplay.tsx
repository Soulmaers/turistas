
import { useState, useEffect } from 'react'
import { statusTour } from '../stor'
import '../styles/AddCarTournament.css'

interface TimeDisplayProps {
    status: number;
    dateStart: string;
    dateFinish: string
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ status, dateStart, dateFinish }) => {

    const [time, setTime] = useState<string | null>(null);

    const calculaterTime = () => {
        const now = new Date();
        const diff = status === 0 ? Number(dateStart) - Math.floor(now.getTime() / 1000) : Number(dateFinish) - Math.floor(now.getTime() / 1000);
        if (diff > 0) {
            const secondsInMinute = 60;
            const minutesInHour = 60;
            const hoursInDay = 24;

            const days = Math.floor(diff / (secondsInMinute * minutesInHour * hoursInDay));
            const hours = Math.floor((diff % (secondsInMinute * minutesInHour * hoursInDay)) / (secondsInMinute * minutesInHour));
            const minutes = Math.floor((diff % (secondsInMinute * minutesInHour)) / secondsInMinute);
            const seconds = Math.floor(diff % secondsInMinute);

            return `${String(days).padStart(2, '0')} д. ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {

            return null; // Сообщение, если время вышло
        }

    }
    useEffect(() => {
        if (status === 0 || status === 1) {
            setTime(calculaterTime())
            const intervalId = setInterval(() => setTime(calculaterTime()), 1000);
            return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
        } else {
            setTime(null); // Очищаем значение если статус не 0
        }
    }, [status, dateStart, dateFinish]);

    return (
        <span className='status'>
            {status === 0 ? `(Старт: ${time})` : status === 1 ? `(Завершится через: ${time})` : statusTour[status]}
        </span>
    );
}


export default TimeDisplay