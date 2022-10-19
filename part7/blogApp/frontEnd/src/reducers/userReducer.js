import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    },
  },
})

export const { addUser, removeUser } = userSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(addUser(userFromStorage))
    }
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    if (user === null) {
      userService.clearUser()
    } else {
      userService.setUser(user)
    }
    dispatch(addUser(user))
  }
}

export default userSlice.reducer
