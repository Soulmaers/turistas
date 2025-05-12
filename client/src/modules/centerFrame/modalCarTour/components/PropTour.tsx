import { useState } from 'react';
import { Fishers } from './Fishers'
import ModalTwoLauout from '../../../servises/components/ModalTwoLauout'
import { useSelector, useDispatch } from 'react-redux';
import { update_modal, set_add_tour, set_modalFishers, set_profil, add_catch, set_deleteFormTour, RootState } from '../../../../GlobalStor';


interface PropTourProps {
    text: string; // Задаем тип для свойства text
    pref: string
}

export const PropTour: React.FC<PropTourProps> = ({ text, pref }) => {
    const [modalProperty, set_modalProperty] = useState<boolean>(false)
    const [messageAlarm, setMessageAlarm] = useState('');
    const tourData = useSelector((state: RootState) => state.slice.tour);


    const arrayFishers = (fishers: { contactId: string; userId: number }[]) => {
        console.log(fishers)
        /*  setNewTour((prev) => ({
              ...prev,
              users: fishers
          }));*/
    }

    const handler = () => {
        set_modalProperty(true)
    }

    return <><div className="prop_tour" onClick={handler}>{text}</div>
        {modalProperty && <ModalTwoLauout style={{ top: '50%' }} onClose={() => set_modalProperty(false)}><Fishers mess={setMessageAlarm} addFishers={arrayFishers} /></ModalTwoLauout>}
    </>
}

/*mess={setMessageAlarm} addFishers={arrayFishers}*/

/* */