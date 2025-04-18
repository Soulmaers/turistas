
import { IoMdAddCircle } from "react-icons/io"
import { FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { update_modal, RootState } from '../../../../GlobalStor';

export const ClickIconAddTour = () => {
    const dispatch = useDispatch()

    const addCardTour = (event: React.MouseEvent<HTMLDivElement>) => {  //меняем стэйт по отображению модального окна
        event.stopPropagation();
        dispatch(update_modal(true))
    }

    return (
        <div className="wrapper_icon" onClick={addCardTour} ></div>
    )
}