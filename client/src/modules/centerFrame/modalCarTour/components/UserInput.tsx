import React from 'react'
import { useCallback } from 'react'
import { Participants } from '../../../../GlobalStor'
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import '../styles/UserInput.css'




interface UserInputProps {
    users: Participants[];
    onUsersChange: (users: Participants[]) => void;
}

const UserInput: React.FC<UserInputProps> = ({ users, onUsersChange }) => {

    const addUser = useCallback(() => {
        onUsersChange([...users, { name_user: '', contactID: '7', userID: null }]);
    }, [users, onUsersChange]);

    const removeLastUser = useCallback(() => {
        const updatedUsers = users.slice(0, -1); // Удаляем последнего пользователя из списка
        //  setUsers(updatedUsers);
        onUsersChange(updatedUsers);
    }, [users, onUsersChange]);

    const handleUserInputChange = useCallback((index: number, type: 'name_user' | 'contactID', value: string) => {
        const filteredValue = type === 'name_user' ? value : value.replace(/\D/g, '')
        const updatedUsers = [...users];
        updatedUsers[index] = { ...updatedUsers[index], [type]: filteredValue };
        console.log(updatedUsers)
        onUsersChange(updatedUsers);
    }, [users, onUsersChange]);

    const rows = users.map((e, index) => <div key={index} className="user_card">
        <div className="rows_user"><div className="label_name">Имя</div><input className="input_user_value" value={e.name_user} onChange={(event) => handleUserInputChange(index, 'name_user', event.target.value)} /></div>
        <div className="rows_user"><div className="label_name">КонтактID</div><input className="input_user_value" value={e.contactID} maxLength={11} onChange={(event) => handleUserInputChange(index, 'contactID', event.target.value)} /></div>
    </div>)

    return (
        <>
            <div className="rows_card_tour">
                <div className="name_car_tour">Участники<IoMdAddCircle className="addUser" onClick={addUser} /> <IoMdRemoveCircle className="removeUser" onClick={removeLastUser} /></div>
            </div>
            <div className="users">{rows}</div>
        </>
    )
}




export default UserInput