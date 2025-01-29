import { useContext, useState } from 'react'
import { ContextForm } from '../../../servises/contexs/contextCloseForm'

import '../styles/AddCatch.css'
import { IoMdAddCircle } from "react-icons/io"


export const AddCatch = () => {
    const { dispatch: dispatchForm } = useContext(ContextForm)

    const handler = () => {
        dispatchForm({ type: 'add_catch', payload: true })
    }
    return (<div className="add_catch">Добавить улов <IoMdAddCircle className='add_catch_btn' onClick={handler} /></div>)
}