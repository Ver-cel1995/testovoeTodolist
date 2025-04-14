import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DictionaryState = {
    statuses: { [key: number]: string };
    priorities: { [key: number]: string };
    assignees: { [key: number]: string };
};

// Изначальные данные
const initialState: DictionaryState = {
    assignees: {
        1: "Иван Иванов",
        2: "Мария Смирнова",
        3: "Дмитрий Алексеев",
    },
    priorities: {
        0: "Low",
        1: "Medium",
        2: "High",
    },
    statuses: {
        0: "В ожидании",
        1: "В работе",
        2: "Готово",
        3: "Тестирование",
    },
};

const dictionarySlice = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {
        setStatuses: (state, action: PayloadAction<DictionaryState['statuses']>) => {
            state.statuses = action.payload;
        },
        setAssignees: (state, action: PayloadAction<DictionaryState['assignees']>) => {
            state.assignees = action.payload;
        }
    }
});

// Селекторы
export const selectStatuses = (state: { dictionary: DictionaryState }) => state.dictionary.statuses;
export const selectPriorities = (state: { dictionary: DictionaryState }) => state.dictionary.priorities;
export const selectAssignees = (state: { dictionary: DictionaryState }) => state.dictionary.assignees

export const { setStatuses, setAssignees } = dictionarySlice.actions;
export default dictionarySlice.reducer;
