import './TypeBaits.css'

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react'
import { AddCustomOptions } from '../AddCustomOptions'
import { RootState, set_tourEvent, set_stateCardTour, set_stateModalWindowThree } from '../../../../../../GlobalStor';
import { SwapeComponent } from '../SwapeComponent'

export const TypeBaits = () => {
    const dispatch = useDispatch()
    const dataContent = useSelector((state: RootState) => state.slice.dataContent)
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);
    const state = useSelector((state: RootState) => state.slice.stateCardTour);
    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);
    const [selectedBaitsTypes, setSelectedBaitsTypes] = useState<number[]>([]);
    const [customBaits, setCustomBaits] = useState<{ id: number; name: string }[]>([]);
    const [anyBaits, setAnyBaits] = useState(false);


    useEffect(() => {
        if (tourEvent?.typeBaits) {
            const ids = tourEvent.typeBaits
                .filter(item => item.id > 0) // стандартные приманки
                .map(item => item.id);

            const custom = tourEvent.typeBaits
                .filter(item => item.id < 0); // пользовательские приманки (временные id)

            setSelectedBaitsTypes(ids);
            setCustomBaits(custom);
            if (state.typeBaits) setAnyBaits(tourEvent.typeBaits.length === 0); // если массив пуст — значит "Любая приманка"
        }
    }, [tourEvent.typeBaits]);


    const toggleCatch = (id: number) => {
        setSelectedBaitsTypes(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    const over = () => {
        const baits = dataContent.baits?.filter(el => selectedBaitsTypes.includes(el.id))
        console.log(baits)
        if (baits || anyBaits) dispatch(set_stateCardTour({ ...state, typeBaits: true }))
        if (baits) dispatch(set_tourEvent({ ...tourEvent, typeBaits: anyBaits ? [] : baits }))
        dispatch(set_stateModalWindowThree({ ...stateModalWindowThree, status: false }));
    };

    const handlerDiscriotion = () => {
        console.log("описание");
    };

    const deleteCustom = (id: number) => {
        setCustomBaits(customBaits.filter(e => e.id !== id));
    };
    const displayValue = anyBaits ? 'none' : undefined;

    const svoyBlockStyle = anyBaits
        ? { opacity: 0.5, pointerEvents: 'none' as const }
        : undefined;

    const rows = dataContent.baits?.map(e => <SwapeComponent text={e.name} active={selectedBaitsTypes.includes(e.id)} onToggle={() => toggleCatch(e.id)} />)

    return (<div className="modal_subif">
        <div className="title_tour header_modal_add_tour">ВИД ПРИМАНКИ<span className="icon_question time_question" onClick={handlerDiscriotion}></span></div>
        <div className="body_card_modal">
            <div className="discription_time">Здесь Вы можете выбрать тип приманки допустимый в создаваемом турнире</div>
            <div className="svoy_block" style={svoyBlockStyle}>
                {rows}
            </div>
            <div className="field_custom" style={svoyBlockStyle}>
                {customBaits.length !== 0 && customBaits.map(e => (<div className="row_wrap_interval_fish" key={e.name}>
                    <div className="body_interval" >{e.name}</div>
                    <span className="del_interval" onClick={() => deleteCustom(e.id)}></span>
                </div>))}
            </div>
            <div className="container_sort_fishs">
                <AddCustomOptions disArray={setCustomBaits} disabled={anyBaits} display={displayValue} />
                <SwapeComponent text="Любая приманка" active={anyBaits} onToggle={() => setAnyBaits(prev => !prev)} />

            </div>
        </div>
        <div className="footer_ok" onClick={over}>OK</div>
    </div >)
}