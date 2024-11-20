import React, { createContext, useState, ReactNode, useReducer } from 'react';
// Интерфейс для состояния контекста

interface UpdateReservours {
    index: number | null,
    text: string | null
}
interface MyContextType {
    state: {
        content: number | null;
        stateModal: boolean;
        subMenu: string | null;
        updateReservours: UpdateReservours
    },
    dispatch: React.Dispatch<ActionType>; // Добавляем dispatch в интерфейс
}

// Типы действий
type ActionType =
    | { type: 'update_content'; payload: number | null }
    | { type: 'update_modal'; payload: boolean }
    | { type: 'update_spoyler'; payload: string | null }
    | { type: 'update_reservours'; payload: UpdateReservours };

const reducer = (state: MyContextType['state'], action: ActionType): MyContextType['state'] => {
    switch (action.type) {
        case 'update_content':
            return { ...state, content: action.payload };
        case 'update_modal':
            return { ...state, stateModal: action.payload };
        case 'update_spoyler':
            return { ...state, subMenu: action.payload };
        case 'update_reservours':
            return { ...state, updateReservours: action.payload };
        default:
            return state;
    }
};
// Создаем контекст
export const MyContext = createContext<MyContextType>({
    state: {
        content: null,
        stateModal: false,
        subMenu: null,
        updateReservours: { index: null, text: null }
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
        subMenu: null,
        updateReservours: { index: null, text: null }
    });
    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    );
};