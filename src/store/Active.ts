import { createSelector, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './Store';

function updateActive(state: string, action) {
    return state = action.payload;
}

export const Slice = createSlice({
    name: 'active',
    initialState: "",
    reducers: {
        update: updateActive,
    }
})

export const Select = () => useSelector(
    (st: RootState) => st.active || ""
)