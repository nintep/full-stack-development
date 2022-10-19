import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    },
  },
})

export const { createNotification, removeNotification } =
  notificationSlice.actions

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(createNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time)
  }
}

export default notificationSlice.reducer
