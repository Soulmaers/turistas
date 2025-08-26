// useDeleteCatch.ts
import { useDispatch } from 'react-redux';
import { remove_catch } from '../../../../GlobalStor';

export const useDeleteCatch = () => {
    const dispatch = useDispatch();

    const delCatch = async (idCatch: number, idUser: number) => {
        const params = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id: idCatch, idUser })
        };
        const res = await fetch('/api/deleteCatch', params);
        if (!res.ok) throw new Error(await res.text());

        // оптимистично убираем из стора
        dispatch(remove_catch(idCatch));
        return true;
    };

    return { delCatch };
};