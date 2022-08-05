import {configureStore} from "@reduxjs/toolkit";
import {todoReducer} from "./slice/todoSlice";
import {filterReducer} from "./slice/filtersSlice";
import {themeReducer} from "./slice/themeSlice";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        filter:filterReducer,
        theme: themeReducer,
    }
})
