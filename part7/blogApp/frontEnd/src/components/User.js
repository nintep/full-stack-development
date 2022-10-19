import userService from '../services/users'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const usersList = await userService.getAll()
      setUsers(usersList)
    }
    getUsers()
  }, [])

  const id = useParams().id
  const user = users.find((u) => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>added blogs:</p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
