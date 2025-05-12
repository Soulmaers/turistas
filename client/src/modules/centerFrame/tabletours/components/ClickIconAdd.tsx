
import { IoMdAddCircle } from "react-icons/io"
import { FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { add_catch, set_add_tour, set_tour, update_modal, RootState } from '../../../../GlobalStor';





interface ClickIconAddProps {
    pref: number;
}

export const ClickIconAdd: React.FC<ClickIconAddProps> = ({ pref }) => {
    const dispatch = useDispatch();

    const handler = () => {
        if (pref === 1 || pref === 2) {
            dispatch(add_catch(true));
        } else {
            dispatch(set_add_tour(true));
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