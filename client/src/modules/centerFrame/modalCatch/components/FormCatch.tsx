
import { useState, useEffect, useRef, useContext } from 'react'
import { ContextForm } from '../../../servises/contexs/contextCloseForm';
import '../styles/FormCatch.css'
import { fishs, reservuors, typeFishing, baits, timeDay } from '../stor';
import { Selects } from './Selects'
import { IoSave } from "react-icons/io5";


export const FormCatch = () => {
    const { dispatch: dispatchForm } = useContext(ContextForm)
    const [info, setInfo] = useState('')
    const [formState, setFormState] = useState({
        'fishs': '',
        'reservuors': '',
        'typeFishing': '',
        'baits': '',
        'timeDay': '',
        'weight': '',
        'comment': ''
    })
    const modalka = useRef<HTMLDivElement>(null)

    console.log(formState)
    useEffect(() => {

        const findTimeDay = () => {
            const nowTime = new Date()
            const hours = nowTime.getHours()
            if (hours < 6) {
                setFormState((prev) => ({ ...prev, 'timeDay': '0' }))
            } else if (hours < 12) {
                setFormState((prev) => ({ ...prev, 'timeDay': '1' }))
            } else if (hours < 18) {
                setFormState((prev) => ({ ...prev, 'timeDay': '2' }))
            } else {
                setFormState((prev) => ({ ...prev, 'timeDay': '3' }))
            }
        }

        findTimeDay()


        const handleClickOutside = (event: MouseEvent) => {
            if (modalka.current && !modalka.current.contains(event.target as Node)) {
                closeModal();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [])


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const onlyNumbers = event.target.value.replace(/[^0-9]/g, '');
        setFormState((prev) => ({ ...prev, 'weight': onlyNumbers }))
    }
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormState((prev) => ({ ...prev, 'comment': event.target.value }))
    }
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, name: string) => {
        setFormState((prev) => ({ ...prev, [name]: event.target.value }))
    };
    const closeModal = () => {
        dispatchForm({ type: 'add_catch', payload: false })
    }


    const handlerStart = () => {
        if (formState['fishs'] === '') {
            setInfo('Выберите вид рыбы')
            setTimeout(() => setInfo(''), 3000)
        } else {
            console.log(formState)
        }

    }
    return (
        <div className="modal_add_tour" ref={modalka}>
            <div className="header_modal_tour">Карточка улова</div>
            <div className="body_modal_tour">
                <Selects options={fishs} name={'Вид рыбы'} empty={true} selected={formState['fishs']} nameState={'fishs'} onChange={handleSelectChange} />

                <div className="rows_card_tour">
                    <div className="name_car_tour">Вес (граммы)</div>
                    <input className="weight" value={formState['weight']} placeholder='введите вес рыбы' onChange={handleInputChange} />
                </div>
                <Selects options={reservuors} name={'Водоём'} empty={true} selected={formState['reservuors']} nameState={'reservuors'} onChange={handleSelectChange} />
                <Selects options={typeFishing} name={'Тип ловли'} empty={true} selected={formState['typeFishing']} nameState={'typeFishing'} onChange={handleSelectChange} />
                <Selects options={baits} name={'Приманка'} empty={true} selected={formState['baits']} nameState={'baits'} onChange={handleSelectChange} />
                <Selects options={timeDay} name={'Время суток'} empty={false} selected={formState['timeDay']} nameState={'timeDay'} onChange={handleSelectChange} />

                <div className="rows_card_tour">
                    <div className="name_car_tour">Комментарии</div>
                    <textarea className="input_car_tour" value={formState['comment']} onChange={handleTextChange}></textarea>
                </div>
                <div className="rows_card_tour">
                    <div className="name_car_tour">Фото</div>
                </div>

            </div>
            <div className="footer_modal_tour">
                <div className="messageAlarm">{info}</div>
                <IoSave className="start_tour" onClick={handlerStart} />
            </div>
        </div >
    )
}