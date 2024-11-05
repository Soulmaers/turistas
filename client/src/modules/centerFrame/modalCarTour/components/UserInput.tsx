import React from 'react'
import '../styles/UserInput.css'



interface UserInputProps {
    index: number,
    user: { name: string, contact: string },
    onUserInputChange: (index: number, type: 'name' | 'contact', value: string) => void

}



const UserInput: React.FC<UserInputProps> = ({ index, user, onUserInputChange }) => {

    return (<div className="user_card">
        <div className="rows_user">
            <div className="label_name">Имя</div>
            <input
                className="input_user_value"
                value={user.name}
                onChange={(event) => onUserInputChange(index, 'name', event.target.value)}
            />
        </div>
        <div className="rows_user">
            <div className="label_name">КонтактID</div>
            <input
                className="input_user_value"
                value={user.contact}
                onChange={(event) => onUserInputChange(index, 'contact', event.target.value)}
            />
        </div>
    </div>)

}


export default UserInput