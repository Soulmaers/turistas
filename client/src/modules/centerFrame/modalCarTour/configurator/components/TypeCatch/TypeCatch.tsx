import './TypeCatch.css'
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react'
import { AddCustomOptions } from '../AddCustomOptions'
import { RootState, set_stateModalWindowThour, set_stateModalWindowThree } from '../../../../../../GlobalStor';
import { SwapeComponent } from '../SwapeComponent'

export const TypeCatch = () => {
    const dispatch = useDispatch()

    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);
    const [selectedFishs, setSelectedFishs] = useState<{ id: number; name: string }[]>([])
    const [spinCoast, setSpinCoast] = useState<boolean>(false)
    const [spinBoat, setSpinBoat] = useState<boolean>(false)
    const [fider, setFider] = useState<boolean>(false)
    const [poplavok, setPoplavok] = useState<boolean>(false)
    const [trolling, setTrolling] = useState<boolean>(false)
    const [allCatch, setAllCatch] = useState<boolean>(false)

    const [catchs, setCatchs] = useState({
        spinCoast: false,
        spinBoat: false,
        fider: false,
        poplavok: false,
        trolling: false,
        any: false,

    });
    const toggleBait = (key: keyof typeof catchs) => {
        setCatchs(prev => ({ ...prev, [key]: !prev[key] }));
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

    const displayValue = catchs.any ? 'none' : undefined;

    const svoyBlockStyle = catchs.any
        ? { opacity: 0.5, pointerEvents: 'none' as const }
        : undefined;



    return (<div className="modal_subif">
        <div className="title_tour header_modal_add_tour">ТИП ЛОВЛИ<span className="icon_question time_question" onClick={handlerDiscriotion}></span></div>
        <div className="body_card_modal">
            <div className="discription_time">Здесь Вы можете выбрать тип ловли допустимый в создаваемом турнире</div>
            <div className="svoy_block" style={svoyBlockStyle}>
                <SwapeComponent text={'Спиннинг с берега'} active={catchs.spinCoast} onToggle={() => toggleBait('spinCoast')} />
                <SwapeComponent text={'Спиннинг с лодки'} active={catchs.spinBoat} onToggle={() => toggleBait('spinBoat')} />
                <SwapeComponent text={'Фидер'} active={catchs.fider} onToggle={() => toggleBait('fider')} />
                <SwapeComponent text={'Поплавок'} active={catchs.poplavok} onToggle={() => toggleBait('poplavok')} />
                <SwapeComponent text={'Троллинг'} active={catchs.trolling} onToggle={() => toggleBait('trolling')} />
            </div>
            <div className="field_custom" style={svoyBlockStyle}>
                {selectedFishs.length !== 0 && selectedFishs.map(e => (<div className="row_wrap_interval_fish" key={e.name}>
                    <div className="body_interval" >{e.name}</div>
                    <span className="del_interval" onClick={() => deleteFish(e.id)}></span>
                </div>))}
            </div>
            <div className="container_sort_fishs">
                <AddCustomOptions disArray={setSelectedFishs} disabled={catchs.any} display={displayValue} />
                <SwapeComponent text={'Любой вид ловли'} active={catchs.any} onToggle={() => toggleBait('any')} />

            </div>
        </div>
        <div className="footer_ok" onClick={over}>OK</div>
    </div >)
}