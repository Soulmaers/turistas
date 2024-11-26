import React, { useState, useRef, useContext } from 'react';
import { MyContext } from '../../../servises/contexs/contexts';
import { ContextForm } from '../../../servises/contexs/contextCloseForm';
import useAddTour from '../hooks'
import { IoSave } from "react-icons/io5";
import UserInput from './UserInput';
import DatePickerInput from './DatePickerInput';
import '../styles/ModalAddTour.css';

interface UpdateData {
    name: string,
    contact: string
}
const ModalAddTour = () => {
    const { state, dispatch } = useContext(MyContext);
    const { dispatch: dispatchForm } = useContext(ContextForm)
    const [users, setUsers] = useState<UpdateData[]>([])
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [finishDate, setFinishDate] = useState<Date | null>(null);
    const [messageAlarm, setMessageAlarm] = useState('');

    const { addTour } = useAddTour()
    const nameInputRef = useRef<HTMLInputElement>(null);

    const handleUsersChange = (updatedUsers: UpdateData[]) => {
        setUsers(updatedUsers);
    };
    const closeModal = () => { dispatchForm({ type: 'update_modal', payload: false }); };



    const handleSaveClick = () => {
        const name = nameInputRef.current?.value;
        const hasName = !!name && name.trim() !== '';
        const hasStartDate = !!startDate;
        const hasFinishDate = !!finishDate;
        console.log(users)
        const hasUsers = users.every((user) => user.name.trim() !== '' && user.contact.length === 11);
        console.log(hasUsers)
        if (users.length !== 0 && hasName && hasStartDate && hasFinishDate && hasUsers) {
            const startUnixTime = (new Date(startDate)).getTime() / 1000
            const finishUnixTime = (new Date(finishDate)).getTime() / 1000
            const created_by = state.userStatus.user?.id
            closeModal()
            addTour({ name, startUnixTime, finishUnixTime, created_by, users })
            setMessageAlarm('Турнир успешно создан!');
        } else {
            let message = 'Добавьте:';
            if (!hasName) message += 'Название, ';
            if (!hasStartDate) message += 'Дата старта, ';
            if (!hasFinishDate) message += 'Дата завершения, ';
            if (users.length === 0 || !hasUsers) message += 'Участники, ';
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
                <UserInput users={users} onUsersChange={handleUsersChange} />
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