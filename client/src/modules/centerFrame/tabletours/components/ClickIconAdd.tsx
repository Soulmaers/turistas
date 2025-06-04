
import { IoMdAddCircle } from "react-icons/io"
import { FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { set_tour, set_catch, set_stateModalWindow, RootState } from '../../../../GlobalStor';





interface ClickIconAddProps {
    pref: number;
}

export const ClickIconAdd: React.FC<ClickIconAddProps> = ({ pref }) => {
    const dispatch = useDispatch();

    const handler = () => {
        if (pref === 1 || pref === 2) {
            dispatch(set_stateModalWindow({ type: 'catchForm', status: true }));
            dispatch(set_catch({
                name_user: '',
                name_fish: '',
                name_reservour: '',
                name_type: '',
                name_bait: '',
                name_day: '',
                weight: '',
                foto_user: '',
                data: '',
                comment: '',
                urlFoto: null,
                idUser: 0,
                idTournament: 0,
                idCatch: 0,
                id_baits: 0,
                id_fish: 0,
                id_reservour: 0,
                id_timeday: 0,
                id_type: 0
            }))
        } else {
            dispatch(set_stateModalWindow({ type: 'add_tour', status: true }))
            //  dispatch(set_add_tour(true));
            dispatch(set_tour({
                id: null,
                nameTour: '',
                dateStart: '',
                dateFinish: '',
                users: []
            }))
        }
    };

    const styles = pref === 3 ? { top: '35%' } : {};
    const classMap: { [key: number]: string } = {
        1: 'wrapper_icon_add_catch',
        2: 'wrapper_icon_add_catch_foto',
        4: 'mini_add_tour'
    };

    const classAdd = classMap[pref] || 'wrapper_icon';

    return (
        <div
            className={classAdd}
            onClick={handler}
            style={styles}
        ></div>
    );
};