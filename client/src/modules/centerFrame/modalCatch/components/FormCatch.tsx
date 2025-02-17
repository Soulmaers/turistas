
import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSetCatch } from '../hooks/setCatch'
import { RootState, add_catch, set_action_catch } from '../../../../GlobalStor'

import '../styles/FormCatch.css'

import { Selects } from './Selects'
import { IoSave } from "react-icons/io5";


export interface Catch {
    fishs: string;
    reservuors: string;
    typeFishing: string;
    baits: string;
    timeDay: string;
    weight: string;
    comment: string;
    idTour: number | null;
    idUser: number | undefined;
    urlFoto: null | File
}

export const FormCatch = () => {
    const [timeFile, setTimeFile] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { setCatch } = useSetCatch()
    const user = useSelector((state: RootState) => state.slice.userStatus)
    const idTour = useSelector((state: RootState) => state.slice.idClickTour)
    const dataContent = useSelector((state: RootState) => state.slice.dataContent)
    const actionCatch = useSelector((state: RootState) => state.slice.actionCatch)
    const dispatch = useDispatch()

    const [info, setInfo] = useState<string>('')
    const [formState, setFormState] = useState<Catch>({
        fishs: '',
        reservuors: '',
        typeFishing: '',
        baits: '',
        timeDay: '',
        weight: '',
        comment: '',
        idTour: idTour,
        idUser: user?.user?.id,
        urlFoto: null
    })
    const modalka = useRef<HTMLDivElement>(null)

    console.log(formState)
    useEffect(() => {

        const findTimeDay = () => {
            const nowTime = new Date()
            const hours = nowTime.getHours()
            if (hours < 6) {
                setFormState((prev) => ({ ...prev, 'timeDay': '1' }))
            } else if (hours < 12) {
                setFormState((prev) => ({ ...prev, 'timeDay': '2' }))
            } else if (hours < 18) {
                setFormState((prev) => ({ ...prev, 'timeDay': '3' }))
            } else {
                setFormState((prev) => ({ ...prev, 'timeDay': '4' }))
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


    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const onlyNumbers = event.target.value.replace(/[^0-9]/g, '');
        setFormState((prev) => ({ ...prev, 'weight': onlyNumbers }))
    }, [])
    const handleTextChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormState((prev) => ({ ...prev, 'comment': event.target.value }))
    }, [])
    const handleSelectChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>, name: string) => {
        setFormState((prev) => ({ ...prev, [name]: event.target.value }))
    }, []);
    const closeModal = useCallback(() => {
        dispatch(add_catch(false))
    }, [dispatch])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        console.log(file);
        if (file?.name) {
            const imageUrl = URL.createObjectURL(file);
            setTimeFile(imageUrl);
            setFormState((prev) => ({ ...prev, urlFoto: file }));
        }
    };
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handlerStart = async () => {
        if (formState['fishs'] === '') {
            setInfo('Выберите вид рыбы')
            setTimeout(() => setInfo(''), 3000)
        } else {
            const mess = await setCatch(formState)
            setInfo(mess)
            dispatch(set_action_catch(actionCatch + 1))
            setTimeout(() => {
                setInfo('');
                closeModal();
            }, 3000)
        }

    }
    const fishs = dataContent.fishs?.map(e => ({ value: e.id, text: e.name }))
    const reservuors = dataContent.reservours?.map(e => ({ value: e.id, text: e.name }))
    const baits = dataContent.baits?.map(e => ({ value: e.id, text: e.name }))
    const timeDay = dataContent.timeDay?.map(e => ({ value: e.id, text: e.name }))
    const typeCatch = dataContent.typeCatch?.map(e => ({ value: e.id, text: e.name }))
    return (
        <div className="modal_add_tour" ref={modalka}>
            <div className="header_modal_tour">Карточка улова</div>
            <div className="body_modal_tour">
                <Selects options={fishs || []} name={'Вид рыбы'} empty={true} selected={formState['fishs']} nameState={'fishs'} onChange={handleSelectChange} />

                <div className="rows_card_tour">
                    <div className="name_car_tour">Вес (граммы)</div>
                    <input className="weight" value={formState['weight']} placeholder='введите вес рыбы' onChange={handleInputChange} />
                </div>
                <Selects options={reservuors || []} name={'Водоём'} empty={true} selected={formState['reservuors']} nameState={'reservuors'} onChange={handleSelectChange} />
                <Selects options={typeCatch || []} name={'Тип ловли'} empty={true} selected={formState['typeFishing']} nameState={'typeFishing'} onChange={handleSelectChange} />
                <Selects options={baits || []} name={'Приманка'} empty={true} selected={formState['baits']} nameState={'baits'} onChange={handleSelectChange} />
                <Selects options={timeDay || []} name={'Время суток'} empty={false} selected={formState['timeDay']} nameState={'timeDay'} onChange={handleSelectChange} />

                <div className="rows_card_tour">
                    <div className="name_car_tour">Комментарии</div>
                    <textarea className="input_car_tour" value={formState['comment']} onChange={handleTextChange}></textarea>
                </div>
                <div className="rows_card_tour">
                    <div className="name_car_tour">Фото</div>
                    <input type="file" id="image" ref={fileInputRef} name="image" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                    <div className="button_load" onClick={handleButtonClick}>Загрузить фото</div>
                </div>
                {formState.urlFoto && (
                    <div
                        style={{
                            width: '200px',
                            height: '200px',
                            backgroundImage: `url(${timeFile})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        }}
                    />
                )}
            </div>
            <div className="footer_modal_tour">
                <div className="messageAlarm">{info}</div>
                <IoSave className="start_tour" onClick={handlerStart} />
            </div>
        </div >
    )
}