import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {ITodo} from "../../types/todoTypes";
import {RootState} from "../../hooks/useAppSelector";


const initialState = [] as ITodo[]

const todoSlice = createSlice({
    name: '@@todo',
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action: PayloadAction<ITodo>): void => {
                state.push(action.payload)
            },
            prepare: (title: string) => ({
                payload: {
                    title,
                    id: nanoid(),
                    completed: false
                }
            })
        },
        toggleTodo: (state, action: PayloadAction<string>): void => {
            const todo = state.find((todo) => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        deleteTodo: (state, action: PayloadAction<string>): ITodo[] => {
            return state.filter((todo) => action.payload !== todo.id)
        },
        removeCompletedItem: (state): ITodo[] => {
            return state.filter((todo) => !todo.completed)
        }

    }
})

export const {addTodo, toggleTodo, deleteTodo, removeCompletedItem} = todoSlice.actions
export const todoReducer = todoSlice.reducer


export const selectTodoAll = (state: RootState): ITodo[] => state.todo
export const selectTodoActive = (state: RootState): ITodo[] => state.todo.filter(todo => !todo.completed)
export const selectTodoCompleted = (state: RootState): ITodo[] => state.todo.filter(todo => todo.completed)