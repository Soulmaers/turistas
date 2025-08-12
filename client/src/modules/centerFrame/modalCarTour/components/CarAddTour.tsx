
import { useState, useEffect } from 'react'
import { useAddTour } from '../hooks';
import { PropTour } from "./PropTour";
import { NameTour } from "./NameTour";
import DatePickerInput from './DatePickerInput'
import { Fishers } from './Fishers'
import ModalTwoLauout from '../../../servises/components/ModalTwoLauout'
import { DiscriptionQuestions } from '../../../modalComponents/components/DiscriptionQuestions'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_tour, set_tourEvent, set_stateModalWindowTwo, set_stateModalWindow } from '../../../../GlobalStor';

import { Configurator } from '../configurator/components/Configurator'
import '../styles/CarAddTour.css'



export const CarAddTour = () => {
    const dispatch = useDispatch()
    const { addTour } = useAddTour()
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);
    const state = useSelector((state: RootState) => state.slice.stateCardTour);
    const [messageAlarm, setMessageAlarm] = useState('');





    useEffect(() => {
        setMessageAlarm('Здесь будут находится сервисные сообщения, связанные с регистрацией. Например: Не заполнено назнание ТУРНИРА!')
    }, [])
    const updateTour = (newName: string) => {
        dispatch(set_tourEvent({ ...tourEvent, name: newName }))

    };


    const hand = async () => {
        const created_by = userStatus.user?.id
        const notiming = tourEvent.timeTour.length === 0
        const fishers = tourEvent.fishers.length === 0
        const hasFalse = Object.values(state).some(value => value === false);
        if (tourEvent.name !== '' && !notiming && !fishers && !hasFalse) {

            const res = await addTour({ tourEvent, created_by })
            cancel()
        }
        else {
            let message = 'Добавьте:';
            if (tourEvent.name === '') message += ' Название, ';
            if (fishers) message += ' Участников, ';
            if (hasFalse || notiming) message += ' Регламент турнира, ';
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
