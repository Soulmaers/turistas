
import { useState, useEffect } from 'react'
import { useAddTour } from '../hooks';
import { PropTour } from "./PropTour";
import { NameTour } from "./NameTour";
import DatePickerInput from './DatePickerInput'
import { Fishers } from './Fishers'
import ModalTwoLauout from '../../../servises/components/ModalTwoLauout'
import { DiscriptionQuestions } from '../../../modalComponents/components/DiscriptionQuestions'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_tour, set_stateModalWindowTwo, set_stateModalWindow } from '../../../../GlobalStor';

import { Configurator } from '../configurator/components/Configurator'
import '../styles/CarAddTour.css'

interface NewTour {
    nameTour: string;
    startDate: string;
    finishDate: string;
    created_by: string;
    users: {
        contactID: string;
        userId: number;
    }[]; // Используем массив объектов
}

export const CarAddTour = () => {
    const dispatch = useDispatch()
    const { addTour } = useAddTour()
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const stateModalWindowTwo = useSelector((state: RootState) => state.slice.stateModalWindowTwo);
    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);
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


    const renderTwo = () => {
        if (stateModalWindowTwo.status) {
            if (stateModalWindowTwo.type === 'reg') return <ModalTwoLauout style={{ top: '50%' }} onClose={() => dispatch(set_stateModalWindowTwo({ ...stateModalWindowTwo, status: false }))}>
                <Configurator modalConfig={() => dispatch(set_stateModalWindowTwo({ ...stateModalWindowTwo, status: false }))} /></ModalTwoLauout>
            if (stateModalWindowTwo.type === 'discription_questions') return <ModalTwoLauout style={{ top: '50%' }} onClose={() => dispatch(set_stateModalWindowTwo({ ...stateModalWindowTwo, status: false }))}><DiscriptionQuestions /></ModalTwoLauout>

        } else {
            return null
        }
    }


    useEffect(() => {
        setMessageAlarm('Здесь будут находится сервисные сообщения, связанные с регистрацией. Например: Не заполнено назнание ТУРНИРА!')
    }, [])
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
    const arrayFishers = (fishers: { contactID: string; userId: number, name_user: string }[]) => {
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

    const renderDiscripton = ('Задать параметры турнира, такие как Время проведения, рыба, тип ловли, приманка и прочее, вы можете в регламенте турнира. Если какой-то из параметров не будет заполнен, то он считается не регламентированным (без ограничений).')
    const cancel = () => {
        dispatch(set_stateModalWindow({ type: 'add_tour', status: false }))
    }
    return (<div className="modal_tour">

        <div className="title_tour header_modal_add_tour">СОЗДАНИЕ ТУРНИРА</div>
        <div className="body_set_tour">
            <NameTour name={''} flag={false} updateTourTitle={updateTour} />
            <Fishers flag={true} />
            <div className="discription_add_tour">{renderDiscripton}</div>
            <PropTour text={'ДОБАВИТЬ РЕГЛАМЕНТ ТУРНИРА'} pref={'reg'} />

        </div>
        <div className="messageAlarm">{messageAlarm}</div>
        <div className=" footer_modal_tour footer_create_tour">
            <div className="title_tour start_tour" onClick={hand}>СОЗДАТЬ</div>
            <div className="title_tour start_tour" onClick={cancel}>ОТМЕНА</div>
        </div>

    </div>)
}
/*  {renderTwo()}*/
/*<div className="date_container"><DatePickerInput flag={false} label="СТАРТ" selectedDate={startDate} onDateChange={updateTourStartDate} />
                <DatePickerInput label="КОНЕЦ" flag={false} selectedDate={finishDate} onDateChange={updateTourFinishDate} />
            </div>*/