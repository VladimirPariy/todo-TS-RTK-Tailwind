import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {ITodo} from "../../types/todoTypes";
import {RootState} from "../../hooks/useAppSelector";

const initialState: ITodo[] = []

const todoSlice = createSlice({
    name: '@@todo',
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action: PayloadAction<ITodo>) => {
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
        toggleTodo(state, action: PayloadAction<string>) {
            const todo = state.find((todo) => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        deleteTodo(state, action: PayloadAction<string>) {
            return state.filter((todo) => action.payload !== todo.id)
        }

    },
    extraReducers: {}
})

export const {addTodo, toggleTodo, deleteTodo} = todoSlice.actions
export const todoReducer = todoSlice.reducer


export const selectTodoAll = (state: RootState) => state.todo
export const selectTodoActive = (state: RootState) => state.todo.filter(todo => !todo.completed)
export const selectTodoCompleted = (state: RootState) => state.todo.filter(todo => todo.completed)