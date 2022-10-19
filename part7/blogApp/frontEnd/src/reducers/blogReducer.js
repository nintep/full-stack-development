import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload.sort(byLikes)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state
        .map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
        .sort(byLikes)
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addNewBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))

      const message = `a new blog '${newBlog.title}' by ${newBlog.author} added`
      dispatch(setNotification({ message, type: 'info' }, 5000))
    } catch (error) {
      const errorMessage =
        'creating a blog failed: ' + error.response.data.error
      dispatch(setNotification({ message: errorMessage, type: 'alert' }, 5000))
    }
  }
}

export const addLikeToBLog = (blog) => {
  const liked = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id,
  }
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, liked)
    dispatch(updateBlog(likedBlog))

    const message = `you liked '${likedBlog.title}' by ${likedBlog.author}`
    const type = 'info'
    dispatch(setNotification({ message, type }, 5000))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}
export default blogSlice.reducer
