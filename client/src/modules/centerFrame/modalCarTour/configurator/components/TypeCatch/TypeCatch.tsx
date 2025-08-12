import './TypeCatch.css'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react'
import { AddCustomOptions } from '../AddCustomOptions'
import { RootState, set_tourEvent, set_stateCardTour, set_stateModalWindowThree } from '../../../../../../GlobalStor';
import { SwapeComponent } from '../SwapeComponent'

export const TypeCatch = () => {
    const dispatch = useDispatch()
    const dataContent = useSelector((state: RootState) => state.slice.dataContent)
    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);
    const state = useSelector((state: RootState) => state.slice.stateCardTour);
    const [selectedCatchTypes, setSelectedCatchTypes] = useState<number[]>([]);
    const [customCatchs, setCustomCatchs] = useState<{ id: number; name: string }[]>([]);
    const [anyCatch, setAnyCatch] = useState(false);


    useEffect(() => {
        if (tourEvent?.typeCatch) {
            const ids = tourEvent.typeCatch
                .filter(item => item.id > 0) // стандартные приманки
                .map(item => item.id);

            const custom = tourEvent.typeCatch
                .filter(item => item.id < 0); // пользовательские приманки (временные id)

            setSelectedCatchTypes(ids);
            setCustomCatchs(custom);
            if (state.typeCatch) setAnyCatch(tourEvent.typeCatch.length === 0); // если массив пуст — значит "Любая приманка"
        }
    }, [tourEvent.typeBaits]);


    const toggleCatch = (id: number) => {
        setSelectedCatchTypes(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    const over = () => {
        const catchs = dataContent.typeCatch?.filter(el => selectedCatchTypes.includes(el.id))
        if (catchs || anyCatch) dispatch(set_stateCardTour({ ...state, typeCatch: true }))
        if (catchs) dispatch(set_tourEvent({ ...tourEvent, typeCatch: anyCatch ? [] : catchs }))
        dispatch(set_stateModalWindowThree({ ...stateModalWindowThree, status: false }));
    };

    const handlerDiscriotion = () => {
        console.log("описание");
    };

    const deleteCustom = (id: number) => {
        setCustomCatchs(customCatchs.filter(e => e.id !== id));
    };

    const isDisabled = anyCatch;
    const displayValue = isDisabled ? "none" : undefined;

    const svoyBlockStyle = isDisabled
        ? { opacity: 0.5, pointerEvents: "none" as const }
        : undefined;

    const rows = dataContent.typeCatch?.map(catchType => (<SwapeComponent text={catchType.name} active={selectedCatchTypes.includes(catchType.id)} onToggle={() => toggleCatch(catchType.id)} />))

    return (<div className="modal_subif">
        <div className="title_tour header_modal_add_tour">ТИП ЛОВЛИ<span className="icon_question time_question" onClick={handlerDiscriotion}></span></div>
        <div className="body_card_modal">
            <div className="discription_time">Здесь Вы можете выбрать тип ловли допустимый в создаваемом турнире</div>
            <div className="svoy_block" style={svoyBlockStyle}>
                {rows}
            </div>
            <div className="field_custom" style={svoyBlockStyle}>
                {customCatchs.length > 0 && customCatchs.map(e => (<div className="row_wrap_interval_fish" key={e.name}>
                    <div className="body_interval" >{e.name}</div>
                    <span className="del_interval" onClick={() => deleteCustom(e.id)}></span>
                </div>))}
            </div>
            <div className="container_sort_fishs">
                <AddCustomOptions disArray={setCustomCatchs} disabled={isDisabled} display={displayValue} />
                <SwapeComponent text={'Любой вид ловли'} active={anyCatch} onToggle={() => setAnyCatch(prev => !prev)} />
            </div>
        </div>
        <div className="footer_ok" onClick={over}>OK</div>
    </div >)
}