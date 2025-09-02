import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../reducer/AuthSlice'
import CounterSlice from '../reducer/Counterslice'

const store= configureStore({
  reducer: {
    auth:AuthReducer,
    counter:CounterSlice
  },
})

export default store