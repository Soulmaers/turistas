

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react'
import ModalTwoLauout from '../../../servises/components/ModalTwoLauout'
import { RootState, update_modal, set_tour, set_deleteFormTour, set_bigfish } from '../../../../GlobalStor';
import Modal from '../../../servises/components/Modal'
import { FormDeleteTour } from '../../../leftFrame/components/FormDeleteTour'
interface deletTourProps {
    idTour: number;
    name: string
}
export const DeleteTour: React.FC<deletTourProps> = ({ idTour, name }) => {

    const dispatch = useDispatch()
    const deleteHandler = async (id: number, name: string) => {
        dispatch(set_deleteFormTour(true))
        //  dispatch(update_modal(false))

    }


    return <div className="del_tour" onClick={() => deleteHandler(idTour, name)} >УДАЛИТЬ СОБЫТИЕ</div>


}