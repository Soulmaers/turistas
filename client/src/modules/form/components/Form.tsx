import React from 'react'

import '../styles/Form.css'
import useForm from './hooks'



const Form = () => {

    const { subField, errorMessage, changeInputField, changeInputFieldName, findUser, contactRef, nameRef } = useForm()

    console.log('рендерформ')

    return (
        <div className="form_card">
            <div className="title_form">Форма входа</div>
            <div className="contact_ID"><span className="label_form">Введите КонтактID</span>
                <input className="input_form" ref={contactRef} defaultValue='7' onChange={changeInputField} maxLength={11} /></div>
            {subField &&
                <div className="contact_ID"><span className="label_form">Введите Имя</span>
                    <input className="input_form" ref={nameRef} defaultValue='' onChange={changeInputFieldName} /></div>}

            <div className="button_form" onClick={findUser}>{subField ? 'Регистрация' : 'Войти'} </div>
            <div className="footer_form">
                <div className="message_from">{errorMessage}</div>
            </div>
        </div>
    )
}


export default Form