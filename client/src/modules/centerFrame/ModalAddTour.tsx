import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { IoSave } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io"
import './ModalAddTour.css'


interface ModalAddTourProps {
    closeHandler: () => void; // Указываем тип функции onClose
}

const ModalAddTour: React.FC<ModalAddTourProps> = ({ closeHandler }) => {
    const [array, setArray] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [finishDate, setFinishDate] = useState<Date | null>(null);
    const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);

    const [messageAlarm, setMessageAlarm] = useState(''); // Состояние для сообщения об ошибке

    const nameInputRef = useRef<HTMLInputElement>(null); // Ссылка на input для названия

    const [usersData, setUsersData] = useState<
        { name: string, contact: string }[]
    >([]); // Состояние для данных участников


    const addUser = () => {
        setArray([...array, 'user']);
        setUsersData([...usersData, { name: '', contact: '' }]);
    };

    const users = array.map((e, index) => (
        <div key={e + index} className="user_card">
            <div className="rows_user">
                <div className="label_name">Имя</div>
                <input
                    className="input_user_value"
                    onChange={(event) => handleUserInputChange(index, 'name', event.target.value)}
                />
            </div>
            <div className="rows_user">
                <div className="label_name">КонтактID</div>
                <input
                    className="input_user_value"
                    onChange={(event) => handleUserInputChange(index, 'contact', event.target.value)}
                />
            </div>
        </div>
    ));


    const handleStartDateFocus = () => {
        setShowStartDateCalendar(true);

    };
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
            <div className="header_modal_tour">Карточка турнира<span className="close" onClick={closeHandler}>x</span></div>
            <div className="body_modal_tour">
                <div className="rows_card_tour"><div className="name_car_tour">Название</div><input className="input_car_tour" ref={nameInputRef} /></div>
                <div className="rows_card_tour"><div className="name_car_tour">Участники<IoMdAddCircle className="addUser" onClick={() => addUser()} /></div></div>
                <div className="users">{users}</div>
                <div className="rows_card_tour"><div className="name_car_tour">Дата старта</div>
                    <DatePicker className="input_card_tour_picker"
                        selected={startDate}
                        onFocus={handleStartDateFocus}
                        onChange={(date) => {
                            if (date) {
                                setStartDate(date);
                                setShowStartDateCalendar(false); // Скрываем календарь после выбора
                            }
                        }}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="rows_card_tour"><div className="name_car_tour">Дата завершения</div>
                    <DatePicker className="input_card_tour_picker"
                        selected={finishDate}
                        onFocus={handleStartDateFocus}
                        onChange={(date) => {
                            if (date) {
                                setFinishDate(date);
                                setShowStartDateCalendar(false); // Скрываем календарь после выбора
                            }
                        }}
                        dateFormat="dd/MM/yyyy"
                    /></div>


            </div>
            <div className="footer_modal_tour">
                <div className="messageAlarm">{messageAlarm}</div> <IoSave className="start_tour" onClick={handleSaveClick} />
            </div>
        </div>
    )
}


export default ModalAddTour;