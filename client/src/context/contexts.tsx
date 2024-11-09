import React, { createContext, useState, ReactNode, useReducer } from 'react';
// Интерфейс для состояния контекста
interface MyContextType {
    state: number | null;
    stateModal: boolean;
    dispatch: React.Dispatch<ActionType>; // Добавляем dispatch в интерфейс
}
// Типы действий
type ActionType =
    | { type: 'update_content'; payload: number | null }
    | { type: 'update_modal'; payload: boolean };
const reducer = (state: MyContextType, action: ActionType): MyContextType => {
    switch (action.type) {
        case 'update_content':
            return { ...state, state: action.payload };
        case 'update_modal':
            return { ...state, stateModal: action.payload };
        default:
            return state;
    }
};
// Создаем контекст
export const MyContext = createContext<MyContextType>({
    state: null,
    stateModal: false,
    dispatch: () => { } // Добавляем заглушку для dispatch
});
// Интерфейс для пропсов провайдера
interface MyProviderProps {
    children: ReactNode;
}
// Создаем провайдер
export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { state: null, stateModal: false, dispatch: () => { } });
    return (
        <MyContext.Provider value={{ ...state, dispatch }}>
            {children}
        </MyContext.Provider>
    );
};