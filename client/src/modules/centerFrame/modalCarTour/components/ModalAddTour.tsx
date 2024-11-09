import React, { useState, useRef, useContext } from 'react';
import { MyContext } from '../../../../context/contexts';
import { IoSave } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io"
import UserInput from './UserInput'
import DatePickerInput from './DatePickerInput'
import '../styles/ModalAddTour.css'



const ModalAddTour = () => {

    const { state, dispatch } = useContext(MyContext)  //контекст для передачи состояния

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [finishDate, setFinishDate] = useState<Date | null>(null);
    const [messageAlarm, setMessageAlarm] = useState(''); // Состояние для сообщения об ошибке
    const [usersData, setUsersData] = useState<{ name: string, contact: string }[]>([]); // Состояние для данных участников

    const nameInputRef = useRef<HTMLInputElement>(null); // Ссылка на input для названия

    const addUser = () => {
        setUsersData([...usersData, { name: '', contact: '' }]);
    };

    const closeModal = () => {
        dispatch({ type: 'update_modal', payload: false })
    }
    const handleUserInputChange = (index: number, type: 'name' | 'contact', value: string) => {
        setUsersData((prevUsersData) => {
            return prevUsersData.map((user, i) => {
                if (i === index) {
                    return { ...user, [type]: value };
                }
                return user;
            });
        });
    };

    const handleSaveClick = () => {
        const name = nameInputRef.current?.value;
        const hasName = !!name && name.trim() !== '';
        const hasStartDate = !!startDate && startDate !== null;
        const hasFinishDate = !!finishDate && finishDate !== null;
        const hasUsers = usersData.some((user) => user.name.trim() !== '' && user.contact.trim() !== '');

        if (hasName && hasStartDate && hasFinishDate && hasUsers) {
            setMessageAlarm('Турнир успешно создан!');
        } else {
            let message = 'Добавьте:';
            if (!hasName) message += 'Название, ';
            if (!hasStartDate) message += 'Дата старта, ';
            if (!hasFinishDate) message += 'Дата завершения, ';
            if (!hasUsers) message += 'Участники, ';
            setMessageAlarm(message.slice(0, -2)); // Убираем лишнюю запятую
        }
    };


    return (
        <div className="modal_add_tour">
            <div className="header_modal_tour">Карточка турнира<span className="close" onClick={closeModal}>x</span></div>
            <div className="body_modal_tour">
                <div className="rows_card_tour"><div className="name_car_tour">Название</div><input className="input_car_tour" ref={nameInputRef} /></div>
                <div className="rows_card_tour"><div className="name_car_tour">Участники<IoMdAddCircle className="addUser" onClick={() => addUser()} /></div></div>
                <div className="users">
                    {usersData.map((user, index) => (
                        <UserInput key={index} index={index} user={user} onUserInputChange={handleUserInputChange} />
                    ))}
                </div>
                <DatePickerInput label="Дата старта" selectedDate={startDate} onDateChange={setStartDate} />
                <DatePickerInput label="Дата завершения" selectedDate={finishDate} onDateChange={setFinishDate} />


            </div>
            <div className="footer_modal_tour">
                <div className="messageAlarm">{messageAlarm}</div> <IoSave className="start_tour" onClick={handleSaveClick} />
            </div>
        </div>
    )
}


export default ModalAddTour;