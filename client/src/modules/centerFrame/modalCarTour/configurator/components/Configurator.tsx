import '../styles/Configurator.css'
import { useState } from 'react'
import ModalThreeLauout from '../../../../servises/components/ModalThreeLauout'
import { TimeTour } from './Timing/components/TimeTour';
import { SwapeComponent } from './SwapeComponent'

import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_stateModalWindowThree } from '../../../../../GlobalStor';

interface ModalProps {

    modalConfig: () => void;
}

export const Configurator: React.FC<ModalProps> = ({ modalConfig }) => {
    const dispatch = useDispatch()
    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);

    const [foto, setFoto] = useState({
        fotoAll: false,
        fotoLider: false
    });
    const toggleBait = (key: keyof typeof foto) => {
        setFoto(prev => ({ ...prev, [key]: !prev[key] }));
    };


    const arrayContent = [{ text: 'ВРЕМЯ ПРОВЕДЕНИЯ ТУРНИРА', state: 'time', component: <TimeTour /> },
    { text: 'КРИТЕРИЙ ВЕС/ДЛИННА/КОЛИЧЕСТВО', state: 'criter', component: <TimeTour /> },
    { text: 'УКАЖИТЕ ВИД РЫБЫ', state: 'fish', component: <TimeTour /> },
    { text: 'УКАЖИТЕ ВОДОЁМ', state: 'tiresreservour', component: <TimeTour /> },
    { text: 'УКАЖИТЕ ТИП ЛОВЛИ', state: 'type_catch', component: <TimeTour /> },
    { text: 'УКАЖИТЕ ВИД ПРИМАНКИ', state: 'type_baits', component: <TimeTour /> },
    { text: 'ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ', state: 'dopishue', component: <TimeTour /> }
    ]

    const renderFields = () => {

        const buttons = arrayContent.map(e => <div className="wrap_row" key={e.text} onClick={() => onClickButton(e.state)}>{e.text}</div>)
        return buttons
    }

    const onClickButton = (state: string) => {
        dispatch(set_stateModalWindowThree({ type: state, status: true }));
    }


    return <div className="modal_config">

        <div className="title_tour header_modal_add_tour">РЕГЛАМЕНТ ТУРНИРА</div>
        <div className="wrapper_buttons_content">{renderFields()}</div>
        <SwapeComponent text={'Фото улова обязательно'} active={foto.fotoAll} onToggle={() => toggleBait('fotoAll')} />
        <SwapeComponent text={'Фото улова, претендующего на лидерские позиции. обязательно'} active={foto.fotoLider} onToggle={() => toggleBait('fotoLider')} />
        <div className="wrap_row_import_card" onClick={() => onClickButton('import')}>ИМПОРТИРОВАТЬ ДАННЫЕ</div>
        <div className=" footer_config footer_modal_tour footer_create_tour">
            <div className="title_tour start_tour">СОЗДАТЬ</div>
            <div className="title_tour start_tour" onClick={modalConfig}>ОТМЕНА</div>
        </div>
    </div>
}
/*      {renderModal()}*/