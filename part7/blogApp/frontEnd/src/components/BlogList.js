import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { Table } from 'react-bootstrap'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => {
    return state.blogs
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  return (
    <div id="blogs">
      <h2>Added blogs</h2>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Blog blog={blog} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )

  /* return (
    <div id="blogs">
      <h2>Added blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  ) */
}

export default BlogList
