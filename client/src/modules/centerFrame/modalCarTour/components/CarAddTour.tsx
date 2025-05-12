
import { useState, useEffect } from 'react'
import { useAddTour } from '../hooks';
import { PropTour } from "./PropTour";
import { NameTour } from "./NameTour";
import DatePickerInput from './DatePickerInput'
import { Fishers } from './Fishers'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, update_modal, set_tour, set_bigfish, set_add_tour } from '../../../../GlobalStor';
import { Tournament } from '../../../form/components/Interface';

import '../styles/CarAddTour.css'

interface NewTour {
    nameTour: string;
    startDate: string;
    finishDate: string;
    created_by: string;
    users: {
        contactId: string;
        userId: number;
    }[]; // Используем массив объектов
}

export const CarAddTour = () => {
    const dispatch = useDispatch()
    const { addTour } = useAddTour()
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [finishDate, setFinishDate] = useState<Date | null>(null);
    const [messageAlarm, setMessageAlarm] = useState('');
    const [newTour, setNewTour] = useState<NewTour>({
        nameTour: '',
        startDate: '',
        finishDate: '',
        created_by: '',
        users: [] // Начальное состояние для пользователей
    });
    const updateTour = (newName: string) => {
        setNewTour((prev) => ({
            ...prev,
            nameTour: newName  // Исправлено на правильный синтаксис
        }));

        //  dispatch(set_tour({ ...tourData, nameTour: newName }))
    };
    const updateTourStartDate = (newDate: Date | null) => {
        if (newDate) {
            setStartDate(newDate)
            setNewTour((prev) => ({
                ...prev,
                startDate: String(new Date(newDate).getTime() / 1000)
            }));

        }

    };
    const updateTourFinishDate = (newDate: Date | null) => {
        if (newDate) {
            setFinishDate(newDate)
            setNewTour((prev) => ({
                ...prev,
                finishDate: String(new Date(newDate).getTime() / 1000)
            }));
        }

    };
    const arrayFishers = (fishers: { contactId: string; userId: number }[]) => {
        console.log(fishers)
        setNewTour((prev) => ({
            ...prev,
            users: fishers
        }));
    }

    const hand = async () => {
        const created_by = userStatus.user?.id
        console.log(newTour)
        if (newTour.nameTour !== '' && newTour.startDate !== '' && newTour.finishDate !== '' && newTour.users.length !== 0) {
            console.log('все ок')

            const { nameTour, startDate, finishDate, users } = newTour
            const res = await addTour({ nameTour, startDate, finishDate, created_by, users })
            cancel()
        }
        else {
            let message = 'Добавьте:';
            if (newTour.nameTour === '') message += ' Название, ';
            if (newTour.startDate === '') message += ' Дата старта, ';
            if (newTour.finishDate === '') message += ' Дата завершения, ';
            if (newTour.users.length === 0) message += ' Участников, ';
            setMessageAlarm(message.slice(0, -2));
        }

    }

    const cancel = () => {
        dispatch(set_add_tour(false))
    }
    return (<div className="modal_tour">
        <div className="title_tour header_modal_add_tour">СОЗДАНИЕ СОБЫТИЯ</div>
        <div className="body_set_tour">
            <NameTour name={''} flag={false} updateTourTitle={updateTour} />
            <Fishers mess={setMessageAlarm} addFishers={arrayFishers} />
            <PropTour text={'ДОБАВИТЬ РЕГЛАМЕНТ СОБЫТИЯ'} pref={'reg'} />
            <PropTour text={'УКАЗАТЬ ВИД РЫБЫ'} pref={'fishs'} />
            <PropTour text={'КРИТЕРИИ ПОБЕДЫ'} pref={'wins'} />
            <div className="date_container"><DatePickerInput flag={false} label="СТАРТ" selectedDate={startDate} onDateChange={updateTourStartDate} />
                <DatePickerInput label="КОНЕЦ" flag={false} selectedDate={finishDate} onDateChange={updateTourFinishDate} />
            </div>
        </div>
        <div className="messageAlarm">{messageAlarm}</div>
        <div className=" footer_modal_tour footer_create_tour">
            <div className="title_tour start_tour" onClick={hand}>СОЗДАТЬ</div>
            <div className="title_tour start_tour" onClick={cancel}>ОТМЕНА</div>
        </div>

    </div>)
}