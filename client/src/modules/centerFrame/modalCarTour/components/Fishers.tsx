
import { SetStateAction, useState, useEffect } from "react"
import { useGetFishers } from '../hookUsers'

import { useSelector, useDispatch } from 'react-redux';
import { set_discription, set_tourEvent, set_stateModalWindowThree, set_tour, RootState } from '../../../../GlobalStor';
import { GiConsoleController } from "react-icons/gi";
import { DiscriptionQuestions } from '../../../modalComponents/components/DiscriptionQuestions'



interface Fishers {
    name_user: string
    contactID: string
    userId: number

}
interface FuncAlarm {
    flag: boolean

}




export const Fishers: React.FC<FuncAlarm> = ({ flag }) => {
    const dispatch = useDispatch()
    const [fisherID, setFisherID] = useState('')
    const [countFishers, setCountFishers] = useState(0)
    const [valid, setValid] = useState<string>('')
    const tourData = useSelector((state: RootState) => state.slice.tour);
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);
    const [fishers, setFishers] = useState<Fishers[]>([])

    const { getFisher } = useGetFishers()

    useEffect(() => {
        setFishers(tourEvent.fishers)
        setCountFishers(tourEvent.fishers.length)
    }, [])
    useEffect(() => {
        console.log(fishers)
        const array = fishers.map(e => ({ contactID: e.contactID, userId: e.userId, name_user: e.name_user }));
        dispatch(set_tour({ ...tourData, users: array }))
        dispatch(set_tourEvent({ ...tourEvent, fishers: fishers }))
        //  addFishers(array);
    }, [fishers]);



    const stop = countFishers >= 6 ? true : false
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFisherID(event.target.value); // обновляем состояние с новым значением

    }


    const validationLocal = (text: string) => {
        setValid(text)
        setTimeout(() => setValid(''), 2000);
    }
    const handler = async () => {
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

    const handlerDiscriotion = () => {
        dispatch(set_discription('Для добавления участников введите ID участника.ID каждого пользователя указан у него в личном кабинете. Таким образом Вы можете добавить до 5 участников. Если Вам необходимо больше 5 участников, то после создания ТУРНИРА, в профиле этого ТУРНИРА, Вы найдете QR-code, которым Вы можете поделиться с любым человеком, даже если он не зарегистрирован в приложении. Отсканировав QR-code, пользователь автоматически пройдет регистрацию в приложении и присоеденится к турниру. УДАЛЯТЬ и ДОБАВЛЯТЬ УЧАСТНИКА МОЖЕТ ТОЛЬКО СОЗДАТЕЛЬ ТУРНИРА'))
        dispatch(set_stateModalWindowThree({ type: 'discription_questions', status: true }))
    }
    console.log(flag)
    const rowFihers = fishers.map(e => <div className="wrapper_row_fisher"><div className="row_fisher">{e.name_user.toUpperCase()}</div>
        <div className="btn_del_fisher" onClick={() => deleteHandler(e.userId)}></div></div>)

    const classes = !flag ? 'add_name_wrapper wrap_fishers noflg' : 'add_name_wrapper wrap_fishers flg'
    const styles = !flag ? { padding: '10px', width: '300px' } : { padding: 0, width: '95%' }
    return (<div className={classes} style={styles}>
        <div className="name_car_tour">УЧАСТНИКИ<span className="icon_question fishers_question" onClick={handlerDiscriotion}></span></div>
        <div className="fishers">
            <input className="input_name_tour" placeholder="Введите ID нового участника" value={fisherID} onChange={handleChange} disabled={stop} />
            <div className="btn_add_fisher" onClick={handler}></div></div>
        <div className="container_fishers">
            {rowFihers}

        </div>
        {!flag && <div className="messageAlarmUsers">{valid}</div>}
    </div>)
}