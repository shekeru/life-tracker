import { createSlice, configureStore } from '@reduxjs/toolkit'
import * as Panels from '../store/Panels'

interface Account {
    username: string
    avatar: string
}

const U_State = createSlice({
    name: 'user',
    initialState: {},
    reducers: {}
})

export interface RootState {
    user: {}
    panels: Panels.Panel[]
}

export const createAppStore = () =>
    configureStore({
        reducer: {
            user: U_State.reducer,
            panels: Panels.Slice.reducer,
        }, 
        devTools: 
            process.env.NODE_ENV !== 'production' ||
            (process.env.PUBLIC_URL || "").length > 0,
    })