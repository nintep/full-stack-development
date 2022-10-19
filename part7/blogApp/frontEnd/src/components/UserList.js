import userService from '../services/users'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const usersList = await userService.getAll()
      setUsers(usersList)
    }

    getUsers()
  }, [])

  return (
    <div id="users">
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
