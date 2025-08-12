import { useState } from 'react';
import { Fishers } from './Fishers'
import ModalTwoLauout from '../../../servises/components/ModalTwoLauout'
import { Configurator } from '../configurator/components/Configurator';
import { UniversalModal } from '../../../servises/components/UniversalModal'
import { useSelector, useDispatch } from 'react-redux';
import { set_tour, set_tourEvent, set_stateModalWindowTwo, set_activeModalLevel, RootState } from '../../../../GlobalStor';


interface PropTourProps {
    text: string; // Задаем тип для свойства text
    pref: string
}

export const PropTour: React.FC<PropTourProps> = ({ text, pref }) => {
    const [modalProperty, set_modalProperty] = useState<boolean>(false)
    const [messageAlarm, setMessageAlarm] = useState('');
    const tourData = useSelector((state: RootState) => state.slice.tour);
    const modalStack = useSelector((state: RootState) => state.slice.modalStack);
    const onTop = modalStack[modalStack.length - 1] === 10;

    const dispatch = useDispatch()
    const close = () => set_modalProperty(false);

    const handler = () => {

        switch (pref) {
            case 'fishers': dispatch(set_stateModalWindowTwo({ type: 'fishers', status: true })); break;
            case 'reg': dispatch(set_stateModalWindowTwo({ type: 'reg', status: true }));
        }

    }

    return <div className="prop_tour" onClick={handler}>{text}</div>
}



