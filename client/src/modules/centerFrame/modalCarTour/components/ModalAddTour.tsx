import React, { useState, useRef, useEffect, useContext } from 'react';
import { Participants } from '../../../../GlobalStor'

import Modal from '../../../servises/components/Modal'
import TextInfoModal from '../../../servises/components/TextInfoModal';
import useAddTour from '../hooks'
import { IoSave } from "react-icons/io5";
import UserInput from './UserInput';
import DatePickerInput from './DatePickerInput';
import '../styles/ModalAddTour.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, update_modal, set_tour } from '../../../../GlobalStor';


const ModalAddTour = () => {
    const dispatch = useDispatch()
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const tourData = useSelector((state: RootState) => state.slice.tour);


    const [dels, setDels] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [finishDate, setFinishDate] = useState<Date | null>(null);
    const [messageAlarm, setMessageAlarm] = useState('');

    const { addTour } = useAddTour()
    const nameInputRef = useRef<HTMLInputElement>(null);
    const modalka = useRef<HTMLDivElement>(null)
    console.log(tourData)

    useEffect(() => {
        if (nameInputRef.current) nameInputRef.current.value = tourData?.nameTour || '';
        setStartDate(tourData?.nameTour === '' ? null : new Date(Number(tourData?.dateStart) * 1000))
        setFinishDate(tourData?.nameTour === '' ? null : new Date(Number(tourData?.dateFinish) * 1000))
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalka.current && !modalka.current.contains(event.target as Node)) {
                closeModal();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [])

    const handleUsersChange = (updatedUsers: Participants[]) => {
        if (tourData) {
            dispatch(set_tour({ ...tourData, users: updatedUsers }))
        }
    };
    const closeModal = () => {
        dispatch(update_modal(false))
        if (tourData) {
            dispatch(set_tour({
                id: null,
                nameTour: '',
                dateStart: '',
                dateFinish: '',
                users: [{
                    name_user: userStatus.user?.name_user || '', // Защита от отсутствия данных
                    contactID: userStatus.user?.contactID || '',
                    userID: userStatus.user?.id || null // Или любое другое значение по умолчанию
                }]
            }))
        }

    };

    const handleSaveClick = async () => {
        const name = nameInputRef.current?.value;
        const hasName = !!name && name.trim() !== '';
        const hasStartDate = !!startDate;
        const hasFinishDate = !!finishDate;
        const hasUsers = tourData?.users.every((user) => user.name_user.trim() !== '' && user.contactID.length === 11);
        if (tourData?.users.length !== 0 && hasName && hasStartDate && hasFinishDate && hasUsers) {
            const startUnixTime = (new Date(startDate)).getTime() / 1000
            const finishUnixTime = (new Date(finishDate)).getTime() / 1000
            const created_by = userStatus.user?.id
            const users = tourData?.users
            const idTour = tourData?.id
            const res = await addTour({ idTour, name, startUnixTime, finishUnixTime, created_by, users })
            setTimeout(() => (setDels(false), closeModal()), 1000)
            setDels(true)
            setText(res)
            setMessageAlarm('Турнир успешно создан!');
        } else {
            let message = 'Добавьте:';
            if (!hasName) message += 'Название, ';
            if (!hasStartDate) message += 'Дата старта, ';
            if (!hasFinishDate) message += 'Дата завершения, ';
            if (tourData?.users.length === 0 || !hasUsers) message += 'Участники, ';
            setMessageAlarm(message.slice(0, -2));
        }
    };
    return (
        <>
            {dels && <Modal><TextInfoModal text={text} /></Modal>}
            <div className="modal_add_tour" ref={modalka}>
                <div className="header_modal_tour">Карточка турнира</div>
                <div className="body_modal_tour">
                    <div className="rows_card_tour">
                        <div className="name_car_tour">Название</div>
                        <input className="input_car_tour" ref={nameInputRef} />
                    </div>
                    <UserInput users={tourData?.users || []} onUsersChange={handleUsersChange} />
                    <DatePickerInput label="Дата старта" selectedDate={startDate} onDateChange={setStartDate} />
                    <DatePickerInput label="Дата завершения" selectedDate={finishDate} onDateChange={setFinishDate} />
                </div>
                <div className="footer_modal_tour">
                    <div className="messageAlarm">{messageAlarm}</div>
                    <IoSave className="start_tour" onClick={handleSaveClick} />
                </div>
            </div>
        </>
    );
};

export default ModalAddTour;