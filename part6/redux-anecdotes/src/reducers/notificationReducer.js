import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      const content = action.payload
      state.push(content)
    },
    removeNotification(state, action) {
      const content = action.payload
      return state.filter(anecdote => anecdote !== content)
    }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(createNotification(message))
    setTimeout( () => {
      dispatch(removeNotification(message))
    }, time)
  }
}

export default notificationSlice.reducer