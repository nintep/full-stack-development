import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addLikeToBLog, deleteBlog } from '../reducers/blogReducer'
import { BlogDetails } from './Blog'

const BlogView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogs = useSelector((state) => {
    return state.blogs
  })
  const user = useSelector((state) => {
    return state.user
  })

  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return null
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
    navigate('/')
  }

  const likeBlog = async (id) => {
    const toLike = blogs.find((b) => b.id === id)
    dispatch(addLikeToBLog(toLike))
  }

  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <BlogDetails
        blog={blog}
        visible={true}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        own={blog.user && user.username === blog.user.username}
      />
    </div>
  )
}

export default BlogView
