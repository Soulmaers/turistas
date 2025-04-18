import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/Form.css'
import useForm from './hooks'



const Form = () => {
    const { setSubField, subField, errorMessage, changeInputField, changeInputFieldName, findUser, contactRef, nameRef } = useForm()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const inputElement = e.target as HTMLInputElement; // Явное приведение типа
        const value = inputElement.value;
        if (e.key === 'Backspace' && value.length <= 1) {
            e.preventDefault(); // Предотвращаем удаление "7"
        }
    };
    const storedContact = localStorage.getItem('lastContact') || '7';

    // Функция для запуска findUser при загрузке, если есть данные
    const checkLocalStorageAndFindUser = () => {
        const contactValue = localStorage.getItem('lastContact');
        if (contactValue) {
            if (contactRef.current) {
                contactRef.current.value = contactValue; // Обновляем значение инпута
            }
            //  changeInputField({ target: { value: contactValue } }); // Обновляем состояние
            findUser(); // Запускаем проверку
        }
    };

    // Запускаем проверку при монтировании компонента
    useEffect(() => {
        checkLocalStorageAndFindUser();
    }, [])
    return (
        <div className="form_card">
            <div className="buttons_form">
                <button className="btn_auth" onClick={() => setSubField(true)}>Войти</button>
                <button className="btn_auth" onClick={() => setSubField(false)}>Зарегистрироваться</button>
            </div>
            <div className="title_form">Форма {subField ? 'входа' : 'регистрации'}</div>
            <div className="contact_ID"><span className="label_form">Введите КонтактID</span>
                <input className="input_form" ref={contactRef} defaultValue={storedContact} onKeyDown={handleKeyDown} onChange={changeInputField} maxLength={11} /></div>
            {!subField &&
                <div className="contact_ID"><span className="label_form">Введите Имя</span>
                    <input className="input_form" ref={nameRef} defaultValue='' onChange={changeInputFieldName} /></div>}

            <div className="button_form" onClick={findUser}>{!subField ? 'Регистрация' : 'Вход'} </div>
            <div className="footer_form">
                <div className="message_from">{errorMessage}</div>
            </div>
        </div>
    )
}


export default Form