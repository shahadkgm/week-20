import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../reducer/AuthSlice'

const store= configureStore({
  reducer: {
    auth:AuthReducer,
  },
})

export default store