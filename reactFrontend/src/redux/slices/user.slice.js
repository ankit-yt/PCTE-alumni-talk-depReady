import { createSlice } from "@reduxjs/toolkit"

const initial = {
    user:null
}

const userSlice = createSlice({
    initialState:initial,
    name:"user",
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        },
        removerUser:(state)=>{
            state.user = null
        }
        
    }
})

export const {setUser, removerUser} = userSlice.actions
export default userSlice.reducer