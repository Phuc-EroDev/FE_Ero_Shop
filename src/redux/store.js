import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/CounterSlide'
import userReducer from './slides/userSlide'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
})