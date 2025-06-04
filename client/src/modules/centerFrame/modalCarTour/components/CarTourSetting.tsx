import { useState, useEffect } from 'react'
import { useUpdateTour } from '../hooks'
import { IoSave } from "react-icons/io5";
import { DeleteTour } from './DeleteTour'
import { PropTour } from "./PropTour";
import { NameTour } from "./NameTour";
import { QRcomponent } from "./QRcomponent";
import ModalTwoLauout from '../../../servises/components/ModalTwoLauout'
import { FormDeleteTour } from '../../../modalComponents/components/FormDeleteTour'
import DatePickerInput from './DatePickerInput'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_stateModalWindowTwo, set_stateModalWindow, set_tour } from '../../../../GlobalStor';

import '../styles/CarSetting.css'

export const CardTourSetting = () => {
    const dispatch = useDispatch()
    const { updateTour } = useUpdateTour()
    const [dels, setDels] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [messageAlarm, setMessageAlarm] = useState('');
    const tourData = useSelector((state: RootState) => state.slice.tour);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [finishDate, setFinishDate] = useState<Date | null>(null);
    const stateModalWindowTwo = useSelector((state: RootState) => state.slice.stateModalWindowTwo);

    useEffect(() => {
        console.log(tourData)
        if (tourData) {
            setStartDate(new Date(Number(tourData.dateStart) * 1000))
            setFinishDate(new Date(Number(tourData.dateFinish) * 1000))
        }

    }, [])


    if (!tourData.id) return null

    const updateTourTitle = (newName: string) => {
        dispatch(set_tour({ ...tourData, nameTour: newName }))
    };
    const updateTourStartDate = (newDate: Date | null) => {
        if (newDate) {
            setStartDate(newDate)
            dispatch(set_tour({ ...tourData, dateStart: String(new Date(newDate).getTime() / 1000) }))

        }

    };
    const updateTourFinishDate = (newDate: Date | null) => {
        if (newDate) {
            setFinishDate(newDate)
            dispatch(set_tour({ ...tourData, dateFinish: String(new Date(newDate).getTime() / 1000) }))
        }

    };
    const hand = async () => {
        console.log(tourData)
        if (tourData.users.length !== 0 && tourData.nameTour !== '' && tourData.dateStart !== 'null' && tourData.dateFinish !== 'null') {
            console.log('все ок')

            const { id, nameTour, dateStart, dateFinish, users } = tourData
            const res = await updateTour({ id, nameTour, dateStart, dateFinish, users })
            dispatch(set_stateModalWindow({ type: 'stateModal', status: false }))
        }
        else {
            let message = 'Добавьте:';
            if (tourData.nameTour === '') message += ' Название. ';
            if (tourData.dateStart === 'null') message += ' Дата старта. ';
            if (tourData.dateFinish === 'null') message += ' Дата завершения. ';
            if (tourData.users.length === 0) message += ' Участников. '
            setMessageAlarm(message);
        }

    }




    return (<div className="modal_tour">
        <div className="title_tour header_modal_tour">НАСТРОЙКИ СОБЫТИЯ</div>
        <div className="body_set_tour">
            <NameTour name={tourData.nameTour} flag={true} updateTourTitle={updateTourTitle} />
            <DeleteTour idTour={tourData.id} name={tourData.nameTour} />
            <QRcomponent />
            <PropTour text={'РЕДАКТИРОВАТЬ УЧАСТНИКОВ'} pref={'fishers'} />
            <PropTour text={'РЕДАКТИРОВАТЬ РЕГЛАМЕНТ СОБЫТИЯ'} pref={'reg'} />
            <PropTour text={'РЕДАКТИРОВАТЬ ВИД РЫБЫ'} pref={'fishs'} />
            <PropTour text={'КРИТЕРИИ ПОБЕДЫ'} pref={'wins'} />
            <div className="date_container"><DatePickerInput label="СТАРТ" flag={true} selectedDate={startDate} onDateChange={updateTourStartDate} />
                <DatePickerInput label="КОНЕЦ" flag={true} selectedDate={finishDate} onDateChange={updateTourFinishDate} />
            </div>
        </div>
        <div className="messageAlarm">{messageAlarm}</div>
        <div className=" footer_modal_tour">
            <div className="title_tour start_tour" onClick={hand}>ПРИМЕНИТЬ</div>
        </div>

    </div>)
}