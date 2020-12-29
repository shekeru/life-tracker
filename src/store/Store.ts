import { createSlice, configureStore } from '@reduxjs/toolkit'
import * as User from './User'
import * as Panels from './Panels'
import * as Active from './Active'
import {throttle} from 'lodash'
import './Context'

export interface RootState {
    user?: User.Account
    panels?: Panels.Panel[]
    active?: string
}

export function createAppStore() {
    let store = configureStore({
        preloadedState: loadState(),
        middleware: [],
        reducer: {
            user: User.Slice.reducer,
            panels: Panels.Slice.reducer,
            active: Active.Slice.reducer,
        }, 
        devTools: 
            process.env.NODE_ENV !== 'production' ||
            (process.env.PUBLIC_URL || "").length > 0,
    });
    store.subscribe(throttle(() => saveState(store.getState()), 1000));
    return store;
}

function loadState() {
    return JSON.parse(localStorage.getItem('state') 
        || "{}") || {} as RootState
}

function saveState(state) {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
}