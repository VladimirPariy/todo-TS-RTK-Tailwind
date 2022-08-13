import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {ITodo} from "../../types/ITodo";
import {RootState} from "../../hooks/useAppSelector";
import {IUpdatingTodo} from "../../types/IUpdatingTodo";


const initialState = [] as ITodo[]

const todoSlice = createSlice({
  name: '@@todo',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<ITodo>): void => {
        state.unshift(action.payload)
      },
      prepare: (title: string, state) => ({
        payload: {
          title,
          id: nanoid(),
          completed: false,
          isUpdating: false,
          order: state.length > 0 ? state.length : 0

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
      const updatingTodo = state.find(todo => todo.isUpdating)
      if (updatingTodo && updatingTodo.id !== action.payload) {
        updatingTodo.isUpdating = !updatingTodo.isUpdating
      }
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) todo.isUpdating = !todo.isUpdating

    },
    updatingTitleTodo: (state, action: PayloadAction<IUpdatingTodo>): void => {

      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.title = action.payload.title
        todo.isUpdating = !todo.isUpdating
      }
    },
    dragAndDropTodo:(state, action)=> {

      if (action.payload.currentCard !== null) {
        const current = action.payload.todos.find((todo:ITodo) => todo.id === action.payload.currentCard.id) || {} as ITodo
        const startArr = action.payload.todos.slice(0, action.payload.todo.order + 1).filter((todo:ITodo) => todo.id !== action.payload.currentCard.id)
        const endArr = action.payload.todos.slice(action.payload.todo.order + 1).filter((todo:ITodo) => todo.id !== action.payload.currentCard.id)

        const concatArr = startArr?.concat(current, endArr)
        return concatArr?.map((item:ITodo, index:number) => {
          return {...item, order: index}
        })
      }
      return state
    },

  }
})

export const {addTodo, toggleTodo, deleteTodo, removeCompletedItem, isUpdatingTodo, updatingTitleTodo, dragAndDropTodo} = todoSlice.actions
export const todoReducer = todoSlice.reducer


export const selectTodoAll = (state: RootState): ITodo[] => state.todo
export const selectTodoActive = (state: RootState): ITodo[] => state.todo.filter(todo => !todo.completed)
export const selectTodoCompleted = (state: RootState): ITodo[] => state.todo.filter(todo => todo.completed)