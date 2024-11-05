import React from 'react'
import { useState } from 'react'
import '../styles/Form.css'

const Form = () => {
    const [contactID, setContactID] = useState(7)

    const changeInputField = (event: string) => {
        const value = event.target.value
    }




    return (<div className="form">
        <div className="form_card">
            <div className="title_form">Форма входа</div>
            <div className="contact_ID"><span className="label_form">Введите КонтактID</span>
                <input className="input_form" value={contactID} onChange={changeInputField} maxLength={10} /></div>
            <div className="button_form">Войти</div>
            <div className="footer_form">
                <div className="message_from"></div>
            </div>
        </div>
    </div>)
}


export default Form