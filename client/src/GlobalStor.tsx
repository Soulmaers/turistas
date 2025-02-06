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
}

// Начальное состояние
const initialState: MyState = {
    content: null,
    updateReservours: { index: null, text: null },
    userStatus: { user: null, tournament: [] },
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
    },
});

// Экспортируем actions
export const { updateContent, updateReservours, updateStatusUser } = slice.actions;

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