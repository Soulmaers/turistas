import '../styles/Configurator.css'
import { useState, useEffect } from 'react'
import ModalThreeLauout from '../../../../servises/components/ModalThreeLauout'
import { TimeTour } from './Timing/components/TimeTour';
import { SwapeComponent } from './SwapeComponent'

import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_tourEvent, set_stateCardTour, set_stateModalWindowThree } from '../../../../../GlobalStor';

interface ModalProps {

    modalConfig: () => void;
}

export const Configurator: React.FC<ModalProps> = ({ modalConfig }) => {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state.slice.stateCardTour);
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);
    const [error, setError] = useState(false)
    const [foto, setFoto] = useState({
        fotoAll: tourEvent.fotoAll,
        fotoLider: tourEvent.fotoLider
    });


    const toggleBait = (key: keyof typeof foto) => {
        setFoto(prev => ({ ...prev, [key]: !prev[key] }));
        dispatch(set_tourEvent({ ...tourEvent, [key]: !foto[key] }));
    };


    const arrayContent = [{ text: 'ВРЕМЯ ПРОВЕДЕНИЯ ТУРНИРА', state: 'time', component: 'timing' },
    { text: 'КРИТЕРИЙ ВЕС/ДЛИННА/КОЛИЧЕСТВО', state: 'criter', component: 'crivictory' },
    { text: 'УКАЖИТЕ ВИД РЫБЫ', state: 'fish', component: 'fishs' },
    { text: 'УКАЖИТЕ ВОДОЁМ', state: 'tiresreservour', component: 'reservours' },
    { text: 'УКАЖИТЕ ТИП ЛОВЛИ', state: 'type_catch', component: 'catch' },
    { text: 'УКАЖИТЕ ВИД ПРИМАНКИ', state: 'type_baits', component: 'baits' },
    { text: 'ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ', state: 'dopishue', component: 'dopsub' }
    ]

    const renderFields = () => {
        const arrayState: Record<string, boolean> = {
            timing: tourEvent.timeTour.length !== 0,
            crivictory: tourEvent.criVictory.id !== 0,
            fishs: state.fish,
            reservours: state.reservours,
            catch: state.typeCatch,
            baits: state.typeBaits,
            dopsub: true
        }
        let buttons;
        if (error) {
            buttons = arrayContent.map(e => <div className="wrap_row" style={{ border: !arrayState[e.component] ? '1px solid red' : '' }} key={e.text} onClick={() => onClickButton(e.state)}>{e.text}</div>)
        }
        else {
            buttons = arrayContent.map(e => <div className="wrap_row" key={e.text} onClick={() => onClickButton(e.state)}>{e.text}</div>)
        }

        return buttons
    }

    const onClickButton = (state: string) => {
        dispatch(set_stateModalWindowThree({ type: state, status: true }));
    }

    const create = () => {
        const hasFalse = Object.values(state).some(value => value === false);
        const notiming = tourEvent.timeTour.length === 0
        const nocrivictory = tourEvent.criVictory.id === 0
        if (hasFalse || notiming || nocrivictory) {
            setError(true)
            return
        }

        modalConfig()
        console.log(tourEvent)
    }

    const cancel = () => {

        const defaultState = {
            fish: false,
            reservours: false,
            typeCatch: false,
            typeBaits: false,
        };
        dispatch(set_stateCardTour(defaultState));
        dispatch(set_tourEvent({
            ...tourEvent, criVictory: { id: 1, name: 'Вес максимальный' }, fishs: [], reservours: [], timeTour: [],
            typeBaits: [], typeCatch: [], dopsub: '', fotoAll: false, fotoLider: false
        }))
        modalConfig()
        setError(false)
    }
    return <div className="modal_config">

        <div className="title_tour header_modal_add_tour">РЕГЛАМЕНТ ТУРНИРА</div>
        <div className="wrapper_buttons_content">{renderFields()}</div>
        <SwapeComponent text={'Фото улова обязательно'} active={foto.fotoAll} onToggle={() => toggleBait('fotoAll')} />
        <SwapeComponent text={'Фото улова, претендующего на лидерские позиции. обязательно'} active={foto.fotoLider} onToggle={() => toggleBait('fotoLider')} />
        <div className="wrap_row_import_card" onClick={() => onClickButton('import')}>ИМПОРТИРОВАТЬ ДАННЫЕ</div>
        <div className=" footer_config footer_modal_tour footer_create_tour">
            <div className="title_tour start_tour" onClick={create}>ПРИМЕНИТЬ</div>
            <div className="title_tour start_tour" onClick={cancel}>ОТМЕНА</div>
        </div>
    </div>
}
/*      {renderModal()}*/