import React from 'react'
import { useState } from 'react'
import '../styles/Form.css'
import useForm from './hooks'



const Form = () => {
    const { setSubField, subField, errorMessage, changeInputField, changeInputFieldName, findUser, contactRef, nameRef } = useForm()


    return (
        <div className="form_card">
            <div className="buttons_form">
                <button className="btn_auth" onClick={() => setSubField(true)}>Войти</button>
                <button className="btn_auth" onClick={() => setSubField(false)}>Зарегистрироваться</button>
            </div>
            <div className="title_form">Форма {subField ? 'входа' : 'регистрации'}</div>
            <div className="contact_ID"><span className="label_form">Введите КонтактID</span>
                <input className="input_form" ref={contactRef} defaultValue='7' onChange={changeInputField} maxLength={11} /></div>
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