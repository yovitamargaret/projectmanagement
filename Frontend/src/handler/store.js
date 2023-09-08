import{ configureStore } from "@reduxjs/toolkit"
import statusReducer from "../features/status/statusSlice"

export default configureStore({
    reducer:{
        statusLoad: statusReducer
    }
})