
import { useState, useEffect, useRef, useContext } from 'react'
import { ContextForm } from '../../../servises/contexs/contextCloseForm';
import '../styles/FormCatch.css'
import { timeDay } from '../stor';
import { IoSave } from "react-icons/io5";


export const FormCatch = () => {
    const { dispatch: dispatchForm } = useContext(ContextForm)
    const [timeDayKey, setTimeDayKey] = useState('')
    const modalka = useRef<HTMLDivElement>(null)
    useEffect(() => {

        const findTimeDay = () => {
            const nowTime = new Date()
            const hours = nowTime.getHours()
            if (hours < 6) {
                setTimeDayKey(timeDay[0]); // Ночь
            } else if (hours < 12) {
                setTimeDayKey(timeDay[1]); // Утро
            } else if (hours < 18) {
                setTimeDayKey(timeDay[2]); // День
            } else {
                setTimeDayKey(timeDay[3]); // Вечер
            }
        }

        findTimeDay()

        /*  if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(position => {
                  console.log(position.coords.latitude,
                      position.coords.longitude)
                  //   setLocation({
                  ////  latitude: position.coords.latitude,
                  //  longitude: position.coords.longitude
                  //});
              },
                  error => {
                      //  setError(error.message);
                  })
  
  
  
          }*/


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



    const closeModal = () => {
        dispatchForm({ type: 'add_catch', payload: false })
    }
    return (
        <div className="modal_add_tour" ref={modalka}>
            <div className="header_modal_tour">Карточка улова</div>
            <div className="body_modal_tour">
                <div className="rows_card_tour">
                    <div className="name_car_tour">Рыба</div>
                    <select className="select">
                        <option className='option' value=""></option>
                        <option className='option' value="0">Лещ</option>
                        <option className='option' value="1">Щука</option>
                        <option className='option' value="2">Судак</option>
                        <option className='option' value="3">Окунь</option>
                        <option className='option' value="4">Форель</option>
                        <option className='option' value="4">Другое</option>
                    </select>
                </div>
                <div className="rows_card_tour">
                    <div className="name_car_tour">Вес (граммы)</div>
                    <input className="weight" placeholder='введите вес рыбы' />
                </div>
                <div className="rows_card_tour">
                    <div className="name_car_tour">Водоём</div>
                    <select className="select">
                        <option className='option' value=""></option>
                        <option className='option' value="0">Финский залив (Соколинское)</option>
                        <option className='option' value="1">река Волхов (Ленинградская область)</option>
                        <option className='option' value="2">Ладожское озеро (Креницы)</option>
                        <option className='option' value="3">Ладожское озеро (Шхеры)</option>
                        <option className='option' value="4">река Ловать (Новгородская область)</option>
                    </select>
                </div>
                <div className="rows_card_tour">
                    <div className="name_car_tour">Тип ловли</div>
                    <select className="select">
                        <option className='option' value=""></option>
                        <option className='option' value="0">Троллинг</option>
                        <option className='option' value="1">Заброс с берега</option>
                        <option className='option' value="2">Заброс с лодки</option>
                    </select>
                </div>
                <div className="rows_card_tour">
                    <div className="name_car_tour">Приманка</div>
                    <select className="select">
                        <option className='option' value=""></option>
                        <option className='option' value="0">Мэпс 3</option>
                        <option className='option' value="1">Хаски Джерк FT 120</option>
                        <option className='option' value="2">Колебло</option>
                        <option className='option' value="3">Резина</option>
                    </select>
                </div>
                <div className="rows_card_tour">
                    <div className="name_car_tour">Время суток</div>
                    <span className="input_car_tour">{timeDayKey}</span>
                </div>
                <div className="rows_card_tour">
                    <div className="name_car_tour">Комментарии</div>
                    <textarea className="input_car_tour"></textarea>
                </div>
                <div className="rows_card_tour">
                    <div className="name_car_tour">Фото</div>
                </div>

            </div>
            <div className="footer_modal_tour">
                <div className="messageAlarm">{ }</div>
                <IoSave className="start_tour" />
            </div>
        </div >
    )
}