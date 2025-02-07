import { useDispatch } from 'react-redux'
import { add_catch } from '../../../../GlobalStor'
import '../styles/AddCatch.css'
import { IoMdAddCircle } from "react-icons/io"


export const AddCatch = () => {

    const dispatch = useDispatch()
    const handler = () => {
        dispatch(add_catch(true))
    }
    return (<div className="add_catch">Добавить улов <IoMdAddCircle className='add_catch_btn' onClick={handler} /></div>)
}