import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, set_tour } from '../../../GlobalStor';
import { User } from './Interface'



import { updateStatusUser, controll_modal_form } from '../../../GlobalStor';

type UserResponce = User | null


const useForm = () => {
    const dispatch = useDispatch()
    const tour = useSelector((state: RootState) => state.slice.tour)
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
        localStorage.setItem('lastContact', contactValue); //
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
            const res = await fetch(`/api/user/check`, params);
            const data: UserResponce = await res.json()
            if (!data) {
                setErrorMessage('Пользователь не найден');
            }
            else {
                dispatch(updateStatusUser(data))
                if (tour) {
                    dispatch(set_tour({
                        ...tour,
                        users: []
                    }))
                }
                dispatch(controll_modal_form(false))


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