import {configureStore} from "@reduxjs/toolkit";
import {todoReducer} from "./slice/todoSlice";
import {filterReducer} from "./slice/filtersSlice";
import {themeReducer} from "./slice/themeSlice";
import {isValidReducer} from "./slice/validTodoSlice";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        filter:filterReducer,
        theme: themeReducer,
        isValid:isValidReducer
    }
})
