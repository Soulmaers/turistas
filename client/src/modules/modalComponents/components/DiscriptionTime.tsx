
import '../styles/DiscriptionTime.css'

import { useSelector, useDispatch } from 'react-redux';
import { set_stateModalWindowThour } from '../../../GlobalStor';
export const DiscriptionTime = () => {
    const dispatch = useDispatch()

    const back = () => {

        dispatch(set_stateModalWindowThour({ type: 'discription_time', status: false }))
    }

    return (<div className="modal_disc_time">
        <ul className="body_text">
            <li className="li_text">Задайте интервал. Если в турнире предусмотрен перерыв, то задавать интервалы нужно от перерыва до перерыва.</li>
            <li className="li_text">В период паузы между интервалами турнира, Вы не сможете добавить улов в этот турнир.</li>
            <li className="li_text">В турнирной таблице, датой окончания турнира будет указана самая крайняя дата последнего интервала.</li>
        </ul>
        <div className="footer_ok" onClick={back}>OK</div>
    </div>)
}