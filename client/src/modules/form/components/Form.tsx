import React from 'react'
import { useState, useContext, useEffect } from 'react'
import '../styles/Form.css'
import { MyContext } from '../../../context/contexts'



const Form = () => {

    const { state, dispatch } = useContext(MyContext)  //контекст для передачи состояния


    const [contactID, setContactID] = useState(7)
    const [nameUser, setNameUser] = useState<string>('')
    const [subField, setSubField] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [getUser, setGetUser] = useState(false)

    const changeInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value ? parseInt(event.target.value) : 7;
        setContactID(newValue); // Обновляем состояние contactID
    };
    const changeInputFieldName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setNameUser(newValue); // Обновляем состояние contactID
    };
    const findUser = () => {
        console.log(subField)
        if (!subField) {
            if (contactID.toString().length < 11) {
                setErrorMessage('Некорректный КонтактID')
                return
            }
            else {
                setGetUser(true)

            }
        }
        else {
            if (contactID.toString().length < 11 || nameUser.trim() === "") {
                setErrorMessage('Некорректный ввод')
                return
            }
            dispatch({ type: 'update_content', payload: 1 })
        }
        setErrorMessage('')

    }


    useEffect(() => {
        console.log(getUser)
        async function getDataUser() {
            console.log('тута?')
            const res = await fetch(`http://localhost:3333/api/user/check/${contactID}`);
            const data = await res.json()
            if (data.length === 0) {
                setSubField(true)
            }
            else {
                dispatch({ type: 'update_content', payload: 0 })
            }
            console.log(data)
        }
        if (getUser) {
            getDataUser()
            //  setGetUser(false)
        }

    }, [getUser])



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