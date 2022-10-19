import { useState, useEffect, useRef } from 'react'
import { setNotification } from './reducers/notificationReducer'
import {
  addNewBlog,
  addLikeToBLog,
  initializeBlogs,
  deleteBlog,
} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import loginService from './services/login'
import userService from './services/user'

const App = () => {
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      setUser(userFromStorage)
    }
  }, [])

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        setUser(user)
        userService.setUser(user)
        notify(`${user.name} logged in!`)
      })
      .catch(() => {
        notify('wrong username/password', 'alert')
      })
  }

  const logout = () => {
    setUser(null)
    userService.clearUser()
    notify('good bye!')
  }

  const blogs = useSelector((state) => {
    return state.blogs
  })

  const createBlog = async (blog) => {
    dispatch(addNewBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id)

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    )

    if (!ok) {
      return
    }

    dispatch(deleteBlog(id))
  }

  const likeBlog = async (id) => {
    const toLike = blogs.find((b) => b.id === id)
    dispatch(addLikeToBLog(toLike))
  }

  const notify = (message, type = 'info') => {
    dispatch(setNotification({ message, type }, 5000))
  }

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>

      <div id="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default App
