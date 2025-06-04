
import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSetCatch } from '../hooks/setCatch'
import Modal from '../../../servises/components/Modal'
import { RootState, set_action_catch, set_catch, set_catchsList, set_stateModalWindow, set_urlFoto } from '../../../../GlobalStor'
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
    const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
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
        comment: catchOne.comment,
        idTour: catchOne.idTournament || idTour || user.tournament[user.tournament.length - 1].id,
        idUser: catchOne.idUser || user?.user?.id,
        idCatch: catchOne.idCatch || null,
        urlFoto: catchOne?.urlFoto || null,
        image: null
    })
    console.log(catchOne)
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
        dispatch(set_stateModalWindow({ type: '', status: false }))
    }, [dispatch])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        console.log(event.target.files)
        if (file?.name) {
            const imageUrl = URL.createObjectURL(file);
            setTimeFile(imageUrl);
            const reader = new FileReader();
            console.log(reader)
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
        console.log(formState)
        if (formState['fishs'] === 0) {
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

            console.log(formData)
            if (formState.urlFoto && formState.image) { // Проверка на null
                formData.append('urlFoto', formState.urlFoto);
                formData.append('image', formState.image);
            }

            if (catchOne.idCatch !== 0) {

                formData.append('idCatch', String(catchOne.idCatch));
                mess = await updateCatch(formData)
            }
            else {
                console.log(formState)
                setInfo('ждем')
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
                closeModal();
            }, 1500)

        }
    }
    const fishs = dataContent.fishs?.map(e => ({ value: e.id, text: e.name })) ?? []
    const reservuors = dataContent.reservours?.map(e => ({ value: e.id, text: e.name })) ?? []
    const baits = dataContent.baits?.map(e => ({ value: e.id, text: e.name })) ?? []
    const timeDay = dataContent.timeDay?.map(e => ({ value: e.id, text: e.name })) ?? []
    const typeCatch = dataContent.typeCatch?.map(e => ({ value: e.id, text: e.name })) ?? []



    const zomm = () => {
        if (timeFile) {
            setIsZoomOpen(true);

        }
    }


    const cancel = () => {
        dispatch(set_stateModalWindow({ type: 'catchForm', status: false }))
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
    }
    return (
        <div className="modal_add_tour modal_catch_tour" ref={modalka}>
            <div className="header_modal_tour card_catch">КАРТОЧКА УЛОВА</div>
            <div className="body_modal_tour">
                <Selects options={fishs || []} name={'ВИД РЫБЫ'} empty={true} selected={formState['fishs'].toString()} nameState={'fishs'} onChange={handleSelectChange} />

                <div className="rows_card_tour_catch">
                    <div className="name_car_tour">ВЕС (Г)</div>
                    <input className="weight" value={formState['weight']} placeholder='введите вес рыбы' onChange={handleInputChange} />
                </div>
                <Selects options={reservuors || []} name={'ВОДОЕМ'} empty={true} selected={formState['reservuors'].toString()} nameState={'reservuors'} onChange={handleSelectChange} />
                <Selects options={typeCatch || []} name={'ТИП ЛОВЛИ'} empty={true} selected={formState['typeFishing'].toString()} nameState={'typeFishing'} onChange={handleSelectChange} />
                <Selects options={baits || []} name={'ПРИМАНКА'} empty={true} selected={formState['baits'].toString()} nameState={'baits'} onChange={handleSelectChange} />
                <Selects options={timeDay || []} name={'ВРЕМЯ СУТОК'} empty={false} selected={formState['timeDay'].toString()} nameState={'timeDay'} onChange={handleSelectChange} />

                <div className="rows_card_tour_catch">
                    <div className="name_car_tour">КОММЕНТАРИЙ</div>
                    <textarea className="input_car_tour" value={formState['comment']} onChange={handleTextChange}></textarea>
                </div>
                <div className="rows_card_tour_foto">
                    <input type="file" id="image" ref={fileInputRef} name="image" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                    <div className="button_load" onClick={handleButtonClick}></div>
                    <div className="wrap_img"><div className='foto_load' style={formState.urlFoto ? { backgroundImage: `url(${timeFile})` } : {}} onClick={zomm}></div></div>

                </div>

            </div>

            <div className="messageAlarm">{info}</div>
            <div className=" footer_modal_tour footer_create_tour">
                <div className="title_tour start_tour" onClick={handlerStart} >СОЗДАТЬ</div>
                <div className="title_tour start_tour" onClick={cancel}>ОТМЕНА</div>
            </div>
            {isZoomOpen && (
                <Modal style={{ top: '40%' }} onClose={() => setIsZoomOpen(false)}>
                    <div className='zoom_foto' style={{ backgroundImage: `url(${timeFile})` }}>

                    </div>
                </Modal>
            )}
        </div >
    )
}