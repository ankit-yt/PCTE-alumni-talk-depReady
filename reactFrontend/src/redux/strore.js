import { configureStore } from "@reduxjs/toolkit"
import uiReducer from './slices/uiSlice'
import alumniReducer from './slices/alumniSlice'
import loadingReducer from "./slices/loadingSlice"
import meetReducer from './slices/meetSlice'
import userReducer from './slices/user.slice'
export const store = configureStore({
    reducer:{
        ui: uiReducer,
        alumni: alumniReducer,
        loading:loadingReducer,
        meet:meetReducer,
        user:userReducer
    }
})

export default store;