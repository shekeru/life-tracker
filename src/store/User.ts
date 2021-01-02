import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { RootState } from "./Store"

export interface Account {
    photoURL: string
    displayName: string
    uid: string
}

function updateUser(state, action) {
    return (state = action.payload)
}

function rmUser(state) {
    return state
}

export const Slice = createSlice({
    name: 'user',
    initialState: {} as Account,
    reducers: {
        update: updateUser,
        logout: rmUser
    }
})

export const Select = () => useSelector(
    (st: RootState) => st.user
)