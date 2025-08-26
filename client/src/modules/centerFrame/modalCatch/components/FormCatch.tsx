
import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSetCatch } from '../hooks/setCatch'
import { CatchModalFooter } from './CatchModalFooter'
import { CatchFileUploader } from './CatchFileUploader'
import { ZoomModal } from './ZoomModal'
import { RootState, set_action_catch, set_catch, set_catchsList, PropertyTour, set_stateModalWindowTwo, set_validTours, set_stateModalWindow, set_urlFoto } from '../../../../GlobalStor'
import { ExtendedBigFish } from '../../../../GlobalStor'
import '../styles/FormCatch.css'
import { useGetImages } from '../../tabletours/hooks/getImages'
import { useInitFormState } from '../hooks/unitFormState'
import { Selects } from './Selects'
import { IoMdSettings } from "react-icons/io";
import { predictFromImage, loadModel } from '../utils/teachable'
import { SelectTours } from './SelectTours'
import { CustomSelect } from './CustomSelect'
import { ModalAlert } from '../../../modalComponents/components/ModalAlert';

const defaultState = {
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
}

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


    const { getImageOrigin } = useGetImages()

    const [timeFile, setTimeFile] = useState<string | null>(null)
    const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
    const [showRecognitionAlert, setShowRecognitionAlert] = useState(false);
    const [admin, set_admin] = useState<boolean>(false);
    const isProcessing = useRef(false);
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { setCatch, updateCatch } = useSetCatch()
    const validTours = useSelector((state: RootState) => state.slice.validTours)
    const catchsList = useSelector((state: RootState) => state.slice.catchsList);
    const catchOne = useSelector((state: RootState) => state.slice.catch);
    const user = useSelector((state: RootState) => state.slice.userStatus)
    const idTour = useSelector((state: RootState) => state.slice.idClickTour)
    const dataContent = useSelector((state: RootState) => state.slice.dataContent)
    const actionCatch = useSelector((state: RootState) => state.slice.actionCatch)
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);
    const created = user.tournament.find(e => e.id === idTour)
    const formDefault = useInitFormState(catchOne, idTour, user);
    const dispatch = useDispatch()

    const [info, setInfo] = useState<string>('')
    const [formState, setFormState] = useState<Catch>(formDefault);
    const modalka = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined' || !('requestIdleCallback' in window)) return;

        const id = requestIdleCallback(async () => {
            try {
                await loadModel();

                const canvas = document.createElement('canvas');
                canvas.width = 224;
                canvas.height = 224;

                const ctx = canvas.getContext('2d');
                if (ctx) ctx.fillRect(0, 0, 224, 224);

                await predictFromImage(canvas);
                console.log('🔥 Модель прогрета');
            } catch (e) {
                console.error('Ошибка прогрева модели:', e);
            }
        }, { timeout: 600 });

        return () => cancelIdleCallback?.(id);
    }, []);

    console.log(formDefault)
    useEffect(() => {
        if (catchOne.name_day === '') {
            const hours = new Date().getHours();
            const timeId = hours < 6 ? 1 : hours < 12 ? 2 : hours < 18 ? 3 : 4;
            setFormState(prev => ({ ...prev, timeDay: timeId.toString() }));
        }
    }, [catchOne.name_day]);

    useEffect(() => {
        const isOwner = user.user?.id === catchOne.idUser;
        const isCreator = user.user?.id === user.tournament.find(e => e.id === idTour)?.created_by;
        set_admin(catchOne.idUser === 0 || isOwner || isCreator);
    }, [catchOne.idUser, user.user?.id, created?.created_by]);


    useEffect(() => {
        if (catchOne.urlFoto) {
            getImageOrigin(catchOne.urlFoto).then(setTimeFile);
        }
    }, [catchOne.urlFoto]);



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
        setInfo('Распознавание изображения');
        setShowRecognitionAlert(true)
        const file = event.target.files && event.target.files[0];
        //   console.log(event.target.files)
        if (file?.name) {
            const imageUrl = URL.createObjectURL(file);
            setTimeFile(imageUrl);
            const reader = new FileReader();
            // console.log(reader)
            reader.readAsDataURL(file);
            setFormState((prev) => ({ ...prev, image: file, urlFoto: file?.name }));


            // Создаем HTMLImageElement
            const img = new Image();
            img.src = imageUrl;
            img.crossOrigin = "anonymous"; // важно для предсказания

            img.onload = async () => {
                try {
                    const prediction = await predictFromImage(img);

                    console.log('Предсказание:', prediction);

                    // Пример: если классы совпадают с ID в справочнике
                    const className = prediction.className;

                    const fishMapping: Record<string, string> = {
                        "Щука": '2',
                        "Судак": '3',
                        "Окунь": '4',
                        "Лещ": '1'
                    };
                    console.log(className)
                    const predictedId = fishMapping[className];
                    if (predictedId) {
                        setFormState(prev => ({ ...prev, fishs: String(predictedId) }));
                        setInfo('')
                        setShowRecognitionAlert(false);
                    }
                } catch (error) {
                    console.error("Ошибка распознавания изображения:", error);
                }
            };

            img.onerror = (e) => {
                console.error("Ошибка загрузки изображения для предсказания", e);
            };
        }
    };
    const handleButtonClick = () => {
        if (!admin) return
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handlerStart = async () => {
        console.log(validTours)
        if (isProcessing.current) {
            setInfo('Улов сохраняется, подождите!');
            return
        }

        if (formState['fishs'] === 0 || formState['fishs'] === '0') {
            setInfo('Выберите вид рыбы');
            setShowRecognitionAlert(true)
            setTimeout(() => { setInfo(''); setShowRecognitionAlert(false) }, 2000);
            return;
        }

        if (formState.weight !== '' && !formState.urlFoto) {
            //setInfo('Добавьте фото улова')
            setInfo('Добавьте фото улова');;
            setShowRecognitionAlert(true)

            setTimeout(() => { setInfo(''); setShowRecognitionAlert(false) }, 2000);
            return;
        }
        isProcessing.current = true;
        // 🔒 Блокируем повторный запуск
        setInfo('Улов сохраняется...');
        setShowRecognitionAlert(true)
        try {
            let mess: null | { mess: string, catch: ExtendedBigFish } = null;

            const formData = new FormData();
            formData.append('fishs', formState.fishs.toString());
            formData.append('reservuors', formState.reservuors.toString());
            formData.append('typeFishing', formState.typeFishing.toString());
            formData.append('baits', formState.baits.toString());
            formData.append('timeDay', formState.timeDay.toString());
            formData.append('weight', formState.weight);
            formData.append('comment', formState.comment);
            formData.append('idTour', String(formState.idTour));
            formData.append('idUser', String(formState.idUser));

            formState.urlFoto && formData.append('urlFoto', formState.urlFoto);
            formState.image && formData.append('image', formState.image);

            if (catchOne.idCatch !== 0) {
                formData.append('idCatch', String(catchOne.idCatch));
                mess = await updateCatch(formData);

            } else {
                console.log(formData)
                mess = await setCatch(formData, validTours);
            }
            console.log(mess)
            if (mess) {
                /*  const setCatch = localStorage.getItem('setCatch')
                  const arraySet = setCatch ? JSON.parse(setCatch) : []
                  console.log(arraySet)
                  type CatchKeys = keyof Catch;
  
                  const obj = arraySet.reduce((acc: Record<CatchKeys, any>, e: CatchKeys) => {
                      acc[e] = formState[e]; // Здесь e гарантированно является ключом Catch
                      return acc;
                  }, {} as Record<CatchKeys, any>);*/

                localStorage.setItem('fishingData', JSON.stringify({ fishs: formState.fishs, reservuors: formState.reservuors, typeFishing: formState.typeFishing, baits: formState.baits }));
                setInfo(mess.mess);

                if (mess !== null && mess.catch) {
                    const updatedList = catchsList.map(e =>
                        e.idCatch === mess?.catch.idCatch ? { ...mess.catch } : e
                    );
                    dispatch(set_catchsList(updatedList));
                }
            }

            setTimeout(() => {
                setInfo('');
                dispatch(set_action_catch(actionCatch + 1));
                dispatch(set_catch(defaultState));
                setShowRecognitionAlert(false)
                closeModal();
                isProcessing.current = false;
            }, 0);
        } catch (error) {
            console.error('Ошибка при отправке:', error);
            setInfo('Ошибка при отправке данных');
            setShowRecognitionAlert(true)
            setTimeout(() => { setInfo(''); setShowRecognitionAlert(false) }, 2000);
        } finally {

        }
    };


    const getOptions = (fallback: any[], tournament: any[]) =>
        (tournament.length ? tournament : fallback).map(e => ({ value: e.id, text: e.name }));

    const fishs = getOptions(dataContent.fishs ?? [], tourEvent.fishs);
    const reservours = getOptions(dataContent.reservours ?? [], tourEvent.reservours);
    const baits = getOptions(dataContent.baits ?? [], tourEvent.typeBaits);
    const typeCatch = getOptions(dataContent.typeCatch ?? [], tourEvent.typeCatch);
    const timeDay = getOptions(dataContent.timeDay ?? [], []);

    const cancel = () => {
        dispatch(set_stateModalWindow({ type: 'catchForm', status: false }))
        dispatch(set_catch(defaultState))
    }

    const settDown = () => {
        dispatch(set_stateModalWindowTwo({ type: 'setLoad', status: true }))

    }
    return <><ModalAlert
        text={info}
        visible={showRecognitionAlert}
        onDone={() => setShowRecognitionAlert(false)}
    />
        <div className={showRecognitionAlert ? 'overlay-dark' : ''}>
            <div className="modal_add_tour modal_catch_tour" ref={modalka}>
                <div className="header_catchs"><div className="header_modal_tour card_catch">КАРТОЧКА УЛОВА</div><IoMdSettings className="setting_catch_user" onClick={settDown} /></div>
                <div className="body_modal_tour">
                    <div className="wrapper_type_catch">
                        <CustomSelect options={fishs || []} placeholder='ВИД РЫБЫ (начните ввод)' name="ВИД РЫБЫ" nameState="fishs" selected={formState['fishs'].toString()} onChange={handleSelectChange} />
                        <CustomSelect options={reservours || []} placeholder='ВОДОЁМ (начните ввод)' name='ВОДОЕМ' selected={formState['reservuors'].toString()} nameState='reservuors' onChange={handleSelectChange} />
                        <CustomSelect options={typeCatch || []} placeholder='ВИД ЛОВЛИ (начните ввод)' name='ТИП ЛОВЛИ' selected={formState['typeFishing'].toString()} nameState='typeFishing' onChange={handleSelectChange} />
                        <CustomSelect options={baits || []} placeholder='ПРИМАНКА (начните ввод)' name='ПРИМАНКА' selected={formState['baits'].toString()} nameState='baits' onChange={handleSelectChange} />
                    </div>
                    <div className="wrapper_antropometr">
                        <div className="one_rows">
                            <div className="rows_card_tour_catch hadl_enter">
                                <div className="name_title_option">ВЕС (Г)</div>
                                <input className="weight" value={formState['weight']} placeholder='введите вес рыбы' onChange={handleInputChange} />
                            </div>
                            <div className="rows_card_tour_catch hadl_enter">
                                <div className="name_title_option">ДЛИННА (СМ)</div>
                                <input className="weight" placeholder='введите длинну рыбы' />
                            </div>
                            <CustomSelect options={timeDay || []} placeholder='' name='ВРЕМЯ СУТОК' selected={formState['timeDay'].toString()} nameState='timeDay' onChange={handleSelectChange} />
                        </div>
                        <div className="rows_card_tour_catch">
                            <textarea className="input_car_tour" placeholder='КОММЕНТАРИЙ' value={formState['comment']} onChange={handleTextChange}></textarea>
                        </div>

                    </div>
                    <CatchFileUploader fileInputRef={fileInputRef} handleImageChange={handleImageChange} handleButtonClick={handleButtonClick} timeFile={timeFile} urlFoto={formState.urlFoto} onZoom={async () => {
                        if (!formState.urlFoto) return;
                        setIsZoomOpen(true);
                    }} />
                    <SelectTours catchFish={formState} />
                </div>
                <CatchModalFooter admin={admin} handlerStart={handlerStart} cancel={cancel} />
                {isZoomOpen && <ZoomModal timeFile={timeFile} onClose={() => setIsZoomOpen(false)} />}
            </div ></div>
    </>
}