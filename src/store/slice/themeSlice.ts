import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../hooks/useAppSelector";

const themeSlice = createSlice({
    name: '@@theme',
    initialState: 'light' ,
    reducers: {
        toggleTheme: (_, action) => {
            return action.payload
        }
    }
})

export const {toggleTheme} = themeSlice.actions
export const themeReducer = themeSlice.reducer

export const themeSelector = (state:RootState) => state.theme