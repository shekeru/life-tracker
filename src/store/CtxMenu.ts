import { createSelector, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './Store';

interface CtxEntry {
    event: () => any
    text: string
}

export interface CtxMenu {
    opts: CtxEntry[]
    show: boolean
    yPos: number
    xPos: number
}

function enableMenu(state, action) {
    Object.assign(state, action.payload)
    state.show = true; return state
}

function toggleMenu(state, action) {
    state.show = action.payload
    return state
}

export const Slice = createSlice({
    name: 'ctxmenu',
    initialState: {
        show: false,
        opts: [],
        xPos: 0,
        yPos: 0,
    } as CtxMenu,
    reducers: {
        enable: enableMenu,
        toggle: toggleMenu,
    }
})

export const Select = () => useSelector(
    (st: RootState) => st.ctxmenu
)