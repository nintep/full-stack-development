import { configureStore } from "@reduxjs/toolkit"
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"

const Store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
  }
})

export default Store