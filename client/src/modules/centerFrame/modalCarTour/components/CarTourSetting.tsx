import { useState, useEffect } from 'react'
import { useUpdateTour } from '../hooks'
import { IoSave } from "react-icons/io5";
import { DeleteTour } from './DeleteTour'
import { PropTour } from "./PropTour";
import { NameTour } from "./NameTour";
import TournamentQRCode from "./QRcomponent";
import ModalTwoLauout from '../../../servises/components/ModalTwoLauout'
import { FormDeleteTour } from '../../../modalComponents/components/FormDeleteTour'
import DatePickerInput from './DatePickerInput'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_stateCardTour, set_tourEvent, set_stateModalWindow, set_tour } from '../../../../GlobalStor';

import '../styles/CarSetting.css'

export const CardTourSetting = () => {
    const dispatch = useDispatch()
    const { updateTour } = useUpdateTour()
    const [messageAlarm, setMessageAlarm] = useState('');
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);

    const state = useSelector((state: RootState) => state.slice.stateCardTour);
    console.log(tourEvent)
    useEffect(() => {

        if (!tourEvent.id) return
        dispatch(set_stateCardTour({ ...state, typeBaits: true, typeCatch: true, fish: true, reservours: true }))

    }, [])


    if (!tourEvent.id) return null

    const updateTourTitle = (newName: string) => {
        dispatch(set_tourEvent({ ...tourEvent, name: newName }))
    };

    const hand = async () => {
        console.log(tourEvent)
        const notiming = tourEvent.timeTour.length === 0
        const fishers = tourEvent.fishers.length === 0
        const hasFalse = Object.values(state).some(value => value === false);
        if (tourEvent.name !== '' && !notiming && !fishers && !hasFalse) {
            console.log('все ок')


            const res = await updateTour(tourEvent)
            dispatch(set_stateModalWindow({ type: 'stateModal', status: false }))
        }
        else {
            let message = 'Добавьте:';
            if (tourEvent.name === '') message += ' Название, ';
            if (fishers) message += ' Участников, ';
            if (hasFalse || notiming) message += ' Регламент турнира, ';
            setMessageAlarm(message.slice(0, -2));
        }

    }


    return (<div className="modal_tour">
        <div className="title_tour header_modal_tour">НАСТРОЙКИ СОБЫТИЯ</div>
        <div className="body_set_tour">
            <NameTour name={tourEvent.name} flag={true} updateTourTitle={updateTourTitle} />
            <DeleteTour idTour={tourEvent.id} name={tourEvent.name} />
            {tourEvent?.link && <TournamentQRCode link={tourEvent?.link} />}
            <PropTour text={'РЕДАКТИРОВАТЬ УЧАСТНИКОВ'} pref={'fishers'} />
            <PropTour text={'РЕДАКТИРОВАТЬ РЕГЛАМЕНТ ТУРНИРА'} pref={'reg'} />
        </div>
        <div className="messageAlarm">{messageAlarm}</div>
        <div className=" footer_modal_tour">
            <div className="title_tour start_tour" onClick={hand}>ПРИМЕНИТЬ</div>
        </div>

    </div>)
}