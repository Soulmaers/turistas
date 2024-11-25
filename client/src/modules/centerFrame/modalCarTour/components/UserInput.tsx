import React from 'react'
import { useCallback } from 'react'

import { IoMdAddCircle } from "react-icons/io";
import '../styles/UserInput.css'


interface UpdateData {
    name: string,
    contact: string
}

interface UserInputProps {
    users: UpdateData[];
    onUsersChange: (users: UpdateData[]) => void;
}

const UserInput: React.FC<UserInputProps> = ({ users, onUsersChange }) => {


    const addUser = useCallback(() => {
        onUsersChange([...users, { name: '', contact: '7' }]);
    }, [users, onUsersChange]);


    const handleUserInputChange = useCallback((index: number, type: 'name' | 'contact', value: string) => {
        const filteredValue = type === 'name' ? value : value.replace(/\D/g, '')
        const updatedUsers = [...users];
        updatedUsers[index] = { ...updatedUsers[index], [type]: filteredValue };
        onUsersChange(updatedUsers);
    }, [users, onUsersChange]);

    const rows = users.map((e, index) => <div key={index} className="user_card">
        <div className="rows_user"><div className="label_name">Имя</div><input className="input_user_value" value={e.name} onChange={(event) => handleUserInputChange(index, 'name', event.target.value)} /></div>
        <div className="rows_user"><div className="label_name">КонтактID</div><input className="input_user_value" value={e.contact} maxLength={11} onChange={(event) => handleUserInputChange(index, 'contact', event.target.value)} /></div>
    </div>)

    return (
        <>
            <div className="rows_card_tour">
                <div className="name_car_tour">Участники<IoMdAddCircle className="addUser" onClick={addUser} /></div>
            </div>
            <div className="users">{rows}</div>
        </>
    )
}




export default UserInput