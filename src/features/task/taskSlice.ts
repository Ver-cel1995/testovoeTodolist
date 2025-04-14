// features/tasks/taskSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types/task';

interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },

        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },

        updateTask: (state, action: PayloadAction<{oldTaskName: string; updatedTask: Task}>) => {
            const index = state.tasks.findIndex(t => t.taskName === action.payload.oldTaskName);
            if (index !== -1) {
                state.tasks[index] = action.payload.updatedTask;
            }
        },

        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(t => t.taskName !== action.payload);
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        changeTaskStatus: (state, action: PayloadAction<{taskName: string; newStatus: number}>) => {
            const task = state.tasks.find(t => t.taskName === action.payload.taskName);
            if (task) {
                task.statusId = action.payload.newStatus;
            }
        }
    },
    selectors: {
        selectAllTasks: (state) => state.tasks,
        selectTasksByStatus: (state, statusId: number) => state.tasks.filter(task => task.statusId === statusId),
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error,
    }
});

export const {
    addTask,
    updateTask,
    deleteTask,
    setLoading,
    setError,
    setTasks,
    changeTaskStatus
} = taskSlice.actions;

export const { selectAllTasks, selectTasksByStatus, selectLoading, selectError } = taskSlice.selectors;

export default taskSlice.reducer;