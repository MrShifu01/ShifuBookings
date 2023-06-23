import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import pageReducer from './pageSlice'

const store = configureStore({
    reducer: {
        page: pageReducer,
        user: userReducer
    }
})

export default store