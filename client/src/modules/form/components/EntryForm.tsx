import '../styles/EntryForm.css'
import { useState } from 'react';
import { useGetDataUser } from '../../servises/hooks/getDataUser'
import { FaEye, FaEyeSlash } from 'react-icons/fa';


interface Entry {
    index: number
    onDone: () => void;
}
export const EntryForm: React.FC<Entry> = ({ index, onDone }) => {
    const { getDataUser } = useGetDataUser()

    const [errorMessage, setErrorMessage] = useState('')
    const [valueContact, setValueContact] = useState('')
    const [valueName, setValueName] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const inputElement = e.target as HTMLInputElement;
        const value = inputElement.value;
        // Не даем удалить первую цифру
        if (e.key === 'Backspace' && value.length <= 1) {
            e.preventDefault();
            return;
        }
        // Разрешенные клавиши: цифры, стрелки, таб, delete
        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
        // Разрешаем, если это цифра (0–9)
        if (/^\d$/.test(e.key)) {
            return;
        }
        // Разрешаем специальные клавиши
        if (allowedKeys.includes(e.key)) {
            return;
        }
        // Все остальное блокируем
        e.preventDefault();
    };

    const changeInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueContact(event.target.value)
    };

    const changeInputFieldName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueName(event.target.value)

    };
    const changeInputFieldPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValuePassword(event.target.value)

    };
    const changeInputFieldPassConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPass(event.target.value)

    };

    const handler = async () => {
        if (valueContact.length < 11) {
            setErrorMessage('Некорректный номер телефона');
            return;
        }
        if (index === 2 && !valueName.trim()) {
            setErrorMessage('Укажите имя пользователя');
            return;
        }
        if (index === 2 && valuePassword === '') {
            setErrorMessage('Укажите пароль');
            return;
        }
        if (index === 2 && valuePassword !== confirmPass) {
            setErrorMessage('Проверьте пароль');
            return;
        }
        const result = await getDataUser(valueContact, valuePassword, index === 1 ? null : valueName);
        if (!result) {
            setErrorMessage('Пользователь не найден');
            return;
        }
        onDone();
    };


    const footer = (
        <div className='entry_footer' onClick={handler}>{index === 1 ? 'ВОЙТИ' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}</div>
    )
    const renderInputs = () => {
        if (index === 1) {
            return (<div className="container_auth">
                {renderInputContact()}
                <div className="row_pass_input">
                    <input className="input_entry" type={showPassword ? 'text' : 'password'} value={valuePassword} onChange={changeInputFieldPass} placeholder='ПАРОЛЬ' />
                    <span className="toggle_password" onClick={toggleShowPassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
            </div>
            )
        }
        else {
            return (<div className="container_auth">
                <input className="input_entry" value={valueName} onChange={changeInputFieldName} placeholder='ИМЯ УЧАСТНИКА' />
                {renderInputContact()}
                <div className="row_pass_input">
                    <input className="input_entry" type={showPassword ? 'text' : 'password'} value={valuePassword} onChange={changeInputFieldPass} placeholder='ПАРОЛЬ' />
                    <span className="toggle_password" onClick={toggleShowPassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span></div>
                <div className="row_pass_input">
                    <input className="input_entry" type={showPassword ? 'text' : 'password'} value={confirmPass} onChange={changeInputFieldPassConfirm} placeholder='ПОДТВЕРЖДЕНИЕ ПАРОЛЯ' />
                    <span className="toggle_password" onClick={toggleShowPassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span></div>
            </div>)
        }
    }

    const renderInputContact = () => (
        <input
            type="text"
            className="input_entry"
            value={valueContact}
            placeholder="ТЕЛЕФОН"
            maxLength={11}
            inputMode="numeric"
            pattern="\d*"
            onKeyDown={handleKeyDown}
            onChange={changeInputField}
            onFocus={() => {
                if (valueContact === '') {
                    setValueContact('7');
                }
            }}
        />
    );
    const generateJSX = (
        <div className="entry_wrapper">
            <div className='header_entry_form'>
                <div className="title_entry_form">Добро пожаловать!</div>
                <div className="discription_entry_form">
                    С помощью этого приложения Вы можете устраивать раболовные турниры со своими друзьями,
                    а также вести учет личного улова.
                </div>
            </div>
            {renderInputs()}
            <div className='messAlarm'>{errorMessage}</div>
            {footer}
        </div>
    )
    return generateJSX
}



