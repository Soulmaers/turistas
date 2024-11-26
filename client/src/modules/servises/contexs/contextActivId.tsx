import React, { createContext, useReducer, ReactNode } from "react";

interface ContextActivId {
    idClickTour: number | null,
    dispatch: React.Dispatch<ActionType>;
}


interface PropsProviderActivId {
    children: ReactNode
}

type ActionType = | { type: 'click_tour', payload: number | null }

const reducer = (state: ContextActivId, action: ActionType): ContextActivId => {

    switch (action.type) {

        case 'click_tour':
            return { ...state, idClickTour: action.payload }
        default: return state
    }
}
export const ContextActiv = createContext<ContextActivId>({
    idClickTour: null,
    dispatch: () => { }
}
)


export const ProvideActivTour: React.FC<PropsProviderActivId> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        idClickTour: null,
        dispatch: () => { }
    })


    return (<ContextActiv.Provider value={{ ...state, dispatch }}>
        {children}
    </ContextActiv.Provider>

    )
}
