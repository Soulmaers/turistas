import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import { User } from './Interface'
import { MyContext } from '../../../context/contexts'


type UserResponce = User | null


const useForm = () => {

    const { dispatch } = useContext(MyContext)

    const [subField, setSubField] = useState<boolean>(false)
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
        if (!subField) {
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
        async function getDataUser() {
            const contactID = contactRef.current ? contactRef.current.value : null;
            const username = nameRef.current ? nameRef.current.value : null;
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
                setSubField(true)
            }
            else {
                dispatch({ type: 'update_status_user', payload: data })
                dispatch({ type: 'update_content', payload: 2 })
            }
        }
        if (getUser) {
            getDataUser()
            setGetUser(false)
        }

    }, [getUser])

    return { subField, errorMessage, getUser, findUser, changeInputField, changeInputFieldName, contactRef, nameRef }

}


export default useForm