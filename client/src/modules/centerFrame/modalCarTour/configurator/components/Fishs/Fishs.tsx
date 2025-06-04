import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react'
import { RootState, set_stateModalWindowThour, set_stateModalWindowThree } from '../../../../../../GlobalStor';
import './Fishs.css'
import { SwapeComponent } from '../SwapeComponent'
import { FindFilter } from '../FindFilter'


const storFishs = [
    { id: 1, name: 'Щука' },
    { id: 2, name: 'Судак' },
    { id: 3, name: 'Лещ' },
    { id: 4, name: 'Окунь' },
    { id: 5, name: 'Форель' }
];


export const Fishs = () => {
    const dispatch = useDispatch()

    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);
    const [arrayFishs, setArrayFishs] = useState<{ id: number; name: string }[]>(storFishs)
    const [selectedFishs, setSelectedFishs] = useState<{ id: number; name: string }[]>([])


    const [fishs, setFishs] = useState({
        any: false,
        other: false
    });
    const toggleBait = (key: keyof typeof fishs) => {
        setFishs(prev => ({ ...prev, [key]: !prev[key] }));
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
    console.log(fishs)


    const svoyBlockStyle = fishs.any
        ? { opacity: 0.5, pointerEvents: 'none' as const }
        : undefined;


    const displayValue = fishs.any ? 'none' : undefined;


    return (<div className="modal_subif">
        <div className="title_tour header_modal_add_tour">ВИД РЫБЫ<span className="icon_question time_question" onClick={handlerDiscriotion}></span></div>
        <div className="body_card_modal">
            <div className="discription_time">Здесь Вы можете задать вид рыбы принимающей участие в турнире</div>
            <div className="criter_block" style={svoyBlockStyle}>
                {selectedFishs.length !== 0 && selectedFishs.map(e => (<div className="row_wrap_interval_fish" key={e.name}>
                    <div className="body_interval"  >{e.name}</div>
                    <span className="del_interval" onClick={() => deleteFish(e.id)}></span>
                </div>))}
            </div>
            <div className="container_sort_fishs">
                <span className="span_text_info">* начните вводить название</span>
                <FindFilter disArray={setSelectedFishs} disabled={fishs.any} display={displayValue} objs={arrayFishs} selected={selectedFishs} />
                <SwapeComponent text={'Любая рыба'} active={fishs.any} onToggle={() => toggleBait('any')} />
                <SwapeComponent text={'Добавить колонку ДРУГОЕ'} active={fishs.other} onToggle={() => toggleBait('other')} />
            </div>
        </div>
        <div className="footer_ok" onClick={over}>OK</div>
    </div >)


}
