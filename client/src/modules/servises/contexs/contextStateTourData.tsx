

import React, { useContext, useState, createContext, ReactNode } from 'react'


export interface Participants {
    name_user: string,
    contactID: string,
    userID: number | null
}
interface DataTour {
    id: number | null,
    nameTour: string,
    dateStart: string,
    dateFinish: string,
    users: Participants[]
}

interface TourDataContext {
    tour: DataTour,
    setTour: React.Dispatch<React.SetStateAction<DataTour>>;
}
interface TourDataProvider {
    children: ReactNode
}
export const TourData = createContext<TourDataContext | null>(null);

export const TourDataProvider: React.FC<TourDataProvider> = ({ children }) => {

    const [tour, setTour] = useState<DataTour>({
        id: null,
        nameTour: '',
        dateStart: '',
        dateFinish: '',
        users: []
    })

    return (<TourData.Provider value={{ tour, setTour }}>
        {children}
    </TourData.Provider>)
}