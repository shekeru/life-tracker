import { createSlice, configureStore } from '@reduxjs/toolkit'
import { FireBase } from './Context'
import * as User from './User'
import * as Panels from './Panels'
import * as Active from './Active'
import {throttle} from 'lodash'

export interface RootState {
    user: User.Account
    panels?: Panels.Panel[]
    active: string
}

export function createAppStore(Client : FireBase) {
    let store = configureStore({
        preloadedState: {} as RootState,
        middleware: [rtFBMiddleWare(Client)],
        reducer: {
            user: User.Slice.reducer,
            panels: Panels.Slice.reducer,
            active: Active.Slice.reducer,
        }, devTools: process.env.NODE_ENV !== 'production'
    }); 
    // Register Auth Callback
    Client.auth.onAuthStateChanged(userAuth => 
        store.dispatch(User.Slice.actions.update(userAuth))
    ); return store;
}

const rtFBMiddleWare = Client => store => next => action => {
    next(action); switch(action.type) {
        case 'user/update':
            Client.loadPanels(val => 
                store.dispatch(Panels.Slice.actions.load(val?.panels || [])))
            return
        case 'panels/mvEntry':
        case 'panels/addEntry':
        case 'panels/delEntry':
        case 'panels/editEntry':
        case 'panels/create':
            let st = store.getState()
            Client.t_savePanels({'panels': st.panels})
            return
        default:
            return
    }
}