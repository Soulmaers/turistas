import React from 'react'
import { useState, useCallback, useContext } from 'react'
import { MyContext } from '../../../../context/contexts';
import { IoMdAddCircle } from "react-icons/io";
import '../styles/UserInput.css'


const UserInput = () => {

    const { state, dispatch } = useContext(MyContext)

    const addUser = () => {
        dispatch({ type: 'update_userdata', payload: [...state.usersData, { name: '', contact: '' }] })
    }


    const handleUserInputChange = useCallback((index: number, type: 'name' | 'contact', value: string) => {
        dispatch({
            type: 'update_userdata',
            payload: state.usersData.map((user, i) => {
                if (i === index) {
                    return { ...user, [type]: value };
                }
                return user;
            }),
        });
    }, [dispatch, state.usersData]);

    const rows = state.usersData.map((e, index) => <div key={index} className="user_card">
        <div className="rows_user"><div className="label_name">Имя</div><input className="input_user_value" value={e.name} onChange={(event) => handleUserInputChange(index, 'name', event.target.value)} /></div>
        <div className="rows_user"><div className="label_name">КонтактID</div><input className="input_user_value" value={e.contact} onChange={(event) => handleUserInputChange(index, 'contact', event.target.value)} /></div>
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