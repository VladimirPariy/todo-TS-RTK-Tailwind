import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {IState, stateTodo } from "../../types/stateTypes";
import {ITodo} from "../../types/todoTypes";


const todoSlice = createSlice({
    name: '@@todo',
    initialState: [],
    reducers: {
        addTodo: {
            reducer: (state: stateTodo, action: PayloadAction<ITodo>) => {
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


    },
    extraReducers: {}
})

export const {addTodo} = todoSlice.actions
export const todoReducer = todoSlice.reducer
export const selectTodo = (state: IState) => state.todo