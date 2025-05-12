
import { IoMdAddCircle } from "react-icons/io"
import { FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { add_catch, update_modal, RootState } from '../../../../GlobalStor';





export const ClickIconAddCatchFoto = () => {
    const dispatch = useDispatch()


    const handler = () => {
        dispatch(add_catch(true))
    }
    return (
        <div className="wrapper_icon_add_catch_foto" onClick={handler}></div>
    )
}