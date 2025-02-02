import React, { createContext, useReducer, ReactNode } from "react";


interface ModalFormContext {
    activForm: boolean,
    stateModal: boolean,
    catchForm: boolean,
    dispatch: React.Dispatch<ActionType>;
}
interface PropsModalProvider {
    children: ReactNode
}

type ActionType = | { type: 'controll_modal_form'; payload: boolean } | { type: 'update_modal'; payload: boolean } | { type: 'add_catch'; payload: boolean }

const reducer = (state: ModalFormContext, action: ActionType): ModalFormContext => {
    switch (action.type) {
        case 'controll_modal_form':
            return { ...state, activForm: action.payload }
        case 'update_modal':
            return { ...state, stateModal: action.payload }
        case 'add_catch':
            return { ...state, catchForm: action.payload }
        default:
            return state

    }
}
export const ContextForm = createContext<ModalFormContext>({
    activForm: true,
    stateModal: false,
    catchForm: false,
    dispatch: () => { }
}
)
export const ProviderForm: React.FC<PropsModalProvider> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        activForm: true,
        stateModal: false,
        catchForm: false,
        dispatch: () => { }
    })

    return (<ContextForm.Provider value={{ ...state, dispatch }}>
        {children}
    </ContextForm.Provider>)
}