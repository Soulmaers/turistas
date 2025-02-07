import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';
import { User } from './modules/form/components/Interface';

// Интерфейс для UpdateReservours
interface UpdateReservours {
    index: number | null;
    text: string | null;
}

// Интерфейс для состояния
interface MyState {
    content: number | null | undefined;
    updateReservours: UpdateReservours;
    userStatus: User;
    activForm: boolean,
    stateModal: boolean,
    catchForm: boolean,
    idClickTour: number | null
    tour: DataTour
}

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



// Начальное состояние
const initialState: MyState = {
    content: null,
    updateReservours: { index: null, text: null },
    userStatus: { user: null, tournament: [] },
    activForm: true,
    stateModal: false,
    catchForm: false,
    idClickTour: null,
    tour: {
        id: null,
        nameTour: '',
        dateStart: '',
        dateFinish: '',
        users: []
    }

};

// Создаем slice
const slice = createSlice({
    name: 'GlobalStor',
    initialState,
    reducers: {
        updateContent: (state, action: PayloadAction<number | null | undefined>) => {
            state.content = action.payload;
        },
        updateReservours: (state, action: PayloadAction<UpdateReservours>) => {
            state.updateReservours = action.payload;
        },
        updateStatusUser: (state, action: PayloadAction<User>) => {
            state.userStatus = action.payload;
        },
        controll_modal_form: (state, action: PayloadAction<boolean>) => {
            state.activForm = action.payload;
        },
        update_modal: (state, action: PayloadAction<boolean>) => {
            state.stateModal = action.payload;
        },
        add_catch: (state, action: PayloadAction<boolean>) => {
            state.catchForm = action.payload;
        },
        click_tour: (state, action: PayloadAction<number | null>) => {
            state.idClickTour = action.payload;
        },
        set_tour: (state, action: PayloadAction<DataTour>) => {
            state.tour = action.payload;
        },

    },
});

// Экспортируем actions
export const { updateContent, updateReservours, updateStatusUser, controll_modal_form, update_modal, add_catch, click_tour, set_tour } = slice.actions;

// Экспортируем редьюсер
export const myReducer = slice.reducer;

// Конфигурируем store
export const store = configureStore({
    reducer: {
        slice: myReducer, // Регистрируем редьюсер
    },
});

// Типизация store для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;