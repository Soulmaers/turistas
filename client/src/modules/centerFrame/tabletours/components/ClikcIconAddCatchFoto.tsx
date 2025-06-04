
import { IoMdAddCircle } from "react-icons/io"
import { FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { set_stateModalWindow, RootState } from '../../../../GlobalStor';





export const ClickIconAddCatchFoto = () => {
    const dispatch = useDispatch()


    const handler = () => {
        dispatch(set_stateModalWindow({ type: 'catchForm', status: true }));
    }
    return (
        <div className="wrapper_icon_add_catch_foto" onClick={handler}></div>
    )
}