import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { FireBase } from './Context';
import { RootState } from './Store';

export interface Entry {
    ikey: string
    title: string
    interval: number
    units: number
    last: number
}

export interface Panel {
    ikey: string
    title: string
    entries: Entry[]
}

function movePanels(state, action){
    const Y = action.payload.idx + action.payload.delta
    if (Y < 0 || Y >= state.length) 
        return state
    const tmp = state[action.payload.idx] 
    state[action.payload.idx] = state[action.payload.idx + action.payload.delta]
    state[action.payload.idx + action.payload.delta] = tmp; return state
}

function swapEntry(state, action) {
    const Y = action.payload.idx + action.payload.delta
    const arr = state.find(el => el.ikey == action.payload.parent).entries
    if (Y < 0 || Y >= arr.length) 
        return state
    const tmp = arr[action.payload.idx] 
    arr[action.payload.idx] = arr[action.payload.idx + action.payload.delta]
    arr[action.payload.idx + action.payload.delta] = tmp; return state
}

function updateEntry(state, action) {
    let curr = state.find(el => el.ikey == action.payload.parent)
    let task = curr.entries.find(el => el.ikey == action.payload.ikey)
    Object.assign(task, action.payload); delete task.parent
    return state
}

function deleteEntry(state, action) {
    let curr = state.find(el => el.ikey == action.payload.parent)
    let where = curr.entries.findIndex(el => el.ikey == action.payload.ikey)
    curr.entries.splice(where, 1)
    return state
}

function newEntry(state, action) {
    let curr = state.find(el => el.ikey == action.payload)
    curr.entries.push({
        ikey: uuidv4(),
        last: Date.now(),
        title: "New Task",
        units: 3600000,
        interval: 1,
    } as Entry)
    return state
}

function loadPanels(state, action) {
    return (state = action.payload)
}

function removePanel(state, action) {
    let idx = state.findIndex(el => el.ikey == action.payload)
    state.splice(idx, 1); return state
}

function renamePanel(state, action) {
    state[action.payload.idx].title = action.payload.title
    return state
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
        mvEntry: swapEntry,
        addEntry: newEntry,
        delEntry: deleteEntry,
        editEntry: updateEntry,
        create: createPanel,
        remove: removePanel,
        rename: renamePanel,
        move: movePanels,
        load: loadPanels,
    }
})

export const Select = () => useSelector(
    (st: RootState) => st.panels || []
)