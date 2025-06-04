
import './SubIf.css'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_stateModalWindowThour, set_stateModalWindowThree } from '../../../../../../GlobalStor';

export const SubIf = () => {
    const dispatch = useDispatch()
    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);

    const over = () => {
        dispatch(set_stateModalWindowThree({ ...stateModalWindowThree, status: false }))
    }
    return (<div className="modal_subif">
        <div className="title_tour header_modal_add_tour">ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ</div>
        <div className="subif">
            <div className="discription_time">Здесь Вы можете прописать дополнительные условия.</div>
            <textarea className="sub_if_text"></textarea>
        </div>

        <div className="footer_ok" onClick={over}>OK</div>
    </div>)
}