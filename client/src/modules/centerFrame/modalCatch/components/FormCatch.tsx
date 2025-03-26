
import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSetCatch } from '../hooks/setCatch'
import { RootState, add_catch, set_action_catch, set_catch, set_catchsList, set_urlFoto } from '../../../../GlobalStor'
import { ExtendedBigFish } from '../../../../GlobalStor'
import '../styles/FormCatch.css'
import { useGetImages } from '../../tabletours/hooks/getImages'
import { Selects } from './Selects'
import { IoSave } from "react-icons/io5";


export interface Catch {
    idCatch: null | number
    fishs: string | number;
    reservuors: string | number;
    typeFishing: string | number;
    baits: string | number;
    timeDay: string | number;
    weight: string;
    comment: string;
    idTour: number | null;
    idUser: number | undefined;
    urlFoto: string | null;
    image: File | null
}

export const FormCatch = () => {


    const { getImage } = useGetImages()
    const [timeFile, setTimeFile] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { setCatch, updateCatch } = useSetCatch()
    const catchsList = useSelector((state: RootState) => state.slice.catchsList);
    const catchOne = useSelector((state: RootState) => state.slice.catch);
    const user = useSelector((state: RootState) => state.slice.userStatus)
    const idTour = useSelector((state: RootState) => state.slice.idClickTour)
    const dataContent = useSelector((state: RootState) => state.slice.dataContent)
    const actionCatch = useSelector((state: RootState) => state.slice.actionCatch)
    const dispatch = useDispatch()

    const [info, setInfo] = useState<string>('')
    const [formState, setFormState] = useState<Catch>({
        fishs: catchOne.id_fish,
        reservuors: catchOne.id_reservour,
        typeFishing: catchOne.id_type,
        baits: catchOne.id_baits,
        timeDay: catchOne.id_timeday,
        weight: catchOne.weight,
        comment: '',
        idTour: catchOne.idTournament || idTour,
        idUser: catchOne.idUser || user?.user?.id,
        idCatch: catchOne.idCatch || null,
        urlFoto: catchOne?.urlFoto || null,
        image: null
    })
    const modalka = useRef<HTMLDivElement>(null)


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
        if (catchOne.name_day === '') findTimeDay()
        if (catchOne.urlFoto) {
            const gets = async () => {
                if (catchOne.urlFoto) {
                    setTimeFile(await getImage(catchOne.urlFoto))
                }
            }
            gets()
        }

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
        if (file?.name) {
            const imageUrl = URL.createObjectURL(file);
            setTimeFile(imageUrl);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            setFormState((prev) => ({ ...prev, image: file, urlFoto: file?.name }));
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
            setTimeout(() => setInfo(''), 2000)
            return; // Прерываем выполнение функции, если валидация не прошла
        }
        else if (formState.weight !== '' && !formState.urlFoto) {
            setInfo('Добавьте фото улова')
            setTimeout(() => setInfo(''), 2000)
            return; // Прерываем выполнение функции, если валидация не прошла
        } else {
            let mess: null | { mess: string, catch: ExtendedBigFish } = null

            const formData = new FormData();
            formData.append('fishs', formState.fishs.toString());
            formData.append('reservuors', formState.reservuors.toString());
            formData.append('typeFishing', formState.typeFishing.toString());
            formData.append('baits', formState.baits.toString());
            formData.append('timeDay', formState.timeDay.toString());
            formData.append('weight', formState.weight);
            formData.append('comment', formState.comment);
            formData.append('idTour', String(formState.idTour)); // Преобразуем в строку
            formData.append('idUser', String(formState.idUser));

            if (formState.urlFoto && formState.image) { // Проверка на null
                formData.append('urlFoto', formState.urlFoto);
                formData.append('image', formState.image);
            }

            if (catchOne.idCatch !== 0) {

                formData.append('idCatch', String(catchOne.idCatch));
                mess = await updateCatch(formData)
            }
            else {
                mess = await setCatch(formData)

            }

            if (mess) {
                setInfo(mess?.mess)
                if (mess?.catch) {
                    const object = catchsList.map(e => {
                        if (mess?.catch && e.idCatch === mess.catch.idCatch) {
                            return { ...mess.catch }
                        }
                        else {
                            return e
                        }
                    })
                    console.log(object)
                    dispatch(set_catchsList(object))
                }

            }


            setTimeout(() => {
                setInfo('');
                dispatch(set_action_catch(actionCatch + 1))
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
                closeModal();
            }, 1500)

        }
    }
    const fishs = dataContent.fishs?.map(e => ({ value: e.id, text: e.name })) ?? []
    const reservuors = dataContent.reservours?.map(e => ({ value: e.id, text: e.name })) ?? []
    const baits = dataContent.baits?.map(e => ({ value: e.id, text: e.name })) ?? []
    const timeDay = dataContent.timeDay?.map(e => ({ value: e.id, text: e.name })) ?? []
    const typeCatch = dataContent.typeCatch?.map(e => ({ value: e.id, text: e.name })) ?? []
    console.log(catchOne.urlFoto)
    console.log(formState.urlFoto)
    return (
        <div className="modal_add_tour" ref={modalka}>
            <div className="header_modal_tour">Карточка улова</div>
            <div className="body_modal_tour">
                <Selects options={fishs || []} name={'Вид рыбы'} empty={true} selected={formState['fishs'].toString()} nameState={'fishs'} onChange={handleSelectChange} />

                <div className="rows_card_tour">
                    <div className="name_car_tour">Вес (граммы)</div>
                    <input className="weight" value={formState['weight']} placeholder='введите вес рыбы' onChange={handleInputChange} />
                </div>
                <Selects options={reservuors || []} name={'Водоём'} empty={true} selected={formState['reservuors'].toString()} nameState={'reservuors'} onChange={handleSelectChange} />
                <Selects options={typeCatch || []} name={'Тип ловли'} empty={true} selected={formState['typeFishing'].toString()} nameState={'typeFishing'} onChange={handleSelectChange} />
                <Selects options={baits || []} name={'Приманка'} empty={true} selected={formState['baits'].toString()} nameState={'baits'} onChange={handleSelectChange} />
                <Selects options={timeDay || []} name={'Время суток'} empty={false} selected={formState['timeDay'].toString()} nameState={'timeDay'} onChange={handleSelectChange} />

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