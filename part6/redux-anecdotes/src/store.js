import { configureStore } from "@reduxjs/toolkit"
import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"


const Store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
  }
})

/* anecdoteService.getAll().then(anecdotes => 
  Store.dispatch(setAnecdotes(anecdotes))
) */

Store.dispatch(initializeAnecdotes())

export default Store