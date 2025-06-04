import './TypeBaits.css'

import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react'
import { AddCustomOptions } from '../AddCustomOptions'
import { RootState, set_stateModalWindowThour, set_stateModalWindowThree } from '../../../../../../GlobalStor';
import { SwapeComponent } from '../SwapeComponent'

export const TypeBaits = () => {
    const dispatch = useDispatch()

    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);
    const [selectedFishs, setSelectedFishs] = useState<{ id: number; name: string }[]>([])


    const [baits, setBaits] = useState({
        vobler: false,
        vert: false,
        koleb: false,
        rezina: false,
        zhivec: false,
        cherv: false,
        any: false,
    });
    const toggleBait = (key: keyof typeof baits) => {
        setBaits(prev => ({ ...prev, [key]: !prev[key] }));
    };


    const over = () => {
        dispatch(set_stateModalWindowThree({ ...stateModalWindowThree, status: false }))
    }
    const handlerDiscriotion = () => {
        console.log('ок')
    }

    const deleteFish = (id: number) => {
        setSelectedFishs(selectedFishs.filter(e => e.id !== id))
    }
    const displayValue = baits.any ? 'none' : undefined;

    const svoyBlockStyle = baits.any
        ? { opacity: 0.5, pointerEvents: 'none' as const }
        : undefined;



    return (<div className="modal_subif">
        <div className="title_tour header_modal_add_tour">ВИД ПРИМАНКИ<span className="icon_question time_question" onClick={handlerDiscriotion}></span></div>
        <div className="body_card_modal">
            <div className="discription_time">Здесь Вы можете выбрать тип приманки допустимый в создаваемом турнире</div>
            <div className="svoy_block" style={svoyBlockStyle}>
                <SwapeComponent text="Воблер" active={baits.vobler} onToggle={() => toggleBait('vobler')} />
                <SwapeComponent text="Вертушка" active={baits.vert} onToggle={() => toggleBait('vert')} />
                <SwapeComponent text="Колебалка" active={baits.koleb} onToggle={() => toggleBait('koleb')} />
                <SwapeComponent text="Резина" active={baits.rezina} onToggle={() => toggleBait('rezina')} />
                <SwapeComponent text="Живец" active={baits.zhivec} onToggle={() => toggleBait('zhivec')} />
                <SwapeComponent text="Червь/Опарыш" active={baits.cherv} onToggle={() => toggleBait('cherv')} />

            </div>
            <div className="field_custom" style={svoyBlockStyle}>
                {selectedFishs.length !== 0 && selectedFishs.map(e => (<div className="row_wrap_interval_fish" key={e.name}>
                    <div className="body_interval" >{e.name}</div>
                    <span className="del_interval" onClick={() => deleteFish(e.id)}></span>
                </div>))}
            </div>
            <div className="container_sort_fishs">
                <AddCustomOptions disArray={setSelectedFishs} disabled={baits.any} display={displayValue} />
                <SwapeComponent text="Любая приманка" active={baits.any} onToggle={() => toggleBait('any')} />

            </div>
        </div>
        <div className="footer_ok" onClick={over}>OK</div>
    </div >)
}