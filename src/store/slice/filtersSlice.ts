import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../hooks/useAppSelector";


const filterSlice = createSlice({
    name: '@@filters',
    initialState: 'All',
    reducers: {
        setFilter: (_, action: PayloadAction<string>) => {
            return action.payload
        }
    }
})


export const {setFilter} = filterSlice.actions
export const filterReducer = filterSlice.reducer

export const selectFilter = (state: RootState) => state.filter