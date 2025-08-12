
import './CriterVictory.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_tourEvent, set_stateModalWindowThree } from '../../../../../../GlobalStor';


export const CriterVictory = () => {
    const dispatch = useDispatch()

    const [radio, setRadio] = useState({ id: 1, name: 'Вес максимальный' })
    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);

    const options = [
        { id: 1, name: 'Вес максимальный' },
        { id: 2, name: 'Вес суммарный' },
        { id: 3, name: 'Длинна максимальная' },
        { id: 4, name: 'Длинна суммарная' },
        { id: 5, name: 'Количество' }
    ];
    const over = () => {
        dispatch(set_tourEvent({ ...tourEvent, criVictory: radio }))
        dispatch(set_stateModalWindowThree({ ...stateModalWindowThree, status: false }))
    }



    return (<div className="modal_subif">
        <div className="title_tour header_modal_add_tour">КРИТЕРИИ ТУРНИРА</div>
        <div className="body_card_modal_cri">
            <div className="discription_time">Здесь Вы можете указать параметры оуенки улова для зачета в турнире.</div>
            <div className="discription_time">Эти данные будут учитываться при отображении лидера турнира.</div>
            <div className="criter_blocks">
                {options.map(option => (
                    <div className="row_radio" key={option.name} onClick={() => setRadio({ id: option.id, name: option.name })}>
                        <div className={`rad ${radio.id === option.id ? 'active_on' : ''}`}></div>
                        <div className="rad_text">{option.name}</div>
                    </div>
                ))}
            </div>
        </div>
        <div className="footer_ok" onClick={over}>OK</div>
    </div>)
}