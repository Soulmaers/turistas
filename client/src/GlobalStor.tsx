import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';
import { LargeNumberLike } from 'node:crypto';



export interface User {
    user: {
        contactID: '',
        name_user: 'string',
        trophys: number,
        fishs: number,
        stars: number,
        id: number,
        state_card: string | null,
        idClick_tour: number | null
    } | null,
    tournament: Tournament[] | []

}
export interface Tournament {
    status: number | undefined | null | string,
    big_fish: number | null,
    name: string,
    created_by: number,
    dateStart: string,
    dateFinish: string,
    id: number
}

// Интерфейс для UpdateReservours
interface UpdateReservours {
    index: number;
    text: string;
}

interface FishCatch {
    'Лещ': number,
    'Щука': number,
    'Судак': number,
    'Окунь': number,
    'Форель': number,
    'Всего': number,
    name_user: string | null;
    idUser: number

}
export interface UserData {
    name_user: string;
    "Лещ": number;
    "Щука": number;
    "Судак": number;
    "Окунь": number;
    "Форель": number;
    "Всего": number;
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
    comment: string
    urlFoto: null | string//null | {} | string
}
export interface ExtendedBigFish extends BigFish {
    idUser: number;
    idTournament: number;
    idCatch: number;
    id_baits: number
    id_fish: number
    id_reservour: number,
    id_timeday: number,
    id_type: number
}


// Интерфейс для состояния
interface MyState {
    stateBody: string;
    historyStateBody: string[];
    updateReservours: UpdateReservours;
    userStatus: User;
    idClickTour: number | null
    tour: DataTour,
    catch: ExtendedBigFish,
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
    urlFoto: null | string,
    catchsList: [] | ExtendedBigFish[],
    historyWiew: string,
    deleteIdCatch: null | ExtendedBigFish,
    allCatchs: ExtendedBigFish[],
    staticData: UserData[],
    deleteFormTour: boolean,
    statusTour: number | null,
    modalFishers: boolean,
    discription: string,
    formStep: {
        step: string,
        index: number | null
    },
    prevStateBodyForRender: null | string,
    stateModalWindow: StateModal,
    stateModalWindowTwo: StateModal,
    stateModalWindowThree: StateModal,
    stateModalWindowThour: StateModal,
    activeModalLevel: number,
    modalStack: number[]
    intervals: Interval[] | [],

}
interface Interval {
    start: number; // Время начала в секундах
    end: number;   // Время конца в секундах
    startDateTime: string;
    endDateTime: string;
}
export interface Participants {
    name_user: string,
    contactID: string,
    userId: number
}
interface DataTour {
    id: number | null,
    nameTour: string,
    dateStart: string,
    dateFinish: string,
    users: Participants[]
}
type FormStepPayload = {
    step: 'start' | 'preform' | 'entry' | 'main';
    index?: number | null;
};

interface StateModal {
    type: string,
    status: boolean
}
// Начальное состояние
const initialState: MyState = {
    modalStack: [],
    intervals: [],
    stateModalWindow: { type: 'null', status: false },
    stateModalWindowTwo: { type: 'null', status: false },
    stateModalWindowThree: { type: 'null', status: false },
    stateModalWindowThour: { type: 'null', status: false },
    stateBody: 'startwindow',
    historyStateBody: [],
    prevStateBodyForRender: null,
    updateReservours: { index: 0, text: '' },
    userStatus: { user: null, tournament: [] },
    idClickTour: null,
    tour: {
        id: null,
        nameTour: '',
        dateStart: '',
        dateFinish: '',
        users: []
    },
    catch: {
        name_user: '',
        name_fish: '',
        name_reservour: '',
        name_type: '',
        name_bait: '',
        name_day: '',
        weight: '',
        foto_user: '',
        data: '',
        comment: '',
        urlFoto: null,
        idUser: 0,
        idTournament: 0,
        idCatch: 0,
        id_baits: 0,
        id_fish: 0,
        id_reservour: 0,
        id_timeday: 0,
        id_type: 0
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
    urlFoto: null,
    catchsList: [],
    historyWiew: 'tournaments',
    deleteIdCatch: null,
    allCatchs: [],
    staticData: [],
    deleteFormTour: false,
    statusTour: null,
    modalFishers: false,
    formStep: {
        step: 'start',
        index: null
    },
    discription: '',
    activeModalLevel: 0
};

// Создаем slice
const slice = createSlice({
    name: 'GlobalStor',
    initialState,
    reducers: {
        setModalStackPush: (state, action: PayloadAction<number>) => {
            if (!state.modalStack.includes(action.payload)) {
                state.modalStack.push(action.payload);
                state.activeModalLevel = action.payload;
            }
        },
        setModalStackPop: (state) => {
            state.modalStack.pop();
            state.activeModalLevel = state.modalStack[state.modalStack.length - 1] || 0;
        },
        setFormStepWithIndex: (state, action: PayloadAction<FormStepPayload>) => {
            state.formStep.step = action.payload.step;
            state.formStep.index = action.payload.index ?? null;
        },
        set_stateModalWindow: (state, action: PayloadAction<StateModal>) => {
            state.stateModalWindow = action.payload;
        },
        set_activeModalLevel: (state, action: PayloadAction<number>) => {
            state.activeModalLevel = action.payload;
        },

        set_stateModalWindowTwo: (state, action: PayloadAction<StateModal>) => {
            state.stateModalWindowTwo = action.payload;
        },
        set_stateModalWindowThree: (state, action: PayloadAction<StateModal>) => {
            state.stateModalWindowThree = action.payload;
        },
        set_stateModalWindowThour: (state, action: PayloadAction<StateModal>) => {
            state.stateModalWindowThour = action.payload;
        },
        set_intervals: (state, action: PayloadAction<Interval[]>) => {
            state.intervals = action.payload;
        },



        goBackState: (state) => {
            const prev = state.historyStateBody.pop();
            if (prev) {
                state.stateBody = prev;
            } else {
                state.stateBody = 'startwindow';
            }
        },

        set_stateBody: (state, action: PayloadAction<string>) => {
            if (state.stateBody !== action.payload) {
                state.historyStateBody.push(state.stateBody);
                state.prevStateBodyForRender = state.stateBody; // 👈 Сохраняем прошлый экран для рендера подложки
            }
            state.stateBody = action.payload;
        },
        set_modalFishers: (state, action: PayloadAction<boolean>) => {
            state.modalFishers = action.payload;
        },
        set_statusTour: (state, action: PayloadAction<number | null>) => {
            state.statusTour = action.payload;
        },
        set_discription: (state, action: PayloadAction<string>) => {
            state.discription = action.payload
        },
        updateReservours: (state, action: PayloadAction<UpdateReservours>) => {
            state.updateReservours = action.payload;
        },
        updateStatusUser: (state, action: PayloadAction<User>) => {
            state.userStatus = action.payload;
        },
        click_tour: (state, action: PayloadAction<number | null>) => {
            state.idClickTour = action.payload;
        },
        set_tour: (state, action: PayloadAction<DataTour>) => {
            state.tour = action.payload;
        },
        set_catch: (state, action: PayloadAction<ExtendedBigFish>) => {
            state.catch = action.payload;
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
        set_catchsList: (state, action: PayloadAction<[] | ExtendedBigFish[]>) => {
            state.catchsList = action.payload;
        },
        set_historyWiew: (state, action: PayloadAction<string>) => {
            state.historyWiew = action.payload;
        },
        resetAll: (state) => {
            return initialState;
        },
        set_deleteFormTour: (state, action: PayloadAction<boolean>) => {
            state.deleteFormTour = action.payload;
        },

        set_deleteIdCatch: (state, action: PayloadAction<null | ExtendedBigFish>) => {
            state.deleteIdCatch = action.payload;
        },
        deleteCatch: (state, action: PayloadAction<number>) => {
            const idToDelete = action.payload;
            // 1. Удаление из массива уловов
            state.catchsList = state.catchsList.filter(catchItem => catchItem.idCatch !== idToDelete);
            // 2. Обновление количества уловов пользователя (предполагаем, что каждый улов принадлежит одному пользователю)
            if (state.userStatus.user) state.userStatus.user.fishs -= 1;
        },
        setAllCatchs: (state, action: PayloadAction<ExtendedBigFish[]>) => {
            state.allCatchs = action.payload;
        },
        set_static: (state, action: PayloadAction<UserData[]>) => {
            state.staticData = action.payload;
        },

    },
});

// Экспортируем actions
export const { goBackState,
    setModalStackPush,
    set_intervals,
    setModalStackPop,
    set_activeModalLevel,
    setFormStepWithIndex,
    set_stateModalWindow,
    set_stateModalWindowTwo,
    set_stateModalWindowThree,
    set_stateModalWindowThour,
    set_discription,
    set_stateBody,
    updateReservours,
    updateStatusUser,
    click_tour,
    set_tour,
    set_catch,
    set_dataContent,
    set_catchs,
    set_action_catch,
    set_bigfish,
    set_urlFoto,
    set_catchsList,
    set_historyWiew,
    resetAll,
    set_deleteIdCatch,
    deleteCatch,
    setAllCatchs,
    set_static,
    set_deleteFormTour,
    set_statusTour,
    set_modalFishers
} = slice.actions;


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