import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { FireBase } from './Context';
import { RootState } from './Store';

export interface Entry {
    ikey: string
    title: string
    last: number
    freq: number
}

export interface Panel {
    ikey: string
    title: string
    entries: Entry[]
}

function loadPanels(state, action) {
    return (state = action.payload)
}

function createPanel(state) {
    let next = {
        ikey: uuidv4(), 
        title: "New Panel", 
        entries: [],
    } as Panel
    state.push(next); 
    return state;
}

export const Slice = createSlice({
    name: 'panels',
    initialState: null as (Panel[] | null),
    reducers: {
        create: createPanel,
        load: loadPanels,
    }
})

export const Select = () => useSelector(
    (st: RootState) => st.panels || []
)