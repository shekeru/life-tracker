import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from './Store';

interface Entry {
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

export function createPanel(state) {
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
    initialState: [],
    reducers: {
        create: createPanel,
    }
})

export const Select = () => useSelector(
    (st: RootState) => st.panels || []
)