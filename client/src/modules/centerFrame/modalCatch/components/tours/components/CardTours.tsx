
import '../styles/CardTours.css'
import { FaAsterisk } from "react-icons/fa";
import { SwapeComponent } from '../../../../modalCarTour/configurator/components/SwapeComponent'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { RootState, TourEvent, Property, set_validTours, set_stateModalWindowTwo } from '../../../../../../GlobalStor'



export const CardTours = () => {
    const dispatch = useDispatch()
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);
    const tournaments = useSelector((state: RootState) => state.slice.userStatus.tournament)
    const validTours = useSelector((state: RootState) => state.slice.validTours)

    const [selectedTours, setSelectedTours] = useState<number[]>([]);

    console.log(validTours)

    useEffect(() => {
        const idTours = validTours?.filter(e => e.flag === 1 && e.id !== tourEvent.id).map(el => el.id) || [];

        if (tourEvent.id) {
            idTours.push(tourEvent.id);
        }
        setSelectedTours(idTours);
    }, [validTours]);


    const toggleChange = (id: number) => {
        setSelectedTours(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );

    }
    const compliteTours = validTours?.filter(e => e.flag === 1 && e.id !== tourEvent.id)
        .map(el => <SwapeComponent key={el.id} text={el.name.toUpperCase()} active={selectedTours.includes(el.id)} onToggle={() => toggleChange(el.id)} />)
    const activTours = validTours?.filter(e => e.flag === 2)
        .map(el => <SwapeComponent key={el.id} text={el.name.toUpperCase()} active={selectedTours.includes(el.id)} onToggle={() => toggleChange(el.id)} />)

    const over = () => {
        if (!validTours) return;
        const newValidTours = validTours?.map(e => {
            if (selectedTours.includes(e.id)) {
                return { ...e, flag: 1 }
            }
            else {
                return { ...e, flag: 2 }
            }
        })
        dispatch(set_validTours(newValidTours))
        dispatch(set_stateModalWindowTwo({ type: 'cardSelected', status: false }))
    }



    return <div className="modal_subif set_selected_tours">

        <div className="title_selected_tour">
            <div className="name_card_selected">ПОДХОДЯЩИЕ ТУРНИРЫ</div>
            <div className="disc_card_selected">Подбираются в зависимости от заполненных Вами данных по улову.</div>
            <div className="wrap_swipe">
                <div className='swipe_out in'></div>
                <div className='text_swipe'>{tourEvent.name.toUpperCase()} <FaAsterisk className="snoska" /></div>
            </div>
            {compliteTours}
            <div className="snoska_disc"><FaAsterisk className="snoska" /><span className="pozc">Этот турнир</span></div>
        </div>
        <div className="title_selected_tour activ_tours_selected">
            <div className="name_card_selected">ВСЕ АКТИВНЫЕ ТУРНИРЫ</div>
            {activTours}

        </div>
        <div className="btn_select_tour" onClick={over}>ВЫБРАТЬ</div>
    </div >
}