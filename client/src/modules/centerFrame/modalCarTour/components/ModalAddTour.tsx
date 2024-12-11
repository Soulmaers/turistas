import React, { useState, useRef, useEffect, useContext } from 'react';
import { MyContext } from '../../../servises/contexs/contexts';
import { TourData, Participants } from '../../../servises/contexs/contextStateTourData'
import { ContextForm } from '../../../servises/contexs/contextCloseForm';
import Modal from '../../../servises/components/Modal'
import TextInfoModal from '../../../servises/components/TextInfoModal';
import useAddTour from '../hooks'
import { IoSave } from "react-icons/io5";
import UserInput from './UserInput';
import DatePickerInput from './DatePickerInput';
import '../styles/ModalAddTour.css';



const ModalAddTour = () => {
    const tourData = useContext(TourData)
    console.log(tourData)
    const [dels, setDels] = useState<boolean>(false)
    const [text, setText] = useState<string>('')

    const { state } = useContext(MyContext);

    const { dispatch: dispatchForm } = useContext(ContextForm)
    //   const [users, setUsers] = useState<Participants[]>([])
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [finishDate, setFinishDate] = useState<Date | null>(null);
    const [messageAlarm, setMessageAlarm] = useState('');

    const { addTour } = useAddTour()
    const nameInputRef = useRef<HTMLInputElement>(null);
    const modalka = useRef<HTMLDivElement>(null)


    useEffect(() => {
        if (nameInputRef.current) nameInputRef.current.value = tourData?.tour?.nameTour || '';
        setStartDate(new Date(Number(tourData?.tour?.dateStart) * 1000))
        setFinishDate(new Date(Number(tourData?.tour?.dateFinish) * 1000))
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
        console.log(updatedUsers)
        tourData?.setTour((prev) => ({ ...prev, users: updatedUsers }))
        //    setUsers(updatedUsers);
    };
    const closeModal = () => { dispatchForm({ type: 'update_modal', payload: false }); };

    const handleSaveClick = async () => {
        const name = nameInputRef.current?.value;
        const hasName = !!name && name.trim() !== '';
        const hasStartDate = !!startDate;
        const hasFinishDate = !!finishDate;
        const hasUsers = tourData?.tour.users.every((user) => user.name_user.trim() !== '' && user.contactID.length === 11);
        if (tourData?.tour.users.length !== 0 && hasName && hasStartDate && hasFinishDate && hasUsers) {
            const startUnixTime = (new Date(startDate)).getTime() / 1000
            const finishUnixTime = (new Date(finishDate)).getTime() / 1000
            const created_by = state.userStatus.user?.id
            const users = tourData?.tour.users
            const res = await addTour({ name, startUnixTime, finishUnixTime, created_by, users })
            setTimeout(() => (setDels(false), closeModal()), 1000)
            setDels(true)
            setText(res)
            setMessageAlarm('Турнир успешно создан!');
        } else {
            let message = 'Добавьте:';
            if (!hasName) message += 'Название, ';
            if (!hasStartDate) message += 'Дата старта, ';
            if (!hasFinishDate) message += 'Дата завершения, ';
            if (tourData?.tour.users.length === 0 || !hasUsers) message += 'Участники, ';
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
                    <UserInput users={tourData?.tour.users || []} onUsersChange={handleUsersChange} />
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