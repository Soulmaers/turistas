import React, { createContext, useState, ReactNode } from 'react';

// Интерфейс для состояния контекста
interface MyContextType {
    state: number | null;
    setState: (value: number | null) => void;
    stateModal: boolean;
    setStateModal: (value: boolean) => void;
}
// Создаем контекст
export const MyContext = createContext<MyContextType>(
    {
        state: null, setState: () => { },
        stateModal: false, setStateModal: () => { }
    }

)

// Интерфейс для пропсов провайдера
interface MyProviderProps {
    children: ReactNode;
}

// Создаем провайдер
export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
    const [state, setState] = useState<number | null>(null); // Установите ваше начальное значение\
    const [stateModal, setStateModal] = useState<boolean>(false); // Установите ваше начальное значение
    console.log(state)
    return (
        <MyContext.Provider value={{ state, setState, stateModal, setStateModal }}>
            {children}
        </MyContext.Provider>
    );
};