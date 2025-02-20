import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';
import { User } from './modules/form/components/Interface';

// Интерфейс для UpdateReservours
interface UpdateReservours {
    index: number | null;
    text: string | null;
}

interface FishCatch {
    'Лещ': number,
    'Щука': number,
    'Судак': number,
    'Окунь': number,
    'Форель': number,
    'Другое': number,
    'Всего': number,
    name_user: string | null;

}

export interface BigFish {
    name_user: string,
    name_fish: string,
    name_reservour: string,
    name_type: string,
    name_bait: string,
    name_day: string,
    weight: string,
    foto_user: string,
    data: string,
    urlFoto: null | {}
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
    tour: DataTour,
    dataContent: {
        reservours: null | { name: string, discription: string, image: string, id: number }[],
        fishs: null | { name: string, id: number }[],
        baits: null | { name: string, id: number }[],
        timeDay: null | { name: string, id: number }[],
        typeCatch: null | { name: string, id: number }[],
    }
    catchs: FishCatch[],
    actionCatch: number,
    bigFish: null | BigFish,
    urlFoto: null | string
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
    },
    dataContent: {
        reservours: null,
        fishs: null,
        baits: null,
        timeDay: null,
        typeCatch: null
    },
    catchs: [],
    actionCatch: 0,
    bigFish: null,
    urlFoto: null
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
        set_dataContent: (state, action: PayloadAction<{ reservours: null; fishs: null; baits: null; timeDay: null, typeCatch: null }>) => {
            state.dataContent = action.payload;
        },
        set_catchs: (state, action: PayloadAction<FishCatch[]>) => {
            state.catchs = action.payload;
        },
        set_action_catch: (state, action: PayloadAction<number>) => {
            state.actionCatch = action.payload;
        },
        set_bigfish: (state, action: PayloadAction<null | BigFish>) => {
            state.bigFish = action.payload;
        },
        set_urlFoto: (state, action: PayloadAction<null | string>) => {
            state.urlFoto = action.payload;
        },


    },
});

// Экспортируем actions
export const { updateContent, updateReservours, updateStatusUser, controll_modal_form, update_modal, add_catch, click_tour, set_tour, set_dataContent, set_catchs, set_action_catch, set_bigfish, set_urlFoto } = slice.actions;

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