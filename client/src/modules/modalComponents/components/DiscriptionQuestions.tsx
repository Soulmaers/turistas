import '../styles/DiscriptionQuestions.css'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_tour, set_stateModalWindow } from '../../../GlobalStor'


export const DiscriptionQuestions = () => {
    const discription = useSelector((state: RootState) => state.slice.discription);


    return (
        <div className="wrapper_discription_question">
            <div className="text_message_question">{discription}</div>
        </div>
    )
}