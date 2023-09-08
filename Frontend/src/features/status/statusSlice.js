import{ createSlice } from "@reduxjs/toolkit"

export const statusSlice = createSlice({
    name : "statusLoad",
    initialState:{
        value : false
    },
    reducers: {
        update:(state,action)=>{
            state.value=action.payload.value;
        }
    }
})

export const { update } = statusSlice.actions

export default statusSlice.reducer