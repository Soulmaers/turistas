import React, { createContext, useState, ReactNode, useReducer } from 'react';
import { User } from '../../form/components/Interface'
// Интерфейс для состояния контекста
/*
interface UpdateReservours {
    index: number | null,
    text: string | null
}


interface MyContextType {
    state: {
        content: number | null | undefined;
        updateReservours: UpdateReservours,
        userStatus: User
    },
    dispatch: React.Dispatch<ActionType>; // Добавляем dispatch в интерфейс
}

// Типы действий
type ActionType =
    | { type: 'update_content'; payload: number | null | undefined }
    | { type: 'update_reservours'; payload: UpdateReservours }
    | { type: 'update_status_user'; payload: User }


const reducer = (state: MyContextType['state'], action: ActionType): MyContextType['state'] => {
    switch (action.type) {
        case 'update_content':
            return { ...state, content: action.payload };
        case 'update_reservours':
            return { ...state, updateReservours: action.payload };
        case 'update_status_user':
            return { ...state, userStatus: action.payload };
        default:
            return state;
    }
};
// Создаем контекст
export const MyContext = createContext<MyContextType>({
    state: {
        content: null,
        updateReservours: { index: null, text: null },
        userStatus: { user: null, tournament: [] }
    },
    dispatch: () => { } // Добавляем заглушку для dispatch
});
// Интерфейс для пропсов провайдера
interface MyProviderProps {
    children: ReactNode;
}
// Создаем провайдер
export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        content: null,
        updateReservours: { index: null, text: null },
        userStatus: { user: null, tournament: [] }
    });
    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    );
};

export const selectUserStatus = (state: MyContextType['state']) => state.userStatus;
export const selectContent = (state: MyContextType['state']) => state.content;
export const selectReservours = (state: MyContextType['state']) => state.updateReservours;
*/