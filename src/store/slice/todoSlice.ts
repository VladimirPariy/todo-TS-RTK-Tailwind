import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {ITodo, IUpdatingTodo} from "../../types/todoTypes";
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
          completed: false,
          isUpdating: false
        }
      })
    },
    toggleTodo: (state, action: PayloadAction<string>): void => {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    deleteTodo: (state, action: PayloadAction<string>): ITodo[] => {
      return state.filter((todo) => action.payload !== todo.id)
    },
    removeCompletedItem: (state): ITodo[] => {
      return state.filter((todo) => !todo.completed)
    },
    isUpdatingTodo: (state, action: PayloadAction<string>): void => {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) todo.isUpdating = !todo.isUpdating

    },
    updatingTitleTodo: (state, action: PayloadAction<IUpdatingTodo>): void => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.title = action.payload.title
        todo.isUpdating = !todo.isUpdating
      }
    }

  }
})

export const {addTodo, toggleTodo, deleteTodo, removeCompletedItem, isUpdatingTodo, updatingTitleTodo} = todoSlice.actions
export const todoReducer = todoSlice.reducer


export const selectTodoAll = (state: RootState): ITodo[] => state.todo
export const selectTodoActive = (state: RootState): ITodo[] => state.todo.filter(todo => !todo.completed)
export const selectTodoCompleted = (state: RootState): ITodo[] => state.todo.filter(todo => todo.completed)