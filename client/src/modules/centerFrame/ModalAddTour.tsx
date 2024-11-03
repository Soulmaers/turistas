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

    const addUser = () => {
        setArray([...array, 'user']);
    };

    const users = array.map((e, index) => (
        <div key={e + index} className="user_card">
            <div className="rows_user"><div className="label_name">Имя</div><input className="input_user_value" /></div>
            <div className="rows_user"><div className="label_name">КонтактID</div><input className="input_user_value" /></div>
        </div>
    ));


    const handleStartDateFocus = () => {
        setShowStartDateCalendar(true);

    };

    return (
        <div className="modal_add_tour">
            <div className="header_modal_tour">Карточка турнира<span className="close" onClick={closeHandler}>x</span></div>
            <div className="body_modal_tour">
                <div className="rows_card_tour"><div className="name_car_tour">Название</div><input className="input_car_tour" /></div>
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
                <div className="messageAlarm"></div><IoSave className="start_tour" />
            </div>
        </div>
    )
}


export default ModalAddTour;