import React from 'react'
import { useState, useContext } from 'react'
import '../styles/Form.css'
import { MyContext } from '../../../context/contexts'



const Form = () => {

    const { state, dispatch } = useContext(MyContext)  //контекст для передачи состояния


    const [contactID, setContactID] = useState(7)
    const [nameUser, setNameUser] = useState<string>('')
    const [subField, setSubField] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const changeInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value ? parseInt(event.target.value) : 7;
        setContactID(newValue); // Обновляем состояние contactID
    };
    const changeInputFieldName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setNameUser(newValue); // Обновляем состояние contactID
    };
    const findUser = () => {
        if (!subField) {
            if (contactID.toString().length < 11) {
                setErrorMessage('Некорректный КонтактID')
                return
            }
            //  updateHaveTour(1)

        }
        else {
            if (contactID.toString().length < 11 || nameUser.trim() === "") {
                setErrorMessage('Некорректный ввод')
                return
            }
            dispatch({ type: 'update_content', payload: 1 })
        }
        setErrorMessage('')
        setSubField(true)

    }



    return (<div className="form">
        <div className="form_card">
            <div className="title_form">Форма входа</div>
            <div className="contact_ID"><span className="label_form">Введите КонтактID</span>
                <input className="input_form" value={contactID} onChange={changeInputField} maxLength={11} /></div>
            {subField &&
                <div className="contact_ID"><span className="label_form">Введите Имя</span>
                    <input className="input_form" value={nameUser} onChange={changeInputFieldName} /></div>}

            <div className="button_form" onClick={findUser}>{subField ? 'Регистрация' : 'Войти'} </div>
            <div className="footer_form">
                <div className="message_from">{errorMessage}</div>
            </div>
        </div>
    </div>)
}


export default Form