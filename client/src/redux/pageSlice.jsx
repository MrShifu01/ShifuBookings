import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name: 'page',

    initialState: {
        page: '/index'
    },

    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        },

        resetPage: (state) => {
            state.page = '/index'
        }
    }
})

export const { setPage, resetPage } = pageSlice.actions

export default pageSlice.reducer