
import { SetStateAction, useState, useEffect } from "react"
import { useGetFishers } from '../hookUsers'

import { useSelector, useDispatch } from 'react-redux';
import { update_modal, set_add_tour, set_modalFishers, set_profil, add_catch, set_deleteFormTour, RootState } from '../../../../GlobalStor';



interface NewTour {
    nameTour: string;
    startDate: string;
    finishDate: string;
    users: {
        contactId: string;
        userId: number;
    }[]; // Используем массив объектов
}
interface Fishers {
    name_user: string
    contactID: string
    userId: number

}
interface FuncAlarm {
    mess: React.Dispatch<React.SetStateAction<string>>;
    addFishers: (users: {
        contactId: string;
        userId: number;
    }[]) => void
}




export const Fishers: React.FC<FuncAlarm> = ({ mess, addFishers }) => {
    const [fisherID, setFisherID] = useState('')
    const [countFishers, setCountFishers] = useState(0)
    const tourData = useSelector((state: RootState) => state.slice.tour);
    const [fishers, setFishers] = useState<Fishers[]>([])

    const { getFisher } = useGetFishers()

    useEffect(() => {
        console.log(tourData)
        console.log(tourData.users)
        setFishers(tourData.users)
    }, [])
    useEffect(() => {
        const array = fishers.map(e => ({ contactId: e.contactID, userId: e.userId }));
        addFishers(array);
    }, [fishers]);



    const stop = countFishers >= 5 ? true : false
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFisherID(event.target.value); // обновляем состояние с новым значением

    }


    const validationLocal = (text: string) => {
        mess(text)
        setTimeout(() => mess(''), 2000);
    }
    const handler = async () => {
        console.log(stop)
        console.log(fisherID)
        const duble = fishers.find(e => e.contactID === fisherID)
        if (stop) { validationLocal(`Добавлено максимальное кол-во участников`); return }
        if (fisherID === '') { validationLocal('Введите ID участника'); return }
        if (duble) { validationLocal(`Пользователь ${fisherID} уже добавлен`); return }



        const result = await getFisher(fisherID)
        console.log(result)
        if (result && result.length === 0) { validationLocal(`Пользователь не найден`); return }
        if (result) {
            setFishers(prevFishers => [
                ...prevFishers,
                {
                    name_user: result.name_user,
                    contactID: result.contactID,
                    userId: result.id
                }
            ]);
            setFisherID('')
            setCountFishers(prevCount => prevCount + 1);
        }


    }


    const deleteHandler = (id: number) => {
        setFishers(prevFishers => prevFishers.filter(e => Number(e.userId) !== id));
        setCountFishers(prevCount => prevCount - 1);
    }

    console.log(fishers)
    const rowFihers = fishers.map(e => <div className="wrapper_row_fisher"><div className="row_fisher">{e.name_user.toUpperCase()}</div>
        <div className="btn_del_fisher" onClick={() => deleteHandler(e.userId)}></div></div>)

    return (<div className="add_name_wrapper wrap_fishers">
        <div className="name_car_tour">УЧАСТНИКИ<span className="icon_question fishers_question"></span></div>
        <div className="fishers">
            <input className="input_name_tour" placeholder="Введите ID нового участника" value={fisherID} onChange={handleChange} disabled={stop} />
            <div className="btn_add_fisher" onClick={handler}></div></div>
        <div className="container_fishers">
            {rowFihers}

        </div>
    </div>)
}