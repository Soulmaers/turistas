
import './CriterVictory.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_stateModalWindowThour, set_stateModalWindowThree } from '../../../../../../GlobalStor';


export const CriterVictory = () => {
    const dispatch = useDispatch()

    const [radio, setRadio] = useState('max_weight')
    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);


    const options = [
        { value: 'max_weight', label: 'Вес максимальный' },
        { value: 'sum_weight', label: 'Вес суммарный' },
        { value: 'max_length', label: 'Длинна максимальная' },
        { value: 'sum_length', label: 'Длинна суммарная' },
        { value: 'count', label: 'Количество' }
    ];
    const over = () => {
        dispatch(set_stateModalWindowThree({ ...stateModalWindowThree, status: false }))
    }



    return (<div className="modal_subif">
        <div className="title_tour header_modal_add_tour">КРИТЕРИИ ТУРНИРА</div>
        <div className="body_card_modal_cri">
            <div className="discription_time">Здесь Вы можете указать параметры оуенки улова для зачета в турнире.</div>
            <div className="discription_time">Эти данные будут учитываться при отображении лидера турнира.</div>
            <div className="criter_blocks">
                {options.map(option => (
                    <div className="row_radio" key={option.value} onClick={() => setRadio(option.value)}>
                        <div className={`rad ${radio === option.value ? 'active_on' : ''}`}></div>
                        <div className="rad_text">{option.label}</div>
                    </div>
                ))}
            </div>
        </div>
        <div className="footer_ok" onClick={over}>OK</div>
    </div>)
}