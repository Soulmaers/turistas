

import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_stateModalWindowTwo, } from '../../../../GlobalStor';

interface deletTourProps {
    idTour: number;
    name: string
}
export const DeleteTour: React.FC<deletTourProps> = ({ idTour, name }) => {

    const dispatch = useDispatch()
    const deleteHandler = async (id: number, name: string) => {
        dispatch(set_stateModalWindowTwo({ type: 'deleteFormTour', status: true }))

    }


    return <div className="del_tour" onClick={() => deleteHandler(idTour, name)} >УДАЛИТЬ ТУРНИР</div>


}