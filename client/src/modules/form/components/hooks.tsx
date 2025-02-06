import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { User } from './Interface'
import { ContextForm } from '../../servises/contexs/contextCloseForm'
import { TourData } from '../../servises/contexs/contextStateTourData'


import { updateContent, updateStatusUser } from '../../../GlobalStor';

type UserResponce = User | null


const useForm = () => {

    const dispatch = useDispatch()
    const tourContext = useContext(TourData)

    const { dispatch: dispatchForm } = useContext(ContextForm)
    const [subField, setSubField] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [getUser, setGetUser] = useState<boolean>(false)

    const contactRef = useRef<HTMLInputElement | null>(null)
    const nameRef = useRef<HTMLInputElement | null>(null)

    const changeInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (contactRef.current) {
            contactRef.current.value = event.target.value; // Обновляем значение в рефе
        }
    };
    const changeInputFieldName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (nameRef.current) {
            nameRef.current.value = event.target.value; // Обновляем значение в рефе
        }
    };

    const findUser = () => {
        const contactValue = contactRef.current ? contactRef.current.value.toString() : '';
        const nameValue = nameRef.current ? nameRef.current.value.trim() : '';
        console.log(subField)
        // Проверка на некорректный ввод
        if (subField) {
            if (contactValue.length < 11) {
                setErrorMessage('Некорректный КонтактID');
                return;
            }
        } else {
            if (contactValue.length < 11 || nameValue === "") {
                setErrorMessage('Некорректный ввод');
                return;
            }
        }
        setErrorMessage('');
        setGetUser(true);
    }


    useEffect(() => {
        async function getDataUser(contactID: string | null, username: string | null) {

            const params = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ contactID, username })
            }
            const res = await fetch(`http://localhost:3333/api/user/check`, params);
            const data: UserResponce = await res.json()
            if (!data) {
                setErrorMessage('Пользователь не найден');
            }
            else {
                let statusTour;
                if (data.tournament.length !== 0) {
                    const lastTournament = data.tournament[data.tournament.length - 1]
                    statusTour = Number(lastTournament?.status)
                }
                else {
                    statusTour = null
                }

                dispatch(updateStatusUser(data))
                tourContext?.setTour((prev) => ({ ...prev, users: [{ name_user: data.user?.name_user || '', contactID: data.user?.contactID || '', userID: data.user?.id || null }] }))

                dispatchForm({ type: 'controll_modal_form', payload: false })

                dispatch(updateContent(statusTour))

            }

        }
        if (getUser) {
            const contactID = contactRef.current ? contactRef.current.value : null;
            const username = nameRef.current ? nameRef.current.value : null;
            getDataUser(contactID, username)
            setGetUser(false)
        }

    }, [getUser])

    return { subField, setSubField, errorMessage, getUser, findUser, changeInputField, changeInputFieldName, contactRef, nameRef }

}


export default useForm