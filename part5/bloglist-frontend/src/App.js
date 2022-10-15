import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  //login form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //blog form
  const [blogTitle, setBlogTitle] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')

  //user token
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setNotificationMessage('logged in')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setNotificationMessage('logged out')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      if(returnedBlog)
      {
        setBlogs(blogs.concat(returnedBlog))
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')

        setNotificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }
    } catch (exception) {
      
    }
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Title <input
        type="text"
        value={blogTitle}
        onChange={({ target }) => setBlogTitle(target.value)}
        />
      Author <input
        type="text"
        value={blogAuthor}
        onChange={({ target }) => setBlogAuthor(target.value)}
        />
      URL <input
        type="text"
        value={blogUrl}
        onChange={({ target }) => setBlogUrl(target.value)}
        />
      <button type="submit">save</button>
    </form>  
  )


  /////Page to return

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <Notification message={notificationMessage} />
        <form onSubmit = {handleLogin}>
          <div>
            username <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              />
            password <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <Notification message={notificationMessage} />
      <p>{user.name} logged in <button type="submit" onClick = {handleLogout}>logout</button></p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
