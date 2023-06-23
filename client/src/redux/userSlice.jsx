import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {user: null}

const userSlice = createSlice({
    name: 'user',

    initialState,

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(state))
        },

        resetUser: (state) => {
            state.user = null
            localStorage.setItem('user', JSON.stringify(state))
        }
    }
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer