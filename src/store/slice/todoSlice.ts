import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {ITodo} from "../../models/ITodo";
import {RootState} from "../../hooks/useAppSelector";
import {IUpdatingTodo} from "../../models/IUpdatingTodo";

interface IDragAndDropPayload {
  draggingTodo: ITodo,
  todos: ITodo[],
  droppingTodo: ITodo
}

const todoSlice = createSlice({
  name: '@@todo',
  initialState: [] as ITodo[],
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

    dragAndDropTodo: (state, {payload: {draggingTodo, droppingTodo, todos}}: PayloadAction<IDragAndDropPayload>) => {
      if (draggingTodo !== null) {
        const funcForFilter = (todo: ITodo) => todo.id !== draggingTodo.id
        const current = todos.find((todo: ITodo) => todo.id === draggingTodo.id) || {} as ITodo
        const todoArrayBeforeDraggingTodo = todos
          .slice(0, droppingTodo.order + 1)
          .filter(funcForFilter)
        const todoArrayAfterDraggingTodo = todos
          .slice(droppingTodo.order + 1)
          .filter(funcForFilter)

        const newTodosArray = todoArrayBeforeDraggingTodo?.concat(current, todoArrayAfterDraggingTodo)

        return newTodosArray?.map((item: ITodo, index: number) => {
          return {...item, order: index}
        })
      }
      return state
    },

  }
})

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  removeCompletedItem,
  isUpdatingTodo,
  updatingTitleTodo,
  dragAndDropTodo
} = todoSlice.actions
export const todoReducer = todoSlice.reducer


export const selectTodoAll = (state: RootState): ITodo[] => state.todo
export const selectTodoActive = (state: RootState): ITodo[] => state.todo.filter(todo => !todo.completed)
export const selectTodoCompleted = (state: RootState): ITodo[] => state.todo.filter(todo => todo.completed)