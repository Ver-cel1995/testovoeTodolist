// app/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dictionarySlice from "../features/dictionary/dictionarySlice";
import taskSlice from "../features/task/taskSlice";

const rootReducer = combineReducers({
    tasks: taskSlice,
    dictionary: dictionarySlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;