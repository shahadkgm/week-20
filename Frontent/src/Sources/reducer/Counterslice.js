import { createSlice } from "@reduxjs/toolkit";


const CounterSlice=createSlice({
    name:"counter",
    initialState:{value:0},
    reducers:{
        add:(state)=>{
            state.value+=1
        }
    }
})

export const{add}=CounterSlice.actions;
export default CounterSlice.reducer
