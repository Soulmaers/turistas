import React, { useState, useRef, useContext } from 'react';
import { MyContext, selectUserData } from '../../../../context/contexts';
import { IoSave } from "react-icons/io5";
import UserInput from './UserInput';
import DatePickerInput from './DatePickerInput';
import '../styles/ModalAddTour.css';


const ModalAddTour = () => {
    const { state, dispatch } = useContext(MyContext);
    const usersData = selectUserData(state)

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [finishDate, setFinishDate] = useState<Date | null>(null);
    const [messageAlarm, setMessageAlarm] = useState('');


    const nameInputRef = useRef<HTMLInputElement>(null);


    const closeModal = () => { dispatch({ type: 'update_modal', payload: false }); };



    const handleSaveClick = () => {
        const name = nameInputRef.current?.value;
        const hasName = !!name && name.trim() !== '';
        const hasStartDate = !!startDate;
        const hasFinishDate = !!finishDate;
        const hasUsers = usersData.some((user) => user.name.trim() !== '' && user.contact.trim() !== '');

        if (hasName && hasStartDate && hasFinishDate && hasUsers) {
            setMessageAlarm('Турнир успешно создан!');
        } else {
            let message = 'Добавьте:';
            if (!hasName) message += 'Название, ';
            if (!hasStartDate) message += 'Дата старта, ';
            if (!hasFinishDate) message += 'Дата завершения, ';
            if (!hasUsers) message += 'Участники, ';
            setMessageAlarm(message.slice(0, -2));
        }
    };
    console.log('рендеринг')
    return (
        <div className="modal_add_tour">
            <div className="header_modal_tour">Карточка турнира<span className="close" onClick={closeModal}>x</span></div>
            <div className="body_modal_tour">
                <div className="rows_card_tour">
                    <div className="name_car_tour">Название</div>
                    <input className="input_car_tour" ref={nameInputRef} />
                </div>
                <UserInput />
                <DatePickerInput label="Дата старта" selectedDate={startDate} onDateChange={setStartDate} />
                <DatePickerInput label="Дата завершения" selectedDate={finishDate} onDateChange={setFinishDate} />
            </div>
            <div className="footer_modal_tour">
                <div className="messageAlarm">{messageAlarm}</div>
                <IoSave className="start_tour" onClick={handleSaveClick} />
            </div>
        </div>
    );
};

export default ModalAddTour;