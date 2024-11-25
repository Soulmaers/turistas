import React, { createContext, useState, ReactNode, useReducer } from 'react';
import { User } from '../modules/form/components/Interface'
// Интерфейс для состояния контекста

interface UpdateReservours {
    index: number | null,
    text: string | null
}


interface MyContextType {
    state: {
        content: number | null;
        stateModal: boolean;
        updateReservours: UpdateReservours,
        userStatus: User
    },
    dispatch: React.Dispatch<ActionType>; // Добавляем dispatch в интерфейс
}

// Типы действий
type ActionType =
    | { type: 'update_content'; payload: number | null }
    | { type: 'update_modal'; payload: boolean }
    | { type: 'update_reservours'; payload: UpdateReservours }
    | { type: 'update_status_user'; payload: User }


const reducer = (state: MyContextType['state'], action: ActionType): MyContextType['state'] => {
    switch (action.type) {
        case 'update_content':
            return { ...state, content: action.payload };
        case 'update_modal':
            return { ...state, stateModal: action.payload };
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
        stateModal: false,
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
        stateModal: false,
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
export const selectStateModal = (state: MyContextType['state']) => state.stateModal;
export const selectReservours = (state: MyContextType['state']) => state.updateReservours;
