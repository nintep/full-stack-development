import { useEffect, useRef } from 'react'
import { setNotification } from './reducers/notificationReducer'
import { addNewBlog } from './reducers/blogReducer'
import { initializeUser, setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import UserList from './components/UserList'
import User from './components/User'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import loginService from './services/login'

const Home = ({ blogFormRef, createBlog }) => {
  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>
      <BlogList />
    </>
  )
}

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const user = useSelector((state) => {
    return state.user
  })

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        dispatch(setUser(user))
        notify(`${user.name} logged in!`)
      })
      .catch(() => {
        notify('wrong username/password', 'alert')
      })
  }

  const logout = () => {
    dispatch(setUser(null))
    notify('good bye!')
  }

  const createBlog = async (blog) => {
    dispatch(addNewBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  const notify = (message, type = 'info') => {
    dispatch(setNotification({ message, type }, 5000))
  }

  const padding = {
    padding: 5,
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
    <Router>
      <div>
        <h2>blogs</h2>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={<Home blogFormRef={blogFormRef} createBlog={createBlog} />}
        />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </Router>
  )
}

export default App
